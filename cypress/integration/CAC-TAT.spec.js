////<reference types="Cypress" />

//const { should } = require("chai") (isso apareceu depois de clicar em OPEN CYPRESS, não compreeendi ainda)

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Testes na aula do Walmyr Filho em testes automatizados, Testes na aula do Walmyr Filho em testes automatizados, Testes na aula do Walmyr Filho em testes automatizados, Testes na aula do Walmyr Filho em testes automatizados'
        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('david@example.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida",function(){
        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('david@@example.com')
        cy.get('#open-text-area').type('Testando')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando prenchido com valor inválido',function(){
        cy.get('#phone').type('asdoajsbdasjibhi').should('have.value', '' )
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('david@example.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Testando')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('David').should('have.value','David')
        .clear()
        .should('have.value','')
        cy.get('#lastName').type('Andrade').should('have.value','Andrade')
        .clear()
        .should('have.value','')
        cy.get('#email').type('david@example.com').should('have.value','david@example.com')
         .clear()
        .should('have.value','')
        cy.get('#phone').type('1592634780').should('have.value','1592634780')
        .clear()
        .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })


    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
    })

    it('marcar cada tipo de atendimento',function(){
        cy.get('input[type="radio"]').should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type=checkbox]').check().should('be.checked')
            .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('simulando um arquivo drag-andd-drop, como se estivesse arrastando o arquivo até o campo de upload',function(){
        cy.get('input[type="file"]').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('selciona uma arquivo utilizando uma fixtures para qual foi dada uma alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
        
    })

    it('acessa a pagina da politica de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('',function(){

    })
})
  