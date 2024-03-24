import {BasePage} from "../support/pages/BasePage";
import testData from "../fixtures/testData.json";
import {faker} from '@faker-js/faker';

Cypress.config('defaultCommandTimeout', 10000);

/**
 * There is a file with automation tests. There I covered all requirements for Submit forms.
 * Tests were created by using test design techniques(such as boundary values, pairwise and equivalent partitions).
 */

const basePage: BasePage = new BasePage();

beforeEach(() => {
    cy.openHomePage();
})

describe('Testing the submit form on the home page', () => {

    describe("Submitting the form", () => {
        it('Submit the form by using MINIMUM amount of the characters for the fields', () => {
            basePage.fillInNameField();
            basePage.fillInEmailField();
            basePage.fillInPhoneField();
            basePage.fillInSubjectField();
            basePage.fillInMessageInputArea();

            basePage.submitTheForm();

            basePage.checkSuccessSubmitFromMessage();
        })

        it('Submit the form by using MAXIMUM amount of the characters for the fields', () => {
            // We don't have information about MAX amount of characters for: name and email fields.
            // So, let max amount be 20 for the both fields
            // By the way, if we submit the form where the name fields has 400 characters - the server get 500 status code.
            let maxSizeName: string = faker.string.alpha(20);
            let maxSizeEmail: string = 'heyHeyHey@whoYou.are';
            let maxSizePhone: string = faker.string.numeric(20);
            let maxSizeSubject: string = faker.string.alpha(100);
            let maxSizeMessage: string = faker.string.alpha(2000);

            basePage.fillInNameField(maxSizeName);
            basePage.fillInEmailField(maxSizeEmail);
            basePage.fillInPhoneField(maxSizePhone);
            basePage.fillInSubjectField(maxSizeSubject);
            basePage.fillInMessageInputArea(maxSizeMessage);

            basePage.submitTheForm();

            basePage.checkSuccessSubmitFromMessage(maxSizeName, maxSizeSubject);
        })

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

    describe("Validation tests", () => {
        //

        /////// there is a trouble
        testData.forEach(dataFromJson => {
            it.only(`Subject field validation checks ${dataFromJson.testData.nameTest}`, () => {
                let valueOutOfRequiredSize: string = faker.string.alpha(dataFromJson.testData.subject);

                basePage.fillInNameField();
                basePage.fillInEmailField();
                basePage.fillInPhoneField();
                basePage.fillInSubjectField(valueOutOfRequiredSize);
                basePage.fillInMessageInputArea();

                basePage.submitTheForm();
                basePage.checkAlerAboutWrongAmountOfCharactersForField('subject');
            })
        })
    })
})