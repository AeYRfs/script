const settingsLanguages = {
    en: {
        title: "Settings",
        languageLabel: "Language:",
        save: "Save",
        support: "Support",
        back: "Back to Menu",
        backToGame: "Back to Game",
        saved: "Changes saved!",
        deleteAccount: "Delete Account",
        deleteConfirm: "Are you sure you want to delete your account?",
        deleteCountdown: "Account will be deleted in {seconds} seconds",
        deleteButton: "Delete",
        cancelButton: "Cancel",
        deleteChatHistory: "Delete Chat History",
        deleteChatConfirm: "Are you sure you want to delete your chat history?",
        deleteChatCountdown: "Chat history will be deleted in {seconds} seconds",
        deleteChatSuccess: "Chat history deleted successfully!"
    },
    ru: {
        title: "Настройки",
        languageLabel: "Язык:",
        save: "Сохранить",
        support: "Поддержка",
        back: "Вернуться в меню",
        backToGame: "Вернуться в игру",
        saved: "Изменения сохранены!",
        deleteAccount: "Удалить аккаунт",
        deleteConfirm: "Вы уверены, что хотите удалить аккаунт?",
        deleteCountdown: "Аккаунт будет удален через {seconds} секунд",
        deleteButton: "Удалить",
        cancelButton: "Отмена",
        deleteChatHistory: "Удалить историю чата",
        deleteChatConfirm: "Вы уверены, что хотите удалить историю чата?",
        deleteChatCountdown: "История чата будет удалена через {seconds} секунд",
        deleteChatSuccess: "История чата успешно удалена!"
    }
};

let currentLang = localStorage.getItem("gameLanguage") || "en";
let selectedLang = currentLang;
const currentUser = localStorage.getItem("currentUser");

function initSettings() {
    const validLanguages = ["en", "ru"];
    if (!validLanguages.includes(currentLang)) {
        currentLang = "en";
        selectedLang = "en";
        localStorage.setItem("gameLanguage", "en");
    }

    if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[currentUser]) {
            currentLang = users[currentUser].language || "en";
            selectedLang = currentLang;
            localStorage.setItem("gameLanguage", currentLang);
            console.log('User language loaded:', currentLang);
        }
    }

    document.body.setAttribute("dir", "ltr");
    document.body.innerHTML = "";

    const container = document.createElement("div");
    container.className = "settings-container";
    container.innerHTML = `
        <header>
            <h1>${settingsLanguages[currentLang].title}</h1>
        </header>
        <div class="parameters">
            <div class="settings-option">
                <label for="langSelect">${settingsLanguages[currentLang].languageLabel}</label>
                <select id="langSelect">
                    <option value="en" ${currentLang === "en" ? "selected" : ""}>English</option>
                    <option value="ru" ${currentLang === "ru" ? "selected" : ""}>Русский</option>
                </select>
            </div>
            <div class="settings-buttons">
                <button id="saveButton">${settingsLanguages[currentLang].save}</button>
                ${currentUser ? `
                    <button id="support">${settingsLanguages[currentLang].support}</button>
                    <button id="backToGameButton">${settingsLanguages[currentLang].backToGame}</button>
                    <button id="deleteAccountButton">${settingsLanguages[currentLang].deleteAccount}</button>
                    <button id="deleteChatHistoryButton">${settingsLanguages[currentLang].deleteChatHistory}</button>
                ` : ''}
                <button id="backButton">${settingsLanguages[currentLang].back}</button>
            </div>
        </div>
        <div class="modal" id="saveModal">
            <div class="modal-content">
                <p>${settingsLanguages[currentLang].saved}</p>
            </div>
        </div>
        ${currentUser ? `
        <div class="modal" id="deleteModal">
            <div class="modal-content">
                <p>${settingsLanguages[currentLang].deleteConfirm}</p>
                <p id="countdown">${settingsLanguages[currentLang].deleteCountdown.replace("{seconds}", "10")}</p>
                <div class="modal-buttons">
                    <button id="confirmDelete">${settingsLanguages[currentLang].deleteButton}</button>
                    <button id="cancelDelete">${settingsLanguages[currentLang].cancelButton}</button>
                </div>
            </div>
        </div>
        <div class="modal" id="deleteChatModal">
            <div class="modal-content">
                <p>${settingsLanguages[currentLang].deleteChatConfirm}</p>
                <p id="chatCountdown">${settingsLanguages[currentLang].deleteChatCountdown.replace("{seconds}", "10")}</p>
                <div class="modal-buttons">
                    <button id="confirmDeleteChat">${settingsLanguages[currentLang].deleteButton}</button>
                    <button id="cancelDeleteChat">${settingsLanguages[currentLang].cancelButton}</button>
                </div>
            </div>
        </div>
        <div class="modal" id="deleteChatSuccessModal">
            <div class="modal-content">
                <p>${settingsLanguages[currentLang].deleteChatSuccess}</p>
            </div>
        </div>
        ` : ''}
    `;
    document.body.appendChild(container);

    const langSelect = document.getElementById("langSelect");
    langSelect.addEventListener("change", () => {
        selectedLang = langSelect.value;
    });

    document.getElementById("saveButton").addEventListener("click", () => {
        currentLang = selectedLang;
        localStorage.setItem("gameLanguage", currentLang);
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[currentUser]) {
                users[currentUser].language = currentLang;
                localStorage.setItem("users", JSON.stringify(users));
                console.log('Language saved for user:', currentUser, currentLang);
            }
        }
        showModal("saveModal");
        setTimeout(() => {
            initSettings();
        }, 1500);
    });

    if (currentUser) {
        document.getElementById("support").addEventListener("click", () => {
            location.href = "support.html";
        });

        document.getElementById("backToGameButton").addEventListener("click", () => {
            location.href = "game.html";
        });

        document.getElementById("deleteAccountButton").addEventListener("click", () => {
            showDeleteConfirmation();
        });

        document.getElementById("deleteChatHistoryButton").addEventListener("click", () => {
            showDeleteChatConfirmation();
        });
    }

    document.getElementById("backButton").addEventListener("click", () => {
        location.href = "auth.html";
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
    }, 1500);
}

