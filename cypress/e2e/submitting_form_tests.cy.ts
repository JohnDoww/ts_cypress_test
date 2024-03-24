import {HomePage} from "../support/pages/HomePage";
import requirementsSubmitForm from "../fixtures/requirementsSubmitForm.json";

Cypress.config('defaultCommandTimeout', 10000);

/**
 * There is a file with automation tests. There I covered all requirements for Submit forms.
 * Tests were created by using test design techniques(such as boundary values, pairwise and equivalent partitions).
 */

const basePage: HomePage = new HomePage();

    Cypress.config('defaultCommandTimeout', 10000);
    let minValidValueName:string = cy.generateString(jsonData.minValidSizeValue.name);
//     let minValidValueEmail:string =  requirementsSubmitForm.minValidSizeValue.email;
//     let minValidValuePhone:string = cy.generatePhoneNumber(requirementsSubmitForm.minValidSizeValue.phone);
//     let minValidValueSubject:string = cy.generateString(requirementsSubmitForm.minValidSizeValue.subject);
//     let minValidValueMessage:string = cy.generateString(requirementsSubmitForm.minValidSizeValue.message);
//
// let maxSizeName: string = cy.generateString(requirementsSubmitForm.maxValidSizeValue.name);
// let maxSizeEmail: string = requirementsSubmitForm.maxValidSizeValue.email;
// let maxSizePhone: string = cy.generatePhoneNumber(requirementsSubmitForm.maxValidSizeValue.phone);
// let maxSizeSubject: string = cy.generateString(requirementsSubmitForm.maxValidSizeValue.subject);
// let maxSizeMessage: string = cy.generateString(requirementsSubmitForm.maxValidSizeValue.message);

beforeEach(() => {
    cy.openHomePage();
})

describe('Testing the submit form on the home page', () => {

    describe("Submitting the form", () => {
        it('Submit the form by using MINIMUM amount of the characters for the fields', () => {
            basePage.fillInNameField(minValidValueName);
            // basePage.fillInEmailField(minValidValueEmail);
            // basePage.fillInPhoneField(minValidValuePhone);
            // basePage.fillInSubjectField(minValidValueSubject);
            // basePage.fillInMessageInputArea(minValidValueMessage);

            basePage.submitTheForm();

            basePage.checkSuccessSubmitFromMessage();
        })

        // it('Submit the form by using MAXIMUM amount of the characters for the fields', () => {
        //     // We don't have information about MAX amount of characters for: name and email fields.
        //     // So, let max amount be 20 for the both fields
        //     // By the way, if we submit the form where the name fields has 400 characters - the server get 500 status code.
        //
        //     basePage.fillInNameField(maxSizeName);
        //     basePage.fillInEmailField(maxSizeEmail);
        //     basePage.fillInPhoneField(maxSizePhone);
        //     basePage.fillInSubjectField(maxSizeSubject);
        //     basePage.fillInMessageInputArea(maxSizeMessage);
        //
        //     basePage.submitTheForm();
        //
        //     basePage.checkSuccessSubmitFromMessage(maxSizeName, maxSizeSubject);
        // })

        it('Submit the empty form', () => {
            basePage.submitTheForm();

            basePage.checkAlertForTheEmptyField('name');
            basePage.checkAlertForTheEmptyField('message');
            basePage.checkAlertForTheEmptyField('phone');
            basePage.checkAlertForTheEmptyField('subject');
            basePage.checkAlertForTheEmptyField('email');

            basePage.checkAlerAboutWrongAmountOfCharactersForField('message');
            basePage.checkAlerAboutWrongAmountOfCharactersForField('phone');
            basePage.checkAlerAboutWrongAmountOfCharactersForField('subject');
        })

    })

    // describe("Validation tests", () => {
    //     requirementsSubmitForm.forEach(dataFromJson => {
    //         it(`Subject field validation checks ${dataFromJson.wrongSizeValue.nameTest} - ${dataFromJson.wrongSizeValue.subject} characters`, () => {
    //             let valueOutOfRequiredSize: string = cy.generateString(dataFromJson.wrongSizeValue.subject);
    //
    //             basePage.fillInNameField();
    //             basePage.fillInEmailField();
    //             basePage.fillInPhoneField();
    //             basePage.fillInSubjectField(valueOutOfRequiredSize);
    //             basePage.fillInMessageInputArea();
    //
    //             basePage.submitTheForm();
    //             basePage.checkAlerAboutWrongAmountOfCharactersForField('subject');
    //         })
    //     })
    // })
})