import { FC } from 'react'
import { Separator } from '@/components/ui/separator'
import { BellIcon, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'

const DashaboardPage: FC = () => {
    const weekString = dayjs().startOf('week').format('MMMM D, YYYY')

    return (
        <div className="flex flex-col grow">
            <div className="flex h-16 pt-4 pl-2 items-center gap-2 pr-4 pb-2">
                <div className="flex grow gap-2">
                    <Calendar size={30} />
                    <h1 className="font-medium text-2xl">Calendar</h1>
                </div>
                <Button variant="outline">
                    <ChevronLeft size={20} />
                    Last
                </Button>
                <Button variant="outline">
                    Next
                    <ChevronRight size={20} />
                </Button>
            </div>
            <Separator />
            <div className="flex flex-col p-4 gap-1">
                <h1 className="text-2xl font-bold">Week of {weekString}</h1>
                <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    You are viewing the events for week of {weekString}
                </p>
            </div>
            {/* TODO: Add code for calendar here */}
            <Separator />
            <div className="flex p-4 gap-2 items-center">
                <BellIcon size={20} />
                <h2 className="text-lg font-bold">Upcoming Deadlines</h2>
            </div>
            {/* TODO: Add code for upcoming deadlines here */}
        </div>
    )
}

export default DashaboardPage
