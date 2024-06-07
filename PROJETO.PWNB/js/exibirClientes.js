document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clientesTable = document.getElementById("clientesTable").getElementsByTagName("tbody")[0];
    const listAllButton = document.getElementById('listAllButton');

    function carregarClientes(clientes) {
        clientesTable.innerHTML = "";

        clientes.forEach((cliente) => {
            const row = clientesTable.insertRow();

            const nomeCell = row.insertCell();
            nomeCell.textContent = cliente.nome;

            const enderecoCell = row.insertCell();
            enderecoCell.textContent = cliente.endereco;

            const contatoCell = row.insertCell();
            contatoCell.textContent = cliente.contato;

            const cpfCell = row.insertCell();
            cpfCell.textContent = cliente.cpf;
        });
    }

    if (localStorage.getItem("clientes")) {
        const clientes = JSON.parse(localStorage.getItem("clientes"));
        carregarClientes(clientes);
    }

    searchButton.addEventListener("click", function () {
        const cpf = searchInput.value;
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        const clientesFiltrados = clientes.filter((cliente) => cliente.cpf === cpf);
        carregarClientes(clientesFiltrados);
    });

    listAllButton.addEventListener('click', function () {
        listarTodosClientes();
    });
});

function listarTodosClientes() {
    const tableBody = document.querySelector('#clientesTable tbody');
    tableBody.innerHTML = '';

    if (localStorage.getItem('clientes')) {
        const clientes = JSON.parse(localStorage.getItem('clientes'));

        clientes.forEach(cliente => {
            const newRow = tableBody.insertRow();

           
            newRow.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.contato}</td>
            <td>${cliente.cpf}</td>
        `;
    });
}
}