const languages = {
    en: {
        quit: "Quit",
        score: "Score",
        settings: "Settings",
        controls: { left: "⬅️ LEFT", right: "➡️ RIGHT", up: "⬆️ UP", down: "⬇️ DOWN" },
        questionLabel: "Question:",
        placeholder: "Write your answer",
        wrong: "Wrong, try again!",
        send: "Send"
    },
    ru: {
        quit: "Выйти",
        score: "Счёт",
        settings: "Настройки",
        controls: { left: "⬅️ ВЛЕВО", right: "➡️ ВПРАВО", up: "⬆️ ВВЕРХ", down: "⬇️ ВНИЗ" },
        questionLabel: "Вопрос:",
        placeholder: "Введите ответ",
        wrong: "Неправильно, попробуйте снова!",
        send: "Отправить"
    }
};

let currentLang = localStorage.getItem("gameLanguage") || "en";
const validLanguages = ["en", "ru"];
if (!validLanguages.includes(currentLang)) {
    currentLang = "en";
    localStorage.setItem("gameLanguage", "en");
}

let elements = [];
const collected = [];
let currentElement = null;
const currentUser = localStorage.getItem("currentUser");
let levelsCompleted = [];
const currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;

const levels = {
    1: [
        { 
            name: "H2O", x: 100, y: 150, color: "#2ca02c", shape: "circle", 
            question: { en: "What is H2O called?", ru: "Как называется H2O?" }, 
            answer: { en: "water", ru: "вода" } 
        },
        { 
            name: "CO2", x: 120, y: 100, color: "#ff7f0e", shape: "circle", 
            question: { en: "What is CO2 called?", ru: "Как называется CO2?" }, 
            answer: { en: "carbon dioxide", ru: "углекислый газ" } 
        }
    ],
    2: [
        { 
            name: "NaCl", x: 20, y: 140, color: "#d62728", shape: "circle", 
            question: { en: "What is NaCl called?", ru: "Как называется NaCl?" }, 
            answer: { en: "salt", ru: "соль" } 
        },
        { 
            name: "Na", x: 130, y: 170, color: "#17becf", shape: "circle", 
            question: { en: "What is Na called?", ru: "Как называется Na?" }, 
            answer: { en: "sodium", ru: "натрий" } 
        }
    ],
    3: [
        { 
            name: "OH", x: 50, y: 200, color: "#ff7f0e", shape: "circle", 
            question: { en: "What is OH called?", ru: "Как называется OH?" }, 
            answer: { en: "hydroxide", ru: "гидроксид" } 
        },
        { 
            name: "O²", x: 200, y: 150, color: "#d62728", shape: "circle", 
            question: { en: "What is O² called?", ru: "Как называется O²?" }, 
            answer: { en: "oxide", ru: "оксид" } 
        }
    ],
    4: [
        { 
            name: "HCl", x: 80, y: 120, color: "#1f77b4", shape: "circle", 
            question: { en: "What is HCl called?", ru: "Как называется HCl?" }, 
            answer: { en: "hydrochloric acid", ru: "соляная кислота" } 
        },
        { 
            name: "NH3", x: 150, y: 180, color: "#9467bd", shape: "circle", 
            question: { en: "What is NH3 called?", ru: "Как называется NH3?" }, 
            answer: { en: "ammonia", ru: "аммиак" } 
        }
    ],
    5: [
        { 
            name: "CH4", x: 90, y: 130, color: "#8c564b", shape: "circle", 
            question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, 
            answer: { en: "methane", ru: "метан" } 
        },
        { 
            name: "SO2", x: 140, y: 160, color: "#e377c2", shape: "circle", 
            question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, 
            answer: { en: "sulfur dioxide", ru: "диоксид серы" } 
        }
    ],
    6: [
        { 
            name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", 
            question: { en: "What is KCl called?", ru: "Как называется KCl?" }, 
            answer: { en: "potassium chloride", ru: "хлорид калия" } 
        },
        { 
            name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", 
            question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, 
            answer: { en: "calcium carbonate", ru: "карбонат кальция" } 
        }
    ],
    7: [
        { 
            name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", 
            question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, 
            answer: { en: "iron oxide", ru: "оксид железа" } 
        },
        { 
            name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", 
            question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, 
            answer: { en: "sulfuric acid", ru: "серная кислота" } 
        }
    ],
    8: [
        { 
            name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", 
            question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, 
            answer: { en: "nitrogen dioxide", ru: "диоксид азота" } 
        },
        { 
            name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", 
            question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, 
            answer: { en: "glucose", ru: "глюкоза" } 
        }
    ],
    9: [
        { 
            name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", 
            question: { en: "What is MgO called?", ru: "Как называется MgO?" }, 
            answer: { en: "magnesium oxide", ru: "оксид магния" } 
        },
        { 
            name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", 
            question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, 
            answer: { en: "aluminum oxide", ru: "оксид алюминия" } 
        }
    ],
    10: [
        { 
            name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", 
            question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, 
            answer: { en: "nitric acid", ru: "азотная кислота" } 
        },
        { 
            name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", 
            question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, 
            answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } 
        }
    ]
};

const canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
document.body.appendChild(canvas);
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
document.body.appendChild(modal);

const background = new Image();
background.src = "icons/background.jpg";
const player = {
    x: 50,
    y: 50,
    size: 100,
    image: new Image()
};
player.image.src = "icons/player.jpg";

function init() {
    if (!currentUser) {
        location.href = "auth.html";
        return;
    }

    levelsCompleted = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || [];

    document.body.innerHTML = "";
    document.body.appendChild(canvas);
    document.body.appendChild(modal);

    elements = levels[currentLevel].map(e => ({ ...e }));
    collected.length = 0;

    document.body.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

    const header = document.createElement("header");
    header.innerHTML = `
        <button onclick="location.href='settings.html';">${languages[currentLang].settings}</button>
        <button onclick="location.href='auth.html';">${languages[currentLang].quit}</button>
        <p>${languages[currentLang].score}: <span id="score">0</span>/${elements.length}</p>
    `;
    document.body.insertBefore(header, canvas);

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
}

function updateLanguage() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (currentUser && users[currentUser]) {
        currentLang = users[currentUser].language || "en";
        localStorage.setItem("gameLanguage", currentLang);
    }
    init();
    if (currentElement && modal.style.display === "flex") {
        showModal(currentElement.question[currentLang]);
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
    elements.forEach(el => {
        if (
            player.x < el.x + 30 &&
            player.x + player.size > el.x &&
            player.y < el.y + 30 &&
            player.y + player.size > el.y &&
            !collected.includes(el.name)
        ) {
            currentElement = el;
            showModal(el.question[currentLang]);
        }
    });

    if (collected.length === elements.length) {
        if (!levelsCompleted.includes(currentLevel)) {
            levelsCompleted.push(currentLevel);
            localStorage.setItem(`progress_${currentUser}`, JSON.stringify(levelsCompleted));
            console.log('Level completed:', currentLevel, 'Progress saved:', levelsCompleted);
        }
        location.href = "auth.html";
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
    if (userAnswer === currentElement.answer[currentLang].toLowerCase()) {
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
    if (scoreElement) {
        scoreElement.textContent = collected.length;
    }
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
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
    if (e.key === "gameLanguage") {
        updateLanguage();
    }
});

player.image.onload = () => {
    init();
};

player.image.onerror = () => {
    console.error("Failed to load player image");
    init();
};