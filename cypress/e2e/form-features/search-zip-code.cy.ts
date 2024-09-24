import { FormFields } from "../../support/types";

describe('Teste em funcionalidades secundária do formulário', () => {

    // 10 seconds in milliseconds
    const tenSeconds = 10000;

    beforeEach(() => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.visit('/');
        cy.wait(tenSeconds)
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });

    it('Consultar e usar CEP', () => {
        cy.get('[data-cy="calculator-PostCodeSearch"]').click();

        cy.get('#states').should('be.visible').type('São Paulo');
        cy.get('#states-option-0').click();

        cy.get('#cities').type('São Paulo');
        cy.get('#cities-option-0').click();

        cy.get('#street').type('Rua Cardeal Arcoverde');

        cy.get('form > .MuiButton-root').click();

        // Result validation
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(3)').should('have.text', '05407-000');
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(5)').should('have.text', 'Rua Cardeal Arcoverde');
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(7)').should('have.text', 'até 653 - lado ímpar');
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(9)').should('have.text', 'Pinheiros');
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(11)').should('have.text', 'São Paulo');
        cy.get(':nth-child(6) > .MuiGrid-container > :nth-child(13)').should('have.text', 'SP');

        cy.get(':nth-child(6) > .MuiGrid-container > .MuiGrid-grid-xs-12 > .MuiButtonBase-root').click();

        // Result validation
        cy.get('#destinationPostcode').invoke('text')
            .then((text) => {
                const result = text.trim();

                expect('05407-000').to.contain(result);
            });
    });
})