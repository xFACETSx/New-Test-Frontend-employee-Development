it('check stock and menu page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Menu').click()
    
});
it('edit ingredient', () => {
    cy.contains('Edit').click()
    cy.get('#ingredient_name')
        .clear()
        .type('lemon')
    cy.get('#quantity')
        .clear()
        .type('20')
    cy.get('#unit')
        .clear()
        .type('cups')
        .get('button').next().click('right')
    
});