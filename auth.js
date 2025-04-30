let currentUser = localStorage.getItem("currentUser");
let currentLang = localStorage.getItem("gameLanguage") || "en";

const validLanguages = ["en", "ru"];
if (!validLanguages.includes(currentLang)) {
    currentLang = "en";
    localStorage.setItem("gameLanguage", "en");
}

const languages = {
    en: {
        quit: "Quit",
        settings: "Settings",
        login: "Login",
        register: "Register",
        selectLevel: "Select Level",
        loginError: "Invalid nickname or password!",
        registerError: "Please enter nickname and password!",
        userExists: "User already exists!",
        level: "Level",
        difficulty: "Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        completed: "Completed",
        locked: "Locked",
        registerSuccess: "Registration successful! Please login.",
        coins: "Coins",
        skipLevel: "Skip Level",
        skipConfirm: "Are you sure you want to skip this level for 100 coins?",
        skipButton: "Skip",
        cancelButton: "Cancel",
        insufficientCoins: "Not enough coins!",
        questionsLabel: "Questions"
    },
    ru: {
        quit: "Выйти",
        settings: "Настройки",
        login: "Войти",
        register: "Регистрация",
        selectLevel: "Выберите уровень",
        loginError: "Неверный ник или пароль!",
        registerError: "Введите ник и пароль!",
        userExists: "Пользователь уже существует!",
        level: "Уровень",
        difficulty: "Сложность",
        easy: "Легко",
        medium: "Средне",
        hard: "Сложно",
        completed: "Пройден",
        locked: "Закрыт",
        registerSuccess: "Регистрация успешна! Пожалуйста, войдите.",
        coins: "Монеты",
        skipLevel: "Пропустить уровень",
        skipConfirm: "Вы уверены, что хотите пропустить уровень за 100 монет?",
        skipButton: "Пропустить",
        cancelButton: "Отмена",
        insufficientCoins: "Недостаточно монет!",
        questionsLabel: "Вопросы"
    }
};

