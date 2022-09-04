let jobTodoList = []
let jobCompletedList = []
let content = ''

function start() {
    if (localStorage.getItem('TodoJobs')) {
        jobTodoList = JSON.parse(localStorage.getItem('TodoJobs'));
        render_JobTodoList()
    } else { return [] }

    if (localStorage.getItem('CompletedJobs')) {
        jobCompletedList = JSON.parse(localStorage.getItem('CompletedJobs'));
        render_JobCompletedList()
    } else { return [] }
}

start()

//! -------------- TodoJob --------

document.querySelector('#addItem').onclick = 
addTodoJob;

document.querySelector('#todo').onclick = deleteTodoJob;

document.querySelector('#two').onclick = sortA_Z;

document.querySelector('#three').onclick = sortZ_A;


function addTodoJob() {
    let todoJob = document.querySelector('#newTask').value;

    jobTodoList.push(todoJob)

    localStorage.setItem("TodoJobs", JSON.stringify(jobTodoList));
    render_JobTodoList()


    document.querySelector('#newTask').value = null

 
    document.querySelector('#newTask').focus()
}


function deleteTodoJob(event) {

    const deleteBtn = event.target.closest('.remove')
   
    if (deleteBtn) {
        const index = deleteBtn.dataset.index

        jobTodoList.splice(index, 1)
        localStorage.setItem("TodoJobs", JSON.stringify(jobTodoList));
        render_JobTodoList()
    }
}


function render_JobTodoList() {
    const content = jobTodoList.map((job, index) => { return `
    <li>${job}
    <div class="buttons">

      <button class="remove" data-index="${index}"><i class="fas fa-trash-alt"></i></button>

      <button class="complete" data-index="${index}"><i class="far fa-check-circle"></i></button>
    </div>
    </li>
    `
    }).join("")

    document.querySelector('#todo').innerHTML = content
}

function sortA_Z() {
    jobTodoList.sort()
    render_JobTodoList()
}

function sortZ_A() {
    jobTodoList.reverse()
    render_JobTodoList()
}


//! -------------- Completed job --------
document.querySelector('#todo').addEventListener('click', addCompletedJob);

document.querySelector('#completed').onclick = deleteCompletedJob;


function addCompletedJob(event) {
    const completeBtn = event.target.closest('.complete')

    if (completeBtn) {
        const index = completeBtn.dataset.index
   
        jobCompletedList.push(jobTodoList[index])
        localStorage.setItem("CompletedJobs", JSON.stringify(jobCompletedList));
        render_JobCompletedList()


        //xóa cái cũ
        jobTodoList.splice(index, 1)
        localStorage.setItem("TodoJobs", JSON.stringify(jobTodoList));
        render_JobTodoList()
    
    }
}


function deleteCompletedJob() {
    const deleteBtn = event.target.closest('.remove')
    if (deleteBtn) {
        const index = deleteBtn.dataset.index

        jobCompletedList.splice(index, 1)
        localStorage.setItem("CompletedJobs", JSON.stringify(jobCompletedList));
        render_JobCompletedList()
    }
}


function render_JobCompletedList() {
    const content = jobCompletedList.map((job, index) => { return `
    <li>${job}
    <div class="buttons">

      <button class="remove" data-index="${index}"><i class="fas fa-trash-alt"></i></button>

      <button class="complete" data-index="${index}"><i class="far fa-check-circle"></i></button>
    </div>
    </li>
    `
    }).join("")

    document.querySelector('#completed').innerHTML = content
}


