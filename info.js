const guideData = {
    en: {
        H2O: { title: "H2O", content: "Water, a compound essential for life, formed by two hydrogen atoms and one oxygen atom." },
        CO2: { title: "CO2", content: "Carbon dioxide, a gas produced by respiration and combustion, used in photosynthesis." },
        O2: { title: "O2", content: "Oxygen, a diatomic gas vital for respiration in most living organisms." },
        N2: { title: "N2", content: "Nitrogen, a diatomic gas making up ~78% of Earth's atmosphere, chemically inert." },
        CH4: { title: "CH4", content: "Methane, a simple hydrocarbon and potent greenhouse gas, found in natural gas." },
        NaCl: { title: "NaCl", content: "Sodium chloride, commonly known as table salt, used in seasoning and preservation." },
        Na: { title: "Na", content: "Sodium, a highly reactive alkali metal, essential in biological processes." },
        K: { title: "K", content: "Potassium, an alkali metal crucial for nerve function and muscle contraction." },
        Cl2: { title: "Cl2", content: "Chlorine, a diatomic gas used in disinfection and chemical manufacturing." },
        H2: { title: "H2", content: "Hydrogen, the lightest diatomic gas, used in fuel and chemical synthesis." },
        SO2: { title: "SO2", content: "Sulfur dioxide, a gas from volcanic activity and industrial processes, contributes to acid rain." },
        NH3: { title: "NH3", content: "Ammonia, a pungent gas used in fertilizers and industrial applications." },
        OH: { title: "OH", content: "Hydroxide, an ion found in bases, important in acid-base chemistry." },
        O2: { title: "O2", content: "Oxide, a dianion of oxygen forming compounds with metals and nonmetals." },
        HCl: { title: "HCl", content: "Hydrochloric acid, a strong acid used in digestion and industrial processes." },
        Ca: { title: "Ca", content: "Calcium, a metal essential for bones, teeth, and muscle function." },
        Mg: { title: "Mg", content: "Magnesium, a metal vital for enzyme function and energy production." },
        Fe: { title: "Fe", content: "Iron, a metal crucial for hemoglobin and oxygen transport in blood." },
        Al: { title: "Al", content: "Aluminum, a lightweight, durable metal used in construction and packaging." },
        HNO3: { title: "HNO3", content: "Nitric acid, a strong acid used in fertilizers and explosives manufacturing." },
        NaOH: { title: "NaOH", content: "Sodium hydroxide, a strong base used in soap making and chemical synthesis." },
        KCl: { title: "KCl", content: "Potassium chloride, a salt used in medical treatments and as a fertilizer." },
        CaCO3: { title: "CaCO3", content: "Calcium carbonate, a compound in limestone, used in construction and antacids." },
        H2SO4: { title: "H2SO4", content: "Sulfuric acid, a highly corrosive acid used in batteries and fertilizers." },
        NO2: { title: "NO2", content: "Nitrogen dioxide, a reddish-brown gas contributing to air pollution." },
        C6H12O6: { title: "C6H12O6", content: "Glucose, a simple sugar and primary energy source for cells." },
        MgO: { title: "MgO", content: "Magnesium oxide, a white solid used in refractories and as an antacid." },
        Al2O3: { title: "Al2O3", content: "Aluminum oxide, a hard compound used in abrasives and ceramics." },
        Fe2O3: { title: "Fe2O3", content: "Iron(III) oxide, a red compound used in pigments and as a catalyst." },
        CO: { title: "CO", content: "Carbon monoxide, a toxic, colorless gas used in industrial processes." },
        H2O2: { title: "H2O2", content: "Hydrogen peroxide, an oxidizing agent used as a disinfectant and bleach." },
        N2O: { title: "N2O", content: "Nitrous oxide, a gas used as an anesthetic and in rocket propellants." },
        KOH: { title: "KOH", content: "Potassium hydroxide, a strong base used in soap and biodiesel production." },
        CaO: { title: "CaO", content: "Calcium oxide, or quicklime, used in cement and as a base in chemical reactions." },
        SO3: { title: "SO3", content: "Sulfur trioxide, a compound used in sulfuric acid production, contributes to acid rain." },
        H3PO4: { title: "H3PO4", content: "Phosphoric acid, used in fertilizers, food additives, and rust removal." },
        Na2CO3: { title: "Na2CO3", content: "Sodium carbonate, or soda ash, used in glass making and detergents." },
        FeCl3: { title: "FeCl3", content: "Iron(III) chloride, used in water treatment and as a catalyst." },
        CuO: { title: "CuO", content: "Copper(II) oxide, a black solid used in ceramics and as a pigment." },
        ZnO: { title: "ZnO", content: "Zinc oxide, a white powder used in sunscreens and as a pigment." },
        K2CO3: { title: "K2CO3", content: "Potassium carbonate, used in glass production and as a buffering agent." },
        HBr: { title: "HBr", content: "Hydrobromic acid, a strong acid used in organic synthesis." },
        H2CO3: { title: "H2CO3", content: "Carbonic acid, a weak acid formed in carbonated beverages." },
        NH4Cl: { title: "NH4Cl", content: "Ammonium chloride, used in fertilizers and as a flux in soldering." },
        MgCl2: { title: "MgCl2", content: "Magnesium chloride, a salt used in de-icing and dust control." },
        CaSO4: { title: "CaSO4", content: "Calcium sulfate, found in gypsum, used in plaster and drywall." },
        FeSO4: { title: "FeSO4", content: "Iron(II) sulfate, used in water treatment and as a nutrient supplement." },
        CuSO4: { title: "CuSO4", content: "Copper(II) sulfate, a blue crystal used in agriculture and electroplating." },
        ZnSO4: { title: "ZnSO4", content: "Zinc sulfate, used in fertilizers and as a dietary supplement." },
        NaClO: { title: "NaClO", content: "Sodium hypochlorite, the active ingredient in bleach, used for disinfection." },
        KClO3: { title: "KClO3", content: "Potassium chlorate, used in matches and explosives." },
        H2S: { title: "H2S", content: "Hydrogen sulfide, a toxic gas with a rotten egg smell, found in natural gas." }
    },
    ru: {
        H2O: { title: "H2O", content: "Вода, соединение, необходимое для жизни, состоит из двух атомов водорода и одного атома кислорода." },
        CO2: { title: "CO2", content: "Углекислый газ, выделяется при дыхании и сгорании, используется в фотосинтезе." },
        O2: { title: "O2", content: "Кислород, двухатомный газ, необходимый для дыхания большинства организмов." },
        N2: { title: "N2", content: "Азот, двухатомный газ, составляющий ~78% атмосферы Земли, химически инертен." },
        CH4: { title: "CH4", content: "Метан, простой углеводород и мощный парниковый газ, содержится в природном газе." },
        NaCl: { title: "NaCl", content: "Хлорид натрия, обычная поваренная соль, используется в приправах и консервации." },
        Na: { title: "Na", content: "Натрий, высокоактивный щелочной металл, важен для биологических процессов." },
        K: { title: "K", content: "Калий, щелочной металл, необходим для работы нервов и сокращения мышц." },
        Cl2: { title: "Cl2", content: "Хлор, двухатомный газ, используется для дезинфекции и в химической промышленности." },
        H2: { title: "H2", content: "Водород, самый лёгкий двухатомный газ, используется в топливе и химическом синтhubе." },
        SO2: { title: "SO2", content: "Диоксид серы, газ фрон вулканической активности и промышленности, вызывает кислотные дожди." },
        NH3: { title: "NH3", content: "Аммиак, газ с резким запахом, используется в удобрениях и промышленности." },
        OH: { title: "OH", content: "Гидроксид, ион, содержащийся в основаниях, важен в кислотно-основной химии." },
        O2: { title: "O2", content: "Оксид, дианион кислорода, образующий соединения с металлами и неметаллами." },
        HCl: { title: "HCl", content: "Соляная кислота, сильная кислота, используется в пищеварении и промышленности." },
        Ca: { title: "Ca", content: "Кальций, металл, необходим для костей, зубов и работы мышц." },
        Mg: { title: "Mg", content: "Магний, металл, важен для работы ферментов и производства энергии." },
        Fe: { title: "Fe", content: "Железо, металл, необходим для гемоглобина и транспорта кислорода в крови." },
        Al: { title: "Al", content: "Алюминий, лёгкий и прочный металл, используется в строительстве и упаковке." },
        HNO3: { title: "HNO3", content: "Азотная кислота, сильная кислота, используется в удобрениях и взрывчатых веществах." },
        NaOH: { title: "NaOH", content: "Гидроксид натрия, сильное основание, используется в производстве мыла и химическом синтезе." },
        KCl: { title: "KCl", content: "Хлорид калия, соль, используется в медицине и как удобрение." },
        CaCO3: { title: "CaCO3", content: "Карбонат кальция, содержится в известняке, используется в строительстве и антацидах." },
        H2SO4: { title: "H2SO4", content: "Серная кислота, высоко коррозийная кислота, используется в аккумуляторах и удобрениях." },
        NO2: { title: "NO2", content: "Диоксид азота, красно-коричневый газ, способствует загрязнению воздуха." },
        C6H12O6: { title: "C6H12O6", content: "Глюкоза, простой сахар, основной источник энергии для клеток." },
        MgO: { title: "MgO", content: "Оксид магния, белое твёрдое вещество, используется в огнеупорах и как антацид." },
        Al2O3: { title: "Al2O3", content: "Оксид алюминия, твёрдое соединение, используется в абразивах и керамике." },
        Fe2O3: { title: "Fe2O3", content: "Оксид железа(III), красное соединение, используется в пигментах и как катализатор." },
        CO: { title: "CO", content: "Угарный газ, токсичный бесцветный газ, используется в промышленности." },
        H2O2: { title: "H2O2", content: "Перекись водорода, окислитель, используется как дезинфицирующее средство и отбеливатель." },
        N2O: { title: "N2O", content: "Закись азота, газ, используемый как анестетик и в ракетных топливах." },
        KOH: { title: "KOH", content: "Гидроксид калия, сильное основание, используется в производстве мыла и биодизеля." },
        CaO: { title: "CaO", content: "Оксид кальция, или негашёная известь, используется в цементе и как основание." },
        SO3: { title: "SO3", content: "Триоксид серы, используется в производстве серной кислоты, вызывает кислотные дожди." },
        H3PO4: { title: "H3PO4", content: "Фосфорная кислота, используется в удобрениях, пищевых добавках и удалении ржавчины." },
        Na2CO3: { title: "Na2CO3", content: "Карбонат натрия, или сода, используется в производстве стекла и моющих средств." },
        FeCl3: { title: "FeCl3", content: "Хлорид железа(III), используется в очистке воды и как катализатор." },
        CuO: { title: "CuO", content: "Оксид меди(II), чёрное твёрдое вещество, используется в керамике и как пигмент." },
        ZnO: { title: "ZnO", content: "Оксид цинка, белый порошок, используется в солнцезащитных кремах и как пигмент." },
        K2CO3: { title: "K2CO3", content: "Карбонат калия, используется в производстве стекла и как буферный агент." },
        HBr: { title: "HBr", content: "Бромоводородная кислота, сильная кислота, используется в органическом синтезе." },
        H2CO3: { title: "H2CO3", content: "Угольная кислота, слабая кислота, содержится в газированных напитках." },
        NH4Cl: { title: "NH4Cl", content: "Хлорид аммония, используется в удобрениях и как флюс при пайке." },
        MgCl2: { title: "MgCl2", content: "Хлорид магния, соль, используется для борьбы с обледенением и пылью." },
        CaSO4: { title: "CaSO4", content: "Сульфат кальция, содержится в гипсе, используется в штукатурке и гипсокартоне." },
        FeSO4: { title: "FeSO4", content: "Сульфат железа(II), используется в очистке воды и как пищевая добавка." },
        CuSO4: { title: "CuSO4", content: "Сульфат меди(II), синие кристаллы, используются в сельском хозяйстве и гальванике." },
        ZnSO4: { title: "ZnSO4", content: "Сульфат цинка, используется в удобрениях и как пищевая добавка." },
        NaClO: { title: "NaClO", content: "Гипохлорит натрия, активный компонент отбеливателя, используется для дезинфекции." },
        KClO3: { title: "KClO3", content: "Хлорат калия, используется в спичках и взрывчатых веществах." },
        H2S: { title: "H2S", content: "Сероводород, токсичный газ с запахом тухлых яиц, содержится в природном газе." }
    }
};

let currentLang = localStorage.getItem("gameLanguage") || "en";
const validLanguages = ["en", "ru"];
if (!validLanguages.includes(currentLang)) {
    currentLang = "en";
    localStorage.setItem("gameLanguage", currentLang);
}

function renderLanguageSwitcher() {
    const switcher = document.getElementById("languageSwitcher");
    if (!switcher) {
        console.error("Element with ID 'languageSwitcher' not found.");
        return;
    }
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
    if (!buttonsDiv) {
        console.error("Element with ID 'guideButtons' not found.");
        return;
    }
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
    const firstButton = buttonsDiv.querySelector("button");
    if (firstButton) {
        firstButton.classList.add("active");
    }
}

function renderGuideContent(section) {
    const guideContent = document.getElementById("guideContent");
    if (!guideContent) {
        console.error("Element with ID 'guideContent' not found.");
        return;
    }
    guideContent.innerHTML = `
        <div class="guide-content active">
            <h2>${guideData[currentLang][section].title}</h2>
            <p>${guideData[currentLang][section].content}</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderLanguageSwitcher();
    renderGuideButtons();
    renderGuideContent(Object.keys(guideData[currentLang])[0]);
});