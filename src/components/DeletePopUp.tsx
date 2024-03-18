'use client'

import { FC, useState, useTransition } from 'react'
import { deleteAction, DeleteRequest } from '@/server/actions/delete'
import { Button, ButtonWithLoading } from './ui/button'
import { PopUp, usePopUp } from './PopUp'
import { CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'

export const DeletePopUp: FC<DeleteRequest> = ({ id, model }) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const { disable } = usePopUp()

    const handleSubmit = async (): Promise<void> => {
        startTransition(async () => {
            setError(null)
            const res = await deleteAction({ id, model })
            if (res) setError(res.error)
            else disable()
        })
    }

    return (
        <PopUp>
            <CardHeader>
                <CardTitle>Delete Module</CardTitle>
                <CardDescription>
                    Are you sure you want to delete this module?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <Button
                            className="flex grow"
                            variant="outline"
                            onClick={disable}
                        >
                            Cancel
                        </Button>
                        <ButtonWithLoading
                            className="flex grow"
                            loading={isPending}
                            type="submit"
                            variant="destructive"
                        >
                            Delete
                        </ButtonWithLoading>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </CardContent>
        </PopUp>
    )
}
