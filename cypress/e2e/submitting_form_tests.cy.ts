/**
 * Before the running execute the command:
 * npm install
 *
 * To generate report execute the command:
 * cypress run
 */
import {HomePage} from "../support/pages/HomePage";
import requirementsSubmitForm from "../fixtures/requirementsSubmitForm.json";
import {faker} from "@faker-js/faker";

/**
 * There is a file with automation tests. There I covered all requirements for Submit forms.
 * Tests were created by using test design techniques(such as boundary values, pairwise and equivalent partitions).
 */


const homePage: HomePage = new HomePage();

let minValidValueName: string;
let minValidValueEmail: string;
let minValidValuePhone: string;
let minValidValueSubject: string;
let minValidValueMessage: string;

let maxValidSizeName: string;
let maxValidSizeEmail: string;
let maxValidSizePhone: string;
let maxValidSizeSubject: string;
let maxValidSizeMessage: string;

beforeEach((): void => {
    minValidValueName = faker.string.alpha(requirementsSubmitForm.minValidSizeValue.name);
    minValidValueEmail = requirementsSubmitForm.minValidSizeValue.email;
    minValidValuePhone = faker.string.numeric(requirementsSubmitForm.minValidSizeValue.phone);
    minValidValueSubject = faker.string.alpha(requirementsSubmitForm.minValidSizeValue.subject);
    minValidValueMessage = faker.string.alpha(requirementsSubmitForm.minValidSizeValue.message);

    maxValidSizeName = faker.string.alpha(requirementsSubmitForm.maxValidSizeValue.name);
    maxValidSizeEmail = requirementsSubmitForm.maxValidSizeValue.email;
    maxValidSizePhone = faker.string.numeric(requirementsSubmitForm.maxValidSizeValue.phone);
    maxValidSizeSubject = faker.string.alpha(requirementsSubmitForm.maxValidSizeValue.subject);
    maxValidSizeMessage = faker.string.alpha(requirementsSubmitForm.maxValidSizeValue.message);

    cy.openHomePage();
})

describe('Testing the submit form on the home page', (): void => {

    describe("Submitting the form", (): void => {
        it('Submit the form by using MINIMUM amount of the characters for the fields', () => {
            homePage.fillInNameField(minValidValueName);
            homePage.fillInEmailField(minValidValueEmail);
            homePage.fillInPhoneField(minValidValuePhone);
            homePage.fillInSubjectField(minValidValueSubject);
            homePage.fillInMessageInputArea(minValidValueMessage);

            homePage.submitTheForm();

            homePage.checkSuccessSubmitFromMessage(minValidValueName, minValidValueSubject);
        })

        it('Submit the form by using MAXIMUM amount of the characters for the fields', (): void => {
            // We don't have information about MAX amount of characters for: name and email fields.
            // So, let max amount be 20 for the both fields

            homePage.fillInNameField(maxValidSizeName);
            homePage.fillInEmailField(maxValidSizeEmail);
            homePage.fillInPhoneField(maxValidSizePhone);
            homePage.fillInSubjectField(maxValidSizeSubject);
            homePage.fillInMessageInputArea(maxValidSizeMessage);

            homePage.submitTheForm();

            homePage.checkSuccessSubmitFromMessage(maxValidSizeName, maxValidSizeSubject);
        })

        it('Submit the empty form', (): void => {
            homePage.submitTheForm();

            homePage.checkAlertForTheEmptyField('name');
            homePage.checkAlertForTheEmptyField('message');
            homePage.checkAlertForTheEmptyField('phone');
            homePage.checkAlertForTheEmptyField('subject');
            homePage.checkAlertForTheEmptyField('email');

            homePage.checkAlertAboutWrongAmountOfCharactersForField('message');
            homePage.checkAlertAboutWrongAmountOfCharactersForField('phone');
            homePage.checkAlertAboutWrongAmountOfCharactersForField('subject');
        })

    })

    describe('Validation tests', (): void => {

        describe('Check LOWER boundary values for fields', (): void => {
            it(`Subject field - ${requirementsSubmitForm.wrongMinSizeValue.nameTest} - ${requirementsSubmitForm.wrongMinSizeValue.subject} characters`, () => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMinSizeValue.subject);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);
                homePage.fillInPhoneField(minValidValuePhone);

                homePage.fillInSubjectField(valueOutOfRequiredSize);

                homePage.fillInMessageInputArea(minValidValueMessage);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('subject');
            })

            it(`Phone field - ${requirementsSubmitForm.wrongMinSizeValue.nameTest} - ${requirementsSubmitForm.wrongMinSizeValue.phone} characters`, (): void => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMinSizeValue.phone);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);

                homePage.fillInPhoneField(valueOutOfRequiredSize);

                homePage.fillInSubjectField(minValidValueSubject);
                homePage.fillInMessageInputArea(minValidValueMessage);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('phone');
            })

            it(`Message field - ${requirementsSubmitForm.wrongMinSizeValue.nameTest} - ${requirementsSubmitForm.wrongMinSizeValue.message} characters`, (): void => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMinSizeValue.message);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);
                homePage.fillInPhoneField(minValidValuePhone);
                homePage.fillInSubjectField(minValidValueSubject);

                homePage.fillInMessageInputArea(valueOutOfRequiredSize);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('message');
            })

        })

        describe('Check UPPER boundary values for fields', (): void => {
            it(`Subject field - ${requirementsSubmitForm.wrongMaxSizeValue.nameTest} - ${requirementsSubmitForm.wrongMaxSizeValue.subject} characters`, (): void => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMaxSizeValue.subject);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);
                homePage.fillInPhoneField(minValidValuePhone);

                homePage.fillInSubjectField(valueOutOfRequiredSize);

                homePage.fillInMessageInputArea(minValidValueMessage);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('subject');
            })

            it(`Phone field - ${requirementsSubmitForm.wrongMaxSizeValue.nameTest} - ${requirementsSubmitForm.wrongMaxSizeValue.phone} characters`, (): void => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMaxSizeValue.phone);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);

                homePage.fillInPhoneField(valueOutOfRequiredSize);

                homePage.fillInSubjectField(minValidValueSubject);
                homePage.fillInMessageInputArea(minValidValueMessage);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('phone');
            })

            it(`Message field - ${requirementsSubmitForm.wrongMaxSizeValue.nameTest} - ${requirementsSubmitForm.wrongMaxSizeValue.message} characters`, (): void => {
                let valueOutOfRequiredSize: string = faker.string.alpha(requirementsSubmitForm.wrongMaxSizeValue.message);

                homePage.fillInNameField(minValidValueName);
                homePage.fillInEmailField(minValidValueEmail);
                homePage.fillInPhoneField(minValidValuePhone);
                homePage.fillInSubjectField(minValidValueSubject);

                homePage.fillInMessageInputArea(valueOutOfRequiredSize);

                homePage.submitTheForm();
                homePage.checkAlertAboutWrongAmountOfCharactersForField('message');
            })
        })
    })
})