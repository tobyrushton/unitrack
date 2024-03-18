describe('Register page', () => {
    beforeEach(() => {
        cy.visit('/register')
        cy.task('reset:db')
    })

    it('All input should be on page and work', () => {
        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="firstName"]').type('First')
        cy.get('input[name="lastName"]').type('Last')

        cy.get('input[name="email"]').should('have.value', 'test@email.com')
        cy.get('input[name="password"]').should('have.value', 'password')
        cy.get('input[name="firstName"]').should('have.value', 'First')
        cy.get('input[name="lastName"]').should('have.value', 'Last')
    })

    it('All validation should work', () => {
        cy.get('input[name="email"]').type('testemail.com')
        cy.get('input[name="password"]').type('pass')

        cy.get('button[type="submit"]').click()

        cy.get('p').contains('Please enter a valid email').should('exist')
        cy.get('p')
            .contains('Password must be at least 8 characters')
            .should('exist')
        cy.get('p').contains('Please enter your name').should('exist')
        cy.get('p').contains('Please enter your last name').should('exist')

        cy.get('input[name="password"]').type('word123456789')
        cy.get('p')
            .contains('Password must be at most 16 characters')
            .should('exist')
    })

    it('Should allow you to register', () => {
        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="firstName"]').type('First')
        cy.get('input[name="lastName"]').type('Last')

        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
    })

    it('Should link to signin page', () => {
        cy.get('p').contains('Already have an account? Sign In').should('exist')
        cy.get('a').contains('Sign In').click()
        cy.url().should('include', '/signin')
    })

    it('Should link to dashboard if already logged in', () => {
        cy.get('input[name="email"]').type('test@email.com')
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="firstName"]').type('First')
        cy.get('input[name="lastName"]').type('Last')

        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')

        cy.visit('/register')
        cy.url().should('include', '/dashboard')
    })
})
