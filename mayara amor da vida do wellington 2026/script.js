document.getElementById('formBusca').addEventListener('submit', function(event) {
    event.preventDefault();

    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // Limpa resultados anteriores e mostra "Carregando"
    resultadoDiv.innerHTML = "Buscando...";

    // A API do ViaCEP exige pelo menos 3 caracteres na rua/logradouro
    if (rua.length < 3) {
        alert("O nome da rua deve ter pelo menos 3 caracteres.");
        return;
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            resultadoDiv.innerHTML = ""; // Limpa o carregando

            if (dados.length === 0) {
                resultadoDiv.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
                return;
            }

            // A API retorna um array, pois uma rua pode ter vários CEPs
            dados.forEach(item => {
                resultadoDiv.innerHTML += `
                    <div class="item-resultado">
                        <strong>CEP: ${item.cep}</strong><br>
                        ${item.logradouro} - ${item.bairro}<br>
                        ${item.localidade}/${item.uf}
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            resultadoDiv.innerHTML = "<p>Erro ao buscar dados. Verifique a conexão ou os campos.</p>";
        });
});