const currentLang = localStorage.getItem("gameLanguage") || "en";
const currentUser = localStorage.getItem("currentUser");

const supportLanguages = {
    en: {
        title: "Support",
        placeholder: "Type your message...",
        back: "Back to Settings",
        botNickname: "SupportBot",
        botGreeting: "Hello! I'm here to help with any issues or questions about the game. What can I assist you with?",
        botResponses: {
            greetings: ["Hello!", "Hi there!", "Hey, what's up?"],
            help: "Could you please describe your issue in detail? I'm here to assist with game settings, bugs, or any other questions!",
            bug: "Sorry to hear about a bug! Please describe what happened, and I'll guide you through possible solutions.",
            crash: "It sounds like the game is crashing. Try restarting the game, updating your drivers, or reinstalling it. Can you tell me more about when it happens?",
            bugAndCrash: "It seems you're experiencing both bugs and crashes. Let's tackle this step by step. First, try restarting the game and updating your drivers. Can you describe the bug in more detail?",
            settings: "Need help with settings? You can change language, controls, or other preferences in the Settings menu. What's the specific issue?",
            language: "You can change the game language in the Settings menu. Currently supported languages are English and Russian. Need help with this?",
            performance: "If the game is running slowly, try lowering graphics settings or closing background apps. Can you share more details about the issue?",
            performanceAndCrash: "It sounds like you're facing performance issues and crashes. First, try lowering your graphics settings and closing background apps. Also, ensure your drivers are up to date. Can you tell me more?",
            account: "For account-related issues, check your login credentials or reset your password if needed. Can you specify the problem?",
            purchase: "If you're having trouble with a purchase, ensure your payment method is valid and try again. You can also contact the support team for billing issues. What's the issue?",
            default: "I'm not sure I understand. Could you provide more details about your question or issue?"
        }
    },
    ru: {
        title: "Поддержка",
        placeholder: "Введите ваше сообщение...",
        back: "Вернуться к настройкам",
        botNickname: "БотПоддержки",
        botGreeting: "Здравствуйте! Я здесь, чтобы помочь с любыми вопросами или проблемами в игре. Чем могу помочь?",
        botResponses: {
            greetings: ["Здравствуйте!", "Привет!", "Добрый день!"],
            help: "Пожалуйста, опишите вашу проблему подробнее. Я помогу с настройками, ошибками или любыми другими вопросами!",
            bug: "Жаль, что вы столкнулись с ошибкой! Опишите, что произошло, и я предложу возможные решения.",
            crash: "Похоже, игра вылетает. Попробуйте перезапустить игру, обновить драйверы или переустановить её. Можете рассказать, W когда это происходит?",
            bugAndCrash: "Похоже, у вас есть и ошибки, и вылеты. Давайте разберемся поэтапно. Сначала попробуйте перезапустить игру и обновить драйверы. Можете подробнее описать ошибку?",
            settings: "Нужна помощь с настройками? Вы можете изменить язык, управление или другие параметры в меню настроек. В чем конкретно проблема?",
            language: "Язык игры можно изменить в меню настроек. Поддерживаются русский и английский языки. Нужна помощь с этим?",
            performance: "Если игра работает медленно, попробуйте снизить настройки графики или закрыть фоновые приложения. Можете поделиться подробностями проблемы?",
            performanceAndCrash: "Похоже, у вас проблемы с производительностью и вылетами. Попробуйте снизить настройки графики и закрыть фоновые приложения, а также обновить драйверы. Можете рассказать больше?",
            account: "Если у вас проблемы с аккаунтом, проверьте данные для входа или сбросьте пароль. В чем могу помочь?",
            purchase: "Если возникли проблемы с покупкой, убедитесь, что способ оплаты действителен, и попробуйте снова. Также можно обратиться в поддержку по вопросам оплаты. Какая у вас проблема?",
            default: "Не уверен, что понял ваш вопрос. Не могли бы вы описать проблему подробнее?"
        }
    }
};

