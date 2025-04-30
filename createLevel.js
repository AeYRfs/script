const createLevelLanguages = {
    en: {
        title: "Create Level",
        nameLabelEn: "Level Name (English):",
        nameLabelRu: "Level Name (Russian):",
        difficultyLabel: "Difficulty:",
        backgroundLabel: "Canvas Background Image:",
        imageLabel: "Level Image:",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        questionTextEn: "Question Text (English):",
        questionTextRu: "Question Text (Russian):",
        questionNameEn: "Element Name (English):",
        questionNameRu: "Element Name (Russian):",
        questionX: "X Coordinate (0-100):",
        questionY: "Y Coordinate (0-100):",
        addQuestion: "Add Question",
        saveButton: "Save Level",
        backButton: "Back",
        deleteButton: "Delete",
        errorEmpty: "Please fill in all fields, including the image and background.",
        errorCoordinates: "Coordinates must be numbers between 0 and 100.",
        errorQuestions: "At least one question is required with all fields filled.",
        errorInvalidCharsEn: "Only Latin characters are allowed for English fields.",
        errorInvalidCharsRu: "Only Cyrillic characters are allowed for Russian fields.",
        success: "Level created successfully!",
        deleteSuccess: "Level deleted successfully!",
        questionsLabel: "Questions:"
    },
    ru: {
        title: "Создать уровень",
        nameLabelEn: "Название уровня (английский):",
        nameLabelRu: "Название уровня (русский):",
        difficultyLabel: "Сложность:",
        backgroundLabel: "Изображение фона канваса:",
        imageLabel: "Изображение уровня:",
        easy: "Легко",
        medium: "Средне",
        hard: "Сложно",
        questionTextEn: "Текст вопроса (английский):",
        questionTextRu: "Текст вопроса (русский):",
        questionNameEn: "Название элемента (английский):",
        questionNameRu: "Название элемента (русский):",
        questionX: "Координата X (0-100):",
        questionY: "Координата Y (0-100):",
        addQuestion: "Добавить вопрос",
        saveButton: "Сохранить уровень",
        backButton: "Назад",
        deleteButton: "Удалить",
        errorEmpty: "Пожалуйста, заполните все поля, включая изображение и фон.",
        errorCoordinates: "Координаты должны быть числами от 0 до 100.",
        errorQuestions: "Требуется хотя бы один вопрос с заполненными полями.",
        errorInvalidCharsEn: "Для английских полей разрешены только латинские символы.",
        errorInvalidCharsRu: "Для русских полей разрешены только кириллические символы.",
        success: "Уровень успешно создан!",
        deleteSuccess: "Уровень успешно удален!",
        questionsLabel: "Вопросы:"
    }
};

let currentLang = localStorage.getItem("gameLanguage") || "en";
const currentUser = localStorage.getItem("currentUser");
let tempQuestions = [];
let levelImage = null;
let backgroundImage = null;

