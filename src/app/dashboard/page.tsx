import { FC } from 'react'
import { Separator } from '@/components/ui/separator'
import { BellIcon } from 'lucide-react'
import { Calendar } from '@/components/Calendar'

interface DashboardPageProps {
    searchParams: {
        week_begin?: string
    }
}

const DashaboardPage: FC<DashboardPageProps> = ({
    searchParams: { week_begin },
}) => {
    return (
        <div className="flex flex-col grow">
            <Calendar weekBegin={week_begin} />
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
