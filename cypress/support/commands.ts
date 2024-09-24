/// <reference types="cypress" />

import { fillFreightCalcForm } from "./custom-commands/fill-freight-calc-form";
import { validatingFormResult } from "./custom-commands/validating-submit-result";
import { fieldToValidEnum, FormFields } from "./types";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('fillFreightCalcForm', fillFreightCalcForm)
Cypress.Commands.add('validatingFormResult', validatingFormResult)


declare global {
    namespace Cypress {
        interface Chainable {
            fillFreightCalcForm(filledFields: FormFields): Chainable<void>
            validatingFormResult(fieldToValid: fieldToValidEnum, values: string[]): Chainable<void>
        }
    }
}