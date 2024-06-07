document.addEventListener("DOMContentLoaded", function () {
    // Dados fictícios para análise de mercado
    const marketSalesData = [2000, 7500, 5000];
    const months = ["Abril", "Maio", "Junho"];

    // Função para obter dados de vendas totais do AquaLUX
    function getAquaLuxTotalSales() {
        return [4800, 4200, 7900];
    }

    // Função para obter quantidade de Betta e Tetra vendidos
    function getAquaLuxFishSales() {
        return {
            Betta: [120, 150, 180], // Quantidade de Betta vendidos
            Tetra: [100, 130, 170] // Quantidade de Tetra vendidos
        };
    }

    // Obtendo dados do AquaLUX
    const aqualuxSalesData = getAquaLuxTotalSales();
    const aqualuxFishSales = getAquaLuxFishSales();

    const marketFishData = {
        Betta: [130, 160, 190], 
        Tetra: [110, 140, 180]
    };

    // Função para obter preços médios dos peixes cadastrados
    function getAquaLuxPriceTrends() {
        return [18, 22, 26];
    }

    const marketPriceTrends = [20, 25, 29];
    const aqualuxPriceTrends = getAquaLuxPriceTrends();

    // Gráfico de Comparativo de Vendas
    const salesComparisonCtx = document.getElementById('salesComparisonChart').getContext('2d');
    new Chart(salesComparisonCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Vendas AquaLUX',
                data: aqualuxSalesData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }, {
                label: 'Vendas Mercado',
                data: marketSalesData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Top Peixes Vendidos
    const topFishCtx = document.getElementById('topFishChart').getContext('2d');
    new Chart(topFishCtx, {
        type: 'bar',
        data: {
            labels: ["Betta", "Tetra"],
            datasets: [{
                label: 'AquaLUX',
                data: [aqualuxFishSales.Betta.reduce((a, b) => a + b, 0), aqualuxFishSales.Tetra.reduce((a, b) => a + b, 0)],
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }, {
                label: 'Mercado',
                data: [marketFishData.Betta.reduce((a, b) => a + b, 0), marketFishData.Tetra.reduce((a, b) => a + b, 0)],
                backgroundColor: 'rgba(153, 102, 255, 0.5)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Tendências de Preços
    const priceTrendsCtx = document.getElementById('priceTrendsChart').getContext('2d');
    new Chart(priceTrendsCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Preços AquaLUX',
                data: aqualuxPriceTrends,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }, {
                label: 'Preços Mercado',
                data: marketPriceTrends,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
