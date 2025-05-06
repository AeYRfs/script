const paymentLanguages = {
    en: {
        title: "Top Up Your Account",
        payButton: "Pay Now",
        backButton: "Back to Settings",
        success: "Payment successful! Added to your balance.",
        vipSuccess: "VIP status activated! You now earn 100 per hour and can create custom levels.",
        error: "Payment failed. Please try again later.",
        paymentMethodLabel: "Choose Payment Method:",
        smallSet: "Bronze Pack",
        mediumSet: "Silver Pack",
        largeSet: "Gold Pack",
        vipSet: "VIP Membership",
        vipDescription: "★ 100 per hour\n★ Create custom levels",
        processing: "Processing your payment...",
        purchased: "Purchased"
    },
    ru: {
        title: "Пополнить счёт",
        payButton: "Оплатить",
        backButton: "Вернуться в настройки",
        success: "Оплата прошла успешно! Добавлено на баланс.",
        vipSuccess: "VIP-статус активирован! Вы получаете 100 в час и можете создавать свои уровни.",
        error: "Ошибка оплаты. Попробуйте снова позже.",
        paymentMethodLabel: "Выберите способ оплаты:",
        smallSet: "Бронзовый набор",
        mediumSet: "Серебряный набор",
        largeSet: "Золотой набор",
        vipSet: "VIP-подписка",
        vipDescription: "★ 100 в час\n★ Создание своих уровней",
        processing: "Обработка платежа...",
        purchased: "Куплено"
    }
};

const paymentSets = [
    { name: "smallSet", coins: 100, price: 0.00, image: "icons/bronze-pack.jpg" },
    { name: "mediumSet", coins: 250, price: 0.00, image: "icons/silver-pack.jpg" },
    { name: "largeSet", coins: 500, price: 0.00, image: "icons/gold-pack.jpg" },
    { name: "vipSet", price: 0.00, image: "icons/vip-pack.jpg", description: "vipDescription" }
];

const paymentMethods = [
    { value: "credit_card", label: { en: "Credit Card", ru: "Кредитная карта" } },
    { value: "paypal", label: { en: "PayPal", ru: "PayPal" } },
    { value: "crypto", label: { en: "Cryptocurrency", ru: "Криптовалюта" } }
];

let currentLang = localStorage.getItem("gameLanguage") || "en";
const currentUser = localStorage.getItem("currentUser");
let selectedSet = null;
let selectedPaymentMethod = null;
let isVip = false;

function checkVipStatus() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    return users[currentUser] && users[currentUser].vip === true;
}

function startVipCoinAccrual() {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[currentUser] && users[currentUser].vip) {
        setInterval(() => {
            users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[currentUser] && users[currentUser].vip) {
                users[currentUser].coins = (users[currentUser].coins || 0) + 100;
                localStorage.setItem("users", JSON.stringify(users));
                console.log(`VIP: Added 100 coins to user: ${currentUser}. New balance: ${users[currentUser].coins}`);
            }
        }, 3600000);
    }
}

