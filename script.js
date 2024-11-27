const images = [
    "./imgs/0.jpg",
    "./imgs/1.jpg",
    "./imgs/2.jpg",
    "./imgs/3.jpg",
    "./imgs/4.jpg",
    "./imgs/5.jpg"
]

const sentences = [
    "Hoje é o dia mais especial do ano, porque o mundo ganhou você, e eu ganhei o maior presente da minha vida: seu amor! ❤️",
    "Parabéns, meu amor! Que o seu sorriso continue iluminando o meu mundo como faz todos os dias. 🌟",
    "Você é a razão pela qual todos os meus dias são melhores, e hoje é o dia perfeito para celebrar o quanto eu sou grato por ter você. 🥰",
    "Feliz aniversário para a pessoa que faz meu coração bater mais forte e a vida ter mais sentido. Te amo mais do que tudo! 💕",
    "Cada dia ao seu lado é um motivo para comemorar, mas hoje é sobre você, meu amor: sua luz, seu carinho e sua felicidade. 🎉",
    "Que seu dia seja tão incrível quanto você é para mim. Parabéns, meu amor! Vamos fazer deste aniversário um momento inesquecível. 🎂"
]

const finalText = "Meu amor, espero que este dia seja tão especial quanto você é para mim. Que cada sorriso que você deu hoje se repita infinitamente ao longo deste novo ano que começa na sua vida. Que o Papai do Céu abençoe cada passo seu, trazendo proteção, felicidade e muitas realizações. Eu estarei ao seu lado para celebrar todas as conquistas, enxugar qualquer lágrima e fazer de cada dia uma nova história cheia de amor. Parabéns por ser quem você é e por fazer meu mundo tão melhor só por existir. Eu te amo, hoje e sempre! 💖✨";

const button = document.getElementById("showTextButton");
let image = document.getElementById("image");
let text = document.getElementById("text");


document.addEventListener("DOMContentLoaded", () => {

    let index = 0;
    button.addEventListener("click", () => {
        if(index < 6){
            if (index == 0) image.style.display = "block";
            image.src = images[index];
            text.innerText = sentences[index++];
        }else{
            image.style.display = "none";
            text.innerText = finalText;
        }
    });
});