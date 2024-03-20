/* eslint-disable import/no-extraneous-dependencies  */
/* @vitest-environment jsdom */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    List,
    ListItem,
    ListItemHeader,
    ListItemDescription,
} from '@/components/List'

describe('<List />', () => {
    it('should render list items', () => {
        const items = [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' },
            { id: '3', name: 'Item 3' },
        ]

        render(
            <List
                items={items}
                render={item => <ListItem>{item.name}</ListItem>}
            />
        )

        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
        expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('should render header annd description', () => {
        render(
            <ListItem>
                <ListItemHeader>Header</ListItemHeader>
                <ListItemDescription>Description</ListItemDescription>
            </ListItem>
        )

        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
    })
})
