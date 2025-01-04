describe('=Login Flow', () => {
    const BASE_URL = 'http://localhost:5000'; // Backend URL
    const FRONTEND_URL = 'http://localhost:3000'; // Frontend URL
  
    it('should allow a user to log in', () => {
  
      // Fill out the login form
      cy.visit(`${FRONTEND_URL}/login`);
      cy.get('input#username').type('sarfaraz');
      cy.get('input#password').type('12345');
      cy.get('button[type="submit"]').click();
  
      // Verify redirection to the profile page
      cy.url().should('include', '/dashboard');
  
    });
});