describe('Signup Flow', () => {
  const BASE_URL = 'http://localhost:5000'; // Backend URL
  const FRONTEND_URL = 'http://localhost:3000'; // Frontend URL
  const uniqueUsername = `testuser_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  it('should allow a user to sign up', () => {
    // Visit the signup page
    cy.visit(`${FRONTEND_URL}/signup`);

    // Fill out the signup form
    cy.get('input#username').type(uniqueUsername);
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    // Verify redirection to the login page
    cy.url().should('include', '/login');

  });
});