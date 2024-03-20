'use client'

import { FC } from 'react'
import { DynamicList } from '../../../components/DyanmicList'
import {
    ListItem,
    ListItemDescription,
    ListItemHeader,
} from '../../../components/List'

interface AssessmentListProps {
    assessments: (Omit<assessment.AssessmentId, 'moduleId' | 'userId'> & {
        module: { id: string; code: string }
    })[]
}

export const AssessmentsList: FC<AssessmentListProps> = ({ assessments }) => {
    return (
        <DynamicList
            items={assessments}
            render={item => (
                <ListItem key={item.id}>
                    <ListItemHeader>
                        {item.module.code}: {item.name}
                    </ListItemHeader>
                    <ListItemDescription>
                        Due Date: {item.date.toDateString()} |{' '}
                        {item.grade
                            ? `Grade: ${item.grade}`
                            : `Weight: ${item.weight}`}
                    </ListItemDescription>
                </ListItem>
            )}
        />
    )
}
