'use client'

import { FC, useState } from 'react'
import { MoreEditDeleteDropdown } from './Dropdown'
import { PopUpTrigger } from './PopUp'
import { NewModule } from './NewModule'

interface ModuleEditDeleteDropdownProps {
    module: {
        id: string
        name: string
        code: string
        credits: number
    }
}

export const ModuleEditDeleteDropdown: FC<ModuleEditDeleteDropdownProps> = ({
    module,
}) => {
    const [display, setDisplay] = useState<boolean>(false)

    return (
        <>
            <MoreEditDeleteDropdown
                onEdit={() => setDisplay(true)}
                onDelete={() => {}}
            />
            <PopUpTrigger disable={() => setDisplay(false)}>
                {display && <NewModule module={module} />}
            </PopUpTrigger>
        </>
    )
}
