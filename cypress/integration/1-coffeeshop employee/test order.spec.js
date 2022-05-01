it('check order page', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Order').click()
    
});
