document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const performanceTable = document.getElementById("performanceTable");

    // Configuração dos date pickers
    flatpickr("#startDate", {
        dateFormat: "d/m/Y",
        locale: "pt"
    });
    flatpickr("#endDate", {
        dateFormat: "d/m/Y",
        locale: "pt"
    });

    // Função para encontrar o nome do cliente pelo CPF
    function encontrarNomeClientePorCPF(cpf) {
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const cliente = clientes.find(cliente => cliente.cpf === cpf);
        return cliente ? cliente.nome : "Cliente não encontrado";
    }

    // Função para encontrar o peixe mais vendido
    function encontrarPeixeMaisVendido(vendas) {
        const vendasPorProduto = vendas.reduce((vendasPorProduto, venda) => {
            vendasPorProduto[venda.nomeProduto] = (vendasPorProduto[venda.nomeProduto] || 0) + venda.quantidade;
            return vendasPorProduto;
        }, {});

        const peixeMaisVendido = Object.keys(vendasPorProduto).reduce((maisVendido, produto) => {
            return vendasPorProduto[produto] > vendasPorProduto[maisVendido] ? produto : maisVendido;
        }, Object.keys(vendasPorProduto)[0]);

        return peixeMaisVendido || "Nenhum peixe vendido";
    }

    // Função para encontrar o cliente mais frequente
    function encontrarClienteMaisFrequente(vendas) {
        const clientesFrequentes = vendas.reduce((clientesFrequentes, venda) => {
            clientesFrequentes[venda.cpf] = (clientesFrequentes[venda.cpf] || 0) + 1;
            return clientesFrequentes;
        }, {});

        const clienteMaisFrequenteCPF = Object.keys(clientesFrequentes).reduce((maisFrequente, cliente) => {
            return clientesFrequentes[cliente] > clientesFrequentes[maisFrequente] ? cliente : maisFrequente;
        }, Object.keys(clientesFrequentes)[0]);

        return encontrarNomeClientePorCPF(clienteMaisFrequenteCPF);
    }

    // Função para preencher a tabela de desempenho
    function preencherTabelaDesempenho(table, data) {
        table.innerHTML = ""; // Limpa a tabela

        for (const [categoria, valor] of Object.entries(data)) {
            const row = table.insertRow();
            const cellCategoria = row.insertCell(0);
            const cellValor = row.insertCell(1);

            cellCategoria.textContent = categoria;
            cellValor.textContent = valor;
        }
    }

    searchButton.addEventListener("click", function () {
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // Verifica se as datas foram preenchidas
        if (!startDate || !endDate) {
            alert("Por favor, selecione as datas de início e término.");
            return;
        }

        const [startDay, startMonth, startYear] = startDate.split('/');
        const [endDay, endMonth, endYear] = endDate.split('/');
        
        const startDateISO = new Date(`${startYear}-${startMonth}-${startDay}`);
        const endDateISO = new Date(`${endYear}-${endMonth}-${endDay}`);

        const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

        // Filtrando vendas dentro do intervalo de datas especificado
        const vendasNoPeriodo = vendas.filter(venda => {
            if (!venda.dataTransacao) {
                console.warn(`Venda com ID ${venda.id} não possui dataTransacao definida.`);
                return false;
            }
            const [day, month, year] = venda.dataTransacao.split('/');
            if (!day || !month || !year) {
                console.warn(`Venda com ID ${venda.id} possui dataTransacao inválida: ${venda.dataTransacao}`);
                return false;
            }
            const vendaDate = new Date(`${year}-${month}-${day}`);
            return vendaDate >= startDateISO && vendaDate <= endDateISO;
        });

        // Calculando métricas
        const totalVendas = "R$ " + vendasNoPeriodo.reduce((total, venda) => total + venda.precoTotal, 0).toFixed(2);

        // Preenchendo a tabela de desempenho com as métricas calculadas
        preencherTabelaDesempenho(performanceTable, {
            "Vendas Totais":  totalVendas,
            "Peixe Mais Vendido": encontrarPeixeMaisVendido(vendasNoPeriodo),
            "Cliente Mais Frequente": encontrarClienteMaisFrequente(vendasNoPeriodo)
        });
    });
});
