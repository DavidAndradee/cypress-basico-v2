Cypress._.times(3,function(){
    it('DESAFIO = testa a pagina de politica de privacidade de forma idependente',function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})