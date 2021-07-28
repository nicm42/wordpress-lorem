/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

describe('Image tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('has images', () => {
    cy.intercept('GET', '/knight', {
      fixture: 'test-image.json',
    }).as('getImages1');
    cy.intercept('GET', '/space', {
      fixture: 'test-image.json',
    }).as('getImages2');
    cy.intercept('GET', '/cat', {
      fixture: 'test-image.json',
    }).as('getImages3');
    cy.intercept('GET', '/cake', {
      fixture: 'test-image.json',
    }).as('getImages4');
    cy.wait('@getImages1');
    cy.wait('@getImages2');
    cy.wait('@getImages3');
    cy.wait('@getImages4');
    cy.get('img')
      .should('have.attr', 'src')
      .should(
        'include',
        'https://images.unsplash.com/photo-1571622840901-92ae138bd36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDc4NTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY3NjA2NTU&ixlib=rb-1.2.1&q=80&w=200'
      );
    cy.findAllByText('jjy95')
      .then(($el) => $el[0])
      .should('have.attr', 'href')
      .should(
        'include',
        'https://unsplash.com/@jjy95?utm_source=wordpress_lorem&utm_medium=referral'
      );
    cy.findAllByText('Unsplash')
      .then(($el) => $el[0])
      .should('have.attr', 'href')
      .should(
        'include',
        'https://unsplash.com?utm_source=wordpress_lorem&utm_medium=referral'
      );
  });

  it('does not have images if no data', () => {
    cy.intercept('GET', '/knight', []).as('getImages1');
    cy.intercept('GET', '/space', []).as('getImages2');
    cy.intercept('GET', '/cat', []).as('getImages3');
    cy.intercept('GET', '/cake', []).as('getImages4');
    cy.wait('@getImages1');
    cy.wait('@getImages2');
    cy.wait('@getImages3');
    cy.wait('@getImages4');
    cy.get('img')
      .should('have.attr', 'src')
      .should(
        'not.include',
        'https://images.unsplash.com/photo-1571622840901-92ae138bd36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDc4NTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY3NjA2NTU&ixlib=rb-1.2.1&q=80&w=200'
      );
    cy.get('jjy95').should('not.exist');
  });
});
