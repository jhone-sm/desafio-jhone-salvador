class CaixaDaLanchonete {
    cardapio = {
        cafe: { descricao: 'Café', valor: 3.00, extra: false },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50, extra: true, principal: 'cafe' },
        suco: { descricao: 'Suco Natural', valor: 6.20, extra: false },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50, extra: false },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, extra: true, principal: 'sanduiche' },
        salgado: { descricao: 'Salgado', valor: 7.25, extra: false },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50, extra: false },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50, extra: false }
    };

    formasPagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(metodoDePagamento, itens) {
        //Verificando a forma de pagamento
        if (!this.formasPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        let valorTotal = 0;
        let temItemPrincipal = false; // Verificando se tem algum item principal no carrinho
        const itensPrincipais = {}; // itens principais no carrinho

        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(',');
            const itemInfo = this.cardapio[codigoItem];

            // Verificando se o item existe
            if (!itemInfo) {
                return "Item inválido!";
            }

            if (!itemInfo.descricao.includes("extra")) {
                if (itemInfo.descricao.includes("Combo")) {
                    valorTotal += itemInfo.valor * parseInt(quantidade);
                } else {
                    temItemPrincipal = true;
                    valorTotal += itemInfo.valor * parseInt(quantidade);
                    itensPrincipais[codigoItem] = true;
                }
            } else {
                if (itemInfo.extra && !itensPrincipais[itemInfo.principal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                valorTotal += itemInfo.valor * parseInt(quantidade);
            }
        }

        // Verificando se existe um item principal no carrinho
        if (!temItemPrincipal) {
            return "Não há itens no carrinho de compra!";
        }

        // Verificando se o valor total é válido
        if (valorTotal <= 0) {
            return "Quantidade inválida!";
        }

        // Descontos
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        // Retornando o valor total formatado e em string
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };