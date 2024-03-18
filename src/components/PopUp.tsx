'use client'

import {
    FC,
    ReactNode,
    useState,
    createContext,
    useContext,
    useMemo,
} from 'react'
import { Plus } from 'lucide-react'
import { Button, ButtonWithLoading } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ChildrenProps {
    children: ReactNode
}

interface PopUpContextProps {
    disable: () => void
}

const PopUpContext = createContext<PopUpContextProps>({
    disable: () => {},
})

export const usePopUp = (): PopUpContextProps => useContext(PopUpContext)

interface PopUpTriggerProps extends ChildrenProps {
    disable: () => void
}

export const PopUpTrigger: FC<PopUpTriggerProps> = ({ children, disable }) => {
    const providerValue = useMemo(() => ({ disable }), [disable])

    return (
        <PopUpContext.Provider value={providerValue}>
            {children}
        </PopUpContext.Provider>
    )
}

interface PopUpTriggerButtonProps extends ChildrenProps {
    text: string
}

export const PopUpTriggerButton: FC<PopUpTriggerButtonProps> = ({
    children,
    text,
}) => {
    const [display, setDisplay] = useState<boolean>(false)

    return (
        <PopUpTrigger disable={() => setDisplay(false)}>
            <div className="flex p-2 w-full">
                <Button
                    className="flex gap-3 w-full"
                    variant="outline"
                    onClick={() => setDisplay(true)}
                >
                    <Plus size={20} />
                    {text}
                </Button>
            </div>
            <>{display && children}</>
        </PopUpTrigger>
    )
}

interface PopUpFormButtonsProps {
    loading: boolean
}

export const PopUpFormButtons: FC<PopUpFormButtonsProps> = ({ loading }) => {
    const { disable } = usePopUp()

    return (
        <div className="flex gap-2">
            <Button className="flex grow" onClick={disable} variant="outline">
                Close
            </Button>
            <ButtonWithLoading
                className="flex grow"
                type="submit"
                loading={loading}
            >
                Save
            </ButtonWithLoading>
        </div>
    )
}

export const PopUp: FC<ChildrenProps> = ({ children }) => (
    <div className="absolute flex z-2 h-full w-full top-0 left-0 bg-black/80">
        <div className="flex grow items-center justify-center h-full">
            <Card className="w-96">{children}</Card>
        </div>
    </div>
)