function initSupport() {
    document.body.setAttribute("dir", "ltr");

    if (!currentUser) {
        document.body.innerHTML = `<p>${supportLanguages[currentLang].botResponses.account}</p>`;
        return;
    }

    const container = document.createElement("div");
    container.className = "support-container";
    container.innerHTML = `
        <div class="chat-container" id="chatContainer">
            <div class="message bot-message">
                <img class="avatar" src="icons/bot.jpg" alt="Bot Avatar">
                <div class="message-content">
                    <span class="nickname">${supportLanguages[currentLang].botNickname}</span>
                    <span class="message-text">${supportLanguages[currentLang].botGreeting}</span>
                </div>
            </div>
        </div>
        <div class="input-container">
            <input type="text" id="userInput" placeholder="${supportLanguages[currentLang].placeholder}">
            <button id="sendButton">
                <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
        <button class="back-button" id="backButton">${supportLanguages[currentLang].back}</button>
    `;
    document.body.appendChild(container);

    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    loadChatHistory(chatContainer);

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    document.getElementById("backButton").addEventListener("click", () => {
        location.href = "settings.html";
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        const userMessage = document.createElement("div");
        userMessage.className = "message user-message";
        userMessage.innerHTML = `
            <img class="avatar" src="" alt="User Avatar">
            <div class="message-content">
                <span class="message-text">${message}</span>
            </div>
        `;
        chatContainer.appendChild(userMessage);

        userInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;

        saveChatMessage({ type: "user", text: message });

        const typingIndicator = document.createElement("div");
        typingIndicator.className = "typing-indicator";
        typingIndicator.innerHTML = `
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        `;
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        setTimeout(() => {
            chatContainer.removeChild(typingIndicator);

            const botResponse = getBotResponse(message.toLowerCase());
            const botMessage = document.createElement("div");
            botMessage.className = "message bot-message";
            botMessage.innerHTML = `
                <img class="avatar" src="icons/bot.jpg" alt="Bot Avatar">
                <div class="message-content">
                    <span class="nickname">${supportLanguages[currentLang].botNickname}</span>
                    <span class="message-text">${botResponse}</span>
                </div>
            `;
            chatContainer.appendChild(botMessage);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            saveChatMessage({ type: "bot", text: botResponse, nickname: supportLanguages[currentLang].botNickname });
        }, 3000);
    }

    function getBotResponse(message) {
        const responses = supportLanguages[currentLang].botResponses;

        if (["hi", "hello", "hey", "привет", "здравствуйте"].some(g => message.includes(g))) {
            return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        }

        const hasHelp = message.includes("help") || message.includes("помощь");
        const hasBug = message.includes("bug") || message.includes("error") || message.includes("ошибка");
        const hasCrash = message.includes("crash") || message.includes("crashes") || message.includes("вылетает");
        const hasSettings = message.includes("settings") || message.includes("настройки");
        const hasLanguage = message.includes("language") || message.includes("язык");
        const hasPerformance = message.includes("performance") || message.includes("lag") || message.includes("slow") ||
            message.includes("производительность") || message.includes("лагает") || message.includes("медленно");
        const hasAccount = message.includes("account") || message.includes("login") || message.includes("аккаунт") || message.includes("вход");
        const hasPurchase = message.includes("purchase") || message.includes("buy") || message.includes("payment") ||
            message.includes("покупка") || message.includes("оплата") || message.includes("купить");

        if (hasBug && hasCrash) return responses.bugAndCrash;
        if (hasPerformance && hasCrash) return responses.performanceAndCrash;
        if (hasHelp) return responses.help;
        if (hasBug) return responses.bug;
        if (hasCrash) return responses.crash;
        if (hasSettings) return responses.settings;
        if (hasLanguage) return responses.language;
        if (hasPerformance) return responses.performance;
        if (hasAccount) return responses.account;
        if (hasPurchase) return responses.purchase;

        return responses.default;
    }

    function saveChatMessage(message) {
        const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${currentUser}`)) || [];
        chatHistory.push({
            Id: chatHistory.length + 1,
            Username: currentUser,
            Type: message.type,
            Text: message.text,
            Nickname: message.nickname || null,
            Timestamp: new Date().toISOString()
        });
        localStorage.setItem(`chatHistory_${currentUser}`, JSON.stringify(chatHistory));
        console.log('Saved chat message:', message);
    }

    function loadChatHistory(container) {
        const chatHistory = JSON.parse(localStorage.getItem(`chatHistory_${currentUser}`)) || [];
        chatHistory.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.className = `message ${msg.Type}-message`;
            if (msg.Type === "user") {
                messageDiv.innerHTML = `
                    <img class="avatar" src="" alt="User Avatar">
                    <div class="message-content">
                        <span class="message-text">${msg.Text}</span>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <img class="avatar" src="icons/bot.jpg" alt="Bot Avatar">
                    <div class="message-content">
                        <span class="nickname">${msg.Nickname}</span>
                        <span class="message-text">${msg.Text}</span>
                    </div>
                `;
            }
            container.appendChild(messageDiv);
        });
        container.scrollTop = container.scrollHeight;
    }
}

initSupport();
