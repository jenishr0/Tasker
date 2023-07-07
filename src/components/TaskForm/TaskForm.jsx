import axios from 'axios'
import './TaskForm.scss'

function Task({ task, email }) {
    const user = email;
    if (task === null) {
        return null;
    } else {
        return (
            <div className="Task">
                <div className="Task-header">
                    <p id="title">{task.title}</p>
                    <button
                        className='task-btn'

                        id="status"
                        onClick={() => { changeState(user, task) }}
                    >
                        {task.status}
                    </button>
                    <button
                        className='task-btn'
                        id="delete"
                        onClick={() => { deleteTask(user, task) }}
                    >
                        Delete
                    </button>
                    <button
                        className='task-btn'
                        id="edit"
                        onClick={() => { updateTask(user, task) }}
                    >
                        Edit
                    </button>
                </div>
                <div className="Task-body">
                    <div className="Fields">
                        <p id="description">{task.description}</p>
                        <p id="due">{task.due}</p>
                        <p id="status">{task.status}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function changeState(user, task) {
    const title = task.title;
    let due = task.due;
    let description = task.description;
    let status = task.status;
    if (status === 'Incomplete') {
        status = 'Inprogress';
    } else if (status === 'Inprogress') {
        status = 'Completed';
    } else {
        status = 'Incomplete';
    }

    const updatedTask = {
        'title': title,
        'description': description,
        'status': status,
        'due': due,
        'user': user
    }

    const request = axios.create({
        baseURL: 'http://localhost:5000/user',
        headers: {
            post: {
                "access-control-allow-origin": "*",
            }
        },
    });

    request.post('/updateTask', { 'email': user, 'task': { 'title': title }, 'updatedTask': updatedTask }).then((res) => {
        console.log(res);
        alert("Task updated successfully!");
        window.location.reload();
    }).catch((err) => {
        console.log(err);
        alert("Task not updated!");
    });
}

function deleteTask(user, task) {
    const title = task.title;
    console.log('Deleting task', user, title);

    const request = axios.create({
        baseURL: 'http://localhost:5000/user',
        headers: {
            post: {
                "access-control-allow-origin": "*",
            }
        },
    });

    request.post('/deleteTask', { 'email': user, 'task': { 'title': title } })
        .then((res) => {
            console.log(res);
            alert("Task deleted successfully!");
            window.location.reload();
            return null;
        }).catch((err) => {
            console.log(err);
            alert("Task not deleted!");
        });
}

function updateTask(user, task) {
    const title = task.title;
    let newDescription = prompt('Enter new description', document.getElementById('description').value);
    let newDue = prompt('Enter new due date', document.getElementById('due').value);
    let newStatus = prompt('Enter new status', document.getElementById('status').value);

    newDescription = (newDescription === "") ? task.description : newDescription;
    newDue = (newDue === "") ? task.due : newDue;
    newStatus = (newStatus === "") ? task.status : newStatus;

    const newTask = {
        'title': title,
        'description': newDescription,
        'status': newStatus,
        'due': newDue,
        'user': user
    }

    const request = axios.create({
        baseURL: 'http://localhost:5000/user',
        headers: {
            post: {
                "access-control-allow-origin": "*",
            }
        },
    });

    request.post('/updateTask', { 'email': user, 'task': { 'title': title }, 'updatedTask': newTask })
        .then((res) => {
            console.log(res);
            alert("Task updated successfully!");
            window.location.reload();
            return newTask;
        }).catch((err) => {
            console.log(err);
            alert("Task not updated!");
        });

}

export default Task;