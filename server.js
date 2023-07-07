const express = require("express");
const bcrpyt = require('bcryptjs');
const cors = require("cors");
const { createUser, findUser, addTask, deleteTask, updateTask, fetchTasks, fetchAll } = require('./app/controllers/user.controller');
const app = express();

const user = express.Router();
const admin = express.Router();
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("./app/config/admin_cred");


user.use(express.json());
admin.use(express.json());

app.use(cors());

app.use('/user', user);
app.use('/admin', admin);

// User Tasks

user.post("/", (req, res) => {
    res.status(200).end();
});


user.post('/register', async (req, res) => {
    try {
        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);
        const user = { name: req.body.name, email: req.body.email, password: hashedPassword, tasks: [] };

        if (await createUser(user)) {
            res.status(201).send();
        } else {
            res.status(500).send(false);
        }

    } catch (error) {
        res.status(500).send(false);
    }
});


user.post('/login', async (req, res) => {
    findUser(req.body.email, req.body.password).then((user) => {
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send(false);
        }
    });
});

user.post('/tasks', (req, res) => {
    const email = req.body.email;
    fetchTasks(email).then((tasks) => {
        if (tasks) {
            res.status(200).send(tasks);
        } else {
            res.status(400).send();
        }
    });
});

user.post('/addtask', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const email = req.body.email;
    addTask(email, req.body.task)
        .then((taskSet) => {
            console.log(taskSet);
            res.status(201).send(taskSet).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to add task").end();
        });
});

user.post("/deletetask", (req, res) => {
    const email = req.body.email;
    deleteTask(email, req.body.task)
        .then((taskSet) => {
            console.log(taskSet);
            res.status(201).send(taskSet).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to delete task").end();
        });
});

user.post("/updatetask", (req, res) => {
    const email = req.body.email;
    updateTask(email, req.body.task, req.body.updatedTask)
        .then((taskSet) => {
            console.log(taskSet);
            res.status(201).send(taskSet).end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Failed to update task").end();
        });
});


// Admin Tasks

admin.post('/fetchAll', (req, res) => {
    const admin = req.body.email;
    const password = req.body.password;
    if (admin === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        fetchAll().then((users) => {
            if (users) {
                res.status(201).send(users).end();
            } else {
                res.status(500).send("Not Allowed").end();
            }
        });
    } else {
        res.status(500).send("Not Allowed").end();
    }
});

admin.post('/addtask', (req, res) => {
    const email = req.body.email;
    const taskSet = addTask(email, req.body.task);
    if (taskSet) {
        res.status(201).send(taskSet).end();
    } else {
        res.status(500).send("Failed to add task").end();
    }
});

admin.post('/deletetask', (req, res) => {
    const email = req.body.email;
    const taskSet = deleteTask(user.tasks, req.body.task);
    if (taskSet) {
        res.status(201).send(taskSet).end();
    } else {
        res.status(500).send("Failed to delete task").end();
    }
});

admin.post('/updatetask', (req, res) => {
    const email = req.body.email;
    const taskSet = updateTask(user.tasks, req.body.task, req.body.updatedTask);
    if (taskSet) {
        res.status(201).send(taskSet).end();
    } else {
        res.status(500).send("Failed to update task").end();
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
