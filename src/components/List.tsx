import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

interface Id {
    id: string
}

interface ListProps<T extends Id> {
    items: T[]
    render: (item: T) => ReactNode
    className?: string
}

export const List = <T extends Id>({
    items,
    render,
    className,
}: ListProps<T>): ReactNode => {
    return (
        <ul className={className}>
            {items.map((item, idx) => (
                <li key={item.id}>
                    {render(item)}
                    {idx !== items.length - 1 && <Separator />}
                </li>
            ))}
        </ul>
    )
}

interface ChildrenProps {
    children: ReactNode
    className?: string
}

export const ListItem: FC<ChildrenProps> = ({ children, className }) => {
    return (
        <span className={cn('flex flex-col gap-2 p-2', className)}>
            {children}
        </span>
    )
}

export const ListItemHeader: FC<ChildrenProps> = ({ children, className }) => {
    return <h3 className={cn('text-lg font-bold', className)}>{children}</h3>
}

export const ListItemDescription: FC<ChildrenProps> = ({
    children,
    className,
}) => {
    return (
        <p
            className={cn(
                'text-sm leading-none text-gray-500 dark:text-gray-400',
                className
            )}
        >
            {children}
        </p>
    )
}
