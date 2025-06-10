const guideData = {
    en: {
        controls: { title: "Controls", content: "Use arrow keys or on-screen buttons: ⬅️ Left, ➡️ Right, ⬆️ Up, ⬇️ Down. Collide with elements to answer questions." },
        items: { title: "Items", content: "Collect chemical compounds by answering questions correctly to increase your score." },
        enemies: { title: "Enemies", content: "No enemies. Focus on collecting elements by answering chemistry questions." },
        tips: { title: "Tips", content: "Answers are case-insensitive but must match exactly (e.g., 'water' for H2O). Earn 10 coins per level." }
    },
    ru: {
        controls: { title: "Управление", content: "Используйте стрелки или экранные кнопки: ⬅️ Влево, ➡️ Вправо, ⬆️ Вверх, ⬇️ Вниз. Сталкивайтесь с элементами для вопросов." },
        items: { title: "Предметы", content: "Собирайте химические соединения, правильно отвечая на вопросы, чтобы увеличить счёт." },
        enemies: { title: "Враги", content: "Врагов нет. Сосредоточьтесь на сборе элементов, отвечая на вопросы по химии." },
        tips: { title: "Советы", content: "Ответы нечувствительны к регистру, но должны точно совпадать (например, 'вода' для H2O). Зарабатывайте 10 монет за уровень." }
    }
};

let currentLang = localStorage.getItem("gameLanguage") || "en";
const validLanguages = ["en", "ru"];
if (!validLanguages.includes(currentLang)) {
    currentLang = "en";
    localStorage.setItem("gameLanguage", "en");
}

const languages = { /* Paste languages object from your code */ };
let elements = [];
const collected = [];
let currentElement = null;
const currentUser = localStorage.getItem("currentUser");
let levelsCompleted = [];
const currentLevel = localStorage.getItem("currentLevel");
let userCoins = 0;
let isLevelCompleted = false;
const standardLevels = { /* Paste standardLevels object from your code */ };

const canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
const ctx = canvas.getContext("2d");

const modal = document.createElement("div");
modal.id = "modal";
modal.className = "modal";
modal.innerHTML = `
    <div class="modal-content">
        <div class="info">
            <p style="font-size:16px; font-weight:bold;" id="modal-question-label"></p>
            <span id="closeModal" class="close-button">×</span>
        </div>
        <p style="font-size:16px; font-weight:bold;" id="question"></p>
        <input type="text" id="answer" placeholder="">
        <p id="error-message" style="color: #ae4000; display: none; font-size:12px;"></p>
        <button id="answerButton"></button>
    </div>
`;

const background = new Image();
const player = { x: 50, y: 50, size: 150, image: new Image() };
player.image.src = "icons/player.jpg";

function renderLanguageSwitcher() {
    const switcher = document.getElementById("languageSwitcher");
    switcher.innerHTML = `
        <button data-lang="en" class="${currentLang === 'en' ? 'active' : ''}">English</button>
        <button data-lang="ru" class="${currentLang === 'ru' ? 'active' : ''}">Русский</button>
    `;
    switcher.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            currentLang = button.dataset.lang;
            localStorage.setItem("gameLanguage", currentLang);
            updateLanguage();
        });
    });
}

function renderGuideButtons() {
    const buttonsDiv = document.getElementById("guideButtons");
    buttonsDiv.innerHTML = "";
    Object.keys(guideData[currentLang]).forEach(key => {
        const button = document.createElement("button");
        button.textContent = guideData[currentLang][key].title;
        button.dataset.section = key;
        buttonsDiv.appendChild(button);
    });
    buttonsDiv.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            buttonsDiv.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderGuideContent(button.dataset.section);
        });
    });
    buttonsDiv.querySelector("button").classList.add("active");
}

