let currentLang = localStorage.getItem("gameLanguage") || "en";
const currentUser = localStorage.getItem("currentUser");

const languages = {
    en: {
        achievementsTitle: "Achievements",
        quit: "Quit",
        coinCollector: "Coin Collector",
        coinCollectorDesc: "Collect 100 coins",
        levelMaster: "Level Master",
        levelMasterDesc: "Complete 5 levels",
        vipAchiever: "VIP Achiever",
        vipAchieverDesc: "Activate VIP status",
        quickLearner: "Quick Learner",
        quickLearnerDesc: "Complete any level with all correct answers on first try",
        unlocked: "Unlocked",
        locked: "Locked"
    },
    ru: {
        achievementsTitle: "Достижения",
        quit: "Выйти",
        coinCollector: "Собиратель монет",
        coinCollectorDesc: "Соберите 100 монет",
        levelMaster: "Мастер уровней",
        levelMasterDesc: "Пройдите 5 уровней",
        vipAchiever: "VIP Достигатель",
        vipAchieverDesc: "Активируйте VIP-статус",
        quickLearner: "Быстрый ученик",
        quickLearnerDesc: "Пройдите любой уровень, ответив правильно на все вопросы с первой попытки",
        unlocked: "Разблокировано",
        locked: "Заблокировано"
    }
};

const achievements = [
    { id: "coin_collector", name: "coinCollector", description: "coinCollectorDesc", condition: (user) => user.coins >= 100 },
    { id: "level_master", name: "levelMaster", description: "levelMasterDesc", condition: (user) => (JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || []).length >= 5 },
    { id: "vip_achiever", name: "vipAchiever", description: "vipAchieverDesc", condition: (user) => user.vip === true },
    { id: "quick_learner", name: "quickLearner", description: "quickLearnerDesc", condition: (user) => user.quickLearner === true }
];

function initAchievements() {
    if (!currentUser) {
        location.href = "auth.html";
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
    container.className = "achievements-container";
    container.innerHTML = `
        <header>
            <h1>${languages[currentLang].achievementsTitle}</h1>
            <button id="quitButton">${languages[currentLang].quit}</button>
        </header>
        <div class="achievements-list" id="achievementsList"></div>
    `;
    document.body.appendChild(container);

    const achievementsList = document.getElementById("achievementsList");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[currentUser] || {};

    achievements.forEach(achievement => {
        const isUnlocked = achievement.condition(user);
        const achievementElement = document.createElement("div");
        achievementElement.className = `achievement-container ${isUnlocked ? "unlocked" : ""}`;
        achievementElement.innerHTML = `
            <h3>${languages[currentLang][achievement.name]}</h3>
            <p>${languages[currentLang][achievement.description]}</p>
            <p class="status">${isUnlocked ? languages[currentLang].unlocked : languages[currentLang].locked}</p>
        `;
        achievementsList.appendChild(achievementElement);
    });

    document.getElementById("quitButton").addEventListener("click", () => {
        location.href = "auth.html";
    });
}

initAchievements();
