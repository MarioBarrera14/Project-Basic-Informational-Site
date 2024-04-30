const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const app = express();

const PUERTO = 443;

https.createServer({
    cert: fs.readFileSync('mi_certificado.crt'),
    key: fs.readFileSync('mi_certificado.key')
}, app).listen(PUERTO, function() {
    console.log('Servidor https corriendo en el puerto 443');
});

app.get("/", (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile("index.html", options);
});

app.get("/:name", (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    let fileName = req.params.name;
    // Envía el archivo solicitado si existe, de lo contrario, envía un archivo 404.html
    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            res.sendFile('404.html', options);
        } else {
            res.sendFile(fileName, options);
        }
    });
});
