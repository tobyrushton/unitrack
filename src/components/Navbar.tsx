import { FC } from 'react'
import { SignOut } from './SignOut'
import { Separator } from './ui/separator'
import { NavLink } from './NavLink'

export const Navbar: FC = () => {
    return (
        <>
            <nav className="flex flex-col items-center p-2 gap-2">
                <div className="flex flex-col grow gap-3 pl-2">
                    <NavLink href="/dashboard">Overview</NavLink>
                    <NavLink href="/dashboard/calendar">Calendar</NavLink>
                    <NavLink href="/dashboard/modules">Modules</NavLink>
                    <NavLink href="/dashboard/assessments">Assessments</NavLink>
                    <NavLink href="/dashboard/tasks">Tasks</NavLink>
                </div>
                <SignOut />
            </nav>
            <Separator orientation="vertical" />
        </>
    )
}