function initPayment() {
    if (!currentUser) {
        location.href = "auth.html";
        return;
    }

    const validLanguages = ["en", "ru"];
    if (!validLanguages.includes(currentLang)) {
        currentLang = "en";
        localStorage.setItem("gameLanguage", "en");
    }

    isVip = checkVipStatus();

    document.body.setAttribute("dir", "ltr");
    document.body.innerHTML = "";

    const container = document.createElement("div");
    container.className = "payment-container";
    container.innerHTML = `
        <header>
            <h1>${paymentLanguages[currentLang].title}</h1>
        </header>
        <div class="payment-sets" id="paymentSets"></div>
        <div class="payment-option">
            <label for="paymentMethod">${paymentLanguages[currentLang].paymentMethodLabel}</label>
            <select id="paymentMethod">
                <option value="" disabled selected>${currentLang === "en" ? "Select method" : "Выберите способ"}</option>
                ${paymentMethods.map(method => `
                    <option value="${method.value}">${method.label[currentLang]}</option>
                `).join('')}
            </select>
        </div>
        <div class="payment-buttons">
            <button id="payButton" disabled>${paymentLanguages[currentLang].payButton}</button>
            <button id="backButton">${paymentLanguages[currentLang].backButton}</button>
        </div>
        <div class="modal" id="successModal">
            <div class="modal-content">
                <p id="successMessage">${paymentLanguages[currentLang].success}</p>
            </div>
        </div>
        <div class="modal" id="errorModal">
            <div class="modal-content">
                <p>${paymentLanguages[currentLang].error}</p>
            </div>
        </div>
        <div class="modal" id="processingModal">
            <div class="modal-content">
                <p>${paymentLanguages[currentLang].processing}</p>
                <div class="spinner"></div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const setsContainer = document.getElementById("paymentSets");
    paymentSets.forEach(set => {
        const isPurchased = set.name === "vipSet" && isVip;
        const setElement = document.createElement("div");
        setElement.className = `set-container ${isPurchased ? "purchased" : ""}`;
        let content = `
            <img src="${set.image}" alt="${paymentLanguages[currentLang][set.name]}">
            <h3>${paymentLanguages[currentLang][set.name]}</h3>
        `;
        if (set.name === "vipSet") {
            content += `<p>${paymentLanguages[currentLang][set.description]}</p>`;
            content += isPurchased
                ? `<p class="status-price">${paymentLanguages[currentLang].purchased}</p>`
                : `<p class="status-price">$${set.price}</p>`;
        } else {
            content += `<p>${isPurchased 
                ? paymentLanguages[currentLang].purchased 
                : `${set.coins} <img src="icons/coin.jpg" alt="Coins" style="width: 24px; vertical-align: middle;"> - $${set.price}`}</p>`;
        }
        setElement.innerHTML = content;
        if (!isPurchased) {
            setElement.addEventListener("click", () => {
                selectedSet = set;
                updatePayButtonState();
                const allSets = document.querySelectorAll(".set-container");
                allSets.forEach(el => el.classList.remove("selected"));
                setElement.classList.add("selected");
            });
        }
        setsContainer.appendChild(setElement);
    });

    const paymentMethodSelect = document.getElementById("paymentMethod");
    paymentMethodSelect.addEventListener("change", () => {
        selectedPaymentMethod = paymentMethodSelect.value;
        updatePayButtonState();
    });

    document.getElementById("payButton").addEventListener("click", async () => {
        if (selectedSet && selectedPaymentMethod) {
            const payButton = document.getElementById("payButton");
            payButton.disabled = true;
            payButton.classList.add("loading");
            showModal("processingModal");

            try {
                const paymentSuccess = await processPayment(selectedSet, selectedPaymentMethod);
                if (paymentSuccess) {
                    let users = JSON.parse(localStorage.getItem("users")) || {};
                    if (!users[currentUser]) {
                        console.error(`User ${currentUser} not found in localStorage`);
                        showModal("errorModal");
                        return;
                    }
                    if (selectedSet.name === "vipSet") {
                        users[currentUser].vip = true;
                        document.getElementById("successMessage").textContent = paymentLanguages[currentLang].vipSuccess;
                        startVipCoinAccrual();
                    } else {
                        users[currentUser].coins = (users[currentUser].coins || 0) + selectedSet.coins;
                        document.getElementById("successMessage").textContent = paymentLanguages[currentLang].success.replace("Added", `${selectedSet.coins} <img src="icons/coin.jpg" alt="Coins" style="width: 24px; vertical-align: middle;"> Added`);
                    }
                    localStorage.setItem("users", JSON.stringify(users));
                    console.log(`Processed payment for user: ${currentUser}. VIP: ${users[currentUser].vip || false}, Coins: ${users[currentUser].coins || 0}`);
                    showModal("successModal");
                    setTimeout(() => {
                        location.href = "settings.html";
                    }, 1500);
                } else {
                    showModal("errorModal");
                }
            } catch (e) {
                console.error("Payment processing error:", e);
                showModal("errorModal");
            } finally {
                payButton.disabled = false;
                payButton.classList.remove("loading");
            }
        }
    });

    document.getElementById("backButton").addEventListener("click", () => {
        location.href = "settings.html";
    });

    startVipCoinAccrual();
}

function updatePayButtonState() {
    const payButton = document.getElementById("payButton");
    payButton.disabled = !(selectedSet && selectedPaymentMethod && !(selectedSet.name === "vipSet" && isVip));
}

async function processPayment(set, method) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isSuccess = Math.random() < 0.8;
            console.log(`Processing payment: ${method} for ${set.name} ($${set.price}) - ${isSuccess ? "Success" : "Failed"}`);
            resolve(isSuccess);
        }, 2000);
    });
}

function showModal(modalId) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => modal.style.display = "none");
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    if (modalId !== "processingModal") {
        setTimeout(() => {
            modal.style.display = "none";
        }, 1500);
    }
}

initPayment();
