import { modules } from './helpers/data'
import { login } from './helpers/login'

describe('Modules page', () => {
    beforeEach(() => {
        cy.task('reset:db')
        login()
        cy.task('seed:modules')
        cy.visit('/dashboard/modules')
    })

    it('should have correct layout', () => {
        cy.get('h1').contains('Modules').should('exist')
        cy.get('p')
            .contains('Explore and manage your modules here.')
            .should('exist')
        cy.get('button').contains('New Module').should('exist')

        cy.get('li').should('have.length', 5)

        modules.forEach(module => {
            cy.get('h3')
                .contains(`${module.code}: ${module.name}`)
                .should('exist')
            cy.get('li')
                .contains(
                    `Credits: ${module.credits} | Grade: ${module.grade ?? 'N/A'}`
                )
                .should('exist')
        })
    })

    it('should display allow for edit of each module', () => {
        modules.forEach(module => {
            cy.get('h3')
                .contains(`${module.code}: ${module.name}`)
                .parent()
                .parent()
                .find('button')
                .click()
            cy.get('div[role="menuitem"]')
                .contains('Edit')
                .should('exist')
                .click()
            cy.get('input[name="code"]').should('have.value', module.code)
            cy.get('input[name="name"]').should('have.value', module.name)
            cy.get('input[name="credits"]').should('have.value', module.credits)
            cy.get('button').contains('Close').click()
        })
    })

    it('should be able to edit a module', () => {
        const moduleToEdit = modules[0]

        cy.get('h3')
            .contains(`${moduleToEdit.code}: ${moduleToEdit.name}`)
            .parent()
            .parent()
            .find('button')
            .click()
        cy.get('div[role="menuitem"]').contains('Edit').should('exist').click()

        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type('Intro to CS')
        cy.get('input[name="credits"]').clear()
        cy.get('input[name="credits"]').type('25')
        cy.get('input[name="code"]').clear()
        cy.get('input[name="code"]').type('CS101')
        cy.get('button').contains('Save').click()

        cy.reload()

        cy.get('h3').contains('CS101: Intro to CS').should('exist')
        cy.get('li')
            .contains(`Credits: 25 | Grade: ${moduleToEdit.grade ?? 'N/A'}`)
            .should('exist')
    })

    it('should be able to delete a module', () => {
        const moduleToDelete = modules[0]

        cy.get('h3')
            .contains(`${moduleToDelete.code}: ${moduleToDelete.name}`)
            .parent()
            .parent()
            .find('button')
            .click()
        cy.get('div[role="menuitem"]')
            .contains('Delete')
            .should('exist')
            .click()

        cy.get('button').contains('Delete').click()
        cy.reload()

        cy.get('h3')
            .contains(`${moduleToDelete.code}: ${moduleToDelete.name}`)
            .should('not.exist')
    })

    it('should be able to create a new module', () => {
        cy.get('button').contains('New Module').click()
        cy.get('input[name="name"]').type('New Module')
        cy.get('input[name="credits"]').type('25')
        cy.get('input[name="code"]').type('CS101')
        cy.get('button').contains('Save').click()
        cy.reload()

        cy.get('h3').contains('CS101: New Module').should('exist')
        cy.get('li').contains('Credits: 25 | Grade: N/A').should('exist')
    })
})
