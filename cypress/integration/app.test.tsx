/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

describe('App tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('has posts', () => {
    cy.intercept(
      'GET',
      'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true',
      {
        fixture: 'test-post.json',
      }
    ).as('getPosts');
    cy.intercept('GET', '/knight', {
      fixture: 'test-image.json',
    }).as('getImages1');
    cy.wait('@getPosts');
    cy.findAllByText('Alternative Ipsum Posts').should('exist');
    cy.findByText('Posts loaded!').should('exist');
    cy.findByRole('button', {
      name: /Close/i,
    }).click();
    cy.findByText('Posts loaded!').should('not.exist');
  });
});
