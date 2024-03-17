'use client'

import { FC, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendarNewEntry } from './CalendarNewEntry'

export const CalendarEntryButton: FC = () => {
    const [displayNewEntry, setDisplayNewEntry] = useState<boolean>(false)

    return (
        <>
            <div className="flex p-2 w-full">
                <Button
                    className="flex gap-3 w-full"
                    variant="outline"
                    onClick={() => setDisplayNewEntry(true)}
                >
                    <Plus size={20} />
                    New entry
                </Button>
            </div>
            {displayNewEntry && (
                <CalendarNewEntry onClick={() => setDisplayNewEntry(false)} />
            )}
        </>
    )
}
