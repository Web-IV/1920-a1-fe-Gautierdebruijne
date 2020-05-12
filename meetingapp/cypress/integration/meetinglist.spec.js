describe('Meeting list tests', function(){
    beforeEach(function() {
        cy.login();
    });

    it('delayed response brings state out of sync', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/meetings',
            status: 200,
            response: 'fixture:meetings.json'
        });
        cy.route({
            delay: 2000,
            method: 'GET',
            url: '/api/meetings/?name=pa',
            status: 200,
            response: 'fixture:engels.json'
        }).as('getPAmeetings');

        cy.route({
            method: 'GET',
            url: '/api/recipes/?name=ga',
            status: 200,
            response: 'fixture:debruijne.json'
        }).as('getGAmeetings');
        
        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('pa');
        cy.wait(300);
        cy.get('[data-cy=filterInput]').type('{backspace}{backspace}ga');
        cy.wait(['@getPAmeetings', '@getGAmeetings']);
        cy.get('[data-cy=meetingCard]').should('have.length', 1);
        cy.get('[data-cy=meeting-title]').should('contain', 'Gautier');
    });
});