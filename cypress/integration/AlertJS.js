/// <reference types="Cypress"/>


describe('Alert testing', function () {
    it('Visit page', () => {
        cy.visit('http://the-internet.herokuapp.com/')
        cy.get(':nth-child(29) > a').click()
    })

    it('JS alert testing - successfuly', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get('button').contains('Click for JS Alert').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('I am a JS Alert')

            })
        cy.get('#result').should('have.text', 'You successfuly clicked an alert')
    })

    it('JS confirm testing - if is Ok', () => {

        cy.get('button').contains('Click for JS Confirm').click()

        let count = 0
        cy.on('window:confirm', (str) => {
            count += 1
            switch (count) {
                case 1:
                    expect(str).to.eq('I am a JS Confirm')
            }
        })
        cy.get('#result').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("You clicked: Ok")).to.be.true

        })
    })

    it('JS confirm testing - if is cancel', () => {

        cy.get('button').contains('Click for JS Confirm').click()
        let count = 0
        cy.on('window:confirm', (str) => {
            count += 1
            switch (count) {
                case 2:
                    expect(str).to.eq('I am a JS Confirm')
                    return false
            }
        })
        cy.get('#result').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("You clicked: Cancel")).to.be.false

        })

    })

    it('Window prompt- write text', () => {
        const myName = "nottyo"
        const winPromptStub = () => {
            return myName
        }
        cy.window().then(win => {
            cy.stub(win, 'prompt', winPromptStub).as('winPromptStubReturnNonNull')
        })
        cy.get('button').contains('Click for JS Prompt').click()
        cy.get('@winPromptStubReturnNonNull').should('be.calledOnce')
            .and('be.calledWith', 'I am a JS prompt')
        cy.get('#result').should('have.text', `You entered: nottyo`)
    })
})