function initCreateLevel() {
    if (!currentUser) {
        location.href = "auth.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[currentUser]?.vip) {
        location.href = "settings.html";
        return;
    }

    const validLanguages = ["en", "ru"];
    if (!validLanguages.includes(currentLang)) {
        currentLang = "en";
        localStorage.setItem("gameLanguage", "en");
    }

    document.body.setAttribute("dir", "ltr");
    document.body.innerHTML = "";

    const container = document.createElement("div");
    container.className = "create-level-container";
    container.innerHTML = `
        <header>
            <h1>${createLevelLanguages[currentLang].title}</h1>
        </header>
        <div class="form-group">
            <label for="levelNameEn">${createLevelLanguages[currentLang].nameLabelEn}</label>
            <input type="text" id="levelNameEn" autocomplete="off" oninput="restrictInput(this, 'en')">
        </div>
        <div class="form-group">
            <label for="levelNameRu">${createLevelLanguages[currentLang].nameLabelRu}</label>
            <input type="text" id="levelNameRu" autocomplete="off" oninput="restrictInput(this, 'ru')">
        </div>
        <div class="form-group">
            <label for="difficulty">${createLevelLanguages[currentLang].difficultyLabel}</label>
            <select id="difficulty">
                <option value="easy">${createLevelLanguages[currentLang].easy}</option>
                <option value="medium">${createLevelLanguages[currentLang].medium}</option>
                <option value="hard">${createLevelLanguages[currentLang].hard}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="backgroundImage">${createLevelLanguages[currentLang].backgroundLabel}</label>
            <input type="file" id="backgroundImage" accept="image/*">
        </div>
        <div class="form-group">
            <label for="levelImage">${createLevelLanguages[currentLang].imageLabel}</label>
            <input type="file" id="levelImage" accept="image/*">
        </div>
        <div class="question-container">
            <div class="question-fields" id="questionFields"></div>
            <button class="add-question" onclick="addQuestion()">${createLevelLanguages[currentLang].addQuestion}</button>
        </div>
        <div class="create-level-buttons">
            <button id="saveButton">${createLevelLanguages[currentLang].saveButton}</button>
            <button id="backButton">${createLevelLanguages[currentLang].backButton}</button>
        </div>
        <div class="created-levels" id="createdLevels"></div>
        <div class="modal" id="errorModal">
            <div class="modal-content">
                <p id="errorMessage"></p>
            </div>
        </div>
        <div class="modal" id="successModal">
            <div class="modal-content">
                <p id="successMessage"></p>
            </div>
        </div>
        <div class="modal" id="deleteSuccessModal">
            <div class="modal-content">
                <p id="deleteSuccessMessage"></p>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    document.getElementById("saveButton").addEventListener("click", saveLevel);
    document.getElementById("backButton").addEventListener("click", () => location.href = "settings.html");
    document.getElementById("levelImage").addEventListener("change", handleImageUpload);
    document.getElementById("backgroundImage").addEventListener("change", handleBackgroundImageUpload);

    renderCreatedLevels();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            levelImage = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        levelImage = null;
    }
}

function handleBackgroundImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            backgroundImage = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        backgroundImage = null;
    }
}

function addQuestion() {
    const questionFields = document.getElementById("questionFields");
    const questionIndex = tempQuestions.length;
    const questionEntry = document.createElement("div");
    questionEntry.className = "question-entry";
    questionEntry.innerHTML = `
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionTextEn}</label>
            <input type="text" id="questionTextEn_${questionIndex}" autocomplete="off" oninput="restrictInput(this, 'en')">
        </div>
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionNameEn}</label>
            <input type="text" id="questionNameEn_${questionIndex}" autocomplete="off" oninput="restrictInput(this, 'en')">
        </div>
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionTextRu}</label>
            <input type="text" id="questionTextRu_${questionIndex}" autocomplete="off" oninput="restrictInput(this, 'ru')">
        </div>
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionNameRu}</label>
            <input type="text" id="questionNameRu_${questionIndex}" autocomplete="off" oninput="restrictInput(this, 'ru')">
        </div>
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionX}</label>
            <input type="number" id="questionX_${questionIndex}" min="0" max="100" autocomplete="off">
        </div>
        <div class="form-group">
            <label>${createLevelLanguages[currentLang].questionY}</label>
            <input type="number" id="questionY_${questionIndex}" min="0" max="100" autocomplete="off">
        </div>
    `;
    questionFields.appendChild(questionEntry);
    tempQuestions.push({ en: { text: "", name: "" }, ru: { text: "", name: "" }, x: "", y: "" });
}

function restrictInput(input, lang) {
    if (lang === "en") {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
    } else if (lang === "ru") {
        input.value = input.value.replace(/[^а-яА-Я\s]/g, "");
    }
}

function saveLevel() {
    const nameEn = document.getElementById("levelNameEn").value.trim();
    const nameRu = document.getElementById("levelNameRu").value.trim();
    const difficulty = document.getElementById("difficulty").value;

    if (!nameEn || !nameRu || !difficulty || !levelImage || !backgroundImage) {
        showModal("errorModal", createLevelLanguages[currentLang].errorEmpty);
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nameEn)) {
        showModal("errorModal", createLevelLanguages[currentLang].errorInvalidCharsEn);
        return;
    }
    if (!/^[а-яА-Я\s]+$/.test(nameRu)) {
        showModal("errorModal", createLevelLanguages[currentLang].errorInvalidCharsRu);
        return;
    }

    const questions = { en: [], ru: [], x: [], y: [] };
    for (let i = 0; i < tempQuestions.length; i++) {
        const textEn = document.getElementById(`questionTextEn_${i}`)?.value.trim();
        const nameEn = document.getElementById(`questionNameEn_${i}`)?.value.trim();
        const textRu = document.getElementById(`questionTextRu_${i}`)?.value.trim();
        const nameRu = document.getElementById(`questionNameRu_${i}`)?.value.trim();
        const x = parseInt(document.getElementById(`questionX_${i}`)?.value);
        const y = parseInt(document.getElementById(`questionY_${i}`)?.value);

        if (!textEn || !nameEn || !textRu || !nameRu || isNaN(x) || isNaN(y)) {
            showModal("errorModal", createLevelLanguages[currentLang].errorEmpty);
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(textEn) || !/^[a-zA-Z\s]+$/.test(nameEn)) {
            showModal("errorModal", createLevelLanguages[currentLang].errorInvalidCharsEn);
            return;
        }
        if (!/^[а-яА-Я\s]+$/.test(textRu) || !/^[а-яА-Я\s]+$/.test(nameRu)) {
            showModal("errorModal", createLevelLanguages[currentLang].errorInvalidCharsRu);
            return;
        }

        if (x < 0 || x > 100 || y < 0 || y > 100) {
            showModal("errorModal", createLevelLanguages[currentLang].errorCoordinates);
            return;
        }

        questions.en.push({ text: textEn, name: nameEn });
        questions.ru.push({ text: textRu, name: nameRu });
        questions.x.push(x);
        questions.y.push(y);
    }

    if (tempQuestions.length === 0) {
        showModal("errorModal", createLevelLanguages[currentLang].errorQuestions);
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[currentUser]) {
        location.href = "auth.html";
        return;
    }

    const level = {
        id: Date.now(),
        name: { en: nameEn, ru: nameRu },
        difficulty,
        background: backgroundImage,
        image: levelImage,
        questions
    };

    users[currentUser].customLevels = users[currentUser].customLevels || [];
    users[currentUser].customLevels.push(level);
    localStorage.setItem("users", JSON.stringify(users));

    showModal("successModal", createLevelLanguages[currentLang].success);
    document.getElementById("levelNameEn").value = "";
    document.getElementById("levelNameRu").value = "";
    document.getElementById("difficulty").value = "easy";
    document.getElementById("backgroundImage").value = "";
    document.getElementById("levelImage").value = "";
    document.getElementById("questionFields").innerHTML = "";
    tempQuestions = [];
    levelImage = null;
    backgroundImage = null;
    renderCreatedLevels();
}

function renderCreatedLevels() {
    const createdLevelsDiv = document.getElementById("createdLevels");
    createdLevelsDiv.innerHTML = "";

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const customLevels = users[currentUser]?.customLevels || [];

    customLevels.forEach(level => {
        const card = document.createElement("div");
        card.className = "level-card";
        card.innerHTML = `
            <div class="level-info">
                <h3>${level.name[currentLang]}</h3>
                <p>${createLevelLanguages[currentLang].difficultyLabel} ${createLevelLanguages[currentLang][level.difficulty]}</p>
                <p>${createLevelLanguages[currentLang].questionsLabel} ${level.questions[currentLang].length}</p>
            </div>
            <button onclick="deleteLevel(${level.id})">${createLevelLanguages[currentLang].deleteButton}</button>
        `;
        createdLevelsDiv.appendChild(card);
    });
}

function deleteLevel(id) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[currentUser]) {
        users[currentUser].customLevels = users[currentUser].customLevels.filter(level => level.id !== id);
        localStorage.setItem("users", JSON.stringify(users));

        const completedLevels = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || [];
        const updatedCompletedLevels = completedLevels.filter(levelId => levelId !== `custom_${id}`);
        localStorage.setItem(`progress_${currentUser}`, JSON.stringify(updatedCompletedLevels));

        showModal("deleteSuccessModal", createLevelLanguages[currentLang].deleteSuccess);
        renderCreatedLevels();
    }
}

function showModal(modalId, message) {
    const modal = document.getElementById(modalId);
    document.getElementById(modalId === "errorModal" ? "errorMessage" : modalId === "successModal" ? "successMessage" : "deleteSuccessMessage").textContent = message;
    modal.style.display = "flex";
    setTimeout(() => modal.style.display = "none", 1500);
}

initCreateLevel();