import { FC, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

interface PageProps {
    children: ReactNode
    className?: string
}

export const PageBody: FC<PageProps> = ({ children, className }) => {
    return (
        <div className={cn('flex flex-col p-4 gap-1', className)}>
            {children}
        </div>
    )
}

export const PageSubTitle: FC<PageProps> = ({ children, className }) => {
    return <h2 className={cn('text-2xl font-bold', className)}>{children}</h2>
}

export const PageDescription: FC<PageProps> = ({ children, className }) => {
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

interface PageTitleProps extends PageProps {
    Icon: LucideIcon
}

export const PageHeader: FC<PageProps> = ({ children, className }) => {
    return (
        <>
            <div
                className={cn(
                    'flex h-16 pt-4 pl-2 items-center gap-2 pr-4 pb-2',
                    className
                )}
            >
                {children}
            </div>
            <Separator />
        </>
    )
}

export const PageTitle: FC<PageTitleProps> = ({
    Icon,
    children,
    className,
}) => {
    return (
        <div className={cn('flex grow gap-2', className)}>
            <Icon size={30} />
            <h1 className="font-medium text-2xl">{children}</h1>
        </div>
    )
}

export const Page: FC<PageProps> = ({ children, className }) => {
    return <div className={cn('flex flex-col grow', className)}>{children}</div>
}
