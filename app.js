// Берем тудулист с прошлого занятия
// И апгрейдим его :)

// Добавляем валидацию на лету - то есть валидируем прям во время ввода текста
// Добавляем возможность отправлять сообщения по нажатию на ENTER
// при нажатии комбинации SHIFT а потом backspace должны полностью стереть весь текст в инпуте


const inpE = document.getElementById('input');
const btnE =  document.getElementById('btn');
const errorE =  document.querySelector('.error-cont');
const ulContainerE = document.getElementById('list');

inpE.addEventListener('keyup', validateTodo);
inpE.addEventListener('keydown', clearAll);
btnE.addEventListener('click', onAddListItem);
ulContainerE.addEventListener('click', onTodoClick);

start();

function start () {
    inpE.focus();
    btnE.disabled = true;
}

function validateTodo (e) {
    if (!e.target.value.trim()) {
        errorE.innerText = 'Type something';
        start();
        return;
    }
    if (e.target.value.trim().length <= 3) {
        errorE.innerText = 'Error, length should be > 3';
        start();
        return;
    }
    // console.log(e)
    if (e.keyCode === 13) {
        onAddListItem();
        start();
        return;
    };
    
    errorE.innerText = '';
    btnE.disabled = false;
    inpE.focus();
}

function onAddListItem() {
    renderElement(createElement('li'), ulContainerE);
    clearValue(inpE);
    start();
}

function createElement(tag) {
    const element = `<${tag} class="item" name="todo"
        <div>${inpE.value}</div>
        <button type="button" class="delete" name="delete">x</button>
        </${tag}>`;
    return element;
}

function renderElement(element, container) {
    container.innerHTML += element;
}

function clearValue(e) {
    e.value = '';
}

function clearAll(e) {
    // console.log(e);
    if (e.shiftKey && e.key === "Backspace") {
        // console.log('deleted')
        clearValue(inpE);
        start();
        return;
    }
}

function onTodoClick(e) {
    [...e.target.attributes].forEach(el => {
        if (el.value === 'todo') {
            completeTodoItem(e.target);
        }
        if (el.value === 'delete') {
            deleteTodoItem(e.target);
        }
    });
}

function completeTodoItem (elem) {
    elem.classList.toggle('list-item-done');
}

function deleteTodoItem (elem) {
    elem.closest('.item').remove();
}