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

const usePopUp = (): PopUpContextProps => useContext(PopUpContext)

interface PopUpTriggerProps extends ChildrenProps {
    text: string
}

export const PopUpTrigger: FC<PopUpTriggerProps> = ({ children, text }) => {
    const [display, setDisplay] = useState<boolean>(false)

    const providerValue = useMemo(
        () => ({ disable: () => setDisplay(false) }),
        [setDisplay]
    )

    return (
        <PopUpContext.Provider value={providerValue}>
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
        </PopUpContext.Provider>
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
    <div className="absolute flex z-2 h-full w-[calc(100%-10rem)]">
        <div className="flex grow items-center justify-center h-full">
            <Card className="w-96">{children}</Card>
        </div>
    </div>
)
