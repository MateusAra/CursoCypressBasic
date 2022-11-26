/// <reference types="Cypress"/>

describe('Central de Atendimento ao cliente TAT', function(){
    beforeEach(function(){
        cy.visit('../../src/index.html')
    })
    it('verfica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    });
    it('preenche os campos obrigatórios e envia formulário',function(){
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('mateus@gmail.com')
        cy.get('#open-text-area').type('tetesteeseste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });
    it('exibe mensagem de erro ao submeter formulário com um email com  formatação inválida',function(){
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('mateus@gmail,com', {log: false})
        cy.get('#open-text-area').type('testestestestestes', {log: false})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('campo telefone continua vazio quando preenchido com valor não númerico', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', function(){
        cy.get('#firstName').type('Mateus')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('mateus@gmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('testestestestestes')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Mateus')
            .should('have.value', 'Mateus')
            .clear()
            .should('have.value', '')
    });
    it('Exibe mensagens de erro ao submeter formulario', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
    });

});