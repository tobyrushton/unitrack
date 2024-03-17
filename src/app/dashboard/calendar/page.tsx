import { Calendar } from '@/components/Calendar'
import { FC } from 'react'
import { CalendarEntryButton } from '@/components/CalendarEntryButton'

interface CalendarPageProps {
    searchParams: {
        week_begin?: string
    }
}

const CalendarPage: FC<CalendarPageProps> = ({
    searchParams: { week_begin },
}) => {
    return (
        <div className="flex flex-col grow">
            <Calendar className="grow" weekBegin={week_begin} />
            <CalendarEntryButton />
        </div>
    )
}

export default CalendarPage
