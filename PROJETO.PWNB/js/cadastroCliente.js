document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroClienteForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const contato = document.getElementById("contato").value;
        const cpf = document.getElementById("cpf").value;

        const cliente = { nome, endereco, contato, cpf };

        if (!localStorage.getItem("clientes")) {
            const clientes = [];
            clientes.push(cliente);
            localStorage.setItem("clientes", JSON.stringify(clientes));
        } else {
            let clientes = JSON.parse(localStorage.getItem("clientes"));

            const clienteExistente = clientes.find((cli) => cli.cpf === cpf);
            if (clienteExistente) {
                alert("CPF já cadastrado.");
                return;
            }

            clientes.push(cliente);
            localStorage.setItem("clientes", JSON.stringify(clientes));
        }

        alert("Cliente cadastrado com sucesso!");
        form.reset();
    });
});
