Cypress.Commands.add('login', () => {
    const email = 'gautier@gmail.com';

    cy.request({
        method: 'POST',
        url: '/api/account',
        body: { email, password: 'Gautier98.' },
      }).then((res) => localStorage.setItem('currentUser', res.body));
});