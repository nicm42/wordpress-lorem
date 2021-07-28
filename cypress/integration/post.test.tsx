describe('Post tests', () => {
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
    cy.findByText('This is a test post').should('exist');
  });

  xit('has an error', () => {
    cy.intercept(
      'https://public-api.wordpress.com/rest/v1.1/sites/nictesting935058505.wordpress.com/posts/?pretty=true',
      'error'
    ).as('getPosts');
    cy.intercept('GET', '/knight', {
      fixture: 'test-image.json',
    }).as('getImages');
    cy.wait('@getPosts');
    cy.findByText("Couldn't fetch posts").should('exist');
  });
});
