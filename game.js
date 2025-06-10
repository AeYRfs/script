let currentLang = localStorage.getItem("gameLanguage") || "en";
const validLanguages = ["en", "ru"];
if (!validLanguages.includes(currentLang)) {
    currentLang = "en";
    localStorage.setItem("gameLanguage", "en");
}

const languages = {
    en: {
        quit: "Quit",
        score: "Score",
        settings: "Settings",
        controls: { left: "⬅️ LEFT", right: "➡️ RIGHT", up: "⬆️ UP", down: "⬇️ DOWN" },
        questionLabel: "Question:",
        placeholder: "Write your answer",
        wrong: "Wrong answer! Check the hint below.",
        send: "Send",
        level: "Level",
        hint: "Hint"
    },
    ru: {
        quit: "Выйти",
        score: "Счёт",
        settings: "Настройки",
        controls: { left: "⬅️ ВЛЕВО", right: "➡️ ВПРАВО", up: "⬆️ ВВЕРХ", down: "⬇️ ВНИЗ" },
        questionLabel: "Вопрос:",
        placeholder: "Введите ответ",
        wrong: "Неправильный ответ! Проверьте подсказку ниже.",
        send: "Отправить",
        level: "Уровень",
        hint: "Подсказка"
    }
};

let elements = [];
const collected = [];
let currentElement = null;
const currentUser = localStorage.getItem("currentUser");
let levelsCompleted = [];
const currentLevel = localStorage.getItem("currentLevel");
let userCoins = 0;
let isLevelCompleted = false;

