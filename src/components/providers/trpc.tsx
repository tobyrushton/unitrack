'use client'

import { useState, ReactNode, FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from '@/app/_trpc/client'

interface ProviderProps {
    children: ReactNode
}

export const TRPCProvider: FC<ProviderProps> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({}))

    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: `http://localhost:3000/api/trpc`,
                }),
            ],
        })
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
