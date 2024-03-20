import { assessments } from './helpers/data'
import { login } from './helpers/login'

describe('Assessments Page', () => {
    beforeEach(() => {
        cy.task('reset:db')
        login()
        cy.task('seed:modules')
        cy.task('seed:assessments')
        cy.visit('/dashboard/assessments')
    })

    it('should display have the correct layout', () => {
        cy.get('h1').should('have.text', 'Assessments')
        cy.get('h2').should('have.text', 'Assessments Overview')
        cy.get('p')
            .first()
            .should('have.text', 'View and manage your assessments here')
    })

    it('should render list of assessments', () => {
        cy.get('li').should('have.length', assessments.length)

        assessments.forEach(assessment => {
            cy.get('h3').contains(assessment.name)
            cy.get('li').contains(
                `Due Date: ${assessment.date.toDateString()} | Grade: ${assessment.grade}`
            )
        })
    })
})
