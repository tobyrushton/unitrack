import { FC } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
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
            <div className="flex h-16 pt-4 pl-2 items-center gap-2 pr-4 pb-2">
                <div className="flex grow gap-2">
                    <CalendarIcon size={30} />
                    <h1 className="font-medium text-2xl">Calendar</h1>
                </div>
                <CalendarButtons />
            </div>
            <Separator />
            <div className="flex flex-col p-4 gap-1">
                <h1 className="text-2xl font-bold">Week of {weekString}</h1>
                <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    You are viewing the events for week of {weekString}
                </p>
            </div>
        </div>
    )
}
