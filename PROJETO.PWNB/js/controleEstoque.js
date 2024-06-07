document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const listAllButton = document.getElementById("listAllButton");
    const searchInput = document.getElementById("searchInput");
    const peixesTable = document.querySelector("#peixesTable tbody");

    function displayPeixes(peixes) {
        peixesTable.innerHTML = ""; // Limpa a tabela antes de adicionar novas linhas

        peixes.forEach((peixe) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${peixe.especie}</td>
                <td>${peixe.cor}</td>
                <td>${peixe.quantidade}</td>
                <td>${"R$ " + peixe.preco}</td>
            `;

            peixesTable.appendChild(row);
        });
    }

    function getPeixesFromLocalStorage() {
        // Parse do JSON para um array de objetos
        return JSON.parse(localStorage.getItem("peixes")) || [];
    }

    // Carregar todos os peixes ao iniciar a página
    displayPeixes(getPeixesFromLocalStorage());

    // Função para listar todos os peixes
    listAllButton.addEventListener("click", function() {
        displayPeixes(getPeixesFromLocalStorage());
    });

    // Função para procurar peixes por nome
    searchButton.addEventListener("click", function() {
        const nomeProcurado = searchInput.value.trim().toLowerCase();
        const peixes = getPeixesFromLocalStorage();

        const peixesFiltrados = peixes.filter((peixe) =>
            peixe.especie.toLowerCase().includes(nomeProcurado)
        );

        displayPeixes(peixesFiltrados);
    });
});