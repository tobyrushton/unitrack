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
            className={cn({
                'text-muted-text': pathname !== href,
            })}
            href={href}
        >
            {children}
        </Link>
    )
}
