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
        signup: "Signup",
        selectLevel: "Select Level",
        loginError: "Invalid name or password!",
        signupError: "Please enter name and password!",
        userExists: "User already exists!",
        level: "Level",
        difficulty: "Difficulty",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        completed: "Completed",
        locked: "Locked",
        signupSuccess: "Registration successful! Please login.",
        coins: "Coins",
        skipLevel: "Skip Level",
        skipConfirm: "Are you sure you want to skip this level for 100 coins?",
        skipButton: "Skip",
        cancelButton: "Cancel",
        insufficientCoins: "Not enough coins!",
        questionsLabel: "Questions",
        alreadyHaveAccount: "Already have an account?",
        alreadyHaveAccountButton: "Login",
        noAccount: "No account?",
        noAccountButton: "Signup"
    },
    ru: {
        quit: "Выйти",
        settings: "Настройки",
        login: "Вход",
        signup: "Зарегистрироваться",
        selectLevel: "Выберите уровень",
        loginError: "Неверный ник или пароль!",
        signupError: "Введите ник и пароль!",
        userExists: "Пользователь уже существует!",
        level: "Уровень",
        difficulty: "Сложность",
        easy: "Легко",
        medium: "Средне",
        hard: "Сложно",
        completed: "Пройден",
        locked: "Закрыт",
        signupSuccess: "Регистрация успешна! Пожалуйста, войдите.",
        coins: "Монеты",
        skipLevel: "Пропустить уровень",
        skipConfirm: "Вы уверены, что хотите пропустить уровень за 100 монет?",
        skipButton: "Пропустить",
        cancelButton: "Отмена",
        insufficientCoins: "Недостаточно монет!",
        questionsLabel: "Вопросы",
        alreadyHaveAccount: "Уже есть аккаунт?",
        alreadyHaveAccountButton: "Войти",
        noAccount: "Нет аккаунта?",
        noAccountButton: "Зарегистрироваться"
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
            <p>${languages[currentLang].signupSuccess}</p>
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
        showAuthScreen();
    }
}

function showAuthScreen(showSignup = false) {
    const authContainer = document.getElementById("authContainer");
    authContainer.innerHTML = `
        <div class="wrapper">
            <h1>${showSignup ? languages[currentLang].signup : languages[currentLang].login}</h1>
            <p id="error-message"></p>
            <form id="form" onsubmit="handleAuth(event, ${showSignup})">
                <div>
                    <label for="firstname-input">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
                    </label>
                    <input type="text" name="${showSignup ? 'firstname' : 'name'}" id="firstname-input" placeholder="${currentLang === 'ru' ? 'Имя' : 'Name'}">
                </div>
                <div>
                    <label for="password-input">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg>
                    </label>
                    <input type="password" name="password" id="password-input" placeholder="${currentLang === 'ru' ? 'Пароль' : 'Password'}">
                </div>
                <button type="submit">${showSignup ? languages[currentLang].signup : languages[currentLang].login}</button>
            </form>
            <p>${showSignup ? languages[currentLang].alreadyHaveAccount : languages[currentLang].noAccount} 
                <a href="#" onclick="showAuthScreen(${!showSignup})">${showSignup ? languages[currentLang].alreadyHaveAccountButton : languages[currentLang].noAccountButton}</a>
            </p>
        </div>
    `;
}

function handleAuth(event, isSignup) {
    event.preventDefault();
    const name = document.getElementById("firstname-input").value.trim();
    const password = document.getElementById("password-input").value.trim();
    const errorElement = document.getElementById("error-message");

    if (!name || !password) {
        errorElement.textContent = languages[currentLang].signupError;
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (isSignup) {
        if (users[name]) {
            errorElement.textContent = languages[currentLang].userExists;
            return;
        }
        users[name] = { password, language: currentLang, coins: 0, vip: false, customLevels: [] };
        localStorage.setItem("users", JSON.stringify(users));
        showRegisterModal();
    } else {
        if (users[name] && users[name].password === password) {
            localStorage.setItem("currentUser", name);
            currentUser = name;
            currentLang = users[name].language || "en";
            localStorage.setItem("gameLanguage", currentLang);
            renderAuthInterface();
        } else {
            errorElement.textContent = languages[currentLang].loginError;
        }
    }
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

function showRegisterModal() {
    const modal = document.getElementById("registerModal");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
        showAuthScreen(false);
    }, 2000);
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    renderAuthInterface();
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
