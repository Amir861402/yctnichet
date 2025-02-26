let tasks = [];

// Генерация случайного примера
function generateTask(type) {
  let question, answer;
  switch (type) {
    case 'fraction':
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      const d = Math.floor(Math.random() * 10) + 1;
      question = `${a}/${b} + ${c}/${d} = ?`;
      answer = ((a * d + c * b) / (b * d)).toFixed(2);
      break;

    case 'decimal':
      const x = (Math.random() * 10).toFixed(1);
      const y = (Math.random() * 10).toFixed(1);
      question = `${x} * ${y} = ?`;
      answer = (x * y).toFixed(2);
      break;

    case 'percentage':
      const num = Math.floor(Math.random() * 100) + 1;
      const percent = Math.floor(Math.random() * 50) + 1;
      question = `${percent}% от ${num} = ?`;
      answer = ((num * percent) / 100).toFixed(2);
      break;

    case 'speed':
      const objects = ['автомобиль', 'велосипедист', 'лодка', 'поезд', 'пешеход'];
      const object = objects[Math.floor(Math.random() * objects.length)];
      const speedTypes = ['speed', 'time', 'distance'];
      const speedType = speedTypes[Math.floor(Math.random() * speedTypes.length)];

      let speed, time, distance;
      switch (speedType) {
        case 'speed':
          distance = Math.floor(Math.random() * 100) + 1;
          time = Math.floor(Math.random() * 10) + 1;
          question = `${object} проехал ${distance} км за ${time} часа. Найдите скорость.`;
          answer = (distance / time).toFixed(2);
          break;

        case 'time':
          distance = Math.floor(Math.random() * 100) + 1;
          speed = Math.floor(Math.random() * 50) + 1;
          question = `${object} движется со скоростью ${speed} км/ч. За какое время он преодолеет ${distance} км?`;
          answer = (distance / speed).toFixed(2);
          break;

        case 'distance':
          speed = Math.floor(Math.random() * 50) + 1;
          time = Math.floor(Math.random() * 10) + 1;
          question = `${object} движется со скоростью ${speed} км/ч. Какое расстояние он преодолеет за ${time} часа?`;
          answer = (speed * time).toFixed(2);
          break;
      }
      break;
  }
  return { type, question, answer, userAnswer: null, isCorrect: false };
}

// Загрузка 5 примеров каждого типа
function loadTasks() {
  const types = ['fraction', 'decimal', 'percentage', 'speed'];
  tasks = [];
  types.forEach(type => {
    for (let i = 0; i < 5; i++) {
      tasks.push(generateTask(type));
    }
  });
  renderTasks();
}

// Отображение задач
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = tasks.map((task, index) => `
    <div class="task">
      <div>${task.question}</div>
      <input type="text" id="answer-${index}" placeholder="Ваш ответ">
      <div class="result" id="result-${index}"></div>
    </div>
  `).join('');
}

// Проверка всех ответов
function checkAllAnswers() {
  let correctCount = 0;
  tasks.forEach((task, index) => {
    const userAnswer = parseFloat(document.getElementById(`answer-${index}`).value);
    task.userAnswer = userAnswer;
    task.isCorrect = userAnswer === parseFloat(task.answer);

    const resultDiv = document.getElementById(`result-${index}`);
    if (task.isCorrect) {
      resultDiv.innerText = 'Правильно!';
      resultDiv.className = 'result correct';
      correctCount++;
    } else {
      resultDiv.innerText = `Ошибка! Правильный ответ: ${task.answer}`;
      resultDiv.className = 'result incorrect';
    }
    resultDiv.style.opacity = 1; // Показываем результат с анимацией
  });

  updateProgress(correctCount);
  showGrade(correctCount);
}

// Обновление шкалы прогресса
function updateProgress(correctCount) {
  const progress = (correctCount / tasks.length) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

// Показать оценку
function showGrade(correctCount) {
  const gradeElement = document.getElementById('grade');
  const percentage = (correctCount / tasks.length) * 100;

  let grade;
  if (percentage >= 90) grade = '5️⃣';
  else if (percentage >= 70) grade = '4️⃣';
  else if (percentage >= 50) grade = '3️⃣';
  else grade = '2️⃣';

  gradeElement.innerText = `Оценка: ${grade}`;
  gradeElement.style.opacity = 1; // Показываем оценку с анимацией
}

// Загружаем задачи при загрузке страницы
window.onload = loadTasks;