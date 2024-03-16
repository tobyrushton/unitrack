import { FC, ReactNode } from 'react'
import { validateRequest } from '@/server/auth/validateRequest'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const { user } = await validateRequest()

    if (!user) {
        return redirect('/signin')
    }

    return (
        <main className="absolute w-full h-full bg-white dark:bg-black dark:text-white">
            <Navbar />
            {children}
        </main>
    )
}

export default DashboardLayout
