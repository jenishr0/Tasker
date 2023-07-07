import React from 'react'
import Task from '../TaskForm/TaskForm'
import './TaskList.scss'

function TaskList(props) {
    const { tasks } = props;
    const { email } = props;
    return (
        <div className="Task-list">
            <div className="Tasklist-header">
                <p className='Tasklist-text'>TaskList</p>
            </div>
            <div className="Tasklist-body" id="task-set-body">
                {tasks.map((task) => (
                    <Task key={task._id} email={email} task={task} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
