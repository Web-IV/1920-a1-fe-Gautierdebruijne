describe('My first test', function() {
    it('mock meeting get', function() {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/meetings',
            status: 200,
            response: 'fixture:meetings.json'
        });

        cy.visit('/');
        cy.get('[data-cy=meetingCard]').should('have.length', 3);
    });

    it('on error should show error message', function(){
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/meetings',
            status: 500,
            response: 'ERROR'
        });
        cy.visit('/');
        cy.get('[data-cy=appError]').should('be.visible');
    });
});