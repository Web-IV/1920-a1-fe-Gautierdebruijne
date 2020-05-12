Cypress.Commands.add('login', () => {
    const email = 'gautier@gmail.com';

    cy.request({
        method: 'POST',
        url: '/api/account',
        body: { email, password: 'Meeting3.' },
      }).then((res) => localStorage.setItem('currentUser', res.body));
});

Cypress.Commands.add('register', (email, password) => {
    cy.request({
      method: 'POST',
      url: '/api/account/register',
      body: { email, password },
    }).then((res) => localStorage.setItem('currentUser', res.body));
  });