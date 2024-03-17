import { FC } from 'react'
import { SquareLibrary } from 'lucide-react'
import {
    PageBody,
    PageSubTitle,
    PageDescription,
    PageHeader,
    PageTitle,
    Page,
} from '@/components/Page'
import { Metadata } from 'next'
import { PopUpTrigger } from '@/components/PopUp'
import { NewModule } from '@/components/NewModule'

export const metadata: Metadata = {
    title: 'Modules',
    description: 'Explore and manage your modules here.',
}

const ModulesPage: FC = () => {
    return (
        <Page>
            <PageHeader>
                <PageTitle Icon={SquareLibrary}>Modules</PageTitle>
            </PageHeader>
            <PageBody className="grow">
                <PageSubTitle>Modules Overview</PageSubTitle>
                <PageDescription>
                    Explore and manage your modules here.
                </PageDescription>
            </PageBody>
            <PopUpTrigger text="New Module">
                <NewModule />
            </PopUpTrigger>
        </Page>
    )
}

export default ModulesPage
