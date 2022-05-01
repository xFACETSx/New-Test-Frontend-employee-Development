it('check Employee and Member page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Member').click()

});
it('add Employee', () => {
    cy.contains('Add').click()
    cy.get("input[type=file]")
        .attachFile("test.jpg")
    cy.get('#firstname')
        .type('tester')
    cy.get('#lastname')
        .type('test')
    cy.get('#age')
        .type('24')
    cy.get('#phone_no')
        .type('0891254785')
    cy.get('#email')
        .type('fake@email.com')
        .get('button').next().click('right')

});
