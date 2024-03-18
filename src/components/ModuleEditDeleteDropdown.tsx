'use client'

import { FC, useState } from 'react'
import { MoreEditDeleteDropdown } from './Dropdown'
import { PopUpTrigger } from './PopUp'
import { NewModule } from './NewModule'
import { DeletePopUp } from './DeletePopUp'

interface ModuleEditDeleteDropdownProps {
    module: {
        id: string
        name: string
        code: string
        credits: number
    }
}

interface DisplayState {
    edit: boolean
    delete: boolean
}

export const ModuleEditDeleteDropdown: FC<ModuleEditDeleteDropdownProps> = ({
    module,
}) => {
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
                {display.edit && <NewModule module={module} />}
                {display.delete && (
                    <DeletePopUp id={module.id} model="module" />
                )}
            </PopUpTrigger>
        </>
    )
}
