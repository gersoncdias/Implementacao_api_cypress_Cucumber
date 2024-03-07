import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const cookieName = Cypress.env('cookie_name')
const username = Cypress.env('user_name')
const password = Cypress.env('user_password')

Given("I'm on the home page", () => {
  cy.visit(Cypress.env('url'))
})

When('I set the authentication token with my credentials', () => {
  return cy.generateAndValidateToken(username, password).then((authToken) => {
    cy.setCookie('cookieName', authToken)

    cy.visit(Cypress.env('url'))
  })
})

Then('I must be logged in', () => {
  cy.getCookie(cookieName).should('exist')
})
