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

    it('Limpar conteúdo do formulário', () => {
        const formData: FormFields = {
            originZipCode: '08090-284', // Cep de Origem

            format: 2, // Formato 'Rolo / Cilindro ou Esfera'

            weight: '0.3', // Peso

            rdepth: '16', // Comprimento

            rdiameter: '5', // Diâmetro

            haveAdditionalService: true,

            additionalServices: ["acknowledgmentOfReceipt", "selfHand", "valueDeclaration"],

            valueDeclaration: '100',

            destinyZipCode: '05407-002', // Cep de Destino
        };

        cy.fillFreightCalcForm(formData);

        cy.get('.css-tuxzvu > :nth-child(3) > .MuiButtonBase-root').click();

        // Result validation
        cy.get('#originPostcode').should('have.value', '');

        cy.get('#object_format').click();

        // Result validation
        cy.get('.Mui-selected').then(($selected) => {
            expect($selected.text().trim()).to.contain('Caixa / Pacote');
        });
        cy.get('.Mui-selected').click();


        // Result validation
        cy.get('#packageHeight').should('have.value', '');
        cy.get('#packageWidth').should('have.value', '');
        cy.get('#packageDepth').should('have.value', '');

        // Result validation
        cy.get(`[data-cy="calculator-selfHand"] > .PrivateSwitchBase-input`).should('not.be.checked');
        cy.get(`[data-cy="calculator-acknowledgmentOfReceipt"] > .PrivateSwitchBase-input`).should('not.be.checked');
        cy.get(`[data-cy="calculator-valueDeclaration"] > .PrivateSwitchBase-input`).should('not.be.checked');
    });
})