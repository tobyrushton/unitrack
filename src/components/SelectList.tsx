'use client'

import { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { SelectItem } from './ui/select'

export const SelectListLoader: FC = () => {
    return (
        <span className="flex justify-center">
            <Loader2 size={24} className="animate-spin" />
        </span>
    )
}

export const SelectListModules: FC = () => {
    const { data, isLoading } = trpc.getModules.useQuery()

    if (isLoading) {
        return <SelectListLoader />
    }

    return (
        <>
            {data?.length === 0 ? (
                <span className="p-1">Please create a module</span>
            ) : (
                data?.map(module => (
                    <SelectItem value={module.id} key={module.id}>
                        {module.code}: {module.name}
                    </SelectItem>
                ))
            )}
        </>
    )
}

export const SelectListAssessments: FC = () => {
    const { data, isLoading } = trpc.getAssessments.useQuery()

    if (isLoading) {
        return <SelectListLoader />
    }

    return (
        <>
            {data?.length === 0 ? (
                <span className="p-1">Please create an assessment</span>
            ) : (
                data?.map(assessment => (
                    <SelectItem value={assessment.id} key={assessment.id}>
                        {assessment.name}
                    </SelectItem>
                ))
            )}
        </>
    )
}
