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
        wrong: "Wrong, try again!",
        send: "Send",
        level: "Level"
    },
    ru: {
        quit: "Выйти",
        score: "Счёт",
        settings: "Настройки",
        controls: { left: "⬅️ ВЛЕВО", right: "➡️ ВПРАВО", up: "⬆️ ВВЕРХ", down: "⬇️ ВНИЗ" },
        questionLabel: "Вопрос:",
        placeholder: "Введите ответ",
        wrong: "Неправильно, попробуйте снова!",
        send: "Отправить",
        level: "Уровень"
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
        { name: "H2O", x: 100, y: 150, color: "#2ca02c", shape: "circle", question: { en: "What is H2O called?", ru: "Как называется H2O?" }, answer: { en: "water", ru: "вода" } },
        { name: "CO2", x: 120, y: 100, color: "#ff7f0e", shape: "circle", question: { en: "What is CO2 called?", ru: "Как называется CO2?" }, answer: { en: "carbon dioxide", ru: "углекислый газ" } },
        { name: "O2", x: 150, y: 200, color: "#d62728", shape: "circle", question: { en: "What is O2 called?", ru: "Как называется O2?" }, answer: { en: "oxygen", ru: "кислород" } },
        { name: "N2", x: 200, y: 120, color: "#17becf", shape: "circle", question: { en: "What is N2 called?", ru: "Как называется N2?" }, answer: { en: "nitrogen", ru: "азот" } },
        { name: "CH4", x: 180, y: 160, color: "#1f77b4", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" } }
    ],
    2: [
        { name: "NaCl", x: 20, y: 140, color: "#d62728", shape: "circle", question: { en: "What is NaCl called?", ru: "Как называется NaCl?" }, answer: { en: "salt", ru: "соль" } },
        { name: "Na", x: 130, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Na called?", ru: "Как называется Na?" }, answer: { en: "sodium", ru: "натрий" } },
        { name: "K", x: 160, y: 100, color: "#2ca02c", shape: "circle", question: { en: "What is K called?", ru: "Как называется K?" }, answer: { en: "potassium", ru: "калий" } },
        { name: "Cl2", x: 80, y: 180, color: "#ff7f0e", shape: "circle", question: { en: "What is Cl2 called?", ru: "Как называется Cl2?" }, answer: { en: "chlorine", ru: "хлор" } },
        { name: "H2", x: 200, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is H2 called?", ru: "Как называется H2?" }, answer: { en: "hydrogen", ru: "водород" } },
        { name: "SO2", x: 140, y: 200, color: "#8c564b", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" } },
        { name: "NH3", x: 90, y: 110, color: "#e377c2", shape: "circle", question: { en: "What is NH3 called?", ru: "Как называется NH3?" }, answer: { en: "ammonia", ru: "аммиак" } }
    ],
    3: [
        { name: "OH", x: 50, y: 200, color: "#ff7f0e", shape: "circle", question: { en: "What is OH called?", ru: "Как называется OH?" }, answer: { en: "hydroxide", ru: "гидроксид" } },
        { name: "O²", x: 200, y: 150, color: "#d62728", shape: "circle", question: { en: "What is O² called?", ru: "Как называется O²?" }, answer: { en: "oxide", ru: "оксид" } },
        { name: "HCl", x: 80, y: 120, color: "#1f77b4", shape: "circle", question: { en: "What is HCl called?", ru: "Как называется HCl?" }, answer: { en: "hydrochloric acid", ru: "соляная кислота" } },
        { name: "Ca", x: 150, y: 180, color: "#9467bd", shape: "circle", question: { en: "What is Ca called?", ru: "Как называется Ca?" }, answer: { en: "calcium", ru: "кальций" } },
        { name: "Mg", x: 110, y: 140, color: "#8c564b", shape: "circle", question: { en: "What is Mg called?", ru: "Как называется Mg?" }, answer: { en: "magnesium", ru: "магний" } },
        { name: "Fe", x: 170, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is Fe called?", ru: "Как называется Fe?" }, answer: { en: "iron", ru: "железо" } },
        { name: "Al", x: 130, y: 190, color: "#7f7f7f", shape: "circle", question: { en: "What is Al called?", ru: "Как называется Al?" }, answer: { en: "aluminum", ru: "алюминий" } },
        { name: "HNO3", x: 90, y: 130, color: "#bcbd22", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 140, y: 170, color: "#17becf", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } }
    ],
    4: [
        { name: "HCl", x: 80, y: 120, color: "#1f77b4", shape: "circle", question: { en: "What is HCl called?", ru: "Как называется HCl?" }, answer: { en: "hydrochloric acid", ru: "соляная кислота" } },
        { name: "NH3", x: 150, y: 180, color: "#9467bd", shape: "circle", question: { en: "What is NH3 called?", ru: "Как называется NH3?" }, answer: { en: "ammonia", ru: "аммиак" } },
        { name: "CH4", x: 90, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" } },
        { name: "SO2", x: 140, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" } },
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } }
    ],
    5: [
        { name: "CH4", x: 90, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is CH4 called?", ru: "Как называется CH4?" }, answer: { en: "methane", ru: "метан" } },
        { name: "SO2", x: 140, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is SO2 called?", ru: "Как называется SO2?" }, answer: { en: "sulfur dioxide", ru: "диоксид серы" } },
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" } },
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } }
    ],
    6: [
        { name: "KCl", x: 110, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is KCl called?", ru: "Как называется KCl?" }, answer: { en: "potassium chloride", ru: "хлорид калия" } },
        { name: "CaCO3", x: 130, y: 190, color: "#bcbd22", shape: "circle", question: { en: "What is CaCO3 called?", ru: "Как называется CaCO3?" }, answer: { en: "calcium carbonate", ru: "карбонат кальция" } },
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" } }
    ],
    7: [
        { name: "Fe2O3", x: 100, y: 170, color: "#17becf", shape: "circle", question: { en: "What is Fe2O3 called?", ru: "Как называется Fe2O3?" }, answer: { en: "iron oxide", ru: "оксид железа" } },
        { name: "H2SO4", x: 160, y: 110, color: "#2ca02c", shape: "circle", question: { en: "What is H2SO4 called?", ru: "Как называется H2SO4?" }, answer: { en: "sulfuric acid", ru: "серная кислота" } },
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" } }
    ],
    8: [
        { name: "NO2", x: 120, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is NO2 called?", ru: "Как называется NO2?" }, answer: { en: "nitrogen dioxide", ru: "диоксид азота" } },
        { name: "C6H12O6", x: 80, y: 200, color: "#d62728", shape: "circle", question: { en: "What is C6H12O6 called?", ru: "Как называется C6H12O6?" }, answer: { en: "glucose", ru: "глюкоза" } },
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" } },
        { name: "CuO", x: 100, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuO called?", ru: "Как называется CuO?" }, answer: { en: "copper oxide", ru: "оксид меди" } },
        { name: "ZnO", x: 130, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnO called?", ru: "Как называется ZnO?" }, answer: { en: "zinc oxide", ru: "оксид цинка" } },
        { name: "K2CO3", x: 160, y: 180, color: "#d62728", shape: "circle", question: { en: "What is K2CO3 called?", ru: "Как называется K2CO3?" }, answer: { en: "potassium carbonate", ru: "карбонат калия" } },
        { name: "HBr", x: 120, y: 200, color: "#17becf", shape: "circle", question: { en: "What is HBr called?", ru: "Как называется HBr?" }, answer: { en: "hydrobromic acid", ru: "бромоводородная кислота" } }
    ],
    9: [
        { name: "MgO", x: 140, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is MgO called?", ru: "Как называется MgO?" }, answer: { en: "magnesium oxide", ru: "оксид магния" } },
        { name: "Al2O3", x: 90, y: 180, color: "#8c564b", shape: "circle", question: { en: "What is Al2O3 called?", ru: "Как называется Al2O3?" }, answer: { en: "aluminum oxide", ru: "оксид алюминия" } },
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" } },
        { name: "CuO", x: 100, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuO called?", ru: "Как называется CuO?" }, answer: { en: "copper oxide", ru: "оксид меди" } },
        { name: "ZnO", x: 130, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnO called?", ru: "Как называется ZnO?" }, answer: { en: "zinc oxide", ru: "оксид цинка" } },
        { name: "K2CO3", x: 160, y: 180, color: "#d62728", shape: "circle", question: { en: "What is K2CO3 called?", ru: "Как называется K2CO3?" }, answer: { en: "potassium carbonate", ru: "карбонат калия" } },
        { name: "HBr", x: 120, y: 200, color: "#17becf", shape: "circle", question: { en: "What is HBr called?", ru: "Как называется HBr?" }, answer: { en: "hydrobromic acid", ru: "бромоводородная кислота" } },
        { name: "H2CO3", x: 80, y: 150, color: "#1f77b4", shape: "circle", question: { en: "What is H2CO3 called?", ru: "Как называется H2CO3?" }, answer: { en: "carbonic acid", ru: "угольная кислота" } },
        { name: "NH4Cl", x: 140, y: 170, color: "#9467bd", shape: "circle", question: { en: "What is NH4Cl called?", ru: "Как называется NH4Cl?" }, answer: { en: "ammonium chloride", ru: "хлорид аммония" } },
        { name: "MgCl2", x: 110, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is MgCl2 called?", ru: "Как называется MgCl2?" }, answer: { en: "magnesium chloride", ru: "хлорид магния" } },
        { name: "CaSO4", x: 150, y: 190, color: "#e377c2", shape: "circle", question: { en: "What is CaSO4 called?", ru: "Как называется CaSO4?" }, answer: { en: "calcium sulfate", ru: "сульфат кальция" } }
    ],
    10: [
        { name: "HNO3", x: 110, y: 160, color: "#e377c2", shape: "circle", question: { en: "What is HNO3 called?", ru: "Как называется HNO3?" }, answer: { en: "nitric acid", ru: "азотная кислота" } },
        { name: "NaOH", x: 150, y: 140, color: "#7f7f7f", shape: "circle", question: { en: "What is NaOH called?", ru: "Как называется NaOH?" }, answer: { en: "sodium hydroxide", ru: "гидроксид натрия" } },
        { name: "CO", x: 170, y: 120, color: "#2ca02c", shape: "circle", question: { en: "What is CO called?", ru: "Как называется CO?" }, answer: { en: "carbon monoxide", ru: "угарный газ" } },
        { name: "H2O2", x: 100, y: 150, color: "#ff7f0e", shape: "circle", question: { en: "What is H2O2 called?", ru: "Как называется H2O2?" }, answer: { en: "hydrogen peroxide", ru: "перекись водорода" } },
        { name: "N2O", x: 130, y: 170, color: "#d62728", shape: "circle", question: { en: "What is N2O called?", ru: "Как называется N2O?" }, answer: { en: "nitrous oxide", ru: "закись азота" } },
        { name: "KOH", x: 160, y: 110, color: "#17becf", shape: "circle", question: { en: "What is KOH called?", ru: "Как называется KOH?" }, answer: { en: "potassium hydroxide", ru: "гидроксид калия" } },
        { name: "CaO", x: 120, y: 190, color: "#1f77b4", shape: "circle", question: { en: "What is CaO called?", ru: "Как называется CaO?" }, answer: { en: "calcium oxide", ru: "оксид кальция" } },
        { name: "SO3", x: 80, y: 130, color: "#9467bd", shape: "circle", question: { en: "What is SO3 called?", ru: "Как называется SO3?" }, answer: { en: "sulfur trioxide", ru: "триоксид серы" } },
        { name: "H3PO4", x: 140, y: 160, color: "#8c564b", shape: "circle", question: { en: "What is H3PO4 called?", ru: "Как называется H3PO4?" }, answer: { en: "phosphoric acid", ru: "фосфорная кислота" } },
        { name: "Na2CO3", x: 110, y: 180, color: "#e377c2", shape: "circle", question: { en: "What is Na2CO3 called?", ru: "Как называется Na2CO3?" }, answer: { en: "sodium carbonate", ru: "карбонат натрия" } },
        { name: "FeCl3", x: 150, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeCl3 called?", ru: "Как называется FeCl3?" }, answer: { en: "iron chloride", ru: "хлорид железа" } },
        { name: "CuO", x: 100, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuO called?", ru: "Как называется CuO?" }, answer: { en: "copper oxide", ru: "оксид меди" } },
        { name: "ZnO", x: 130, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnO called?", ru: "Как называется ZnO?" }, answer: { en: "zinc oxide", ru: "оксид цинка" } },
        { name: "K2CO3", x: 160, y: 180, color: "#d62728", shape: "circle", question: { en: "What is K2CO3 called?", ru: "Как называется K2CO3?" }, answer: { en: "potassium carbonate", ru: "карбонат калия" } },
        { name: "HBr", x: 120, y: 200, color: "#17becf", shape: "circle", question: { en: "What is HBr called?", ru: "Как называется HBr?" }, answer: { en: "hydrobromic acid", ru: "бромоводородная кислота" } },
        { name: "H2CO3", x: 80, y: 150, color: "#1f77b4", shape: "circle", question: { en: "What is H2CO3 called?", ru: "Как называется H2CO3?" }, answer: { en: "carbonic acid", ru: "угольная кислота" } },
        { name: "NH4Cl", x: 140, y: 170, color: "#9467bd", shape: "circle", question: { en: "What is NH4Cl called?", ru: "Как называется NH4Cl?" }, answer: { en: "ammonium chloride", ru: "хлорид аммония" } },
        { name: "MgCl2", x: 110, y: 130, color: "#8c564b", shape: "circle", question: { en: "What is MgCl2 called?", ru: "Как называется MgCl2?" }, answer: { en: "magnesium chloride", ru: "хлорид магния" } },
        { name: "CaSO4", x: 150, y: 190, color: "#e377c2", shape: "circle", question: { en: "What is CaSO4 called?", ru: "Как называется CaSO4?" }, answer: { en: "calcium sulfate", ru: "сульфат кальция" } },
        { name: "FeSO4", x: 100, y: 120, color: "#7f7f7f", shape: "circle", question: { en: "What is FeSO4 called?", ru: "Как называется FeSO4?" }, answer: { en: "iron sulfate", ru: "сульфат железа" } },
        { name: "CuSO4", x: 130, y: 140, color: "#2ca02c", shape: "circle", question: { en: "What is CuSO4 called?", ru: "Как называется CuSO4?" }, answer: { en: "copper sulfate", ru: "сульфат меди" } },
        { name: "ZnSO4", x: 160, y: 160, color: "#ff7f0e", shape: "circle", question: { en: "What is ZnSO4 called?", ru: "Как называется ZnSO4?" }, answer: { en: "zinc sulfate", ru: "сульфат цинка" } },
        { name: "NaClO", x: 120, y: 180, color: "#d62728", shape: "circle", question: { en: "What is NaClO called?", ru: "Как называется NaClO?" }, answer: { en: "sodium hypochlorite", ru: "гипохлорит натрия" } },
        { name: "KClO3", x: 80, y: 200, color: "#17becf", shape: "circle", question: { en: "What is KClO3 called?", ru: "Как называется KClO3?" }, answer: { en: "potassium chlorate", ru: "хлорат калия" } },
        { name: "H2S", x: 140, y: 130, color: "#1f77b4", shape: "circle", question: { en: "What is H2S called?", ru: "Как называется H2S?" }, answer: { en: "hydrogen sulfide", ru: "сероводород" } }
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
const player = {
    x: 50,
    y: 50,
    size: 150,
    image: new Image()
};
player.image.src = "icons/player.jpg";

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

    document.body.innerHTML = "";
    document.body.appendChild(canvas);
    document.body.appendChild(modal);

    let levelName = "";
    if (currentLevel.startsWith("custom_")) {
        const levelId = currentLevel.replace("custom_", "");
        const customLevel = users[currentUser].customLevels.find(l => l.id === parseInt(levelId));
        if (customLevel) {
            levelName = customLevel.name[currentLang];
            background.src = customLevel.background || "icons/background.jpg";
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
            background.src = "icons/background.jpg";
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

    const header = document.createElement("header");
    header.innerHTML = `
        <button onclick="location.href='settings.html';">${languages[currentLang].settings}</button>
        <button onclick="location.href='auth.html';">${languages[currentLang].quit}</button>
        <p>${languages[currentLang].score}: <span id="score">0</span>/${elements.length}</p>
        <p><img src="icons/coin.jpg" alt="Coins" style="width: 24px; vertical-align: middle;"> <span id="coins">${userCoins}</span></p>
        <p>${languages[currentLang].level}: ${levelName}</p>
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
        setTimeout(() => {
            location.href = "auth.html";
        }, 500);
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
    if (scoreElement) {
        scoreElement.textContent = collected.length;
    }
    const coinsElement = document.getElementById("coins");
    if (coinsElement) {
        coinsElement.textContent = userCoins;
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
    if (e.key === "gameLanguage") {
        updateLanguage();
    }
});

player.image.onload = () => {
    init();
};

player.image.onerror = () => {
    init();
};