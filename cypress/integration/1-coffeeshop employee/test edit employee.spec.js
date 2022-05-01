it('check Employee and Member page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Member').click()

});
it('edit Employee', () => {
    cy.contains('Edit').debug().click()
    cy.get('#firstname')
        .clear()
        .type('test01')
    cy.get('#lastname')
        .clear()
        .type('zero')
        cy.get('#age')
        .clear()
        .type('20')
    cy.get('#phone_no')
        .clear()
        .type('0824567485')
    cy.get('#email')
        .clear()
        .type('tester@email.com')
        .get('button').next().click('right')
});
