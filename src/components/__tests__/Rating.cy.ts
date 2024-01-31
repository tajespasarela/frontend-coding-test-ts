import Rating from "../Rating.vue";

describe("<Rating />", () => {
  it("renders the rating out of 10", () => {
    cy.mount(Rating, { props: { rating: "5.5" } });

    cy.contains("5.5/10");
  });

  it("renders the stars with the width proportional to rating", () => {
    cy.mount(Rating, { props: { rating: "5.5" } });

    cy.findByTestId("rating-stars").then(el => {
      const totalWidth = el.parent().width() ?? 0;
      const starsWidth = el.width() ?? 0;
      expect(starsWidth / totalWidth).to.be.closeTo(5.5 / 10, 1);
    });
  });
});
