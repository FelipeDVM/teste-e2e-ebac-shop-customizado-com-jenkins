/// <reference types="cypress" />
let dadosLogin
import produtosPage from "../support/page_objects/produtos.page"

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /* 
     Como cliente 
     Quero acessar a Loja EBAC 
     Para fazer um pedido de 4 produtos 
     Fazendo a escolha dos produtos
     Adicionando ao carrinho
     Preenchendo todas opções no checkout
     E validando minha compra ao final 
    */
   
   before(() => {
   cy.fixture('perfil').then(perfil => {
   dadosLogin = perfil })

})

    beforeEach(() => {
        cy.visit('/minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //login
        cy.get('#username').type(dadosLogin.usuario)
        cy.get('#password').type(dadosLogin.senha, { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, felipefabio.testeqaqaqaqaqaqaqaqaqaqa ')
       
        // ir a pagina inicial logado
        cy.get('.logo-in-theme > .logo > a > .logo-img').click()
       
        //pegar primeiro objeto da lista
        produtosPage.buscarProdutoLista('')
        cy.get('#tab-title-description > a').should('exist')
        
        //adicionar objeto ao carrinho e confirmar
        produtosPage.addProdutoCarrinho('S', 'Orange' , 4)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        
        
        //Preencher checkout
        cy.get('#billing_first_name').clear().type('Felipe')
        cy.get('#billing_last_name').clear().type('fabio')
        cy.get('#billing_address_1').clear().type('ruaum')
        cy.get('#billing_address_2').clear().type('casa')
        cy.get('#billing_city').clear().type('cidadeum')
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type('Roraima{enter}')
        cy.get('#billing_postcode').clear().type('11111111')
        cy.get('#billing_phone').clear().type('272727272')

        cy.get('#terms').click()
        cy.get('#place_order').click()
     

        //verificação final
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    })









})
        //TODO 
 


