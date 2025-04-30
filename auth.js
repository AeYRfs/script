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
        registerSuccess: "Registration successful! Please login."
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
        registerSuccess: "Регистрация успешна! Пожалуйста, войдите."
    }
};

function renderAuthInterface() {
    document.body.innerHTML = "";

    const header = document.createElement("header");
    header.innerHTML = `
        <button onclick="location.href='settings.html';">${languages[currentLang].settings}</button>
        ${currentUser ? `<button onclick="logout()">${languages[currentLang].quit}</button>` : ''}
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
            </div>
            <img src="icons/level.jpg" alt="${languages[currentLang].level} ${i}">
        `;
        if (isUnlocked) {
            card.onclick = () => {
                localStorage.setItem("currentLevel", i);
                location.href = "game.html";
            };
        }
        levelList.appendChild(card);
    }
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

    users[username] = { password, language: currentLang };
    localStorage.setItem("users", JSON.stringify(users));
    console.log('Registered user:', username);

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
        console.log('Logged in user:', username, 'Language:', currentLang);
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
