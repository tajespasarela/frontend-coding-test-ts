/// <reference types="cypress" />

import Comments from '../../src/components/Comments.vue'

describe('<Comments />', () => {
  it('renders the comments', () => {
    cy.mount(Comments, { props: { book: { slug: 'test-slug' } } })

    cy.contains('Comments')
    cy.contains('add a new comment')
  })

  it('adds a new comment', () => {
    cy.mount(Comments, { props: { book: { slug: 'test-slug' } } })
    cy.findByLabelText('name').type('John Doe')
    cy.findByLabelText('email').type('john.doe@email.com')
    cy.findByLabelText('comment').type('This is a test comment from John Doe')
    cy.findByText('submit').click()

    cy.findAllByTestId('comment').first().contains('John Doe')
    cy.findAllByTestId('comment').first().contains('john.doe@email.com')
    cy.findAllByTestId('comment')
      .first()
      .contains('This is a test comment from John Doe')

    cy.findByLabelText('name').type('Jane Doe')
    cy.findByLabelText('email').type('jane.doe@email.com')
    cy.findByLabelText('comment').type('This is a test comment from Jane Doe')
    cy.findByText('submit').click()

    cy.findAllByTestId('comment').first().contains('Jane Doe')
    cy.findAllByTestId('comment').first().contains('jane.doe@email.com')
    cy.findAllByTestId('comment')
      .first()
      .contains('This is a test comment from Jane Doe')

    cy.findAllByTestId('comment').eq(1).contains('John Doe')
    cy.findAllByTestId('comment').eq(1).contains('john.doe@email.com')
    cy.findAllByTestId('comment')
      .eq(1)
      .contains('This is a test comment from John Doe')
  })
})
