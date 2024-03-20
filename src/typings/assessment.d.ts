declare namespace assessment {
    interface Assessment {
        name: string
        weight: number
        grade: number | null
        date: Date
        moduleId: string
        userId: string
    }

    interface AssessmentId extends Assessment {
        id: string
    }
}