function showDeleteConfirmation() {
    const modal = document.getElementById("deleteModal");
    const countdownElement = document.getElementById("countdown");
    const confirmButton = document.getElementById("confirmDelete");
    const cancelButton = document.getElementById("cancelDelete");
    let seconds = 10;
    let countdownInterval;

    modal.style.display = "flex";

    countdownElement.textContent = settingsLanguages[currentLang].deleteCountdown.replace("{seconds}", seconds);
    countdownInterval = setInterval(() => {
        seconds--;
        if (seconds >= 0) {
            countdownElement.textContent = settingsLanguages[currentLang].deleteCountdown.replace("{seconds}", seconds);
        }
        if (seconds < 0) {
            clearInterval(countdownInterval);
            deleteAccount();
        }
    }, 1000);

    confirmButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        deleteAccount();
    }, { once: true });

    cancelButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        modal.style.display = "none";
    }, { once: true });
}

function showDeleteChatConfirmation() {
    const modal = document.getElementById("deleteChatModal");
    const countdownElement = document.getElementById("chatCountdown");
    const confirmButton = document.getElementById("confirmDeleteChat");
    const cancelButton = document.getElementById("cancelDeleteChat");
    let seconds = 10;
    let countdownInterval;

    modal.style.display = "flex";

    countdownElement.textContent = settingsLanguages[currentLang].deleteChatCountdown.replace("{seconds}", seconds);
    countdownInterval = setInterval(() => {
        seconds--;
        if (seconds >= 0) {
            countdownElement.textContent = settingsLanguages[currentLang].deleteChatCountdown.replace("{seconds}", seconds);
        }
        if (seconds < 0) {
            clearInterval(countdownInterval);
            deleteChatHistory();
        }
    }, 1000);

    confirmButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        deleteChatHistory();
    }, { once: true });

    cancelButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        modal.style.display = "none";
    }, { once: true });
}

function deleteAccount() {
    if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        delete users[currentUser];
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem(`progress_${currentUser}`);
        localStorage.removeItem(`chatHistory_${currentUser}`);
        localStorage.removeItem("currentUser");
        console.log('Account deleted:', currentUser);
    }
    location.href = "auth.html";
}

function deleteChatHistory() {
    if (currentUser) {
        localStorage.removeItem(`chatHistory_${currentUser}`);
        console.log('Chat history deleted for user:', currentUser);
        showModal("deleteChatSuccessModal");
        setTimeout(() => {
            initSettings();
        }, 1500);
    }
}

initSettings();