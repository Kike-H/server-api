const fs = require('fs');
const path = require('path');

class TaskManager {
    constructor() {
        this.database_path = path.join(__dirname, '../../database.json')
    }

    get() {
        return JSON.parse(fs.readFileSync(this.database_path, 'utf-8'));
    }

    post(new_task) {
        let data = JSON.parse(fs.readFileSync(this.database_path, 'utf-8'));
        new_task.id = data.length > 0 ? data[data.length - 1].id+1 : 1;
        data.push(new_task);
        fs.writeFileSync(this.database_path, JSON.stringify(data));
        return new_task.id;
    }

    delete(id) {
        let data = JSON.parse(fs.readFileSync(this.database_path, 'utf-8'));
        data = data.filter((value) => id != value.id)
        fs.writeFileSync(this.database_path, JSON.stringify(data))
        return data;
    }

} 


module.exports = { TaskManager };