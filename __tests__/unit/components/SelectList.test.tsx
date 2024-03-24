/* eslint-disable no-extra-semi */
/* @vitest-environment jsdom */
import { vi, expect, describe, it, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    SelectListAssessments,
    SelectListModules,
} from '@/components/SelectList'
import { Select, SelectContent } from '@/components/ui/select'
import { trpc } from '../../../src/app/_trpc/client'

vi.mock('../../../src/app/_trpc/client', () => ({
    trpc: {
        getModules: {
            useQuery: vi.fn(),
        },
        getAssessments: {
            useQuery: vi.fn(),
        },
    },
}))

describe('<SelectList{Assessment/Module} />', () => {
    it('should render loader', async () => {
        ;(trpc.getModules.useQuery as Mock).mockReturnValue({
            data: null,
            isLoading: true,
        })

        const { container } = render(<SelectListModules />)

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('should render empty message', async () => {
        ;(trpc.getModules.useQuery as Mock).mockReturnValue({
            data: [],
            isLoading: false,
        })

        render(<SelectListModules />)

        expect(screen.getByText('Please create a module')).toBeInTheDocument()
    })

    it('should render modules', async () => {
        ;(trpc.getModules.useQuery as Mock).mockReturnValue({
            data: [
                { id: '1', code: 'CS101', name: 'Introduction to CS' },
                { id: '2', code: 'CS102', name: 'Advanced CS' },
            ],
            isLoading: false,
        })

        render(
            <Select>
                <SelectContent>
                    <SelectListModules />
                </SelectContent>
            </Select>
        )

        expect(
            screen.getByText('CS101: Introduction to CS')
        ).toBeInTheDocument()
        expect(screen.getByText('CS102: Advanced CS')).toBeInTheDocument()
    })

    it('should render loader', async () => {
        ;(trpc.getAssessments.useQuery as Mock).mockReturnValue({
            data: null,
            isLoading: true,
        })

        const { container } = render(<SelectListAssessments />)

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('should render empty message', async () => {
        ;(trpc.getAssessments.useQuery as Mock).mockReturnValue({
            data: [],
            isLoading: false,
        })

        render(<SelectListAssessments />)

        expect(
            screen.getByText('Please create an assessment')
        ).toBeInTheDocument()
    })

    it('should render assessments', async () => {
        ;(trpc.getAssessments.useQuery as Mock).mockReturnValue({
            data: [
                {
                    id: '1',
                    name: 'Midterm',
                },
                {
                    id: '2',
                    name: 'Final',
                },
            ],
            isLoading: false,
        })

        render(
            <Select>
                <SelectContent>
                    <SelectListAssessments />
                </SelectContent>
            </Select>
        )

        expect(screen.getByText('Midterm')).toBeInTheDocument()
        expect(screen.getByText('Final')).toBeInTheDocument()
    })
})
