const http = require('http');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '_/demoFile');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('myFile');

app.post('/', upload, (req, res) => {
    if (req.file) {
        res.send('File upload done');
    } else {
        res.status(400).send('File upload error');
    }
});

// Use Express for handling routes
app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is Home Page</h1>');
    res.end();
});

app.get('/about', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is About Page</h1>');
    res.end();
});

app.get('/contact', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>This is Contact Page</h1>');
    res.end();
});

app.get('/file-write', (req, res) => {
    fs.writeFile('demo.txt', 'hello world', (error) => {
        if (error) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("File Write Failed :(");
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("File Write Success :)");
            res.end();
        }
    });
});

const server = http.createServer(app);

server.listen(5500, () => {
    console.log('This server is ready now :)');
});
