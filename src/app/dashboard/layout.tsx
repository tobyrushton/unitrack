import { FC, ReactNode } from 'react'
import { validateRequest } from '@/server/auth/validateRequest'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { SignOut } from '@/components/SignOut'

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const { user } = await validateRequest()

    if (!user) {
        return redirect('/signin')
    }

    return (
        <main className="absolute w-full h-full bg-white dark:bg-black dark:text-white">
            <div className="flex w-full h-14 items-center px-2">
                <SignOut />
            </div>
            <Separator className="w-full" />
            {children}
        </main>
    )
}

export default DashboardLayout
