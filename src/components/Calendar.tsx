import { FC } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import {
    PageBody,
    PageSubTitle,
    PageDescription,
    PageHeader,
    PageTitle,
} from './Page'
import { CalendarButtons } from './CalendarButtons'

interface CalendarProps {
    weekBegin?: string
    className?: string
}

export const Calendar: FC<CalendarProps> = ({ weekBegin, className }) => {
    const weekString = (
        weekBegin ? dayjs(weekBegin) : dayjs().startOf('week')
    ).format('MMMM D, YYYY')

    return (
        <div className={cn('flex flex-col', className)}>
            <PageHeader>
                <PageTitle Icon={CalendarIcon}>Calendar</PageTitle>
                <CalendarButtons />
            </PageHeader>
            <PageBody>
                <PageSubTitle>Week of {weekString}</PageSubTitle>
                <PageDescription>
                    You are viewing the events for week of {weekString}
                </PageDescription>
            </PageBody>
        </div>
    )
}
