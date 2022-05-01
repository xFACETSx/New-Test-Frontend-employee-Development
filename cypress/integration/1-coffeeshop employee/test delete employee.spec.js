it('check Employee and Member page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Member').click()

});
it('delete Employee', () => {
    cy.contains('Edit').debug().click()
        .get('button').last().click()
        .get('button').last().click()
});
