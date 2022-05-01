const { wait } = require("@testing-library/react");

it('check Employee and Member page', () => {
    cy.visit('/') // change URL to match your dev URL

});
it('test navbar', () => {
    cy.get('#root').click(855, 35) //order in navbar
        .wait(1000)
    cy.get('#root').click(943, 33) //Employee and Member page in navbar
        .wait(1000)
    cy.get('#root').click(54, 38) //Home in navbar
});
