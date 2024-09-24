import { fieldToValidEnum } from "../types";

function formatValuesToMoneyList(values: string[]) {
    const formatedValues: string[] = []

    for (const value of values) {
        formatedValues.push(`R$ ${value}`)
    }

    return formatedValues
}

export const validatingFormResult = (fieldToValid: fieldToValidEnum, values: string[]) => {
    switch (fieldToValid) {
        case fieldToValidEnum.MAIN_PAC:
            cy.get('#calculator-PAC-counterValue-text').invoke('text')
                .then((text) => {
                    const result = text.trim();

                    expect(formatValuesToMoneyList(values)).to.contain(result);
                });

            break;

        case fieldToValidEnum.PAC:
            cy.get('#calculator-PAC-amount-text > strong')
                .invoke('text')
                .then((text) => {
                    const result = text.trim();

                    expect(formatValuesToMoneyList(values)).to.contain(result);
                });

            break;

        case fieldToValidEnum.MAIN_SEDEX:
            cy.get('#calculator-SEDEX-counterValue-text').invoke('text')
                .then((text) => {
                    const result = text.trim();

                    expect(formatValuesToMoneyList(values)).to.contain(result);
                });

            break;

        case fieldToValidEnum.SEDEX:
            cy.get('#calculator-SEDEX-amount-text > strong').invoke('text')
                .then((text) => {
                    const result = text.trim();

                    expect(formatValuesToMoneyList(values)).to.contain(result);
                });

            break;

        case fieldToValidEnum.MINI:
            cy.get('#calculator-Mini\\\ Envios-amount-text > strong').invoke('text')
                .then((text) => {
                    const result = text.trim();

                    expect(formatValuesToMoneyList(values)).to.contain(result);
                });

            break;

        case fieldToValidEnum.ORIGIN_ZIPCODE:
            cy.get(':nth-child(1) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiStepLabel-label > .MuiTypography-root').then((text) => {

                expect(text).to.contain(`ORIGEM: ${values[0]}`);
            });

            break;

        case fieldToValidEnum.ORIGIN_ADDRESS:
            cy.get(':nth-child(1) > .MuiStepContent-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiTypography-root').then((text) => {

                expect(text).to.contain(values[0]);
            });

            break;

        case fieldToValidEnum.DESTINY_ZIPCODE:
            cy.get(':nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiStepLabel-label > .MuiTypography-root').then((text) => {

                expect(text).to.contain(`DESTINO: ${values[0]}`);
            });

            break;

        case fieldToValidEnum.DESTINY_ADDRESS:
            cy.get(':nth-child(3) > .MuiStepContent-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiTypography-root').then((text) => {

                expect(text).to.contain(values[0]);
            });

            break;

        default:
            break;
    }
}