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
import {
    List,
    ListItem,
    ListItemHeader,
    ListItemDescription,
} from '@/components/List'
import { serverClient } from '@/app/_trpc/server'

export const metadata: Metadata = {
    title: 'Modules',
    description: 'Explore and manage your modules here.',
}

const ModulesPage: FC = async () => {
    const modules = await serverClient.getModules()

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
                <List<(typeof modules)[0]>
                    className="pt-4"
                    items={modules}
                    render={module => (
                        <ListItem>
                            <ListItemHeader>
                                {module.code}: {module.name}
                            </ListItemHeader>
                            <ListItemDescription>
                                Credits: {module.credits} | Grade:{' '}
                                {module.grade ?? 'N/A'}
                            </ListItemDescription>
                        </ListItem>
                    )}
                />
            </PageBody>
            <PopUpTrigger text="New Module">
                <NewModule />
            </PopUpTrigger>
        </Page>
    )
}

export default ModulesPage
