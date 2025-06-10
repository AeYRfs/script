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
    {
      name: 'H2O', x: 100, y: 150, color: '#2ca02c', shape: 'circle',
      question: { en: 'What is H2O called?', ru: 'Как называется H2O?' },
      answer: { en: 'water', ru: 'вода' },
      hint: { en: 'Common liquid essential for life', ru: 'Обычная жидкость, необходимая для жизни' }
    },
  ],
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
      localStorage.setItem('gameLanguage', 'en');
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

  loadLevel() {
    let levelName = '';
    if (this.currentLevel.startsWith('custom_')) {
      const levelId = this.currentLevel.replace('custom_', '');
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const customLevel = users[this.currentUser].customLevels?.find(l => l.id === parseInt(levelId));
      if (customLevel) {
        levelName = customLevel.name[this.currentLang];
        this.background.src = customLevel.background || 'icons/background.jpg';
        this.elements = customLevel.questions[this.currentLang].map((q, i) => ({
          name: q.name,
          x: (customLevel.questions.x[i] || 0) * (this.canvas.width / 2),
          y: (customLevel.questions.y[i] || 0) * (this.canvas.height / 2),
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
    this.collected.length = 0;
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
    document.body.appendChild(this.modal);

    document.getElementById('submitAnswer').onclick = () => this.checkAnswer();
    document.getElementById('closeModal').onclick = () => {
      this.modal.style.display = 'none';
    };
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 100;
  }

  startGameLoop() {
    const draw = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.background.complete) {
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
      }

      this.elements.forEach(el => {
        if (!this.collected.includes(el.name)) {
          this.ctx.beginPath();
          this.ctx.arc(el.x, el.y, 15, 0, Math.PI * 2);
          this.ctx.fillStyle = el.color;
          this.ctx.fill();
          this.ctx.closePath();
          this.ctx.fillStyle = 'black';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(el.name, el.x, el.y + 5);
        }
      });

      if (this.player.image.complete) {
        this.ctx.drawImage(this.player.image, this.player.x, this.player.y, this.player.size, this.player.size);
      }

      this.checkCollision();
      requestAnimationFrame(draw);
    };
    draw();
  }

  checkCollision() {
    this.elements.forEach(el => {
      if (
        !this.collected.includes(el.name) &&
        Math.abs(this.player.x + this.player.size / 2 - el.x) < 20 &&
        Math.abs(this.player.y + this.player.size / 2 - el.y) < 20
      ) {
        this.currentElement = el;
        this.showQuestion();
      }
    });
  }

  showQuestion() {
    if (this.currentElement) {
      document.getElementById('question').textContent = this.currentElement.question;
      document.getElementById('hint').textContent = this.currentElement.hint;
      document.getElementById('answer').value = '';
      document.getElementById('error').style.display = 'none';
      this.modal.style.display = 'block';
    }
  }

  checkAnswer() {
    const answerInput = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = this.currentElement.answer.toLowerCase();
    if (answerInput === correctAnswer) {
      this.collected.push(this.currentElement.name);
      this.userCoins += 10;
      this.updateUserData();
      document.getElementById('score').textContent = this.collected.length;
      document.getElementById('coins').textContent = this.userCoins;
      this.modal.style.display = 'none';
      this.checkLevelCompletion();
    } else {
      document.getElementById('error').style.display = 'block';
    }
  }

  updateUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[this.currentUser].coins = this.userCoins;
    localStorage.setItem('users', JSON.stringify(users));
  }

  checkLevelCompletion() {
    if (this.collected.length === this.elements.length && !this.isLevelCompleted) {
      this.isLevelCompleted = true;
      if (!this.levelsCompleted.includes(this.currentLevel)) {
        this.levelsCompleted.push(this.currentLevel);
        localStorage.setItem(`progress_${this.currentUser}`, JSON.stringify(this.levelsCompleted));
      }
      alert('Level completed!');
      location.href = 'levels.html';
    }
  }

  move(direction) {
    const speed = 10;
    switch (direction) {
      case 'left':
        this.player.x = Math.max(0, this.player.x - speed);
        break;
      case 'right':
        this.player.x = Math.min(this.canvas.width - this.player.size, this.player.x + speed);
        break;
      case 'up':
        this.player.y = Math.max(0, this.player.y - speed);
        break;
      case 'down':
        this.player.y = Math.min(this.canvas.height - this.player.size, this.player.y + speed);
        break;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.href = 'index.html';
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

const game = new ChemistryGame();

window.addEventListener('load', () => {
  game.init();
});
window.addEventListener('resize', () => {
  game.resizeCanvas.bind(game);
});