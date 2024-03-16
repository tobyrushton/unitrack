import { FC, ReactNode } from 'react'
import { Card } from '@/components/ui/card'

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className="absolute w-full h-full bg-white dark:bg-black">
            <div className="flex w-full h-full items-center justify-center">
                <Card className="h-fit w-96">{children}</Card>
            </div>
        </main>
    )
}

export default AuthLayout
