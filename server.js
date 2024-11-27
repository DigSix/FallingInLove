const net = require("net");
const fs = require("fs");
const path = require("path");

// Defina o diretório onde as imagens estão localizadas
const imageDir = path.join(__dirname, "imgs"); // Certifique-se de que a pasta 'imgs' existe

// Função para ler e armazenar as imagens da pasta
function getImageFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            }

            // Filtra apenas os arquivos de imagem (por extensão)
            const imageFiles = files.filter(file => {
                return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
            });

            resolve(imageFiles);
        });
    });
}

// Cria o servidor TCP
const server = net.createServer(async (socket) => {
    console.log("Socket connected!");

    // Lê as imagens da pasta e armazena em uma lista
    const images = await getImageFiles(imageDir);

    socket.on("data", (data) => {
        const request = data.toString("utf-8").split("\r\n")[0];
        const [method, requestPath, protocol] = request.split(" ");

        console.log(`Received request: ${method} ${requestPath} ${protocol}`);

        // Verifica se a requisição é para uma imagem
        if (method === "GET" && requestPath.startsWith("/imgs/")) {
            const imagePath = "." + requestPath;

            if (images.includes(path.basename(imagePath))) {
                fs.readFile(imagePath, (err, content) => {
                    if (err) {
                        console.error(`Error reading image: ${err.message}`);
                        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                        socket.end();
                        return;
                    }

                    // Define o tipo de conteúdo baseado na extensão do arquivo
                    const contentType = {
                        '.jpg': 'image/jpeg',
                        '.jpeg': 'image/jpeg',
                        '.png': 'image/png',
                        '.gif': 'image/gif',
                        '.webp': 'image/webp'
                    }[path.extname(imagePath).toLowerCase()] || 'application/octet-stream';

                    // Envia a resposta com o arquivo de imagem
                    socket.write(`HTTP/1.1 200 OK\r\n`);
                    socket.write(`Content-Type: ${contentType}\r\n`);
                    socket.write(`Content-Length: ${content.length}\r\n`);
                    socket.write(`\r\n`);
                    socket.write(content);
                    socket.end();
                });
            } else {
                console.error(`Image not found in the image list: ${path.basename(imagePath)}`);
                socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                socket.end();
            }
        } else {
            // Trate a requisição para outros arquivos (HTML, CSS, etc.)
            let filePath = requestPath === "/" ? "./index.html" : "." + requestPath;

            console.log(`File path resolved: ${filePath}`);

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    console.error(`Error reading file: ${err.message}`);
                    // Em caso de erro ao ler o arquivo, enviar uma resposta de erro
                    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                    socket.end();
                    return;
                }

                // Define o tipo de conteúdo baseado na extensão do arquivo
                const ext = path.extname(filePath).toLowerCase();
                const contentType = {
                    '.html': 'text/html',
                    '.css': 'text/css',
                    '.js': 'application/javascript',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.webp': 'image/webp'
                }[ext] || 'application/octet-stream';

                // Envia a resposta com o conteúdo do arquivo
                socket.write(`HTTP/1.1 200 OK\r\n`);
                socket.write(`Content-Type: ${contentType}\r\n`);
                socket.write(`Content-Length: ${content.length}\r\n`);
                socket.write(`\r\n`);
                socket.write(content);
                socket.end();
            });
        }
    });
});

// Configura o servidor para escutar na porta 1124
server.listen(1124, () => {
    console.log("Door 1124 ready! Server launched.");
});