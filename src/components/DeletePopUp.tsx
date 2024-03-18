'use client'

import { FC, useTransition } from 'react'
import { deleteAction, DeleteRequest } from '@/server/actions/delete'
import { Button, ButtonWithLoading } from './ui/button'
import { PopUp, usePopUp } from './PopUp'
import { CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'

export const DeletePopUp: FC<DeleteRequest> = ({ id, model }) => {
    const [isPending, startTransition] = useTransition()
    const { disable } = usePopUp()

    const handleSubmit = async (): Promise<void> => {
        startTransition(async () => {
            // TODO: handle error
            await deleteAction({ id, model })
            disable()
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
                </form>
            </CardContent>
        </PopUp>
    )
}
