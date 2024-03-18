import { FC, ReactNode } from 'react'
import { MoreHorizontal, Trash2, Pen } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'

interface ChildrenProps {
    children: ReactNode
}

export const MoreDropdown: FC<ChildrenProps> = ({ children }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>{children}</DropdownMenuContent>
        </DropdownMenu>
    )
}

interface DropdownItemProps {
    onClick?: () => void
}

export const EditDropdownItem: FC<DropdownItemProps> = ({ onClick }) => {
    return (
        <DropdownMenuItem className="flex gap-1" onClick={onClick}>
            <Pen size={14} />
            Edit
        </DropdownMenuItem>
    )
}

export const DeleteDropdownItem: FC<DropdownItemProps> = ({ onClick }) => {
    return (
        <DropdownMenuItem className="flex text-red-500 gap-1" onClick={onClick}>
            <Trash2 size={14} />
            Delete
        </DropdownMenuItem>
    )
}

interface MoreEditDeleteDropdownProps {
    onEdit?: () => void
    onDelete?: () => void
}

export const MoreEditDeleteDropdown: FC<MoreEditDeleteDropdownProps> = ({
    onEdit,
    onDelete,
}) => {
    return (
        <MoreDropdown>
            <EditDropdownItem onClick={onEdit} />
            <DeleteDropdownItem onClick={onDelete} />
        </MoreDropdown>
    )
}
