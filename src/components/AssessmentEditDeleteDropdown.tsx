'use client'

/* eslint-disable import/no-import-module-exports */
// unsure why this rule is breaking
import { FC, useState } from 'react'
import { MoreEditDeleteDropdown } from './Dropdown'
import { PopUpTrigger } from './PopUp'
import { DeletePopUp } from './DeletePopUp'
import { NewAssessment } from './NewAssessment'

interface AssessmentEditDeleteDropdownProps {
    assessment: Omit<assessment.AssessmentId, 'userId'>
}

interface DisplayState {
    edit: boolean
    delete: boolean
}

export const AssessmentEditDeleteDropdown: FC<
    AssessmentEditDeleteDropdownProps
> = ({ assessment }) => {
    const [display, setDisplay] = useState<DisplayState>({
        edit: false,
        delete: false,
    })

    return (
        <>
            <MoreEditDeleteDropdown
                onEdit={() => setDisplay({ edit: true, delete: false })}
                onDelete={() => setDisplay({ edit: false, delete: true })}
            />
            <PopUpTrigger
                disable={() => setDisplay({ edit: false, delete: false })}
            >
                {display.edit && <NewAssessment assessment={assessment} />}
                {display.delete && (
                    <DeletePopUp id={module.id} model="module" />
                )}
            </PopUpTrigger>
        </>
    )
}
