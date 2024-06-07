document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('cadastroPeixeForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const especie = document.getElementById('especie').value;
        const tamanho = document.getElementById('tamanho').value;
        const peso = document.getElementById('peso').value;
        const cor = document.getElementById('cor').value;
        const padrao = document.getElementById('padrao').value;
        const quantidade = document.getElementById('quantidadePeixe').value;
        const preco = document.getElementById('preco').value;
        const condicoesVenda = document.getElementById('condicoesVenda').value;

        const peixe = { especie, tamanho, peso, cor, padrao, quantidade, preco, condicoesVenda };

        if (!localStorage.getItem("peixes")) {
            const peixes = [];
            peixes.push(peixe);
            localStorage.setItem("peixes", JSON.stringify(peixes));
        } else {
            let peixes = JSON.parse(localStorage.getItem("peixes"));
            
            const peixeExistente = peixes.find((px) => px.especie === especie);
            if (peixeExistente) {
                alert("Peixe já cadastrado.");
                return;
            }

            peixes.push(peixe);
            localStorage.setItem("peixes", JSON.stringify(peixes));
        }

        alert("Peixe cadastrado com sucesso!");
        form.reset();

        // Redirecionar para a página de exibição de peixes
        window.location.href = '../paginas/exibirPeixe.html';
    });
});
