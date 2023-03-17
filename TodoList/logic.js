let projects = document.querySelectorAll('.projects');
let generalLoc = document.querySelector('.aside');
let listOfProjects = ['Start'];
let numberOfProjects = 0;
let numberOfTasks = 0;

projects.forEach(project => {
    project.addEventListener('click', addChangeAttr(project));
})

function addChangeAttr(project){
    for(let child of project.children){
        console.log(child);
        let attr = child.style.display == 'none' ? 'block' : 'none';
        child.style.display = attr;
    }
}

function Project(name){
    this.id = ++numberOfProjects;
    this.name = name;
    this.taskContainer = [];
}

function createProject(name){
    addToList(new Project(name));
}

function addToList(newProject){
    const newDiv = document.createElement('div');
    newDiv.classList.add('projects');
    newDiv.id = `Project${newProject.id}`;
    let divContent = document.createTextNode(newProject.name);
    newDiv.appendChild(divContent);
    newDiv.addEventListener('click', addChangeAttr(newDiv));

    let location = generalLoc.lastChild;
    location.parentNode.insertBefore(newDiv, location.nextSibling);
    listOfProjects[listOfProjects.length] = newProject;
}

function Task(projectID, title, description, dueDate, priority){
    this.projectID = projectID;
    this.id = ++numberOfTasks;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

function createTask(projectID, title, description, dueDate, priority){
    addToProjects(new Task(projectID, title, description, dueDate, priority));
}

function addToProjects(newTask){
    
    const newDiv = document.createElement('div');
    newDiv.classList.add(`project${newTask.projectID}`);
    newDiv.id = `task${newTask.id}`;
    let divContent = document.createTextNode(newTask.title);
    console.log(divContent);
    newDiv.append(divContent);

    for(let i = 1; i <= listOfProjects.length; i++){
        if(newTask.projectID == listOfProjects[i].id){
            document.querySelector(`#project${newTask.projectID}`).appendChild(newDiv);
            listOfProjects[newTask.projectID].taskContainer[taskContainer.length] = newTask;
            break;
        }
    }
}

