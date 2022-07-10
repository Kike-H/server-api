const fs = require('fs');
const path = require('path');

class TaskManager {
    constructor() {
        this.db_path = path.join(__dirname, '../../db.json');
        this.tasks = JSON.parse(fs.readFileSync(this.db_path, 'utf-8'));
    }

    get() {
        return this.tasks;
    }

    post(new_task) {
        new_task.id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id+1 : 1;
        this.tasks.push(new_task);
        fs.writeFileSync(this.db_path, JSON.stringify(this.tasks));
        return new_task.id;
    }

    delete(id) {
        this.tasks = this.tasks.filter((value) => id != value.id)
        fs.writeFileSync(this.db_path, JSON.stringify(this.tasks));
        return this.tasks;
    }

} 


module.exports = { TaskManager };