it('check stock and menu page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Menu').click()
    
});
it('add ingredient', () => {
    cy.contains('Ingredient').click()
    cy.get('#ingredient_name')
        .type('syrup')
    cy.get('#quantity')
        .type('10')
    cy.get('#unit')
        .type('Oz')
        .get('button').next().click('right')
    
});