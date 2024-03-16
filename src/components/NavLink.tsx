'use client'

import { FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const NavLink: FC<{ href: string; children: string }> = ({
    href,
    children,
}) => {
    const pathname = usePathname()

    return (
        <Link
            className={cn(
                'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-md',
                {
                    'text-muted-text': pathname !== href,
                }
            )}
            href={href}
        >
            {children}
        </Link>
    )
}
