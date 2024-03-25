/**
 * There is a class where I store methods and web element selectors
 * which I will use through testing this page.
 */

export class HomePage {
    elements: { [key: string]: string };
    defaultValues: { [key: string]: string };

    constructor() {
        this.elements = {};
        this.elements.nameField = '[data-testid="ContactName"]';
        this.elements.emailField = '[data-testid="ContactEmail"]';
        this.elements.phoneField = '[data-testid="ContactPhone"]';
        this.elements.subjectField = '[data-testid="ContactSubject"]';
        this.elements.messageInputArea = '[class="input-group"]';
        this.elements.submitFormButton = '#submitContact';
        this.elements.successSubmitFormHeader = '.col-sm-5 h2';
        this.elements.successSubmitFormSubject = '.col-sm-5 p[style]';
        this.elements.alertOfSubmitingForm = '.alert-danger';

        this.defaultValues = {};
        this.defaultValues.textOfAlerForEmptyField = ' may not be blank';
        this.defaultValues.charactersWrongAmountSubjectFieldAlert = 'Subject must be between 5 and 100 characters.';
        this.defaultValues.charactersWrongAmountPhoneFieldAlert = 'Phone must be between 11 and 21 characters.';
        this.defaultValues.charactersWrongAmountMessageFieldAlert = 'Message must be between 20 and 2000 characters.';
    }

    /**
     *This method fill in the Name field of the submit form.
     * Also, there are assertions about displayed field name and data which we inputted.
     */
    fillInNameField(name: string): void {
        cy.get(this.elements.nameField)
            .should("have.attr", 'aria-label', 'Name')
            .type(name)
            .should("have.value", name);
    }


    /**
     *This method fill in the Email field of the submit form.
     * Also, there are assertions about displayed field name and data which we inputted.
     */
    fillInEmailField(email: string): void {
        cy.get(this.elements.emailField)
            .should("have.attr", 'aria-label', 'Email')
            .type(email)
            .should("have.value", email);
    }


    /**
     *This method fill in the Phone field of the submit form.
     * Also, there are assertions about displayed field name and data which we inputted.
     */
    fillInPhoneField(phone: string): void {
        cy.get(this.elements.phoneField)
            .should("have.attr", 'aria-label', 'Phone')
            .type(phone)
            .should("have.value", phone);
    }


    /**
     *This method fill in the Subject field of the submit form.
     * Also, there are assertions about displayed field name and data which we inputted.
     */
    fillInSubjectField(subject: string): void {
        cy.get(this.elements.subjectField)
            .clear()
            .should("have.attr", 'aria-label', 'Subject')
            .type(subject)
            .should("have.value", subject);
    }

    /**
     *This method fill in the Message field of the submit form.
     * Also, there are assertions about displayed field name and data which we inputted.
     */
    fillInMessageInputArea(message: string): void {
        cy.get(this.elements.messageInputArea)
            .should("have.text", 'Message')
            .type(message)
            .children('textarea')
            .should('have.value', message);
    }

    /**
     *This method click the submit form.
     * Also, there assertion about the name of displayed button name.
     */
    submitTheForm(): void {
        cy.get(this.elements.submitFormButton).should("have.text", "Submit")
            .click();
    }

    /**
     *This method checks that we display exactly data which user inputted for the Name and the Subject fields.
     * There we check the header of the success message, after submitting the form.
     */
    checkSuccessSubmitFromMessage(userName: string, userSubject: string): void {
        cy.get(this.elements.successSubmitFormHeader)
            .should('have.text', `Thanks for getting in touch ${userName}!`);

        cy.get(this.elements.successSubmitFormSubject)
            .should('have.text', userSubject);
    }


    /**
     *This method accept name of field to understand, which error we expect to investigate while using the method.
     * This method check error message for certain field, which is empty, while submitting the form.
     * When we send wrong nameOfFiled as an argument for that field - method will log it to the Cypress console.
     */
    checkAlertForTheEmptyField(nameOfField: string): void {

        // @ts-ignore
        switch (nameOfField.toLowerCase()) {
            case 'message': {
                nameOfField = 'Message';
                break;
            }
            case 'phone': {
                nameOfField = 'Phone';
                break;
            }
            case 'subject': {
                nameOfField = 'Subject';
                break;
            }
            case 'name': {
                nameOfField = 'Name';
                break;
            }
            case 'email': {
                nameOfField = 'Email';
                break;
            }

            default: {
                cy.log('Wrong input. Use only mentioned in cases')
                break;
            }
        }

        cy.get(this.elements.alertOfSubmitingForm)
            .should('contain.text', nameOfField + this.defaultValues.textOfAlerForEmptyField);
    }

    /**
     *This method accept name of field to understand, which error we expect to investigate while using the method.
     * This method check error message for certain field, where value to long or to short, while submitting the form.
     * When we send wrong nameOfFiled as an argument for that field - method will log it to the Cypress console.
     */
    checkAlertAboutWrongAmountOfCharactersForField(nameOfField: string):void {
        let expectedAlertMessage: string = '';

        // @ts-ignore
        switch (nameOfField.toLowerCase()) {
            case 'message': {
                expectedAlertMessage = this.defaultValues.charactersWrongAmountMessageFieldAlert;
                break;
            }
            case 'phone': {
                nameOfField = 'Phone';
                expectedAlertMessage = this.defaultValues.charactersWrongAmountPhoneFieldAlert;
                break;
            }
            case 'subject': {
                nameOfField = 'Subject';
                expectedAlertMessage = this.defaultValues.charactersWrongAmountSubjectFieldAlert;
                break;
            }
            default: {
                cy.log('Wrong input. Use only mentioned in cases')
                break;
            }
        }

        cy.get(this.elements.alertOfSubmitingForm)
            .should('contain.text', expectedAlertMessage);
    }
}