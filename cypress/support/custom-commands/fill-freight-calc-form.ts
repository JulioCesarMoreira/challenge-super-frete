import { FormFields } from "../types";

export const fillFreightCalcForm = (filledFields: FormFields) => {
    // Preencher Cep de Origem
    cy.get('#originPostcode').type(filledFields.originZipCode);

    // selecionar formato
    cy.get('#object_format').click();
    cy.get('.Mui-selected').then(($selected) => {
        if ($selected.text().trim() == "Caixa / Pacote" && filledFields.format == 1) {
            cy.get('.Mui-selected').click()
        } else {
            cy.get(`[data-value="${filledFields.format}"]`).click();
        }
    });

    // selecionar peso
    cy.get('#weight').click()
    cy.get(`[data-value="${filledFields.weight}"]`).click();

    // Preencher Altura
    if (filledFields.height)
        cy.get('#packageHeight').type(filledFields.height);

    // Preencher Largura
    if (filledFields.width)
        cy.get('#packageWidth').type(filledFields.width);

    // Preencher Comprimento de Caixa / Pacote
    if (filledFields.depth)
        cy.get('#packageDepth').type(filledFields.depth);

    // Preencher Comprimento de Rolo / Cilindro ou Esfera
    if (filledFields.rdepth)
        cy.get('#\\\:rc\\\:').type(filledFields.rdepth);

    // Preencher Diâmetro de Rolo / Cilindro ou Esfera
    if (filledFields.rdiameter)
        cy.get('#\\\:rd\\\:').type(filledFields.rdiameter);

    if (filledFields.haveAdditionalService) {
        cy.get('.MuiAccordionSummary-root').click();

        for (const additionalService of filledFields.additionalServices)
            cy.get(`[data-cy="calculator-${additionalService}"] > .PrivateSwitchBase-input`).click();

        if (filledFields.additionalServices.includes('valueDeclaration')) {
            cy.get('[data-cy="calculator-objectValue"] > .MuiInputBase-root').type(filledFields.valueDeclaration)
        }
    }

    cy.get('#destinationPostcode').type(filledFields.destinyZipCode)

}