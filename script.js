//add UI elements

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// add event listeners

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', removeList);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

//define function

    //addTask function
function addTask (e){

    if (taskInput.value === ''){

        alert("plzz add a task!");

    }else{

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + 
        " "));

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
        
    }
    e.preventDefault();
}


    //removeTask function

function removeTask(e){

    if (e.target.hasAttribute("href")){

        if (confirm("Are you sure!")){

            let ele = e.target.parentElement;
            ele.remove();

            removeFromLS(ele);

        }
    }
    
}


function removeList(){
    taskList.innerHTML = "";
    localStorage.clear();
}


function filterTask(e){
    let text = e.target.value.toLowerCase();
    
    document.querySelectorAll('li').forEach(task => {

        let item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1){

            task.style.display = 'block';

        } else {

            task.style.display = 'none';
        }
    });
}


//store task in local sotrage

function storeTaskInLocalStorage(task){

    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));

}



function getTask(){

    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + 
        " "));

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

    });
}


function removeFromLS (taskItem){

    let tasks;

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {

        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
