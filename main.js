//Добавление новой задачи
let addForm = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
//Находим инпут фильтра
let filter = document.querySelector('#filter');

//Добавление нового элемента в ul
addForm.addEventListener('submit', addItem);

function addItem(e) {
    //Отменяем отправку формы
    e.preventDefault();
    //Находим инпут с текстом для новой задачи
    let newItemInput = document.querySelector('#newItemText');
    //Получаем текст из инпута
    let newItemText = newItemInput.value;

    //Создаем элемент для новой задачи
    let newElement = document.createElement('li');
    newElement.className = 'list-group-item';

    //Добавим текст в новый элемент
    let newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);

    //Создаем кнопку
    let deleteBtn = document.createElement('button');
    //Добавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode('удалить'));
    //Добавляем Css класс в кнопку
    deleteBtn.className = 'btn btn-light btn-sm float-right';
    //Добавляем data-аттрибут
    deleteBtn.dataset.action = 'delete';
    //Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);

    //Добавление на страницу задачи при вводе в инпут
    itemsList.prepend(newElement);
    //Очистим поле добавления новой задачи
    newItemInput.value = "";

    //Сохранение в localStorage
    todoList.push(newItemText);
    localStorage.setItem('todo', JSON.stringify(todoList));
}

let todoList = [];

let jsonString;
//Проверяем есть ли задачи в LS или нет
if (!localStorage.getItem('todo')) {
    todoList = [];
} else {
    jsonString = localStorage.getItem('todo');
    todoList = JSON.parse(jsonString);
}
console.log(todoList);


//Удаление элемента
itemsList.addEventListener('click', removeItem);

function removeItem(e) {
    //Проверка на наличие у элемента аттрибута data-action с именем delete
    if (e.target.getAttribute('data-action') == 'delete') {
        if (confirm('Удалить задачу')) {
            //Удаление родителя элемента
            jsonString = localStorage.getItem('todo');
            todoList = JSON.parse(jsonString);
            todoList = todoList.filter(todo => todo !== e.target.parentNode.firstChild.textContent)
            localStorage.setItem('todo', JSON.stringify(todoList))
            e.target.parentNode.remove();

        }
    }
}

//Вывод полученных данных из LS на страницу

todoList.forEach((item) => {
    let newElement = document.createElement('li');
    newElement.className = 'list-group-item';
    //Добавим текст в новый элемент
    let newTextNode = document.createTextNode(item);
    newElement.appendChild(newTextNode);
    //Создаем кнопку
    let deleteBtn = document.createElement('button');
    //Добавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode('удалить'));
    //Добавляем Css класс в кнопку
    deleteBtn.className = 'btn btn-light btn-sm float-right';
    //Добавляем data-аттрибут
    deleteBtn.dataset.action = 'delete';
    //Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    //Добавление на страницу задачи при вводе в инпут
    itemsList.prepend(newElement);
})


//Фильтрация - прослушка ввода
filter.addEventListener('keyup', filterItems);

function filterItems(e) {
    //Получаем фразу для поиска и переводим ее в нижний регистр
    let serchedText = e.target.value.toLowerCase();

    //1. Получаем список всех задач
    let items = itemsList.querySelectorAll('li');

    //2 Перебираем циклом все найденные теги li с задачами
    items.forEach(function(item) {
        //Получаем текст задачи из списка и переводим его в нижний регистр
        let itemText = item.firstChild.textContent.toLowerCase();
        //Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.includes(serchedText)) {
            //Если вхождение есть - показывем элемент с задачей
            item.style.display = 'block';
        } else {
            //Если вхождения нет - скрываем элемент с задачей
            item.style.display = 'none';
        }
    })
}