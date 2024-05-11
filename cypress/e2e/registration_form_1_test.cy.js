// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */
describe('April 26, 2024. This is first test suite, Rolands Tucs', () => {
    it('User can submit data only when valid mandatory values are added', () => {



        //ASSIGNMENT 3, STEP 2 (ADD FIRST NAME AND LAST NAME)//
        cy.get('#phoneNumber').type('12345678')
        cy.get('#firstName').type('Rolands')
        cy.get('#lastName').type('Tucs')
        cy.get('#username').type('RolandsTucs')
        cy.get('input[name="password"]').type('123456')
        cy.get('input[name="confirm"]').type('123456')

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible')

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible')
    })



    //ASSIGNMENT 3, STEP 3 (USER CANNOT SUBMIT DATA WHEN PHONE NUMBER IS ABSENT)//
    it('User cannot submit data when phone number is absent', () => {
        cy.get('#username').type('RolandsTucs')
        cy.get('#firstName').type('Rolands')
        cy.get('#lastName').type('Tucs')
        cy.get('#phoneNumber').type('12345678')
        cy.get('input[name="password"]').type('TheNewPassword')
        cy.get('input[name="confirm"]').type('TheNewPassword')

        // Scroll back to phone number input field and clear it
        cy.get('#phoneNumber').scrollIntoView()
        cy.get('#phoneNumber').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
    })



    //ASSIGNMENT 3, STEP 4 (USER CANNOT SUBMIT DATA WHEN PASSWORD AND/OR CONFIRMATION PASSWORD IS ABSENT)//
    it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('#username').type('RolandsTucs')
        cy.get('#firstName').type('Rolands')
        cy.get('#lastName').type('Tucs')
        cy.get('#phoneNumber').type('12345678')
        cy.get('input[name="password"]').type('TheNewPassword')
        cy.get('input[name="confirm"]').type('TheNewPassword')

        // Scroll back to password input field and clear it
        cy.get('input[name="password"]').scrollIntoView()
        cy.get('input[name="password"]').clear()
        cy.get('h2').contains('Password').click()

         // Asserting that Submit button is disabled
         cy.get('.submit_button').should('be.disabled')
        // Fill the password field again
         cy.get('input[name="password"]').type('TheNewPassword')

          // Scroll back to the "confirm" input field and clear it
          cy.get('input[name="confirm"]').scrollIntoView()
          cy.get('input[name="confirm"]').clear()
          cy.get('h2').contains('Password').click()

          // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

      // Clear the "password" and "confirm" fields; Asserting that Submit button is disabled
      cy.get('input[name="password"]').clear()
      cy.get('input[name="confirm"]').clear()
      cy.get('h2').contains('Password').click()
      cy.get('.submit_button').should('be.disabled')
    })



    //ASSIGNMENT 3, STEP 5 (USER CANNOT ADD LETTERS TO PHONE NUMBER)
it('User cannot add letters to phone number', () => {
    cy.get('#username').type('RolandsTucs')
    cy.get('#firstName').type('Rolands')
    cy.get('#lastName').type('Tucs')
    cy.get('#phoneNumber').type('Cerebrum Hub')
    cy.get('input[name="password"]').type('TheNewPassword')
    cy.get('input[name="confirm"]').type('TheNewPassword')
    cy.get('h2').contains('Password').click()

// Asserting that Submit button is disabled
    cy.get('.submit_button').should('be.disabled')
})
})