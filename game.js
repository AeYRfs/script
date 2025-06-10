const VALID_LANGUAGES = ['en', 'ru'];
const CANVAS_ID = 'gameCanvas';
const MODAL_ID = 'modal';

const languages = {
  en: {
    quit: 'Quit',
    score: 'Score',
    settings: 'Settings',
    controls: { left: '⬅️ LEFT', right: '➡️ RIGHT', up: '⬆️ UP', down: '⬇️ DOWN' },
    questionLabel: 'Question:',
    placeholder: 'Write your answer',
    wrong: 'Wrong answer! Check the hint below.',
    send: 'Send',
    level: 'Level',
    hint: 'Hint'
  },
  ru: {
    quit: 'Выйти',
    score: 'Счёт',
    settings: 'Настройки',
    controls: { left: '⬅️ ВЛЕВО', right: '➡️ ВПРАВО', up: '⬆️ ВВЕРХ', down: '⬇️ ВНИЗ' },
    questionLabel: 'Вопрос:',
    placeholder: 'Введите ответ',
    wrong: 'Неправильный ответ! Проверьте подсказку ниже.',
    send: 'Отправить',
    level: 'Уровень',
    hint: 'Подсказка'
  }
};

const standardLevels = {
  1: [
    { name: 'H2O', x: 100, y: 150, color: '#2ca02c', shape: 'circle', question: { en: 'What is H2O called?', ru: 'Как называется H2O?' }, answer: { en: 'water', ru: 'вода' }, hint: { en: 'Common liquid essential for life', ru: 'Обычная жидкость, необходимая для жизни' } },
    { name: 'CO2', x: 250, y: 150, color: '#ff7f0e', shape: 'circle', question: { en: 'What is CO2 called?', ru: 'Как называется CO2?' }, answer: { en: 'carbon dioxide', ru: 'углекислый газ' }, hint: { en: 'Gas produced by respiration', ru: 'Газ, выделяемый при дыхании' } },
    { name: 'O2', x: 400, y: 150, color: '#d62728', shape: 'circle', question: { en: 'What is O2 called?', ru: 'Как называется O2?' }, answer: { en: 'oxygen', ru: 'кислород' }, hint: { en: 'Gas essential for breathing', ru: 'Газ, необходимый для дыхания' } },
    { name: 'N2', x: 100, y: 300, color: '#17becf', shape: 'circle', question: { en: 'What is N2 called?', ru: 'Как называется N2?' }, answer: { en: 'nitrogen', ru: 'азот' }, hint: { en: 'Most abundant gas in the atmosphere', ru: 'Наиболее распространённый газ в атмосфере' } },
    { name: 'CH4', x: 250, y: 300, color: '#1f77b4', shape: 'circle', question: { en: 'What is CH4 called?', ru: 'Как называется CH4?' }, answer: { en: 'methane', ru: 'метан' }, hint: { en: 'Main component of natural gas', ru: 'Основной компонент природного газа' } }
  ],
  2: [
    { name: 'NaCl', x: 100, y: 150, color: '#d62728', shape: 'circle', question: { en: 'What is NaCl called?', ru: 'Как называется NaCl?' }, answer: { en: 'salt', ru: 'соль' }, hint: { en: 'Common table seasoning', ru: 'Обычная пищевая приправа' } },
    { name: 'Na', x: 250, y: 150, color: '#17becf', shape: 'circle', question: { en: 'What is Na called?', ru: 'Как называется Na?' }, answer: { en: 'sodium', ru: 'натрий' }, hint: { en: 'Soft, reactive metal', ru: 'Мягкий, реактивный металл' } },
    { name: 'K', x: 400, y: 150, color: '#2ca02c', shape: 'circle', question: { en: 'What is K called?', ru: 'Как называется K?' }, answer: { en: 'potassium', ru: 'калий' }, hint: { en: 'Metal found in bananas', ru: 'Металл, содержащийся в бананах' } },
    { name: 'Cl2', x: 100, y: 300, color: '#ff7f0e', shape: 'circle', question: { en: 'What is Cl2 called?', ru: 'Как называется Cl2?' }, answer: { en: 'chlorine', ru: 'хлор' }, hint: { en: 'Greenish gas used in disinfectants', ru: 'Зеленоватый газ, используемый в дезинфицирующих средствах' } },
    { name: 'H2', x: 250, y: 300, color: '#9467bd', shape: 'circle', question: { en: 'What is H2 called?', ru: 'Как называется H2?' }, answer: { en: 'hydrogen', ru: 'водород' }, hint: { en: 'Lightest element, used in balloons', ru: 'Самый лёгкий элемент, используется в воздушных шарах' } },
    { name: 'SO2', x: 400, y: 300, color: '#8c564b', shape: 'circle', question: { en: 'What is SO2 called?', ru: 'Как называется SO2?' }, answer: { en: 'sulfur dioxide', ru: 'диоксид серы' }, hint: { en: 'Gas with a pungent smell', ru: 'Газ с резким запахом' } },
    { name: 'NH3', x: 100, y: 450, color: '#e377c2', shape: 'circle', question: { en: 'What is NH3 called?', ru: 'Как называется NH3?' }, answer: { en: 'ammonia', ru: 'аммиак' }, hint: { en: 'Gas used in cleaning products', ru: 'Газ, используемый в моющих средствах' } }
  ],
  3: [
    { name: 'OH', x: 100, y: 150, color: '#ff7f0e', shape: 'circle', question: { en: 'What is OH called?', ru: 'Как называется OH?' }, answer: { en: 'hydroxide', ru: 'гидроксид' }, hint: { en: 'Ion found in bases', ru: 'Ион, содержащийся в основаниях' } },
    { name: 'O²', x: 250, y: 150, color: '#d62728', shape: 'circle', question: { en: 'What is O² called?', ru: 'Как называется O²?' }, answer: { en: 'oxide', ru: 'оксид' }, hint: { en: 'Ion common in metal compounds', ru: 'Ион, распространённый в соединениях металлов' } },
    { name: 'HCl', x: 400, y: 150, color: '#1f77b4', shape: 'circle', question: { en: 'What is HCl called?', ru: 'Как называется HCl?' }, answer: { en: 'hydrochloric acid', ru: 'соляная кислота' }, hint: { en: 'Acid used in stomach digestion', ru: 'Кислота, используемая в пищеварении' } },
    { name: 'Ca', x: 100, y: 300, color: '#9467bd', shape: 'circle', question: { en: 'What is Ca called?', ru: 'Как называется Ca?' }, answer: {atase, en: 'calcium', ru: 'кальций' }, hint: { en: 'Element essential for bones', ru: 'Элемент, необходимый для костей' } },
    { name: 'Mg', x: 250, y: 300, color: '#8c564b', shape: 'circle', question: { en: 'What is Mg called?', ru: 'Как называется Mg?' }, answer: { en: 'magnesium', ru: 'магний' }, hint: { en: 'Metal that burns brightly', ru: 'Металл, который ярко горит' } },
    { name: 'Fe', x: 400, y: 300, color: '#e377c2', shape: 'circle', question: { en: 'What is Fe called?', ru: 'Как называется Fe?' }, answer: { en: 'iron', ru: 'железо' }, hint: { en: 'Metal used in steel production', ru: 'Металл, используемый в производстве стали' } },
    { name: 'Al', x: 100, y: 450, color: '#7f7f7f', shape: 'circle', question: { en: 'What is Al called?', ru: 'Как называется Al?' }, answer: { en: 'aluminum', ru: 'алюминий' }, hint: { en: 'Light metal used in cans', ru: 'Лёгкий металл, используемый в банках' } },
    { name: 'HNO3', x: 250, y: 450, color: '#bcbd22', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 400, y: 450, color: '#17becf', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } }
  ],
  4: [
    { name: 'HCl', x: 100, y: 150, color: '#1f77b4', shape: 'circle', question: { en: 'What is HCl called?', ru: 'Как называется HCl?' }, answer: { en: 'hydrochloric acid', ru: 'соляная кислота' }, hint: { en: 'Acid used in stomach digestion', ru: 'Кислота, используемая в пищеварении' } },
    { name: 'NH3', x: 250, y: 150, color: '#9467bd', shape: 'circle', question: { en: 'What is NH3 called?', ru: 'Как называется NH3?' }, answer: { en: 'ammonia', ru: 'аммиак' }, hint: { en: 'Gas used in cleaning products', ru: 'Газ, используемый в моющих средствах' } },
    { name: 'CH4', x: 400, y: 150, color: '#8c564b', shape: 'circle', question: { en: 'What is CH4 called?', ru: 'Как называется CH4?' }, answer: { en: 'methane', ru: 'метан' }, hint: { en: 'Main component of natural gas', ru: 'Основной компонент природного газа' } },
    { name: 'SO2', x: 100, y: 300, color: '#e377c2', shape: 'circle', question: { en: 'What is SO2 called?', ru: 'Как называется SO2?' }, answer: { en: 'sulfur dioxide', ru: 'диоксид серы' }, hint: { en: 'Gas with a pungent smell', ru: 'Газ с резким запахом' } },
    { name: 'KCl', x: 250, y: 300, color: '#7f7f7f', shape: 'circle', question: { en: 'What is KCl called?', ru: 'Как называется KCl?' }, answer: { en: 'potassium chloride', ru: 'хлорид калия' }, hint: { en: 'Compound used in fertilizers', ru: 'Соединение, используемое в удобрениях' } },
    { name: 'CaCO3', x: 400, y: 300, color: '#bcbd22', shape: 'circle', question: { en: 'What is CaCO3 called?', ru: 'Как называется CaCO3?' }, answer: { en: 'calcium carbonate', ru: 'карбонат кальция' }, hint: { en: 'Found in limestone and chalk', ru: 'Содержится в известняке и меле' } },
    { name: 'H2SO4', x: 100, y: 450, color: '#2ca02c', shape: 'circle', question: { en: 'What is H2SO4 called?', ru: 'Как называется H2SO4?' }, answer: { en: 'sulfuric acid', ru: 'серная кислота' }, hint: { en: 'Strong acid used in batteries', ru: 'Сильная кислота, используемая в батареях' } },
    { name: 'NO2', x: 250, y: 450, color: '#ff7f0e', shape: 'circle', question: { en: 'What is NO2 called?', ru: 'Как называется NO2?' }, answer: { en: 'nitrogen dioxide', ru: 'диоксид азота' }, hint: { en: 'Brown gas contributing to air pollution', ru: 'Коричневый газ, способствующий загрязнению воздуха' } },
    { name: 'C6H12O6', x: 400, y: 450, color: '#d62728', shape: 'circle', question: { en: 'What is C6H12O6 called?', ru: 'Как называется C6H12O6?' }, answer: { en: 'glucose', ru: 'глюкоза' }, hint: { en: 'Sugar used in energy production', ru: 'Сахар, используемый для выработки энергии' } },
    { name: 'MgO', x: 100, y: 600, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 250, y: 600, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } }
  ],
  5: [
    { name: 'CH4', x: 100, y: 150, color: '#8c564b', shape: 'circle', question: { en: 'What is CH4 called?', ru: 'Как называется CH4?' }, answer: { en: 'methane', ru: 'метан' }, hint: { en: 'Main component of natural gas', ru: 'Основной компонент природного газа' } },
    { name: 'SO2', x: 250, y: 150, color: '#e377c2', shape: 'circle', question: { en: 'What is SO2 called?', ru: 'Как называется SO2?' }, answer: { en: 'sulfur dioxide', ru: 'диоксид серы' }, hint: { en: 'Gas with a pungent smell', ru: 'Газ с резким запахом' } },
    { name: 'KCl', x: 400, y: 150, color: '#7f7f7f', shape: 'circle', question: { en: 'What is KCl called?', ru: 'Как называется KCl?' }, answer: { en: 'potassium chloride', ru: 'хлорид калия' }, hint: { en: 'Compound used in fertilizers', ru: 'Соединение, используемое в удобрениях' } },
    { name: 'CaCO3', x: 100, y: 300, color: '#bcbd22', shape: 'circle', question: { en: 'What is CaCO3 called?', ru: 'Как называется CaCO3?' }, answer: { en: 'calcium carbonate', ru: 'карбонат кальция' }, hint: { en: 'Found in limestone and chalk', ru: 'Содержится в известняке и меле' } },
    { name: 'Fe2O3', x: 250, y: 300, color: '#17becf', shape: 'circle', question: { en: 'What is Fe2O3 called?', ru: 'Как называется Fe2O3?' }, answer: { en: 'iron oxide', ru: 'оксид железа' }, hint: { en: 'Rust is a form of this compound', ru: 'Ржавчина - это форма этого соединения' } },
    { name: 'H2SO4', x: 400, y: 300, color: '#2ca02c', shape: 'circle', question: { en: 'What is H2SO4 called?', ru: 'Как называется H2SO4?' }, answer: { en: 'sulfuric acid', ru: 'серная кислота' }, hint: { en: 'Strong acid used in batteries', ru: 'Сильная кислота, используемая в батареях' } },
    { name: 'NO2', x: 100, y: 450, color: '#ff7f0e', shape: 'circle', question: { en: 'What is NO2 called?', ru: 'Как называется NO2?' }, answer: { en: 'nitrogen dioxide', ru: 'диоксид азота' }, hint: { en: 'Brown gas contributing to air pollution', ru: 'Коричневый газ, способствующий загрязнению воздуха' } },
    { name: 'C6H12O6', x: 250, y: 450, color: '#d62728', shape: 'circle', question: { en: 'What is C6H12O6 called?', ru: 'Как называется C6H12O6?' }, answer: { en: 'glucose', ru: 'глюкоза' }, hint: { en: 'Sugar used in energy production', ru: 'Сахар, используемый для выработки энергии' } },
    { name: 'MgO', x: 400, y: 450, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 100, y: 600, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } },
    { name: 'HNO3', x: 250, y: 600, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 400, y: 600, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 100, y: 750, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } }
  ],
  6: [
    { name: 'KCl', x: 100, y: 150, color: '#7f7f7f', shape: 'circle', question: { en: 'What is KCl called?', ru: 'Как называется KCl?' }, answer: { en: 'potassium chloride', ru: 'хлорид калия' }, hint: { en: 'Compound used in fertilizers', ru: 'Соединение, используемое в удобрениях' } },
    { name: 'CaCO3', x: 250, y: 150, color: '#bcbd22', shape: 'circle', question: { en: 'What is CaCO3 called?', ru: 'Как называется CaCO3?' }, answer: { en: 'calcium carbonate', ru: 'карбонат кальция' }, hint: { en: 'Found in limestone and chalk', ru: 'Содержится в известняке и меле' } },
    { name: 'Fe2O3', x: 400, y: 150, color: '#17becf', shape: 'circle', question: { en: 'What is Fe2O3 called?', ru: 'Как называется Fe2O3?' }, answer: { en: 'iron oxide', ru: 'оксид железа' }, hint: { en: 'Rust is a form of this compound', ru: 'Ржавчина - это форма этого соединения' } },
    { name: 'H2SO4', x: 100, y: 300, color: '#2ca02c', shape: 'circle', question: { en: 'What is H2SO4 called?', ru: 'Как называется H2SO4?' }, answer: { en: 'sulfuric acid', ru: 'серная кислота' }, hint: { en: 'Strong acid used in batteries', ru: 'Сильная кислота, используемая в батареях' } },
    { name: 'NO2', x: 250, y: 300, color: '#ff7f0e', shape: 'circle', question: { en: 'What is NO2 called?', ru: 'Как называется NO2?' }, answer: { en: 'nitrogen dioxide', ru: 'диоксид азота' }, hint: { en: 'Brown gas contributing to air pollution', ru: 'Коричневый газ, способствующий загрязнению воздуха' } },
    { name: 'C6H12O6', x: 400, y: 300, color: '#d62728', shape: 'circle', question: { en: 'What is C6H12O6 called?', ru: 'Как называется C6H12O6?' }, answer: { en: 'glucose', ru: 'глюкоза' }, hint: { en: 'Sugar used in energy production', ru: 'Сахар, используемый для выработки энергии' } },
    { name: 'MgO', x: 100, y: 450, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 250, y: 450, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } },
    { name: 'HNO3', x: 400, y: 450, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 100, y: 600, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 250, y: 600, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } },
    { name: 'H2O2', x: 400, y: 600, color: '#ff7f0e', shape: 'circle', question: { en: 'What is H2O2 called?', ru: 'Как называется H2O2?' }, answer: { en: 'hydrogen peroxide', ru: 'перекись водорода' }, hint: { en: 'Used as a disinfectant', ru: 'Используется как дезинфицирующее средство' } },
    { name: 'N2O', x: 100, y: 750, color: '#d62728', shape: 'circle', question: { en: 'What is N2O called?', ru: 'Как называется N2O?' }, answer: { en: 'nitrous oxide', ru: 'закись азота' }, hint: { en: 'Gas known as laughing gas', ru: 'Газ, известный как веселящий газ' } },
    { name: 'KOH', x: 250, y: 750, color: '#17becf', shape: 'circle', question: { en: 'What is KOH called?', ru: 'Как называется KOH?' }, answer: { en: 'potassium hydroxide', ru: 'гидроксид калия' }, hint: { en: 'Base used in soap production', ru: 'Основание, используемое в производстве мыла' } },
    { name: 'CaO', x: 400, y: 750, color: '#1f77b4', shape: 'circle', question: { en: 'What is CaO called?', ru: 'Как называется CaO?' }, answer: { en: 'calcium oxide', ru: 'оксид кальция' }, hint: { en: 'Also known as quicklime', ru: 'Также известен как негашёная известь' } }
  ],
  7: [
    { name: 'Fe2O3', x: 100, y: 150, color: '#17becf', shape: 'circle', question: { en: 'What is Fe2O3 called?', ru: 'Как называется Fe2O3?' }, answer: { en: 'iron oxide', ru: 'оксид железа' }, hint: { en: 'Rust is a form of this compound', ru: 'Ржавчина - это форма этого соединения' } },
    { name: 'H2SO4', x: 250, y: 150, color: '#2ca02c', shape: 'circle', question: { en: 'What is H2SO4 called?', ru: 'Как называется H2SO4?' }, answer: { en: 'sulfuric acid', ru: 'серная кислота' }, hint: { en: 'Strong acid used in batteries', ru: 'Сильная кислота, используемая в батареях' } },
    { name: 'NO2', x: 400, y: 150, color: '#ff7f0e', shape: 'circle', question: { en: 'What is NO2 called?', ru: 'Как называется NO2?' }, answer: { en: 'nitrogen dioxide', ru: 'диоксид азота' }, hint: { en: 'Brown gas contributing to air pollution', ru: 'Коричневый газ, способствующий загрязнению воздуха' } },
    { name: 'C6H12O6', x: 100, y: 300, color: '#d62728', shape: 'circle', question: { en: 'What is C6H12O6 called?', ru: 'Как называется C6H12O6?' }, answer: { en: 'glucose', ru: 'глюкоза' }, hint: { en: 'Sugar used in energy production', ru: 'Сахар, используемый для выработки энергии' } },
    { name: 'MgO', x: 250, y: 300, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 400, y: 300, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } },
    { name: 'HNO3', x: 100, y: 450, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 250, y: 450, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 400, y: 450, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } },
    { name: 'H2O2', x: 100, y: 600, color: '#ff7f0e', shape: 'circle', question: { en: 'What is H2O2 called?', ru: 'Как называется H2O2?' }, answer: { en: 'hydrogen peroxide', ru: 'перекись водорода' }, hint: { en: 'Used as a disinfectant', ru: 'Используется как дезинфицирующее средство' } },
    { name: 'N2O', x: 250, y: 600, color: '#d62728', shape: 'circle', question: { en: 'What is N2O called?', ru: 'Как называется N2O?' }, answer: { en: 'nitrous oxide', ru: 'закись азота' }, hint: { en: 'Gas known as laughing gas', ru: 'Газ, известный как веселящий газ' } },
    { name: 'KOH', x: 400, y: 600, color: '#17becf', shape: 'circle', question: { en: 'What is KOH called?', ru: 'Как называется KOH?' }, answer: { en: 'potassium hydroxide', ru: 'гидроксид калия' }, hint: { en: 'Base used in soap production', ru: 'Основание, используемое в производстве мыла' } },
    { name: 'CaO', x: 100, y: 750, color: '#1f77b4', shape: 'circle', question: { en: 'What is CaO called?', ru: 'Как называется CaO?' }, answer: { en: 'calcium oxide', ru: 'оксид кальция' }, hint: { en: 'Also known as quicklime', ru: 'Также известен как негашёная известь' } },
    { name: 'SO3', x: 250, y: 750, color: '#9467bd', shape: 'circle', question: { en: 'What is SO3 called?', ru: 'Как называется SO3?' }, answer: { en: 'sulfur trioxide', ru: 'триоксид серы' }, hint: { en: 'Used in sulfuric acid production', ru: 'Используется в производстве серной кислоты' } },
    { name: 'H3PO4', x: 400, y: 750, color: '#8c564b', shape: 'circle', question: { en: 'What is H3PO4 called?', ru: 'Как называется H3PO4?' }, answer: { en: 'phosphoric acid', ru: 'фосфорная кислота' }, hint: { en: 'Acid used in soft drinks', ru: 'Кислота, используемая в газированных напитках' } },
    { name: 'Na2CO3', x: 100, y: 900, color: '#e377c2', shape: 'circle', question: { en: 'What is Na2CO3 called?', ru: 'Как называется Na2CO3?' }, answer: { en: 'sodium carbonate', ru: 'карбонат натрия' }, hint: { en: 'Also known as washing soda', ru: 'Также известен как сода для стирки' } },
    { name: 'FeCl3', x: 250, y: 900, color: '#7f7f7f', shape: 'circle', question: { en: 'What is FeCl3 called?', ru: 'Как называется FeCl3?' }, answer: { en: 'iron chloride', ru: 'хлорид железа' }, hint: { en: 'Used in water treatment', ru: 'Используется в очистке воды' } }
  ],
  8: [
    { name: 'NO2', x: 100, y: 150, color: '#ff7f0e', shape: 'circle', question: { en: 'What is NO2 called?', ru: 'Как называется NO2?' }, answer: { en: 'nitrogen dioxide', ru: 'диоксид азота' }, hint: { en: 'Brown gas contributing to air pollution', ru: 'Коричневый газ, способствующий загрязнению воздуха' } },
    { name: 'C6H12O6', x: 250, y: 150, color: '#d62728', shape: 'circle', question: { en: 'What is C6H12O6 called?', ru: 'Как называется C6H12O6?' }, answer: { en: 'glucose', ru: 'глюкоза' }, hint: { en: 'Sugar used in energy production', ru: 'Сахар, используемый для выработки энергии' } },
    { name: 'MgO', x: 400, y: 150, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 100, y: 300, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } },
    { name: 'HNO3', x: 250, y: 300, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 400, y: 300, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 100, y: 450, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } },
    { name: 'H2O2', x: 250, y: 450, color: '#ff7f0e', shape: 'circle', question: { en: 'What is H2O2 called?', ru: 'Как называется H2O2?' }, answer: { en: 'hydrogen peroxide', ru: 'перекись водорода' }, hint: { en: 'Used as a disinfectant', ru: 'Используется как дезинфицирующее средство' } },
    { name: 'N2O', x: 400, y: 450, color: '#d62728', shape: 'circle', question: { en: 'What is N2O called?', ru: 'Как называется N2O?' }, answer: { en: 'nitrous oxide', ru: 'закись азота' }, hint: { en: 'Gas known as laughing gas', ru: 'Газ, известный как веселящий газ' } },
    { name: 'KOH', x: 100, y: 600, color: '#17becf', shape: 'circle', question: { en: 'What is KOH called?', ru: 'Как называется KOH?' }, answer: { en: 'potassium hydroxide', ru: 'гидроксид калия' }, hint: { en: 'Base used in soap production', ru: 'Основание, используемое в производстве мыла' } },
    { name: 'CaO', x: 250, y: 600, color: '#1f77b4', shape: 'circle', question: { en: 'What is CaO called?', ru: 'Как называется CaO?' }, answer: { en: 'calcium oxide', ru: 'оксид кальция' }, hint: { en: 'Also known as quicklime', ru: 'Также известен как негашёная известь' } },
    { name: 'SO3', x: 400, y: 600, color: '#9467bd', shape: 'circle', question: { en: 'What is SO3 called?', ru: 'Как называется SO3?' }, answer: { en: 'sulfur trioxide', ru: 'триоксид серы' }, hint: { en: 'Used in sulfuric acid production', ru: 'Используется в производстве серной кислоты' } },
    { name: 'H3PO4', x: 100, y: 750, color: '#8c564b', shape: 'circle', question: { en: 'What is H3PO4 called?', ru: 'Как называется H3PO4?' }, answer: { en: 'phosphoric acid', ru: 'фосфорная кислота' }, hint: { en: 'Acid used in soft drinks', ru: 'Кислота, используемая в газированных напитках' } },
    { name: 'Na2CO3', x: 250, y: 750, color: '#e377c2', shape: 'circle', question: { en: 'What is Na2CO3 called?', ru: 'Как называется Na2CO3?' }, answer: { en: 'sodium carbonate', ru: 'карбонат натрия' }, hint: { en: 'Also known as washing soda', ru: 'Также известен как сода для стирки' } },
    { name: 'FeCl3', x: 400, y: 750, color: '#7f7f7f', shape: 'circle', question: { en: 'What is FeCl3 called?', ru: 'Как называется FeCl3?' }, answer: { en: 'iron chloride', ru: 'хлорид железа' }, hint: { en: 'Used in water treatment', ru: 'Используется в очистке воды' } },
    { name: 'CuO', x: 100, y: 900, color: '#2ca02c', shape: 'circle', question: { en: 'What is CuO called?', ru: 'Как называется CuO?' }, answer: { en: 'copper oxide', ru: 'оксид меди' }, hint: { en: 'Black solid used in ceramics', ru: 'Чёрное твёрдое вещество, используемое в керамике' } },
    { name: 'ZnO', x: 250, y: 900, color: '#ff7f0e', shape: 'circle', question: { en: 'What is ZnO called?', ru: 'Как называется ZnO?' }, answer: { en: 'zinc oxide', ru: 'оксид цинка' }, hint: { en: 'Used in sunscreen', ru: 'Используется в солнцезащитных кремах' } },
    { name: 'K2CO3', x: 400, y: 900, color: '#d62728', shape: 'circle', question: { en: 'What is K2CO3 called?', ru: 'Как называется K2CO3?' }, answer: { en: 'potassium carbonate', ru: 'карбонат калия' }, hint: { en: 'Used in glass production', ru: 'Используется в производстве стекла' } },
    { name: 'HBr', x: 100, y: 1050, color: '#17becf', shape: 'circle', question: { en: 'What is HBr called?', ru: 'Как называется HBr?' }, answer: { en: 'hydrobromic acid', ru: 'бромоводородная кислота' }, hint: { en: 'Acid similar to HCl', ru: 'Кислота, похожая на HCl' } }
  ],
  9: [
    { name: 'MgO', x: 100, y: 150, color: '#9467bd', shape: 'circle', question: { en: 'What is MgO called?', ru: 'Как называется MgO?' }, answer: { en: 'magnesium oxide', ru: 'оксид магния' }, hint: { en: 'White solid used in antacids', ru: 'Белое твёрдое вещество, используемое в антацидах' } },
    { name: 'Al2O3', x: 250, y: 150, color: '#8c564b', shape: 'circle', question: { en: 'What is Al2O3 called?', ru: 'Как называется Al2O3?' }, answer: { en: 'aluminum oxide', ru: 'оксид алюминия' }, hint: { en: 'Compound used in abrasives', ru: 'Соединение, используемое в абразивах' } },
    { name: 'HNO3', x: 400, y: 150, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 100, y: 300, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 250, y: 300, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } },
    { name: 'H2O2', x: 400, y: 300, color: '#ff7f0e', shape: 'circle', question: { en: 'What is H2O2 called?', ru: 'Как называется H2O2?' }, answer: { en: 'hydrogen peroxide', ru: 'перекись водорода' }, hint: { en: 'Used as a disinfectant', ru: 'Используется как дезинфицирующее средство' } },
    { name: 'N2O', x: 100, y: 450, color: '#d62728', shape: 'circle', question: { en: 'What is N2O called?', ru: 'Как называется N2O?' }, answer: { en: 'nitrous oxide', ru: 'закись азота' }, hint: { en: 'Gas known as laughing gas', ru: 'Газ, известный как веселящий газ' } },
    { name: 'KOH', x: 250, y: 450, color: '#17becf', shape: 'circle', question: { en: 'What is KOH called?', ru: 'Как называется KOH?' }, answer: { en: 'potassium hydroxide', ru: 'гидроксид калия' }, hint: { en: 'Base used in soap production', ru: 'Основание, используемое в производстве мыла' } },
    { name: 'CaO', x: 400, y: 450, color: '#1f77b4', shape: 'circle', question: { en: 'What is CaO called?', ru: 'Как называется CaO?' }, answer: { en: 'calcium oxide', ru: 'оксид кальция' }, hint: { en: 'Also known as quicklime', ru: 'Также известен как негашёная известь' } },
    { name: 'SO3', x: 100, y: 600, color: '#9467bd', shape: 'circle', question: { en: 'What is SO3 called?', ru: 'Как называется SO3?' }, answer: { en: 'sulfur trioxide', ru: 'триоксид серы' }, hint: { en: 'Used in sulfuric acid production', ru: 'Используется в производстве серной кислоты' } },
    { name: 'H3PO4', x: 250, y: 600, color: '#8c564b', shape: 'circle', question: { en: 'What is H3PO4 called?', ru: 'Как называется H3PO4?' }, answer: { en: 'phosphoric acid', ru: 'фосфорная кислота' }, hint: { en: 'Acid used in soft drinks', ru: 'Кислота, используемая в газированных напитках' } },
    { name: 'Na2CO3', x: 400, y: 600, color: '#e377c2', shape: 'circle', question: { en: 'What is Na2CO3 called?', ru: 'Как называется Na2CO3?' }, answer: { en: 'sodium carbonate', ru: 'карбонат натрия' }, hint: { en: 'Also known as washing soda', ru: 'Также известен как сода для стирки' } },
    { name: 'FeCl3', x: 100, y: 750, color: '#7f7f7f', shape: 'circle', question: { en: 'What is FeCl3 called?', ru: 'Как называется FeCl3?' }, answer: { en: 'iron chloride', ru: 'хлорид железа' }, hint: { en: 'Used in water treatment', ru: 'Используется в очистке воды' } },
    { name: 'CuO', x: 250, y: 750, color: '#2ca02c', shape: 'circle', question: { en: 'What is CuO called?', ru: 'Как называется CuO?' }, answer: { en: 'copper oxide', ru: 'оксид меди' }, hint: { en: 'Black solid used in ceramics', ru: 'Чёрное твёрдое вещество, используемое в керамике' } },
    { name: 'ZnO', x: 400, y: 750, color: '#ff7f0e', shape: 'circle', question: { en: 'What is ZnO called?', ru: 'Как называется ZnO?' }, answer: { en: 'zinc oxide', ru: 'оксид цинка' }, hint: { en: 'Used in sunscreen', ru: 'Используется в солнцезащитных кремах' } },
    { name: 'K2CO3', x: 100, y: 900, color: '#d62728', shape: 'circle', question: { en: 'What is K2CO3 called?', ru: 'Как называется K2CO3?' }, answer: { en: 'potassium carbonate', ru: 'карбонат калия' }, hint: { en: 'Used in glass production', ru: 'Используется в производстве стекла' } },
    { name: 'HBr', x: 250, y: 900, color: '#17becf', shape: 'circle', question: { en: 'What is HBr called?', ru: 'Как называется HBr?' }, answer: { en: 'hydrobromic acid', ru: 'бромоводородная кислота' }, hint: { en: 'Acid similar to HCl', ru: 'Кислота, похожая на HCl' } },
    { name: 'H2CO3', x: 400, y: 900, color: '#1f77b4', shape: 'circle', question: { en: 'What is H2CO3 called?', ru: 'Как называется H2CO3?' }, answer: { en: 'carbonic acid', ru: 'углеродная кислота' }, hint: { en: 'Formed when CO2 dissolves in water', ru: 'Образуется при растворении CO2 в воде' } },
    { name: 'NH4Cl', x: 100, y: 1050, color: '#9467bd', shape: 'circle', question: { en: 'What is NH4Cl called?', ru: 'Как называется NH4Cl?' }, answer: { en: 'ammonium chloride', ru: 'хлорид аммония' }, hint: { en: 'Used in batteries and fertilizers', ru: 'Используется в батареях и удобрениях' } },
    { name: 'MgCl2', x: 250, y: 1050, color: '#8c564b', shape: 'circle', question: { en: 'What is MgCl2 called?', ru: 'Как называется MgCl2?' }, answer: { en: 'magnesium chloride', ru: 'хлорид магния' }, hint: { en: 'Used in de-icing roads', ru: 'Используется для удаления льда с дорог' } },
    { name: 'CaSO4', x: 400, y: 1050, color: '#e377c2', shape: 'circle', question: { en: 'What is CaSO4 called?', ru: 'Как называется CaSO4?' }, answer: { en: 'calcium sulfate', ru: 'сульфат кальция' }, hint: { en: 'Found in gypsum', ru: 'Содержится в гипсе' } }
  ],
  10: [
    { name: 'HNO3', x: 100, y: 150, color: '#e377c2', shape: 'circle', question: { en: 'What is HNO3 called?', ru: 'Как называется HNO3?' }, answer: { en: 'nitric acid', ru: 'азотная кислота' }, hint: { en: 'Acid used in fertilizers', ru: 'Кислота, используемая в удобрениях' } },
    { name: 'NaOH', x: 250, y: 150, color: '#7f7f7f', shape: 'circle', question: { en: 'What is NaOH called?', ru: 'Как называется NaOH?' }, answer: { en: 'sodium hydroxide', ru: 'гидроксид натрия' }, hint: { en: 'Strong base used in soap making', ru: 'Сильное основание, используемое в производстве мыла' } },
    { name: 'CO', x: 400, y: 150, color: '#2ca02c', shape: 'circle', question: { en: 'What is CO called?', ru: 'Как называется CO?' }, answer: { en: 'carbon monoxide', ru: 'угарный газ' }, hint: { en: 'Colorless, odorless toxic gas', ru: 'Бесцветный газ без запаха, токсичный' } },
    { name: 'H2O2', x: 100, y: 300, color: '#ff7f0e', shape: 'circle', question: { en: 'What is H2O2 called?', ru: 'Как называется H2O2?' }, answer: { en: 'hydrogen peroxide', ru: 'перекись водорода' }, hint: { en: 'Used as a disinfectant', ru: 'Используется как дезинфицирующее средство' } },
    { name: 'N2O', x: 250, y: 300, color: '#d62728', shape: 'circle', question: { en: 'What is N2O called?', ru: 'Как называется N2O?' }, answer: { en: 'nitrous oxide', ru: 'закись азота' }, hint: { en: 'Gas known as laughing gas', ru: 'Газ, известный как веселящий газ' } },
    { name: 'KOH', x: 400, y: 300, color: '#17becf', shape: 'circle', question: { en: 'What is KOH called?', ru: 'Как называется KOH?' }, answer: { en: 'potassium hydroxide', ru: 'гидроксид калия' }, hint: { en: 'Base used in soap production', ru: 'Основание, используемое в производстве мыла' } },
    { name: 'CaO', x: 100, y: 450, color: '#1f77b4', shape: 'circle', question: { en: 'What is CaO called?', ru: 'Как называется CaO?' }, answer: { en: 'calcium oxide', ru: 'оксид кальция' }, hint: { en: 'Also known as quicklime', ru: 'Также известен как негашёная известь' } },
    { name: 'SO3', x: 250, y: 450, color: '#9467bd', shape: 'circle', question: { en: 'What is SO3 called?', ru: 'Как называется SO3?' }, answer: { en: 'sulfur trioxide', ru: 'триоксид серы' }, hint: { en: 'Used in sulfuric acid production', ru: 'Используется в производстве серной кислоты' } },
    { name: 'H3PO4', x: 400, y: 450, color: '#8c564b', shape: 'circle', question: { en: 'What is H3PO4 called?', ru: 'Как называется H3PO4?' }, answer: { en: 'phosphoric acid', ru: 'фосфорная кислота' }, hint: { en: 'Acid used in soft drinks', ru: 'Кислота, используемая в газированных напитках' } },
    { name: 'Na2CO3', x: 100, y: 600, color: '#e377c2', shape: 'circle', question: { en: 'What is Na2CO3 called?', ru: 'Как называется Na2CO3?' }, answer: { en: 'sodium carbonate', ru: 'карбонат натрия' }, hint: { en: 'Also known as washing soda', ru: 'Также известен как сода для стирки' } },
    { name: 'FeCl3', x: 250, y: 600, color: '#7f7f7f', shape: 'circle', question: { en: 'What is FeCl3 called?', ru: 'Как называется FeCl3?' }, answer: { en: 'iron chloride', ru: 'хлорид железа' }, hint: { en: 'Used in water treatment', ru: 'Используется в очистке воды' } },
    { name: 'CuO', x: 400, y: 600, color: '#2ca02c', shape: 'circle', question: { en: 'What is CuO called?', ru: 'Как называется CuO?' }, answer: { en: 'copper oxide', ru: 'оксид меди' }, hint: { en: 'Black solid used in ceramics', ru: 'Чёрное твёрдое вещество, используемое в керамике' } },
    { name: 'ZnO', x: 100, y: 750, color: '#ff7f0e', shape: 'circle', question: { en: 'What is ZnO called?', ru: 'Как называется ZnO?' }, answer: { en: 'zinc oxide', ru: 'оксид цинка' }, hint: { en: 'Used in sunscreen', ru: 'Используется в солнцезащитных кремах' } },
    { name: 'K2CO3', x: 250, y: 750, color: '#d62728', shape: 'circle', question: { en: 'What is K2CO3 called?', ru: 'Как называется K2CO3?' }, answer: { en: 'potassium carbonate', ru: 'карбонат калия' }, hint: { en: 'Used in glass production', ru: 'Используется в производстве стекла' } },
    { name: 'HBr', x: 400, y: 750, color: '#17becf', shape: 'circle', question: { en: 'What is HBr called?', ru: 'Как называется HBr?' }, answer: { en: 'hydrobromic acid', ru: 'бромоводородная кислота' }, hint: { en: 'Acid similar to HCl', ru: 'Кислота, похожая на HCl' } },
    { name: 'H2CO3', x: 100, y: 900, color: '#1f77b4', shape: 'circle', question: { en: 'What is H2CO3 called?', ru: 'Как называется H2CO3?' }, answer: { en: 'carbonic acid', ru: 'углеродная кислота' }, hint: { en: 'Formed when CO2 dissolves in water', ru: 'Образуется при растворении CO2 в воде' } },
    { name: 'NH4Cl', x: 250, y: 900, color: '#9467bd', shape: 'circle', question: { en: 'What is NH4Cl called?', ru: 'Как называется NH4Cl?' }, answer: { en: 'ammonium chloride', ru: 'хлорид аммония' }, hint: { en: 'Used in batteries and fertilizers', ru: 'Используется в батареях и удобрениях' } },
    { name: 'MgCl2', x: 400, y: 900, color: '#8c564b', shape: 'circle', question: { en: 'What is MgCl2 called?', ru: 'Как называется MgCl2?' }, answer: { en: 'magnesium chloride', ru: 'хлорид магния' }, hint: { en: 'Used in de-icing roads', ru: 'Используется для удаления льда с дорог' } },
    { name: 'CaSO4', x: 100, y: 1050, color: '#e377c2', shape: 'circle', question: { en: 'What is CaSO4 called?', ru: 'Как называется CaSO4?' }, answer: { en: 'calcium sulfate', ru: 'сульфат кальция' }, hint: { en: 'Found in gypsum', ru: 'Содержится в гипсе' } },
    { name: 'FeSO4', x: 250, y: 1050, color: '#7f7f7f', shape: 'circle', question: { en: 'What is FeSO4 called?', ru: 'Как называется FeSO4?' }, answer: { en: 'iron sulfate', ru: 'сульфат железа' }, hint: { en: 'Used in iron supplements', ru: 'Используется в добавках железа' } },
    { name: 'CuSO4', x: 400, y: 1050, color: '#2ca02c', shape: 'circle', question: { en: 'What is CuSO4 called?', ru: 'Как называется CuSO4?' }, answer: { en: 'copper sulfate', ru: 'сульфат меди' }, hint: { en: 'Blue crystals used in agriculture', ru: 'Синие кристаллы, используемые в сельском хозяйстве' } },
    { name: 'ZnSO4', x: 100, y: 1200, color: '#ff7f0e', shape: 'circle', question: { en: 'What is ZnSO4 called?', ru: 'Как называется ZnSO4?' }, answer: { en: 'zinc sulfate', ru: 'сульфат цинка' }, hint: { en: 'Used in zinc supplements', ru: 'Используется в добавках цинка' } },
    { name: 'NaClO', x: 250, y: 1200, color: '#d62728', shape: 'circle', question: { en: 'What is NaClO called?', ru: 'Как называется NaClO?' }, answer: { en: 'sodium hypochlorite', ru: 'гипохлорит натрия' }, hint: { en: 'Active ingredient in bleach', ru: 'Активный ингредиент в отбеливателе' } },
    { name: 'KClO3', x: 400, y: 1200, color: '#17becf', shape: 'circle', question: { en: 'What is KClO3 called?', ru: 'Как называется KClO3?' }, answer: { en: 'potassium chlorate', ru: 'хлорат калия' }, hint: { en: 'Used in matches and explosives', ru: 'Используется в спичках и взрывчатых веществах' } },
    { name: 'H2S', x: 100, y: 1350, color: '#1f77b4', shape: 'circle', question: { en: 'What is H2S called?', ru: 'Как называется H2S?' }, answer: { en: 'hydrogen sulfide', ru: 'сероводород' }, hint: { en: 'Gas with a rotten egg smell', ru: 'Газ с запахом тухлых яиц' } }
  ]
};

