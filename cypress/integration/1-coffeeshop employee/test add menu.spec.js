it('check stock and menu page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Menu').click()
    
});
it('add Menu', () => {
    cy.contains('Add').click()
    cy.get("input[type=file]")
        .attachFile("latte.jpg")
    cy.get('#name')
        .type('Latte')
    cy.get('#price')
        .type('50')
    cy.get('#sale_to')
        .type('45')
    cy.get('#type').click()
    cy.get('#description')
        .type('just test')
    //cy.get('#ingredient_0_stock_id').click().blur()
   /* cy.get('#ingredient_0_quantity')
        .type('10')*/
        .get('button').next().click('right')

});