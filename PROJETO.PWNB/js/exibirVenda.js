document.addEventListener("DOMContentLoaded", function () {
    const vendasTableBody = document.getElementById("vendasTableBody");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const listAllButton = document.getElementById("listAllButton");

    function carregarVendas(vendas) {
        vendasTableBody.innerHTML = ""; // Limpa a tabela antes de adicionar os dados

        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const peixes = JSON.parse(localStorage.getItem("peixes")) || [];

        vendas.forEach(venda => {
            const cliente = clientes.find(c => c.cpf === venda.cpf);
            const peixe = peixes.find(p => p.especie === venda.nomeProduto);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente ? cliente.nome : 'Cliente não encontrado'}</td>
                <td>${venda.cpf}</td>
                <td>${peixe ? peixe.especie : 'Peixe não encontrado'}</td>
                <td>${venda.quantidade}</td>
                <td>${"R$ " + venda.precoTotal}</td>
                <td>${peixe.condicoesVenda}</td>
                <td>${venda.dataTransacao}</td>
            `;
            vendasTableBody.appendChild(row);
        });
    }

    function listarTodasVendas() {
        const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
        carregarVendas(vendas);
    }

    // Carrega todas as vendas ao iniciar a página
    listarTodasVendas();

    searchButton.addEventListener("click", function () {
        const cpf = searchInput.value;
        const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

        const vendasFiltradas = vendas.filter(venda => venda.cpf === cpf);
        carregarVendas(vendasFiltradas);
    });

    listAllButton.addEventListener("click", function () {
        listarTodasVendas();
    });
});
