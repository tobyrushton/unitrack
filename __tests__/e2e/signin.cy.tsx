describe('Signin pages', () => {
    beforeEach(() => {
        cy.visit('/signin')
        cy.task('reset:db')
    })

    it('All input should be on page and work', () => {
        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')

        cy.get('input[type="email"]').should('have.value', 'test@email.com')
        cy.get('input[type="password"]').should('have.value', 'password')
    })

    it('should have route to register page', () => {
        cy.get('p').contains("Don't have an account? Register").should('exist')
        cy.get('a').contains('Register').click()
        cy.url().should('include', '/register')
    })

    it('should allow for login', () => {
        cy.task('createUser')

        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')
    })

    it('should show error message if login fails', () => {
        cy.task('createUser')

        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('passwor')
        cy.get('button[type="submit"]').click()
        cy.get('p').contains('Incorrect email or password').should('exist')
    })

    it('should route to dashboard if already logged in', () => {
        cy.task('createUser')

        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')
        cy.get('button[type="submit"]').click()

        cy.visit('/signin')
        cy.url().should('include', '/dashboard')
    })
})
