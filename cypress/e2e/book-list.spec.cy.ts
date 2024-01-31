/// <reference types="cypress" />

describe('Book list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.contains('Books').should('exist').click()
  })

  it('Shows the list of books', () => {
    cy.findAllByTestId('book-list-item').should('have.length', 32)
  })

  it('show books for a searched query', () => {
    cy.findByTestId('search-input').focus().type('alice in wonderland')
    cy.findAllByTestId('book-list-item').should('have.length.at.least', 2)
    cy.findAllByTestId('book-list-item').each((item) => {
      cy.wrap(item).should('contain.text', 'Alice')
      cy.wrap(item).should('contain.text', 'Wonderland')
    })
  })

  it('shows second page of books', () => {
    const firstPageTitles: string[] = []
    cy.findByTestId('search-input').focus().type('shakespeare')

    // store the titles of the first page
    cy.findAllByTestId('book-list-item')
      .should('exist')
      .each((item) => {
        cy.wrap(item)
          .findByTestId('item-title')
          .invoke('text')
          .then((text) => firstPageTitles.push(text))
      })

    cy.findByLabelText('go to page 2').click()

    cy.findByText('Loading...').should('exist')
    cy.findByText('Loading...').should('not.exist')

    cy.findAllByTestId('book-list-item')
      .should('exist')
      .each((item, index) => {
        cy.wrap(item)
          .findByTestId('item-title')
          .invoke('text')
          .should('not.equal', firstPageTitles[index])
      })
  })

  it('shows book details', () => {
    cy.findByTestId('search-input').focus().type('alice in wonderland')
    cy.findAllByTestId('book-list-item').first().click()
    cy.findByTestId('book-details').should('exist')
  })
})
