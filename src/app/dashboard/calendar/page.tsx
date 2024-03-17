import { Calendar } from '@/components/Calendar'
import { FC } from 'react'
import { CalendarNewEntry } from '@/components/CalendarNewEntry'
import { Page } from '@/components/Page'
import { PopUpTrigger } from '@/components/PopUp'

interface CalendarPageProps {
    searchParams: {
        week_begin?: string
    }
}

const CalendarPage: FC<CalendarPageProps> = ({
    searchParams: { week_begin },
}) => {
    return (
        <Page>
            <Calendar className="grow" weekBegin={week_begin} />
            <PopUpTrigger text="New Entry">
                <CalendarNewEntry />
            </PopUpTrigger>
        </Page>
    )
}

export default CalendarPage
