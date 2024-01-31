/// <reference types="cypress" />

import Rating from '../../src/components/Rating.vue'

describe('<Rating />', () => {
  it('renders the rating out of 10', () => {
    cy.mount(Rating, { props: { rating: '2.5' } })

    cy.contains('2.5/5')
  })

  it('renders the stars with the width proportional to rating', () => {
    cy.mount(Rating, { props: { rating: '2.5' } })

    cy.findByTestId('rating-stars-filled').then((el) => {
      const totalWidth = el.parent().width() ?? 0
      const starsWidth = el.width() ?? 0
      expect(starsWidth / totalWidth).to.be.closeTo(5.5 / 5, 1)
    })
  })
})