class ChemistryGame {
  constructor() {
    this.currentLang = this.getLanguage();
    this.currentUser = localStorage.getItem('currentUser');
    this.currentLevel = localStorage.getItem('currentLevel');
    this.userCoins = 0;
    this.collected = [];
    this.elements = [];
    this.levelsCompleted = [];
    this.isLevelCompleted = false;
    this.currentElement = null;

    this.canvas = document.createElement('canvas');
    this.canvas.id = CANVAS_ID;
    this.ctx = this.canvas.getContext('2d');

    this.background = new Image();
    this.background.src = 'icons/background.jpg';

    this.player = {
      x: 50,
      y: 50,
      size: 30,
      image: new Image()
    };
    this.player.image.src = 'icons/player.png';

    this.modal = null;
  }

  getLanguage() {
    let lang = localStorage.getItem('gameLanguage') || 'en';
    if (!VALID_LANGUAGES.includes(lang)) {
      lang = 'en';
      localStorage.setItem('gameLanguage', lang);
    }
    return lang;
  }

  init() {
    if (!this.currentUser) {
      location.href = 'index.html';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[this.currentUser]) {
      location.href = 'index.html';
      return;
    }
    this.userCoins = users[this.currentUser].coins || 0;
    this.levelsCompleted = JSON.parse(localStorage.getItem(`progress_${this.currentUser}`)) || [];

    document.body.innerHTML = '';
    document.body.appendChild(this.canvas);

    this.loadLevel();
    this.createUI();
    this.setupModal();
    this.resizeCanvas();
    this.startGameLoop();
  }

