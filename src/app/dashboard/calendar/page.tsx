import { Calendar } from '@/components/Calendar'
import { FC } from 'react'
import { CalendarNewEntry } from '@/components/CalendarNewEntry'
import { Page } from '@/components/Page'
import { PopUpTriggerButton } from '@/components/PopUp'

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
            <PopUpTriggerButton text="New Entry">
                <CalendarNewEntry />
            </PopUpTriggerButton>
        </Page>
    )
}

export default CalendarPage
