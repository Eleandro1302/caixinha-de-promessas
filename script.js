// Autor: Eleandro

let promises = [];


const loadPromisesFromXML = async () => {
    try {
        const response = await fetch('./promises.xml'); 
        if (!response.ok) throw new Error('Erro ao carregar o arquivo XML');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
        const promiseNodes = xmlDoc.getElementsByTagName('promise');
        promises = Array.from(promiseNodes).map(promise => ({
            text: `${promise.getElementsByTagName('versiculo')[0].textContent} - ${promise.getElementsByTagName('localizacao')[0].textContent}`
        }));
        console.log('Promessas carregadas:', promises.length);
    } catch (error) {
        console.error('Erro ao carregar promessas:', error);
    }
};


const showRandomPromise = () => {
    if (promises.length === 0) {
        document.getElementById('promise-text').textContent = 'Nenhuma promessa disponível.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * promises.length);
    document.getElementById('promise-text').textContent = promises[randomIndex].text;
};


loadPromisesFromXML();


document.getElementById('new-promise').addEventListener('click', showRandomPromise);
