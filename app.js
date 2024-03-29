// selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); 
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// functions
function addTodo(event) { 
    //Prevent from from submitting
    event.preventDefault(); 
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to localStorage
    saveLocalTodos(todoInput.value);
    //Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //clear TodoInputValue 
    todoInput.value = '';
}


function deleteCheck(e) { 
    // Delete todo 
    const item = e.target; 
    if(item.classList[0] === 'trash-btn') { 
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

     //check mark
     if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement; 
        todo.classList.toggle('completed');
    }
}

function filterTodo (e) { 
    const todos = todoList.childNodes; 
    todos.forEach(function (todo) { 
        switch(e.target.value){ 
            case "all":
                todo.style.display = "flex"
                break;
            case "completed": 
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'; 
                } else {
                    todo.style.display = "none";
                }
                break; 
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'; 
                } else {
                    todo.style.display = "none";
                }
                break; 
        }
    })
}

function saveLocalTodos(todo) { 
    // Check --- do we have information to save? 
    let todos; 
    if(localStorage.getItem('todos') === null) {
        todos = []; 
    } else { 
        todos = JSON.parse(localStorage.getItem('todos')); 
    }

    todos.push(todo); 
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

function getTodos() { 
      // Check --- do we have information to save? 
      let todos; 
      if(localStorage.getItem('todos') === null) {
          todos = []; 
      } else { 
          todos = JSON.parse(localStorage.getItem('todos')); 
      }
  
    todos.forEach(function(todo){ 
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
        })
}

function removeLocalTodos (todo) { 
    // Check --- do we have information to save? 
    let todos; 
    if(localStorage.getItem('todos') === null) {
        todos = []; 
        } else { 
        todos = JSON.parse(localStorage.getItem('todos')); 
    }
    
    const todoIndex = todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem('todos', JSON.stringify(todos));
}