// Configurações do RifaCap
// Arquivo centralizado para facilitar alterações de valores

const RifaCapConfig = {
    // Preço dos títulos
    pricePerTitle: 7.90,
    
    // Formatação para exibição
    getPriceFormatted() {
        return this.pricePerTitle.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },
    
    // Formatação para cálculos
    getPriceDecimal() {
        return this.pricePerTitle;
    },
    
    // Função para calcular total
    calculateTotal(quantity) {
        return quantity * this.pricePerTitle;
    },
    
    // Função para calcular total formatado
    calculateTotalFormatted(quantity) {
        return this.calculateTotal(quantity).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
};

// Disponibilizar globalmente
window.RifaCapConfig = RifaCapConfig;

// Para compatibilidade com scripts existentes
window.PRICE_PER_TITLE = RifaCapConfig.pricePerTitle;
window.pricePerTitulo = RifaCapConfig.pricePerTitle;

// Debug - verificar se o config foi carregado
console.log('Config.js carregado! Preço atual:', RifaCapConfig.pricePerTitle);
console.log('Preço formatado:', RifaCapConfig.getPriceFormatted());
