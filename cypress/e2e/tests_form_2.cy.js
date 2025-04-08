beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

describe("My own test requests", () => {
  it("Fill out all the fields", () => {
    cy.get("#username").type("TheRolands");
    cy.get("#email").type("rt@email.com");
    cy.get('[data-cy="name"]').type("Rolands");
    cy.get("#lastName").type("Tucs");
    cy.get('[type="number"]').type("12345678");
    cy.get("#phpFavLanguage").click();
    cy.get("#vehicle2").click();
    cy.get("#cars").select("audi");
    cy.get("#animal").select("cat");
    cy.get("#password").type("123");
    cy.get("#confirm").type("123");
    cy.get("h2").contains("Password section").click();
    cy.get(".submit_button").click();
  });

  //Visual tests
  it.only("Check that logo is correct and has correct size", () => {
    cy.get("#logo")
      .should("have.attr", "src")
      .and("include", "cerebrum_hub_logo");
    cy.get("#logo").invoke("height").should("be.equal", 166);
    cy.get("#logo").invoke("width").should("be.equal", 178);
  });
});
