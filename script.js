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

const shareOnInstagram = async () => {
    const containerElement = document.querySelector('.container'); // Captura o contêiner inteiro
    if (!containerElement) {
        alert('Nenhum conteúdo disponível para compartilhar.');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        alert('Erro: html2canvas não está carregado.');
        console.error('html2canvas não está definido.');
        return;
    }

    try {
        // Captura o contêiner inteiro como imagem
        const canvas = await html2canvas(containerElement, {
            backgroundColor: '#1a1a1a', // Fundo consistente
            scale: 2 // Aumenta a resolução da imagem
        });

        const context = canvas.getContext('2d');
        context.font = '16px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.fillText('https://abre.ai/caixinha-de-promessas', canvas.width / 2, canvas.height - 20);

        const image = canvas.toDataURL('image/png');

        // Cria um link para download da imagem
        const link = document.createElement('a');
        link.href = image;
        link.download = 'promessa.png';
        link.click();

        alert('Imagem gerada! Compartilhe manualmente no Instagram.');
    } catch (error) {
        console.error('Erro ao capturar o conteúdo:', error);
        alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
    }
};

document.getElementById('share-instagram').addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    shareOnInstagram();
});
