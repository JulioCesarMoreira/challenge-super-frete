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

    it('Salvar conteúdo do formulário', () => {
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

        // Preenchendo formulário
        cy.fillFreightCalcForm(formData);

        // Clicando no botão de salvar formulário
        cy.get('.css-tuxzvu > :nth-child(2) > .MuiButtonBase-root').click();
        cy.wait(1000)

        // Recarregando a página
        cy.visit('https://web.superfrete.com/#/calcular-correios', {
            failOnStatusCode: false,
            onBeforeLoad: (win) => {
                // impede que Cypress espere o load completo da página
                Object.defineProperty(win, 'onload', { value: null });
            },
        });
        cy.wait(tenSeconds)

        // Result validation
        cy.get('#originPostcode').should('have.value', formData.originZipCode);

        cy.get('#object_format').click();

        // Result validation
        cy.get('.Mui-selected').then(($selected) => {
            expect($selected.text().trim()).to.contain('Rolo / Cilindro ou Esfera');
        });
        cy.get('.Mui-selected').click();

        // Result validation
        cy.get('#\\\:rc\\\:').should('have.value', formData.rdepth);
        cy.get('#\\\:rd\\\:').should('have.value', formData.rdiameter);

        // Result validation
        cy.get(`[data-cy="calculator-selfHand"] > .PrivateSwitchBase-input`).should('be.checked');
        cy.get(`[data-cy="calculator-acknowledgmentOfReceipt"] > .PrivateSwitchBase-input`).should('be.checked');
        cy.get(`[data-cy="calculator-valueDeclaration"] > .PrivateSwitchBase-input`).should('be.checked');
        cy.get('[data-cy="calculator-objectValue"] > .MuiInputBase-root').should('be.visible')
    });
})