beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignement 4: add content to the following tests
*/
function mandatoryFieldsFilled() {
  cy.get("#username").type("RolandsTucs");
  cy.get("#email").type("rt@email.com");
  cy.get('[data-cy="name"]').type("Rolands");
  cy.get("#lastName").type("Tucs");
  cy.get('[data-testid="phoneNumberTestId"]').type("12345678");
}

function allFieldsFilled() {
  cy.get("#username").type("RolandsTucs");
  cy.get("#email").type("RT@email.com");
  cy.get('[data-cy="name"]').type("Rolands");
  cy.get("#lastName").type("Tucs");
  cy.get('[data-testid="phoneNumberTestId"]').type("12345678");
  cy.get("#htmlFavLanguage").click();
  cy.get("#vehicle2").click();
  cy.get("#cars").select("audi");
  cy.get("#animal").select("Horse");
  cy.get("#password").type("123");
  cy.get("#confirm").type("123");
}
describe("Section 1: Functional tests", () => {
  it("User can use only same both first and validation passwords", () => {
    // Add test steps for filling in only mandatory fields
    mandatoryFieldsFilled();
    // Type confirmation password which is different from first password
    cy.get("#password").type("123");
    cy.get("#confirm").type("1234)");
    // Assert that submit button is not enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("not.be.enabled");
    // Assert that successful message is not visible
    cy.get("#success_message").should("not.be.visible");
    // Assert that error message is visible
    cy.get("#password_error_message").should("be.visible");
    // Change the test, so the passwords would match
    cy.get("#confirm").clear().type("123");
    cy.get("h2").contains("Password").click();
    // Add assertion, that error message is not visible anymore
    cy.get("#password_error_message").should("not.be.visible");
    // Add assertion, that submit button is now enabled
  });

  it("User can submit form with all fields added", () => {
    // Add test steps for filling in ALL fields
    allFieldsFilled();
    // Assert that submit button is enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled").click();
    // Assert that after submitting the form system show successful message
    cy.get("#success_message").should("be.visible");
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    // Add test steps for filling in ONLY mandatory fields
    mandatoryFieldsFilled();
    // Assert that submit button is enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled").click();
    // Assert that after submitting the form system shows successful message
    cy.get("#success_message").should("be.visible");
    // example, how to use function, which fills in all mandatory data
    // in order to see the content of the function, scroll to the end of the file
  });

  // Add at least 1 test for checking some mandatory field's absence
});

/*
Assignement 5: create more visual tests
*/

describe("Section 2: Visual tests", () => {
  it("Check that logo is correct and has correct size", () => {
    cy.log("Will check logo source and size");
    cy.get("img")
      .should("have.attr", "src")
      .should("include", "cerebrum_hub_logo");
    // get element and check its parameter height
    // it should be less than 178 and greater than 100
    cy.get("img")
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });

  it("My test for second picture", () => {
    // Create similar test for checking the second picture
  });

  it("Check navigation part", () => {
    cy.get("nav").children().should("have.length", 2);

    // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    // Get navigation element, find its first child, check the link content and click it
    cy.get("nav")
      .children()
      .eq(0)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_1.html")
      .click();

    // Check that currently opened URL is correct
    cy.url().should("contain", "/registration_form_1.html");

    // Go back to previous page
    cy.go("back");
    cy.log("Back again in registration form 2");
  });

  // Create similar test for checking the second link

  it("Check that radio button list is correct", () => {
    // // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should("be.length", 4);
    // Verify labels of the radio buttons
    // cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "CSS");
    cy.get('input[type="radio"]')
      .next()
      .eq(2)
      .should("have.text", "JavaScript");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "PHP");

    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");

    // Selecting one will remove selection from the other radio button
    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });

  // Create test similar to previous one verifying check boxes

  it.only("Car dropdown is correct", () => {
    // Here is just an example how to explicitely create screenshot from the code
    // Select second element and create screenshot for this area or full page
    cy.get("#cars").select(1).screenshot("Cars drop-down");
    cy.screenshot("Full page screenshot");

    // Here are given different solutions how to get the length of array of elements in Cars dropdown
    // Next 2 lines of code do exactly the same!
    cy.get("#cars").children().should("have.length", 4);
    cy.get("#cars").find("option").should("have.length", 4);

    // Check  that first element in the dropdown has text Volvo
    cy.get("#cars").find("option").eq(0).should("have.text", "Volvo");

    // Advanced level how to check the content of the Cars dropdown
    cy.get("#cars")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq(["volvo", "saab", "opel", "audi"]);
      });
  });

  // Create test similar to previous one
});

function inputValidData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("validemail@yeap.com");
  cy.get('[data-cy="name"]').type("John");
  cy.get("#lastName").type("Doe");
  cy.get('[data-testid="phoneNumberTestId"]').type("10203040");
  cy.get("#password").type("MyPass");
  cy.get("#confirm").type("MyPass");
  cy.get("h2").contains("Password").click();
}