const standardLevels = {
    1: [
        { name: "H2O", x: 100, y: 150, color: "#2ca02c", shape: "circle", question: { en: "What is H2O called?", ru: "Как называется H2O?" }, answer: { en: "water", ru: "вода" }, hint: { en: "Common liquid essential for life", ru: "Обычная жидкость, необходимая для жизни" } },
        { name: "CO2", x: 120, y: 100, color: "#ff7f0e", shape: "circle", question: { en: "What is CO2 called?", ru: "Как называется CO2?" }, answer: { en: "carbon dioxide", ru: "углекислый газ" }, hint: { en: "Gas produced by respiration", ru: "Газ, выделяемый при дыхании" } },
        { name: "O2", x: 150, y: 200, color: "#d62728", shape: "circle", question: { en: "What is O2 called?", ru: "Как называется O2?" }, answer: { en: "oxygen", ru: "кислород" }, hint: { en: "Gas essential for breathing", ru: "Газ, необходимый для дыхания" } },
        { name: "N2", x: 200, y: 120, color: "#17becf", shape: "circle", question: { en: "What is N2 called?", ru: "Как называется N2?" }, answer: { en: "nitrogen", ru: "азот" }, hint: { en: "Most abundant gas in the atmosphere", ru: "Наиболее распространённый газ в атмосфере" } },
        { name: "CH4", x: 180, y: 160, color: "#1f77b4", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" }, hint: { en: "Main component of natural gas", ru: "Основной компонент природного газа" } }
    ],
    2: [
        { name: "NaCl", x: 20, y: 140, color: "#d62728", shape: "circle", question: { en: "What is NaCl called?", ru: "Как называется NaCl?" }, answer: { en: "salt", ru: "соль" }, hint: { en: "Common table seasoning", ru: "Обычная пищевая приправа" } },
        { name: "Na", x: 130, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Na called?", ru: "Как называется Na?" }, answer: { en: "sodium", ru: "натрий" }, hint: { en: "Soft, reactive metal", ru: "Мягкий, реактивный металл" } },
        { name: "K", x: 160, y: 100, color: "#2ca02c", shape: "circle", question: { en: "What is K called?", ru: "Как называется K?" }, answer: { en: "potassium", ru: "калий" }, hint: { en: "Metal found in bananas", ru: "Металл, содержащийся в бананах" } },
        { name: "Cl2", x: 80, y: 180, color: "#ff7f0e", shape: "circle", question: { en: "What is Cl2 called?", ru: "Как называется Cl2?" }, answer: { en: "chlorine", ru: "хлор" }, hint: { en: "Greenish gas used in disinfectants", ru: "Зеленоватый газ, используемый в дезинфицирующих средствах" } },
        { name: "H2", x: 200, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is H2 called?", ru: "Как называется H2?" }, answer: { en: "hydrogen", ru: "водород" }, hint: { en: "Lightest element, used in balloons", ru: "Самый лёгкий элемент, используется в воздушных шарах" } },
        { name: "SO2", x: 140, y: 200, color: "#8c564b", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" }, hint: { en: "Gas with a pungent smell", ru: "Газ с резким запахом" } },
        { name: "NH3", x: 90, y: 110, color: "#e377c2", shape: "circle", question: { en: "What is NH3 called?", ru: "Как называется NH3?" }, answer: { en: "ammonia", ru: "аммиак" }, hint: { en: "Gas used in cleaning products", ru: "Газ, используемый в моющих средствах" } }
    ],
    3: [
        { name: "OH", x: 50, y: 200, color: "#ff7f0e", shape: "circle", question: { en: "What is OH called?", ru: "Как называется OH?" }, answer: { en: "hydroxide", ru: "гидроксид" }, hint: { en: "Ion found in bases", ru: "Ион, содержащийся в основаниях" } },
        { name: "O²", x: 200, y: 150, color: "#d62728", shape: "circle", question: { en: "What is O² called?", ru: "Как называется O²?" }, answer: { en: "oxide", ru: "оксид" }, hint: { en: "Ion common in metal compounds", ru: "Ион, распространённый в соединениях металлов" } },
        { name: "HCl", x: 80, y: 120, color: "#1f77b4", shape: "circle", question: { en: "What is HCl called?", ru: "Как называется HCl?" }, answer: { en: "hydrochloric acid", ru: "соляная кислота" }, hint: { en: "Acid used in stomach digestion", ru: "Кислота, используемая в пищеварении" } },
        { name: "Ca", x: 150, y: 180, color: "#9467bd", shape: "circle", question: { en: "What is Ca called?", ru: "Как называется Ca?" }, answer: { en: "calcium", ru: "кальций" }, hint: { en: "Element essential for bones", ru: "Элемент, необходимый для костей" } },
        { name: "Mg", x: 110, y: 140, color: "#8c564b", shape: "circle", question: { en: "What is Mg called?", ru: "Как называется Mg?" }, answer: { en: "magnesium", ru: "магний" }, hint: { en: "Metal that burns brightly", ru: "Металл, который ярко горит" } },
        { name: "Fe", x: 170, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is Fe called?", ru: "Как называется Fe?" }, answer: { en: "iron", ru: "железо" }, hint: { en: "Metal used in steel production", ru: "Металл, используемый в производстве стали" } },
        { name: "Al", x: 130, y: 190, color: "#7f7f7f", shape: "circle", question: { en: "What is Al called?", ru: "Как называется Al?" }, answer: { en: "aluminum", ru: "алюминий" }, hint: { en: "Light metal used in cans", ru: "Лёгкий металл, используемый в банках" } },
        { name: "HNO3", x: 90, y: 130, color: "#bcbd22", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 140, y: 170, color: "#17becf", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } }
    ],
    4: [
        { name: "HCl", x: 80, y: 120, color: "#1f77b4", shape: "circle", question: { en: "What is HCl called?", ru: "Как называется HCl?" }, answer: { en: "hydrochloric acid", ru: "соляная кислота" }, hint: { en: "Acid used in stomach digestion", ru: "Кислота, используемая в пищеварении" } },
        { name: "NH3", x: 150, y: 180, color: "#9467bd", shape: "circle", question: { en: "What is NH3 called?", ru: "Как называется NH3?" }, answer: { en: "ammonia", ru: "аммиак" }, hint: { en: "Gas used in cleaning products", ru: "Газ, используемый в моющих средствах" } },
        { name: "CH4", x: 90, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" }, hint: { en: "Main component of natural gas", ru: "Основной компонент природного газа" } },
        { name: "SO2", x: 140, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" }, hint: { en: "Gas with a pungent smell", ru: "Газ с резким запахом" } },
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" }, hint: { en: "Compound used in fertilizers", ru: "Соединение, используемое в удобрениях" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" }, hint: { en: "Found in limestone and chalk", ru: "Содержится в известняке и меле" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" }, hint: { en: "Strong acid used in batteries", ru: "Сильная кислота, используемая в батареях" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" }, hint: { en: "Brown gas contributing to air pollution", ru: "Коричневый газ, способствующий загрязнению воздуха" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" }, hint: { en: "Sugar used in energy production", ru: "Сахар, используемый для выработки энергии" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } }
    ],
    5: [
        { name: "CH4", x: 90, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" }, hint: { en: "Main component of natural gas", ru: "Основной компонент природного газа" } },
        { name: "SO2", x: 140, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" }, hint: { en: "Gas with a pungent smell", ru: "Газ с резким запахом" } },
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" }, hint: { en: "Compound used in fertilizers", ru: "Соединение, используемое в удобрениях" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" }, hint: { en: "Found in limestone and chalk", ru: "Содержится в известняке и меле" } },
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" }, hint: { en: "Rust is a form of this compound", ru: "Ржавчина - это форма этого соединения" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" }, hint: { en: "Strong acid used in batteries", ru: "Сильная кислота, используемая в батареях" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" }, hint: { en: "Brown gas contributing to air pollution", ru: "Коричневый газ, способствующий загрязнению воздуха" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" }, hint: { en: "Sugar used in energy production", ru: "Сахар, используемый для выработки энергии" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } }
    ],
    6: [
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" }, hint: { en: "Compound used in fertilizers", ru: "Соединение, используемое в удобрениях" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" }, hint: { en: "Found in limestone and chalk", ru: "Содержится в известняке и меле" } },
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" }, hint: { en: "Rust is a form of this compound", ru: "Ржавчина - это форма этого соединения" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" }, hint: { en: "Strong acid used in batteries", ru: "Сильная кислота, используемая в батареях" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" }, hint: { en: "Brown gas contributing to air pollution", ru: "Коричневый газ, способствующий загрязнению воздуха" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" }, hint: { en: "Sugar used in energy production", ru: "Сахар, используемый для выработки энергии" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" }, hint: { en: "Used as a disinfectant", ru: "Используется как дезинфицирующее средство" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" }, hint: { en: "Gas known as laughing gas", ru: "Газ, известный как веселящий газ" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" }, hint: { en: "Base used in soap production", ru: "Основание, используемое в производстве мыла" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" }, hint: { en: "Also known as quicklime", ru: "Также известен как негашёная известь" } }
    ],
    7: [
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" }, hint: { en: "Rust is a form of this compound", ru: "Ржавчина - это форма этого соединения" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" }, hint: { en: "Strong acid used in batteries", ru: "Сильная кислота, используемая в батареях" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" }, hint: { en: "Brown gas contributing to air pollution", ru: "Коричневый газ, способствующий загрязнению воздуха" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" }, hint: { en: "Sugar used in energy production", ru: "Сахар, используемый для выработки энергии" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" }, hint: { en: "Used as a disinfectant", ru: "Используется как дезинфицирующее средство" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" }, hint: { en: "Gas known as laughing gas", ru: "Газ, известный как веселящий газ" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" }, hint: { en: "Base used in soap production", ru: "Основание, используемое в производстве мыла" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" }, hint: { en: "Also known as quicklime", ru: "Также известен как негашёная известь" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" }, hint: { en: "Used in sulfuric acid production", ru: "Используется в производстве серной кислоты" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" }, hint: { en: "Acid used in soft drinks", ru: "Кислота, используемая в газированных напитках" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" }, hint: { en: "Also known as washing soda", ru: "Также известен как сода для стирки" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" }, hint: { en: "Used in water treatment", ru: "Используется в очистке воды" } }
    ],
    8: [
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" }, hint: { en: "Brown gas contributing to air pollution", ru: "Коричневый газ, способствующий загрязнению воздуха" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" }, hint: { en: "Sugar used in energy production", ru: "Сахар, используемый для выработки энергии" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" }, hint: { en: "Used as a disinfectant", ru: "Используется как дезинфицирующее средство" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" }, hint: { en: "Gas known as laughing gas", ru: "Газ, известный как веселящий газ" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" }, hint: { en: "Base used in soap production", ru: "Основание, используемое в производстве мыла" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" }, hint: { en: "Also known as quicklime", ru: "Также известен как негашёная известь" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" }, hint: { en: "Used in sulfuric acid production", ru: "Используется в производстве серной кислоты" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" }, hint: { en: "Acid used in soft drinks", ru: "Кислота, используемая в газированных напитках" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" }, hint: { en: "Also known as washing soda", ru: "Также известен как сода для стирки" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" }, hint: { en: "Used in water treatment", ru: "Используется в очистке воды" } },
        { name: "CuO", x: 100, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuO called?", ru: "Как называется CuO?" }, answer: { en: "copper oxide", ru: "оксид меди" }, hint: { en: "Black solid used in ceramics", ru: "Чёрное твёрдое вещество, используемое в керамике" } },
        { name: "ZnO", x: 130, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnO called?", ru: "Как называется ZnO?" }, answer: { en: "zinc oxide", ru: "оксид цинка" }, hint: { en: "Used in sunscreen", ru: "Используется в солнцезащитных кремах" } },
        { name: "K2CO3", x: 160, y: 180, color: "#d62728", shape: "circle", question: { en: "What is K2CO3 called?", ru: "Как называется K2CO3?" }, answer: { en: "potassium carbonate", ru: "карбонат калия" }, hint: { en: "Used in glass production", ru: "Используется в производстве стекла" } },
        { name: "HBr", x: 120, y: 200, color: "#17becf", shape: "circle", question: { en: "What is HBr called?", ru: "Как называется HBr?" }, answer: { en: "hydrobromic acid", ru: "бромоводородная кислота" }, hint: { en: "Acid similar to HCl", ru: "Кислота, похожая на HCl" } }
    ],
    9: [
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" }, hint: { en: "White solid used in antacids", ru: "Белое твёрдое вещество, используемое в антацидах" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" }, hint: { en: "Compound used in abrasives", ru: "Соединение, используемое в абразивах" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" }, hint: { en: "Used as a disinfectant", ru: "Используется как дезинфицирующее средство" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" }, hint: { en: "Gas known as laughing gas", ru: "Газ, известный как веселящий газ" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" }, hint: { en: "Base used in soap production", ru: "Основание, используемое в производстве мыла" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" }, hint: { en: "Also known as quicklime", ru: "Также известен как негашёная известь" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" }, hint: { en: "Used in sulfuric acid production", ru: "Используется в производстве серной кислоты" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" }, hint: { en: "Acid used in soft drinks", ru: "Кислота, используемая в газированных напитках" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" }, hint: { en: "Also known as washing soda", ru: "Также известен как сода для стирки" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" }, hint: { en: "Used in water treatment", ru: "Используется в очистке воды" } },
        { name: "CuO", x: 100, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuO called?", ru: "Как называется CuO?" }, answer: { en: "copper oxide", ru: "оксид меди" }, hint: { en: "Black solid used in ceramics", ru: "Чёрное твёрдое вещество, используемое в керамике" } },
        { name: "ZnO", x: 130, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnO called?", ru: "Как называется ZnO?" }, answer: { en: "zinc oxide", ru: "оксид цинка" }, hint: { en: "Used in sunscreen", ru: "Используется в солнцезащитных кремах" } },
        { name: "K2CO3", x: 160, y: 180, color: "#d62728", shape: "circle", question: { en: "What is K2CO3 called?", ru: "Как называется K2CO3?" }, answer: { en: "potassium carbonate", ru: "карбонат калия" }, hint: { en: "Used in glass production", ru: "Используется в производстве стекла" } },
        { name: "HBr", x: 120, y: 200, color: "#17becf", shape: "circle", question: { en: "What is HBr called?", ru: "Как называется HBr?" }, answer: { en: "hydrobromic acid", ru: "бромоводородная кислота" }, hint: { en: "Acid similar to HCl", ru: "Кислота, похожая на HCl" } },
        { name: "H2CO3", x: 80, y: 150, color: "#1f77b4", shape: "circle", question: { en: "What is H2CO3 called?", ru: "Как называется H2CO3?" }, answer: { en: "carbonic acid", ru: "угольная кислота" }, hint: { en: "Formed when CO2 dissolves in water", ru: "Образуется при растворении CO2 в воде" } },
        { name: "NH4Cl", x: 140, y: 170, color: "#9467bd", shape: "circle", question: { en: "What is NH4Cl called?", ru: "Как называется NH4Cl?" }, answer: { en: "ammonium chloride", ru: "хлорид аммония" }, hint: { en: "Used in batteries and fertilizers", ru: "Используется в батареях и удобрениях" } },
        { name: "MgCl2", x: 110, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is MgCl2 called?", ru: "Как называется MgCl2?" }, answer: { en: "magnesium chloride", ru: "хлорид магния" }, hint: { en: "Used in de-icing roads", ru: "Используется для удаления льда с дорог" } },
        { name: "CaSO4", x: 150, y: 190, color: "#e377c2", shape: "circle", question: { en: "What is CaSO4 called?", ru: "Как называется CaSO4?" }, answer: { en: "calcium sulfate", ru: "сульфат кальция" }, hint: { en: "Found in gypsum", ru: "Содержится в гипсе" } }
    ],
    10: [
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" }, hint: { en: "Acid used in fertilizers", ru: "Кислота, используемая в удобрениях" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" }, hint: { en: "Strong base used in soap making", ru: "Сильное основание, используемое в производстве мыла" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" }, hint: { en: "Colorless, odorless toxic gas", ru: "Бесцветный газ без запаха, токсичный" } },
        {