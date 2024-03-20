/* eslint-disable import/no-extraneous-dependencies  */
/* @vitest-environment jsdom */
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { DynamicList, useDynamicList } from '@/components/DyanmicList'
import { ReactNode } from 'react'

interface Item {
    id: string
    name: string
}

const items: Item[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
]

const Render = ({ id, name }: Item): ReactNode => {
    const { addItem, removeItem } = useDynamicList<Item>()
    return (
        <div>
            <h3>{name}</h3>
            <button
                onClick={() => addItem({ id: '4', name: 'Item 4' })}
                type="button"
            >
                Add Item {id}
            </button>
            <button onClick={() => removeItem(id)} type="button">
                Remove Item {id}
            </button>
        </div>
    )
}

describe('DynamicList', () => {
    it('should render a list of items', () => {
        render(<DynamicList items={items} render={Render} />)
        items.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument()
        })
    })

    it('should add an item to the list', async () => {
        render(<DynamicList items={items} render={Render} />)
        const addButton = screen.getByText('Add Item 1')
        act(() => addButton.click())
        await waitFor(() =>
            expect(screen.getByText('Item 4')).toBeInTheDocument()
        )
    })

    it('should remove an item from the list', async () => {
        render(<DynamicList items={items} render={Render} />)
        const removeButton = screen.getByText('Remove Item 1')
        act(() => removeButton.click())
        await waitFor(() =>
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
        )
    })
})
