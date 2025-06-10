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
            renderLanguageSwitcher();
            renderGuideButtons();
            renderGuideContent(Object.keys(guideData[currentLang])[0]);
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

renderLanguageSwitcher();
renderGuideButtons();
renderGuideContent(Object.keys(guideData[currentLang])[0]);