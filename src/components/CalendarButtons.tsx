'use client'

import { FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { Button } from './ui/button'

export const CalendarButtons: FC = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onClick = (direction: 'next' | 'last'): void => {
        const params = new URLSearchParams(searchParams).get('week_begin')

        const weekBegin = params ?? dayjs().startOf('week').format('YYYY-MM-DD')
        const date = new Date(weekBegin)

        if (direction === 'next') {
            date.setDate(date.getDate() + 7)
        } else {
            date.setDate(date.getDate() - 7)
        }
        router.push(
            `${pathname}?week_begin=${dayjs(date).format('YYYY-MM-DD')}`
        )
    }

    return (
        <>
            <Button variant="outline" onClick={() => onClick('last')}>
                <ChevronLeft size={20} />
                Last
            </Button>
            <Button variant="outline" onClick={() => onClick('next')}>
                Next
                <ChevronRight size={20} />
            </Button>
        </>
    )
}
