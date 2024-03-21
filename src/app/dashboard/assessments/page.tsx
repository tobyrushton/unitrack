import { FC } from 'react'
import { NotebookText } from 'lucide-react'
import {
    Page,
    PageHeader,
    PageSubTitle,
    PageDescription,
    PageTitle,
    PageBody,
} from '@/components/Page'
import { serverClient } from '@/app/_trpc/server'
import { PopUpTriggerButton } from '@/components/PopUp'
import { NewAssessment } from '@/components/NewAssessment'
import { AssessmentsList } from './AssessmentsList'

const AssessmentsPage: FC = async () => {
    const assessments = await serverClient.getAssessments()

    return (
        <Page>
            <PageHeader>
                <PageTitle Icon={NotebookText}>Assessments</PageTitle>
            </PageHeader>
            <PageBody className="grow">
                <PageSubTitle>Assessments Overview</PageSubTitle>
                <PageDescription>
                    View and manage your assessments here
                </PageDescription>
                <AssessmentsList assessments={assessments} />
            </PageBody>
            <PopUpTriggerButton text="New Assessment">
                <NewAssessment />
            </PopUpTriggerButton>
        </Page>
    )
}

export default AssessmentsPage
