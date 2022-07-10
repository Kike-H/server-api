const http = require('http');

const { TaskManager } = require('./modules/task')

const host = 'localhost';
const port = 8000;


http.createServer((req, res) => {
    //Task Manager
    let taskManager = new TaskManager();

    let url  = req.url;
    let points = url.split('/');
    //Main rote
    if(url == '/') {
        res.writeHead(200)
        res.end("Hello world!");
    }
    //Task rotes 
    else if (points[1] == 'tasks') {
        console.log(points)
        if(req.method == 'GET') {
            res.setHeader('Content-Type','application/json');
            res.writeHead(200);
            res.end(JSON.stringify(taskManager.get()));
        }
        if(req.method == 'POST') {
            res.writeHead(200);
            req.on('data', (body) => {
                let new_task = JSON.parse(body.toString());
                res.end(taskManager.post(new_task).toString());
            });
        }
        if(req.method == 'DELETE') {
            let index = parseInt(points[2]);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(JSON.stringify(taskManager.delete(index)));
        }
    }
        
}).listen(port, host, () => {
    console.log(`Sercer is running on http://${host}:${port}`);
});
