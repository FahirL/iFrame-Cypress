/// <reference types="Cypress" />
///<reference types="cypress-iframe" />

describe('iFrame testing', function () {
    it('visit page', () => {
        cy.visit('http://the-internet.herokuapp.com/')
        cy.get(':nth-child(22) > a').click()
        cy.get('ul > :nth-child(2) > a').click()
        cy.url().should('contain', '/iframe')
    })
    it('write text and set formats', () => {
        cy.iframe().contains('Your content goes here.').should('be.visible').clear()
        cy.iframe().type('This is my first text.').should('be.visible').get('#mceu_3').click().get('#mceu_28-body').contains('strong')
        cy.iframe().type('This is my second text bold.').should('be.visible').get('#mceu_4').click().get('#mceu_28-body').contains('em')
        cy.iframe().type('Text bla bla bla').should('be.visible').get('#mceu_2-open').click().get('#mceu_34').click().get('#mceu_40-text').click().get('#mceu_28-body').contains('span')
        cy.iframe().type('SDASJIdjasijdaisjdasd sakdaks dasd').get('#mceu_2-open').click().get('#mceu_33').click().get('#mceu_46-text').click().get('#mceu_28-body').contains('h1')
        cy.iframe().type('hahahahahaha').get('#mceu_18-open').click().get('#mceu_60-text').click().get('#mceu_65-text').click().get('#mceu_74-text').click().get('#mceu_28-body').contains('sub')
        cy.iframe().type('{selectall}').get('#mceu_18-open').click().get('#mceu_62-text').click()
        cy.iframe().clear().get('#mceu_15-open').click().get('#mceu_77-text').click().get('#mceu_28-body').contains('p')

    })
   
    it('cut, copy, paste', () => {
       
        cy.iframe().type('This is my first text.{selectall}').should('be.visible').get('#mceu_16-open').click().get('#mceu_82').click()
        cy.iframe().get('#mceu_16-open').click().get('#mceu_84').click()
        cy.iframe().type('{selectall}')
        cy.iframe().get('#mceu_16-open').click().get('#mceu_83').click()


    })
    it('undo & redo and visual aids', () => {
        cy.iframe().get('#mceu_15-open').click().get('#mceu_77-text').click().get('#mceu_28-body').contains('p')
        cy.iframe().type('This is my first text, this is test undo, this is test redo.').get('#mceu_0').click().get('#mceu_1').click()
        cy.iframe().get('#mceu_17-open').click().get('#mceu_88').click()

        cy.get('#mceu_44')
            .should(($mceu_44) => {
                expect($mceu_44).not.to.be.checked

            })
       
    })
    it('align,list,indent', () => {
        cy.iframe().get('#mceu_15-open').click().get('#mceu_77-text').click()
        cy.iframe().type('THIS IS MY FIRST TEXT!').get('#mceu_6').click().get('#mceu_5').click().get('#mceu_7').click().get('#mceu_8').click()
        cy.iframe().get('#mceu_9 ').click().get('#mceu_28-body').contains('ul').get('#mceu_10').click().get('#mceu_28-body').contains('ol')
        cy.iframe().get('#mceu_12').click().click().click().get('#mceu_11').click().click().click()
    })


})