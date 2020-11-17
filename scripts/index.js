const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button'); // для сброса всех элементов
const input = document.getElementById('item'); //для добавления новых элементов

// создаем условие, которое проверит наличие доступного localStorage, 
// чтобы itemsArray не сбрасывался каждый раз при запуске скрипта
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []; // используем тернарный оператор

localStorage.setItem('items', JSON.stringify(itemsArray)); // setItem() добавляет пару ключ-значение в локальное веб-хранилище
                                                          // JSON.stringify() конвертирует массив в строку
const data = JSON.parse(localStorage.getItem('items')); // getItem() получает значение по ключу
                                                      //JSON.parse() конвертирует содержимое localStorage в рабочий формат,
                                                    //который мы положим в переменную data
// liMaker создаст элемент с текстом,
//который будет значением input и далее, мы добавим это в DOM
const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input.value);
  input.value = "";
});

data.forEach(item => { // заново запустим liMaker(). 
                     // это покажет нам всю нужную информацию в списке при каждом открытии приложения
  liMaker(item);
});

button.addEventListener('click', function () {
  localStorage.clear(); // удалит всех потомков у ul
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});