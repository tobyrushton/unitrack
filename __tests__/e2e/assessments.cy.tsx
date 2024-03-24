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
        cy.get('button').contains('New Assessment').should('exist')
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

    it('should be able to create new assessment', () => {
        cy.get('button').contains('New Assessment').click()
        cy.get('h3').contains('New Assessment').should('exist')

        cy.get('input[name="name"]').type('New Assessment')
        cy.get('input[name="date"]').type('2020-12-31')
        cy.get('input[name="weight"]').type('10')
        cy.get('input[name="grade"]').type('100')
        cy.get('input[name="time"]').type('10:00')
        cy.get('select').select('COMP1012: Introduction to Programming', {
            force: true,
        })
        cy.get('button').contains('Save').click()
        cy.reload()

        cy.get('li').should('have.length', assessments.length + 1)
        cy.get('li').contains('New Assessment')
    })
})
