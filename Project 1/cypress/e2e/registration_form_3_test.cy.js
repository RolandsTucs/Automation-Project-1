beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe('Bonus assignment - Visual tests', () => {
    //Array of found elements with given selector has 4 elements in total
    it('Check that radio buttons list is correct', () => {
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
    });

    //Asserting that the country dropdown has an array of 4 elements in total with a correct values
    it('Check that "Country" dropdown list is correct', () => {
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    });

    // Asserting that the city dropdown works correctly if Spain is chosen from the country dropdown
    it('Check that "City" dropdown list is corect for Spain', () => {
        cy.get('#country').select('Spain')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
    });
    // Asserting that the city dropdown works correctly if Estonia is chosen from the country dropdown
    it('Check that "City" dropdown list is corect for Estonia', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    });

    // Asserting that the city dropdown works correctly if Austria is chosen from the country dropdown
    it('Check that "City" dropdown list is corect for Austria', () => {
        cy.get('#country').select('Austria')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(0).should('have.text', '')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    });

    //Asserting if city is already chosen and country is updated, then city choice should be removed
    it('Check that city choice is removed if country is updated', () => {
        cy.get('#country').select('Spain')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga').click()
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').eq(1).should('not.have.text', 'Malaga')
    });

    // Asserting that Date of registration field works correctly
    it('Check that "Registration date" works correctly', () => {
        cy.get('input[type="date"]').first().type('2024-05-10').should('have.value', '2024-05-10')
    });

    it('Check that radio buttons list is correct and works correctly', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verifying labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')
        //Verifying default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    });

    // Asserting that birthday date field works correctly
    it('Check that "Birthday" field works correctly', () => {
        cy.get('#birthday').type('2000-01-01').should('have.value', '2000-01-01')
    });

    //Asserting that checkboxes can be clicked
    it('Check if checkboxes are clickable', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
    });

    //Check that the email address format is properly validated
    it('Check that the email address format is properly validated', () => {
        cy.get('input[name="email"]').type('test')
        cy.get('#emailAlert').should('be.visible')
        cy.get('input[name="email"]').clear().type('test@test.com')
        cy.get('#emailAlert').should('not.be.visible')
    });

});

describe('BONUS TASK: functional tests', () => {
    it('all fields are filled in + corresponding assertions', () => {
        cy.get('#name').type('Rolands')
        cy.get('input[name="email"]').type('test@test.com')
        cy.get('#country').select('Spain')
        cy.get('#city').select('Malaga')
        cy.get('input[type="date"]').first().type('2024-05-10').should('have.value', '2024-05-10')
        cy.get('input[type="radio"]').eq(0).check()
        cy.get('#birthday').type('2000-01-01')
        cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy').click()
        cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy').click()
        cy.go('back')
    })
});
/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */