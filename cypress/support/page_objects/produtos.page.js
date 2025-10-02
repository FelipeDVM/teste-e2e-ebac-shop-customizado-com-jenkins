class ProdutosPage {
    visitarUrl(){
        
        cy.visit('produtos')


    }


     buscarProdutoLista(nomeProduto){  
        cy.get('.products > .row .product').eq(0).click()
    
    }
    
     addProdutoCarrinho(tamanho ,cor ,quantidade){
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

     }



}

export default new ProdutosPage()