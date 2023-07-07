function CreateTask(TaskSet, task) {
    TaskSet.push(task);
    return TaskSet;
}

function DeleteTask(TaskSet, task) {
    let index = -1;
    for (let item in TaskSet) {
        index++;
        if (TaskSet[item].title == task.title) {
            TaskSet.splice(index, 1);
            break;
        }
    }
    return TaskSet;
}

function UpdateTask(TaskSet, task, updatedTask) {
    let index = -1;
    for (let item in TaskSet) {
        index++;
        if (TaskSet[item].title == task.title) {
            TaskSet[index] = updatedTask;
            break;
        }
    }
    return TaskSet;
}

module.exports = { CreateTask, DeleteTask, UpdateTask }