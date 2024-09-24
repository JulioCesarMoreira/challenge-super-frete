import { fieldToValidEnum, FormFields } from "../../support/types";

describe('Cálcular frete usando conjunto de dados pré definido e validando o correto cálculo e estabilidade da funcionalidade', () => {

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

  it('Calculo de frete com a opção Declaração de valor (Seguro)', () => {
    const withValueDeclarationAdditional: FormFields = {
      originZipCode: '08090-284', // Cep de Origem

      format: 1, // Formato 'Caixa / Pacote'

      weight: '0.3', // Peso

      height: '2', // Altura

      width: '11', // Largura

      depth: '16', // Comprimento

      haveAdditionalService: true,

      additionalServices: ["valueDeclaration"],

      valueDeclaration: '100',

      destinyZipCode: '05407-002', // Cep de Destino
    };

    cy.fillFreightCalcForm(withValueDeclarationAdditional);

    cy.get('[data-cy="calculator-submit"]').click();

    cy.get('.sc-ckdEwu').scrollTo('bottom');

    // Result validation
    cy.validatingFormResult(fieldToValidEnum.MAIN_PAC, ['23,49']);
    cy.validatingFormResult(fieldToValidEnum.PAC, ['10,23']);
    cy.validatingFormResult(fieldToValidEnum.MAIN_SEDEX, ['23,49']);
    cy.validatingFormResult(fieldToValidEnum.SEDEX, ['2,90']);
    cy.validatingFormResult(fieldToValidEnum.MINI, ['6,11']);
    cy.validatingFormResult(fieldToValidEnum.ORIGIN_ZIPCODE, ['08090284']);
    cy.validatingFormResult(fieldToValidEnum.ORIGIN_ADDRESS, ['Rua 03 de Outubro - Jardim Helena - São Paulo/SP']);
    cy.validatingFormResult(fieldToValidEnum.DESTINY_ZIPCODE, ['05407002']);
    cy.validatingFormResult(fieldToValidEnum.DESTINY_ADDRESS, ['Rua Cardeal Arcoverde - Pinheiros - São Paulo/SP']);
  });
})