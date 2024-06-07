document.addEventListener("DOMContentLoaded", function () {
    const vendaForm = document.getElementById("vendaForm");
    vendaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cpfInput = document.getElementById("cpf");
        const produtoInput = document.querySelector(".produto");
        const quantidadeInput = document.querySelector(".quantidade");

        const cpf = cpfInput.value;
        const nomeProduto = produtoInput.value;
        const quantidade = parseInt(quantidadeInput.value);

        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const produtos = JSON.parse(localStorage.getItem("peixes")) || [];

        const cliente = clientes.find((cliente) => cliente.cpf === cpf);
        const produto = produtos.find((produto) => produto.especie === nomeProduto);

        if (cliente && produto) {
            if (produto.quantidade >= quantidade) {
                const precoTotal = produto.preco * quantidade;
                const dataTransacao = new Date().toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy

                const venda = {
                    nomeCliente: cliente.nome,
                    cpf: cliente.cpf,
                    nomeProduto: produto.especie,
                    quantidade: quantidade,
                    precoTotal: precoTotal,
                    formaPagamento: produto.condicoesVenda, // Corrigido
                    dataTransacao: dataTransacao
                };

                let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
                vendas.push(venda);
                localStorage.setItem("vendas", JSON.stringify(vendas));

                // Atualizar quantidade do produto apenas se houver estoque suficiente
                produto.quantidade -= quantidade;
                localStorage.setItem("peixes", JSON.stringify(produtos));

                cpfInput.value = "";
                produtoInput.value = "";
                quantidadeInput.value = "";

                alert("Venda registrada com sucesso!");
            } else {
                alert("Quantidade insuficiente em estoque!");
            }
        } else {
            alert("Cliente ou produto não encontrado");
        }
    });
});
