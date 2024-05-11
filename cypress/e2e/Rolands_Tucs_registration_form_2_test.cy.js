beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Function for - only mandatory fields filled
function OnlyMandatoryFieldsFilled() {
    cy.get('#username').type(randomUsername)
    cy.get('#email').type(randomEmail)
    cy.get('input[name="name"]').type(randomFirstName)
    cy.get('#lastName').type(randomLastName)
    cy.get('input[data-testid="phoneNumberTestId"]').type(randomPhoneNumber)
}

// Function for - all the fields filled
function AllFieldsFilled() {
    cy.get('#username').type(username)
    cy.get('#email').type(email)
    cy.get('input[name="name"]').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('input[data-testid="phoneNumberTestId"]').type(phoneNumber)
    cy.get('#htmlFavLanguage').click()
    cy.get('#vehicle2').click()
    cy.get('#cars').select("audi")
    cy.get('#animal').select("cat")
    cy.get('#password').type(password)
    cy.get('#confirm').type(confirmPassword)
}

// Variables
import { faker } from '@faker-js/faker';

const username = 'RolandsTucs'
const randomUsername = faker.internet.userName()
const email = 'rolandstucs@mail.com'
const randomEmail = faker.internet.email()
const firstName = 'Rolands'
const randomFirstName = faker.person.firstName()
const lastName = 'Tucs'
const randomLastName = faker.person.lastName()
const phoneNumber = '12345678'
const randomPhoneNumber = faker.string.numeric(8)
const password = '123'
const confirmPassword = '123'

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', () => {
        // Only mandatory fields are filled
        OnlyMandatoryFieldsFilled()
        // Confirmation password is different from the first password
        cy.get('#password').type('123')
        cy.get('#confirm').type('1234')
        // Asserting that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        // Asserting that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Asserting that error message is visible
        cy.get('#password_error_message').should('be.visible')
        // Confirmation password has changed to be matched
        cy.get('#confirm').scrollIntoView()
        cy.get('#confirm').clear()
        cy.get('#confirm').type('123')
        cy.get('h2').contains('Password').click()
        // Asserting that error message is not visible anymore
        cy.get('#password_error_message').should('not.be.visible')
        // Asserting that submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
    })


    it('User can submit form with all fields added', () => {
        // All the fields are filled
        AllFieldsFilled()
        // Asserting that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        // Asserting that after submitting the form system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })


    it('User can submit form with valid data and only mandatory fields added', () => {
        // ONLY mandatory fields are filled
        OnlyMandatoryFieldsFilled()
        // Asserting that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        // Asserting that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })


    it('User cannot submit the form if mandatory field "Phone number" is not filled', () => {
        // ONLY mandatory fields are filled
        OnlyMandatoryFieldsFilled()
        // Data cleared from the phone number field
        cy.get('input[type="number"]').clear()
        //Asserting that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
    });
})


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        // Checking first logo source and size
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // Checking it's size, if height is less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })


    it('My test for the second picture', () => {
        // Creating similar test for checking the second logo's source and size
        cy.log('Will check logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // Checking it's size, if height is less than 178, greater than 100, and equal to 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 87).and('be.equal', 88)
    });


    it('Check navigation part', () => {
        // Checking if there are 2 navigation elements under title "Registration form number 2"
        cy.get('nav').children().should('have.length', 2)
        // Getting navigation element, finding siblings that contains h1 and checking if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Geting navigation element, finding its first child, checking the link content and clicking it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Checking that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        // Getting back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    // Checking the second navigation link
    it('My test - Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        // Getting navigation element, finding siblings that contains h1 and checking if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        // Geting navigation element, finding its first child, checking the link content and clicking it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        // Checking that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        // Getting back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    });


    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verifying labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        //Verifying default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })


    // Create test similar to previous one verifying check boxes
    it('My test - Check that radio button list is correct', () => {
        // Verifying that array has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        // Verifying labels of the checkboxes
        cy.get('input.checkbox').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input.checkbox').next().eq(1).should('have.text', 'I have a car')
        cy.get('input.checkbox').next().eq(2).should('have.text', 'I have a boat')
        //Verifying default state of checkboxes
        cy.get('input.checkbox').eq(0).should('not.be.checked')
        cy.get('input.checkbox').eq(1).should('not.be.checked')
        cy.get('input.checkbox').eq(2).should('not.be.checked')
        // Verifying that multiple selections can be selected together
        cy.get('input.checkbox').eq(0).check().should('be.checked')
        cy.get('input.checkbox').eq(1).check().should('be.checked')
        cy.get('input.checkbox').eq(0).should('be.checked')
    })


    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        // Checking that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one
    it('A dropdown of favorite animals is correct', () => {
        // Selecting second element and creating screenshot for this area and full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        // Verifying that the animal dropdown has 6 options
        cy.get('#animal').children().should('have.length', 6)
        // Verifying all values in the dropdown
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    });
})