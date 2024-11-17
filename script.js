document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("showTextButton");
    const text = document.getElementById("text");

    button.addEventListener("click", () => {
        // Esconde o botão
        button.style.display = "none";
        
        // Exibe o texto
        text.style.display = "block";
    });
});