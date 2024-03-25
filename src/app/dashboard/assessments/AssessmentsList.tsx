'use client'

import { FC } from 'react'
import { DynamicList } from '../../../components/DyanmicList'
import {
    ListItem,
    ListItemDescription,
    ListItemHeader,
} from '../../../components/List'
import { AssessmentEditDeleteDropdown } from '../../../components/AssessmentEditDeleteDropdown'

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
                <ListItem className="flex flex-row">
                    <span className="flex flex-col grow gap-1">
                        <ListItemHeader>
                            {item.module.code}: {item.name}
                        </ListItemHeader>
                        <ListItemDescription>
                            Due Date: {item.date.toDateString()} |{' '}
                            {item.grade
                                ? `Grade: ${item.grade}`
                                : `Weight: ${item.weight}`}
                        </ListItemDescription>
                    </span>
                    <AssessmentEditDeleteDropdown
                        assessment={{
                            id: item.id,
                            name: item.name,
                            weight: item.weight,
                            grade: item.grade,
                            date: item.date,
                            moduleId: item.module.id,
                        }}
                    />
                </ListItem>
            )}
        />
    )
}
