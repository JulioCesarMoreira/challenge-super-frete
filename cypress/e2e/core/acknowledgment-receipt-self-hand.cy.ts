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

  it('Cálculo de frete com as opções de aviso de recebimento e recebimento em mão (AR + Mão Própria)', () => {

    const withAcknowledgmentOfReceiptAndValueDeclarationAdditional: FormFields = {
      originZipCode: '08090-284', // Cep de Origem

      format: 1, // Formato 'Caixa / Pacote'

      weight: '0.3', // Peso

      height: '2', // Altura

      width: '11', // Largura

      depth: '16', // Comprimento

      haveAdditionalService: true,

      additionalServices: ["acknowledgmentOfReceipt", "selfHand"],

      destinyZipCode: '05407-002', // Cep de Destino
    };

    cy.fillFreightCalcForm(withAcknowledgmentOfReceiptAndValueDeclarationAdditional);

    cy.get('[data-cy="calculator-submit"]').click();

    cy.get('.sc-ckdEwu').scrollTo('bottom');

    // Result validation
    cy.validatingFormResult(fieldToValidEnum.MAIN_PAC, ['38,90']);
    cy.validatingFormResult(fieldToValidEnum.PAC, ['28,49']);
    cy.validatingFormResult(fieldToValidEnum.MAIN_SEDEX, ['38,90']);
    cy.validatingFormResult(fieldToValidEnum.SEDEX, ['21,17']);
    cy.validatingFormResult(fieldToValidEnum.ORIGIN_ZIPCODE, ['08090284']);
    cy.validatingFormResult(fieldToValidEnum.ORIGIN_ADDRESS, ['Rua 03 de Outubro - Jardim Helena - São Paulo/SP']);
    cy.validatingFormResult(fieldToValidEnum.DESTINY_ZIPCODE, ['05407002']);
    cy.validatingFormResult(fieldToValidEnum.DESTINY_ADDRESS, ['Rua Cardeal Arcoverde - Pinheiros - São Paulo/SP']);
  });
})