function renderAuthInterface() {
    document.body.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userCoins = currentUser && users[currentUser] ? users[currentUser].coins || 0 : 0;

    const header = document.createElement("header");
    header.innerHTML = `
        <button onclick="location.href='settings.html';">${languages[currentLang].settings}</button>
        ${currentUser ? `
            <button onclick="logout()">${languages[currentLang].quit}</button>
            <p>${languages[currentLang].coins}: <span id="coins">${userCoins}</span></p>
        ` : ''}
    `;
    document.body.appendChild(header);

    const authContainer = document.createElement("div");
    authContainer.id = "authContainer";
    document.body.appendChild(authContainer);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "registerModal";
    modal.innerHTML = `
        <div class="modal-content">
            <p>${languages[currentLang].registerSuccess}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const skipModal = document.createElement("div");
    skipModal.className = "modal";
    skipModal.id = "skipModal";
    skipModal.innerHTML = `
        <div class="modal-content">
            <p>${languages[currentLang].skipConfirm}</p>
            <div class="modal-buttons">
                <button id="confirmSkip">${languages[currentLang].skipButton}</button>
                <button id="cancelSkip">${languages[currentLang].cancelButton}</button>
            </div>
        </div>
    `;
    document.body.appendChild(skipModal);

    const errorModal = document.createElement("div");
    errorModal.className = "modal";
    errorModal.id = "errorModal";
    errorModal.innerHTML = `
        <div class="modal-content">
            <p>${languages[currentLang].insufficientCoins}</p>
        </div>
    `;
    document.body.appendChild(errorModal);

    if (currentUser) {
        showLevelSelection();
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    const authContainer = document.getElementById("authContainer");
    authContainer.innerHTML = `
        <div class="auth-box">
            <h2>${languages[currentLang].login}</h2>
            <input type="text" id="username" placeholder="${currentLang === "ru" ? "Ник" : "Nickname"}"><br>
            <input type="password" id="password" placeholder="${currentLang === "ru" ? "Пароль" : "Password"}"><br>
            <p id="loginError" style="color: red; display: none;"></p>
            <button onclick="login()">${languages[currentLang].login}</button>
            <button onclick="register()">${languages[currentLang].register}</button>
        </div>
    `;
}

function showLevelSelection() {
    const authContainer = document.getElementById("authContainer");
    authContainer.innerHTML = `
        <div class="level-selection">
            <h2>${languages[currentLang].selectLevel}</h2>
            <div id="levelList" class="level-grid"></div>
        </div>
    `;

    const levelList = document.getElementById("levelList");
    const completedLevels = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || [];
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const customLevels = users[currentUser]?.customLevels || [];

    for (let i = 1; i <= 10; i++) {
        const isUnlocked = i === 1 || completedLevels.includes(i - 1);
        const isCompleted = completedLevels.includes(i);

        let difficulty = languages[currentLang].easy;
        if (i >= 7) difficulty = languages[currentLang].hard;
        else if (i >= 4) difficulty = languages[currentLang].medium;

        const card = document.createElement("div");
        card.className = `level-card ${isUnlocked ? '' : 'locked'} ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="level-info">
                <h3>${languages[currentLang].level} ${i}</h3>
                <p>${languages[currentLang].difficulty}: ${difficulty}</p>
                <p>${isCompleted ? languages[currentLang].completed : (isUnlocked ? '' : languages[currentLang].locked)}</p>
                ${isUnlocked && !isCompleted ? `<button onclick="showSkipConfirmation(${i})">${languages[currentLang].skipLevel}</button>` : ''}
            </div>
            <img src="icons/level.jpg" alt="${languages[currentLang].level} ${i}">
        `;
        if (isUnlocked) {
            card.onclick = (e) => {
                if (e.target.tagName !== "BUTTON") {
                    localStorage.setItem("currentLevel", i);
                    location.href = "game.html";
                }
            };
        }
        levelList.appendChild(card);
    }

    customLevels.forEach((level, index) => {
        const isCompleted = completedLevels.includes(`custom_${level.id}`);
        const card = document.createElement("div");
        card.className = `level-card custom ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="level-info">
                <h3>${level.name[currentLang]}</h3>
                <p>${languages[currentLang].difficulty}: ${languages[currentLang][level.difficulty]}</p>
                <p>${languages[currentLang].questionsLabel}: ${level.questions[currentLang].length}</p>
                <p>${isCompleted ? languages[currentLang].completed : ''}</p>
                ${!isCompleted ? `<button onclick="showSkipConfirmation('custom_${level.id}')">${languages[currentLang].skipLevel}</button>` : ''}
            </div>
            <img src="${level.image}" alt="${level.name}">
        `;
        card.onclick = (e) => {
            if (e.target.tagName !== "BUTTON") {
                localStorage.setItem("currentLevel", `custom_${level.id}`);
                location.href = "game.html";
            }
        };
        levelList.appendChild(card);
    });
}

function showSkipConfirmation(level) {
    const skipModal = document.getElementById("skipModal");
    skipModal.style.display = "flex";

    document.getElementById("confirmSkip").onclick = () => {
        skipLevel(level);
        skipModal.style.display = "none";
    };

    document.getElementById("cancelSkip").onclick = () => {
        skipModal.style.display = "none";
    };
}

function skipLevel(level) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[currentUser]) {
        const currentCoins = users[currentUser].coins || 0;
        if (currentCoins < 100) {
            showErrorModal();
            return;
        }
        users[currentUser].coins = currentCoins - 100;
        localStorage.setItem("users", JSON.stringify(users));

        const completedLevels = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || [];
        if (!completedLevels.includes(level)) {
            completedLevels.push(level);
            localStorage.setItem(`progress_${currentUser}`, JSON.stringify(completedLevels));
        }

        renderAuthInterface();
    }
}

function showErrorModal() {
    const errorModal = document.getElementById("errorModal");
    errorModal.style.display = "flex";
    setTimeout(() => {
        errorModal.style.display = "none";
    }, 2000);
}

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("loginError");

    if (!username || !password) {
        errorElement.textContent = languages[currentLang].registerError;
        errorElement.style.display = "block";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
        errorElement.textContent = languages[currentLang].userExists;
        errorElement.style.display = "block";
        return;
    }

    users[username] = { password, language: currentLang, coins: 0, vip: false, customLevels: [] };
    localStorage.setItem("users", JSON.stringify(users));
    showRegisterModal();
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("loginError");

    if (!username || !password) {
        errorElement.textContent = languages[currentLang].registerError;
        errorElement.style.display = "block";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        currentUser = username;
        currentLang = users[username].language || "en";
        localStorage.setItem("gameLanguage", currentLang);
        renderAuthInterface();
    } else {
        errorElement.textContent = languages[currentLang].loginError;
        errorElement.style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    renderAuthInterface();
}

function showRegisterModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
        showLoginScreen();
    }, 2000);
}

function updateLanguage() {
    currentLang = localStorage.getItem("gameLanguage") || "en";
    if (!validLanguages.includes(currentLang)) {
        currentLang = "en";
        localStorage.setItem("gameLanguage", "en");
    }
    renderAuthInterface();
}

window.addEventListener("storage", e => {
    if (e.key === "gameLanguage") {
        updateLanguage();
    }
});

renderAuthInterface();