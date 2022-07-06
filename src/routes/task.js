const express = require('express');
const tasks = express.Router();

const fs = require('fs');
const path = require('path');

const database_path = path.join(__dirname, '../../database.json')

tasks.get('/', function (req,res) {
    data = JSON.parse(fs.readFileSync(database_path, 'utf-8'))
    console.log(data)
    res.send(data)
})

tasks.post('/', function (req,res) {
    data = JSON.parse(fs.readFileSync(database_path, 'utf-8'))
    req.body.id = data.length > 0 ? data[data.length - 1].id+1 : 1
    data.push(req.body)
    fs.writeFileSync(database_path, JSON.stringify(data))
    res.send(data)
})

tasks.delete('/:id', function (req,res) {
    data = JSON.parse(fs.readFileSync(database_path, 'utf-8'))
    data = data.filter((value) => req.params.id != value.id)
    fs.writeFileSync(database_path, JSON.stringify(data))
    res.send(data)
})

module.exports = tasks;