  generateSpacedCoordinates(count, width, height) {
    const minDistance = 150;
    const positions = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (positions.length < count && attempts < maxAttempts) {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 150) + 100;
      let valid = true;

      for (const pos of positions) {
        if (Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2) < minDistance) {
          valid = false;
          break;
        }
      }

      if (valid) {
        positions.push({ x, y });
      }
      attempts++;
    }

    while (positions.length < count) {
      positions.push({
        x: 50 + positions.length * 150,
        y: 100 + Math.floor(positions.length / 3) * 150
      });
    }

    return positions;
  }

  loadLevel() {
    let levelName = '';
    if (this.currentLevel.startsWith('custom_')) {
      const levelId = this.currentLevel.replace('custom_', '');
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const customLevel = users[this.currentUser].customLevels?.find(l => l.id === parseInt(levelId));
      if (customLevel) {
        levelName = customLevel.name[this.currentLang];
        this.background.src = customLevel.background || 'icons/background.jpg';
        const coords = this.generateSpacedCoordinates(customLevel.questions[this.currentLang].length, this.canvas.width, this.canvas.height);
        this.elements = customLevel.questions[this.currentLang].map((q, i) => ({
          name: q.name,
          x: coords[i].x,
          y: coords[i].y,
          color: this.getRandomColor(),
          shape: 'circle',
          question: q.text,
          answer: q.name,
          hint: { en: 'Custom level hint', ru: 'Подсказка для пользовательского уровня' }
        }));
      } else {
        location.href = 'index.html';
      }
    } else {
      const levelNum = parseInt(this.currentLevel);
      if (standardLevels[levelNum]) {
        levelName = `${languages[this.currentLang].level} ${levelNum}`;
        this.background.src = 'icons/background.jpg';
        this.elements = standardLevels[levelNum].map(e => ({
          name: e.name,
          x: e.x,
          y: e.y,
          color: e.color,
          shape: e.shape,
          question: e.question[this.currentLang],
          answer: e.answer[this.currentLang],
          hint: e.hint[this.currentLang]
        }));
      } else {
        location.href = 'index.html';
      }
    }
    this.collected = [];
    document.querySelector('header p:last-child').textContent = levelName;
  }

  createUI() {
    const header = document.createElement('header');
    header.innerHTML = `
      <button onclick="location.href='settings.html'">${languages[this.currentLang].settings}</button>
      <button onclick="game.logout()">${languages[this.currentLang].quit}</button>
      <p>${languages[this.currentLang].score}: <span id="score">0</span>/${this.elements.length}</p>
      <p>Coins: <span id="coins">${this.userCoins}</span></p>
      <p></p>
    `;
    document.body.appendChild(header);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
      <button onclick="game.move('left')">${languages[this.currentLang].controls.left}</button>
      <button onclick="game.move('right')">${languages[this.currentLang].controls.right}</button>
      <button onclick="game.move('up')">${languages[this.currentLang].controls.up}</button>
      <button onclick="game.move('down')">${languages[this.currentLang].controls.down}</button>
    `;
    document.body.appendChild(controls);
  }

  setupModal() {
    this.modal = document.createElement('div');
    this.modal.id = MODAL_ID;
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <div class="modal-content">
        <div class="info">
          <p id="modalQuestionLabel">${languages[this.currentLang].questionLabel}</p>
          <span id="closeModal" class="close-button">×</span>
        </div>
        <p id="question"></p>
        <input type="text" id="answer" placeholder="${languages[this.currentLang].placeholder}">
        <p id="error" style="color: red; display: none;">${languages[this.currentLang].wrong}</p>
        <details>
          <summary>${languages[this.currentLang].hint}</summary>
          <p id="hint"></p>
        </details>
        <button id="submitAnswer">${languages[this.currentLang].send}</button>
      </div>
    `;