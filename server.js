// Autor: Eleandro

const express = require('express');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

let promises = [];


const loadPromisesFromXML = () => {
    const xmlFilePath = path.join(__dirname, 'promises.xml'); 
    const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');
    xml2js.parseString(xmlData, (err, result) => {
        if (err) {
            console.error('Erro ao carregar o arquivo XML:', err);
            return;
        }
        promises = result.root.promise.map(item => ({
            text: `${item.versiculo[0]} - ${item.localizacao[0]}`
        }));
        console.log('Frases carregadas do XML:', promises.length);
    });
};


loadPromisesFromXML();


app.use(express.static(path.join(__dirname)));


app.get('/api/promise', (req, res) => {
    if (promises.length === 0) {
        return res.status(500).json({ text: 'Nenhuma promessa disponível.' });
    }
    const randomIndex = Math.floor(Math.random() * promises.length);
    res.json(promises[randomIndex]);
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


