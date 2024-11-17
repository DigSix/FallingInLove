const net = require('node:net');
const fs = require('fs'); // Módulo para manipulação de arquivos

const server = net.createServer((socket) => {
    console.log("Socket connected!");

    socket.on('data', (data) => {
        // Analisa a primeira linha da requisição para obter o caminho do arquivo
        const request = data.toString('utf-8').split('\r\n')[0];
        const [method, url] = request.split(' ');

        console.log(`Received request: ${method} ${url}`);

        // Determina o arquivo a ser servido com base na URL
        let filePath = './index.html';
        let contentType = 'text/html';

        if (url === '/styles.css') {
            filePath = './styles.css';
            contentType = 'text/css';
        } else if (url === '/script.js') {  // Novo bloco para servir o script.js
            filePath = './script.js';
            contentType = 'application/javascript';
        }

        // Lê o arquivo e envia a resposta
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                // Em caso de erro ao ler o arquivo, enviar uma resposta de erro
                socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
                socket.end();
                return;
            }

            // Construindo a resposta HTTP com o conteúdo do arquivo
            const httpResponse =
                "HTTP/1.1 200 OK\r\n" +
                `Content-Type: ${contentType}\r\n` +
                `Content-Length: ${Buffer.byteLength(content, 'utf8')}\r\n` +
                "\r\n" +
                content;

            socket.write(httpResponse);
            socket.end(); // Fecha a conexão após enviar a resposta
        });
    });
});

// Configura o servidor para escutar na porta 1124
server.listen(1124, () => {
    console.log("Door 1124 ready! Server launched.");
});