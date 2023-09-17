const TODO_SAVE_KEY = 'todoList';
let todoArr = [];
const todo = {
  todoInput: document.querySelector('#main-box__submit input'),
  todoForm: document.querySelector('#main-box__submit'),
  todoListBox: document.querySelector('.todo-list__box'),
  todoList: document.querySelector('.todo-list__todos'),
  todoDefaultImg: document.querySelector('.main-box__todolist img'),
  todoColor: [
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color13',
  ],
  saveToDo: function (event) {
    event.preventDefault();

    const todoName = todo.todoInput.value;
    const todoObj = {
      todoName: todoName,
      todoDone: 0,
      id: Date.now(),
    };
    todoArr.push(todoObj);
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todoArr));
    todo.firstToDoCheck();
    todo.paintToDo(todoObj);
    todo.todoInput.value = '';
  },
  paintToDo: function (todoObj) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-list__todo';

    const todoColor = document.createElement('div');
    const ranColor = todo.randomColor();
    todoColor.className = `todo-color ${ranColor}`;

    const todoName = document.createElement('div');
    todoName.className = 'todo-name';
    const todoSpan = document.createElement('span');
    todoSpan.innerText = todoObj.todoName;
    todoName.appendChild(todoSpan);

    const todoBtn = document.createElement('div');
    todoBtn.className = 'todo-btn';
    todoBtn.innerHTML = `<div class="todo-btn__todo-toggle"><input type="checkbox" id=${todoObj.id} class="toggleChk" value=${todoObj.todoDone} hidden /><label for=${todoObj.id} class="toggleSwitch"><span class="toggleButton"></span></label></div><div class="todo-btn__dlt-each display-none"><i class="fa-solid fa-trash-can"></i></div>`;
    todoDiv.appendChild(todoColor);
    todoDiv.appendChild(todoName);
    todoDiv.appendChild(todoBtn);

    todo.todoList.appendChild(todoDiv);
  },
  randomColor: function () {
    const randomNum = Math.floor(Math.random() * 13);
    return todo.todoColor[randomNum];
  },
  readToDo: function () {
    const savedJson = JSON.parse(localStorage.getItem(TODO_SAVE_KEY));
    if (savedJson) {
      todoArr = savedJson;
      todoArr.forEach(todo.paintToDo);
    } else {
      todo.todoListBox.classList.add('display-none');
      todo.todoDefaultImg.classList.remove('display-none');
    }
  },
  firstToDoCheck: function () {
    if (todoArr.length !== 0) {
      todo.todoListBox.classList.remove('display-none');
      todo.todoDefaultImg.classList.add('display-none');
    } else {
      todo.todoListBox.classList.add('display-none');
      todo.todoDefaultImg.classList.remove('display-none');
    }
  },
};

todo.readToDo();
todo.todoForm.addEventListener('submit', todo.saveToDo);
