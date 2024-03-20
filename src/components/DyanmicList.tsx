'use client'

import { useContext, createContext, ReactNode, useMemo, useState } from 'react'
import once from 'lodash.once'
import { ListProps, List } from './List'

interface Id {
    id: string
}

interface IListContext<T> {
    removeItem: (key: string) => void
    addItem: (item: T) => void
}

const createDynamicListContext = once(<T,>() =>
    createContext({} as IListContext<T>)
)
export const useDynamicList = <T,>(): IListContext<T> =>
    useContext(createDynamicListContext<T>())

export const DynamicList = <T extends Id>({
    items,
    render,
    className,
}: ListProps<T>): ReactNode => {
    const DynamicListContext = createDynamicListContext<T>()

    const [state, setState] = useState(items)

    const providerValue = useMemo(() => {
        const addItem = (item: T): void => {
            setState(prev => [...prev, item])
        }

        const removeItem = (key: string): void => {
            setState(prev => prev.filter(item => item.id !== key))
        }

        return {
            addItem,
            removeItem,
        }
    }, [])

    return (
        <DynamicListContext.Provider value={providerValue}>
            <List items={state} render={render} className={className} />
        </DynamicListContext.Provider>
    )
}
