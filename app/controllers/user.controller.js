const User = require("../models/schema.model");
const connDB = require("../config/db.config");
const bcrypt = require('bcryptjs');
const { CreateTask, DeleteTask, UpdateTask } = require("../controllers/task.controller")

const createUser = async (user) => {
    await connDB();
    try {
        const newUser = new User(user);
        await newUser.save();
        return true;
    } catch (error) {
        return false;
    }
}

const findUser = async (email, password) => {
    await connDB();
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                return user;
            } else {
                return false;
            }
        }
    } catch (error) {
        return false;
    }
}

//Task methods
const fetchTasks = async (email) => {
    await connDB();
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return user.tasks;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

const addTask = async (email, task) => {
    await connDB();
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            user.tasks = CreateTask(user.tasks, task);
            await user.save();
            return user.tasks;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

const deleteTask = async (email, task) => {
    await connDB();
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            user.tasks = DeleteTask(user.tasks, task);
            await user.save();
            return user.tasks;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const updateTask = async (email, task, updatedTask) => {
    await connDB();
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            user.tasks = UpdateTask(user.tasks, task, updatedTask);
            await user.save();
            return user.tasks;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

const fetchAll = async () => {
    let Users = [];
    await connDB();
    try {
        const users = await User.find({});
        console.log(users);
        if (users) {
            users.forEach(user => {
                Users.push({
                    name: user.name,
                    email: user.email,
                    tasks: user.tasks
                });
            });
            return Users;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports = {
    createUser, findUser, fetchTasks, addTask, deleteTask, updateTask, fetchAll
}
