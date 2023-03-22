let projects = document.querySelector('.projects');
let mainDisplay = document.querySelector('.taskContainer');
let listItems;
let listOfProjects = [];
let numberOfProjects = 0;
let numberOfTasks = 0;

function changeAttr(project){
    return function(){
        listItems = projects.querySelectorAll('li');
        for(let element of listItems){
            if(element.classList.contains('active')){
                element.classList.remove('active');
                break;
            } 
        }
        project.classList.add('active');
    }
}

function Project(name){
    this.id = numberOfProjects++;
    this.name = name;
    this.taskContainer = [];
}

function createProject(name){
    addToList(new Project(name));
}

function addToList(newProject){
    const newLI = document.createElement('li');
    newLI.id = `Project${newProject.id}`;
    let divContent = document.createTextNode(newProject.name);
    newLI.appendChild(divContent);
    newLI.addEventListener('click', () => {
        changeMainDisplay(newProject);
    });

    let location = projects.lastChild;
    location.parentNode.insertBefore(newLI, location.nextSibling);
    listOfProjects[listOfProjects.length] = newProject;
}

createProject('altini');
document.querySelector('#Project0').style.marginTop = '35px';

function Task(projectID, title, description, dueDate){
    this.projectID = projectID;
    this.id = ++numberOfTasks;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
}

function createTask(projectID, title, description, dueDate){
    let task = new Task(projectID, title, description, dueDate);
    let count = 0;
    for(let i = 0; i < listOfProjects.length; i++){
        if(listOfProjects[i].id == task.projectID){
            listOfProjects[i].taskContainer.push(task);
            count++;
        }
    }

    if(count == 0){
        numberOfTasks--;
        return;
    }
}

function changeMainDisplay(Project){
    mainDisplay.previousElementSibling.textContent = Project.name;
    mainDisplay.textContent = '';
    if(Project.taskContainer.length == 0){
        let noTask = document.createElement('div');
        noTask.classList.add('noTask');
        noTask.textContent = 'This project has no tasks';
        mainDisplay.appendChild(noTask);
    } else {
        for(let i = 0; i < Project.taskContainer.length; i++){
            addToDisplay(Project.taskContainer[i]);
        }
    }
}

function addToDisplay(task){
    let newDiv = document.createElement('div');
    let leftSideTask = document.createElement('div');
    let rightSideTask = document.createElement('div');
    let favBtn = document.createElement('button');
    let delBtn = document.createElement('button');
    let name = document.createElement('h1');
    let theDate = document.createElement('h1'); 
    newDiv.classList.add('task');
    leftSideTask.classList.add('leftSideTask');
    rightSideTask.classList.add('rightSideTask');
    favBtn.className = 'btn btn-warning';
    delBtn.className = 'btn btn-danger';
    favBtn.type = 'button';
    delBtn.type = 'button';
    newDiv.id = task.id;

    favBtn.textContent = 'FAV';
    delBtn.textContent = 'DEL';
    name.textContent = task.title;
    theDate.textContent = task.dueDate;

    leftSideTask.appendChild(favBtn);
    leftSideTask.appendChild(name);
    rightSideTask.appendChild(theDate);
    rightSideTask.appendChild(delBtn);

    newDiv.appendChild(leftSideTask);
    newDiv.appendChild(rightSideTask);
    mainDisplay.appendChild(newDiv);
}