function renderGuideContent(section) {
    document.getElementById("guideContent").innerHTML = `
        <div class="guide-content active">
            <h2>${guideData[currentLang][section].title}</h2>
            <p>${guideData[currentLang][section].content}</p>
        </div>
    `;
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

function init() {
    if (!currentUser) {
        location.href = "auth.html";
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[currentUser]) {
        userCoins = users[currentUser].coins || 0;
    } else {
        location.href = "auth.html";
        return;
    }

    levelsCompleted = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || [];
    isLevelCompleted = false;

    const gameContainer = document.getElementById("gameContainer");
    gameContainer.appendChild(canvas);
    document.body.appendChild(modal);

    let levelName = "";
    if (currentLevel.startsWith("custom_")) {
        const levelId = currentLevel.replace("custom_", "");
        const customLevel = users[currentUser].customLevels.find(l => l.id === parseInt(levelId));
        if (customLevel) {
            levelName = customLevel.name[currentLang];
            background.src = customLevel.background || "icons/game-background.jpg";
            elements = customLevel.questions[currentLang].map((q, i) => ({
                name: q.name,
                x: (customLevel.questions.x[i] || 0) * (canvas.width / 100),
                y: (customLevel.questions.y[i] || 0) * (canvas.height / 100),
                color: getRandomColor(),
                shape: "circle",
                question: q.text,
                answer: q.name
            }));
        } else {
            location.href = "auth.html";
            return;
        }
    } else {
        const levelNum = parseInt(currentLevel);
        if (standardLevels[levelNum]) {
            levelName = `${languages[currentLang].level} ${levelNum}`;
            background.src = "icons/game-background.jpg";
            elements = standardLevels[levelNum].map(e => ({
                name: e.name,
                x: e.x,
                y: e.y,
                color: e.color,
                shape: e.shape,
                question: e.question[currentLang],
                answer: e.answer[currentLang]
            }));
        } else {
            location.href = "auth.html";
            return;
        }
    }

    collected.length = 0;
    document.body.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

    const header = document.getElementById("header");
    header.innerHTML = `
        <button onclick="location.href='settings.html';">${languages[currentLang].settings}</button>
        <button onclick="location.href='auth.html';">${languages[currentLang].quit}</button>
        <p>${languages[currentLang].score}: <span id="score">0</span>/${elements.length}</p>
        <p><img src="icons/coin.jpg" alt="Coins" style="width: 24px; vertical-align: middle;"> <span id="coins">${userCoins}</span></p>
        <p>${languages[currentLang].level}: ${levelName}</p>
    `;

    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
        <button onclick="move('left')">${languages[currentLang].controls.left}</button>
        <button onclick="move('right')">${languages[currentLang].controls.right}</button>
        <button onclick="move('up')">${languages[currentLang].controls.up}</button>
        <button onclick="move('down')">${languages[currentLang].controls.down}</button>
    `;
    document.body.appendChild(controls);

    document.getElementById("modal-question-label").textContent = languages[currentLang].questionLabel;
    document.getElementById("answer").placeholder = languages[currentLang].placeholder;
    document.getElementById("answerButton").textContent = languages[currentLang].send;
    document.getElementById("error-message").textContent = languages[currentLang].wrong;
    document.getElementById("answerButton").onclick = checkAnswer;
    document.getElementById("closeModal").onclick = () => {
        modal.style.display = "none";
        document.querySelector(".modal-content").style.display = "none";
        document.getElementById("error-message").style.display = "none";
    };

    resizeCanvas();
    updateScore();
    draw();
    renderLanguageSwitcher();
    renderGuideButtons();
    renderGuideContent(Object.keys(guideData[currentLang])[0]);
    document.getElementById("hamburger").addEventListener("click", toggleSidebar);
}

function getRandomColor() {
    const colors = ["#2ca02c", "#ff7f0e", "#d62728", "#17becf", "#1f77b4", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateLanguage() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (currentUser && users[currentUser]) {
        currentLang = users[currentUser].language || "en";
        localStorage.setItem("gameLanguage", currentLang);
    }
    init();
    if (currentElement && modal.style.display === "flex") {
        showModal(currentElement.question);
    }
}

function draw() {
    if (background.complete && background.naturalWidth !== 0) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
    elements.forEach(el => {
        if (!collected.includes(el.name)) {
            ctx.fillStyle = el.color;
            ctx.beginPath();
            ctx.arc(el.x + 15, el.y + 15, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(el.name, el.x + 15, el.y + 15);
        }
    });
    checkCollision();
}

function checkCollision() {
    if (isLevelCompleted) return;
    elements.forEach(el => {
        if (
            player.x < el.x + 30 &&
            player.x + player.size > el.x &&
            player.y < el.y + 30 &&
            player.y + player.size > el.y &&
            !collected.includes(el.name)
        ) {
            currentElement = el;
            showModal(el.question);
        }
    });
    if (collected.length === elements.length) {
        isLevelCompleted = true;
        if (!levelsCompleted.includes(currentLevel)) {
            levelsCompleted.push(currentLevel);
            const nextLevel = !currentLevel.startsWith("custom_") && parseInt(currentLevel) < 10 ? parseInt(currentLevel) + 1 : null;
            if (nextLevel && !levelsCompleted.includes(nextLevel)) {
                levelsCompleted.push(nextLevel.toString());
            }
            userCoins += 10;
            const users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[currentUser]) {
                users[currentUser].coins = userCoins;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem(`progress_${currentUser}`, JSON.stringify(levelsCompleted));
            }
        }
        setTimeout(() => location.href = "auth.html", 500);
    }
}

function showModal(question) {
    document.getElementById("question").textContent = question;
    document.getElementById("answer").value = "";
    document.getElementById("answer").placeholder = languages[currentLang].placeholder;
    document.getElementById("error-message").style.display = "none";
    modal.style.display = "flex";
    document.querySelector(".modal-content").style.display = "block";
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === currentElement.answer.toLowerCase()) {
        collected.push(currentElement.name);
        updateScore();
        modal.style.display = "none";
        draw();
    } else {
        document.getElementById("error-message").style.display = "block";
    }
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) scoreElement.textContent = collected.length;
    const coinsElement = document.getElementById("coins");
    if (coinsElement) coinsElement.textContent = userCoins;
}

function move(dir) {
    const step = 20;
    if (dir === "left" && player.x - step >= 0) player.x -= step;
    if (dir === "right" && player.x + step <= canvas.width - player.size) player.x += step;
    if (dir === "up" && player.y - step >= 0) player.y -= step;
    if (dir === "down" && player.y + step <= canvas.height - player.size) player.y += step;
    draw();
}

function resizeCanvas() {
    canvas.width = window.innerWidth > 768 ? window.innerWidth - 250 : window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
    if (currentLevel.startsWith("custom_")) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        const levelId = currentLevel.replace("custom_", "");
        const customLevel = users[currentUser].customLevels.find(l => l.id === parseInt(levelId));
        if (customLevel) {
            elements = customLevel.questions[currentLang].map((q, i) => ({
                name: q.name,
                x: (customLevel.questions.x[i] || 0) * (canvas.width / 100),
                y: (customLevel.questions.y[i] || 0) * (canvas.height / 100),
                color: getRandomColor(),
                shape: "circle",
                question: q.text,
                answer: q.name
            }));
        }
    } else {
        const levelNum = parseInt(currentLevel);
        if (standardLevels[levelNum]) {
            elements = standardLevels[levelNum].map(e => ({
                name: e.name,
                x: e.x,
                y: e.y,
                color: e.color,
                shape: e.shape,
                question: e.question[currentLang],
                answer: e.answer[currentLang]
            }));
        }
    }
    draw();
}

window.addEventListener("resize", resizeCanvas);
document.addEventListener("keydown", e => {
    if (modal.style.display === "none") {
        if (e.key === "ArrowLeft") move("left");
        if (e.key === "ArrowRight") move("right");
        if (e.key === "ArrowUp") move("up");
        if (e.key === "ArrowDown") move("down");
    }
});

window.onclick = e => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.querySelector(".modal-content").style.display = "none";
        document.getElementById("error-message").style.display = "none";
    }
};

window.addEventListener("storage", e => {
    if (e.key === "gameLanguage") updateLanguage();
});

player.image.onload = init;
player.image.onerror = init;