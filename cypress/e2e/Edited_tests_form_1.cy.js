beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_1.html");
});

describe("My own test requests", () => {
  it("Fill out all the fields", () => {
    cy.get("#username").type("TheRolands");
    cy.get("#firstName").type("Rolands");
    cy.get("#lastName").type("Tucs");
    cy.get("#phoneNumber").type("12345678");
    cy.get('[name="password"]').type("123");
    cy.get('[name="confirm"]').type("123");
    cy.get("h2").contains("Password section").click();
    cy.get(".submit_button").click();
  });
});
