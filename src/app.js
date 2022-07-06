require('colors')
const express = require('express');
const tasks = require('./routes/task')

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`.green);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/tasks', tasks)

