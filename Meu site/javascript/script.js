// script.js

function search() {
    let input = document.getElementById('Barra de pesquisa').value;

    // Normalizar o input do usuário: remover acentos e converter para minúsculas
    let normalizedInput = normalizeString(input.toLowerCase());

    const items = document.getElementsByClassName('botao-destaque');

    // --- LÓGICA ATUALIZADA PARA BARRA VAZIA ---
    if (normalizedInput === "") {
        // Se o campo de busca estiver vazio, mostra todos os itens e sai da função.
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "block"; // Ou "list-item", "flex", etc., dependendo do seu layout original.
        }
        return; // Sai da função para não executar o restante da lógica de filtragem.
    }
    // --- FIM DA LÓGICA ATUALIZADA ---


    // Se o campo de busca NÃO estiver vazio, então procede com a filtragem
    const itemsToShow = [];
    const itemsToHide = [];

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].innerHTML;
        let normalizedItemText = normalizeString(itemText.toLowerCase());

        if (normalizedItemText.includes(normalizedInput)) {
            // Se o item contiver o texto de busca, ele deve ser mostrado
            // Adicionamos ele na lista para mostrar, mas só se já não estiver visível para evitar manipulações desnecessárias.
            if (items[i].style.display === "none") {
                itemsToShow.push(items[i]);
            }
        } else {
            // Se o item NÃO contiver o texto de busca, ele deve ser escondido
            // Adicionamos ele na lista para esconder, mas só se já não estiver escondido.
            if (items[i].style.display !== "none") {
                itemsToHide.push(items[i]);
            }
        }
    }

    // Aplica as mudanças de display em lote
    itemsToShow.forEach(item => item.style.display = "block");
    itemsToHide.forEach(item => item.style.display = "none");
}

// Função auxiliar para normalizar strings (remover acentos)
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function carregar(){
fetch('artigos.json')
.then(response => response.json()) 
.then(artigos => {
    const conteiner = document.querySelector('.item')
    artigos.map(artigos => {
        const itens = document.createElement('div')
        itens.classList.add("itens")

        const titulo = document.createElement("a")
        titulo.textContent = artigos.titulo

        const subtitulo = document.createElement("p")
        subtitulo.textContent = artigos.subtitulo

        const secoes = document.createElement("h1")
        secoes.textContent = artigos.secoes

       itens.appendChild(titulo)
       itens.appendChild(subtitulo)
    })
})
}

//Iniciação do Script

//Adicionei um ouvinte de evento que espera o carregamento completo do DOM (DOMContentLoaded). Assim que a página estiver pronta, ele anexa a função search ao evento input da sua barra de pesquisa. Isso fará com que a busca seja ativada automaticamente sempre que o usuário digitar ou apagar algo no campo.


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('Barra de pesquisa');
    if (searchInput) { // Verifica se o elemento foi encontrado antes de adicionar o ouvinte
        searchInput.addEventListener('input', search); // Chama search() sempre que o valor da entrada muda
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    if (searchButton) { // Garante que o botão existe antes de adicionar o listener
        searchButton.addEventListener('click', function() {
            // Redireciona para a página de busca
            window.location.href = 'pagina_de_busca.html'; // Verifique se o nome do arquivo está CORRETO
        });
    }
});