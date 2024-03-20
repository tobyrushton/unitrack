export const login = (): void => {
    cy.visit('/signin')
    cy.task('createUser')
    cy.get('input[name="email"]').type('test@email.com')
    cy.get('input[name="password"]').type('password')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
}
