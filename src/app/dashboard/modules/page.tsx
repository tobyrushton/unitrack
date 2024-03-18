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
import { PopUpTriggerButton } from '@/components/PopUp'
import { NewModule } from '@/components/NewModule'
import {
    List,
    ListItem,
    ListItemHeader,
    ListItemDescription,
} from '@/components/List'
import { ModuleEditDeleteDropdown } from '@/components/ModuleEditDeleteDropdown'
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
                        <ListItem className="flex flex-row">
                            <span className="flex flex-col grow gap-1">
                                <ListItemHeader>
                                    {module.code}: {module.name}
                                </ListItemHeader>
                                <ListItemDescription>
                                    Credits: {module.credits} | Grade:{' '}
                                    {module.grade ?? 'N/A'}
                                </ListItemDescription>
                            </span>
                            <ModuleEditDeleteDropdown module={module} />
                        </ListItem>
                    )}
                />
            </PageBody>
            <PopUpTriggerButton text="New Module">
                <NewModule />
            </PopUpTriggerButton>
        </Page>
    )
}

export default ModulesPage
