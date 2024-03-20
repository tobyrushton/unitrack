declare namespace module {
    interface Module {
        name: string
        code: string
        credits: number
        grade?: number
        userId: string
    }

    interface ModuleId extends Module {
        id: string
    }
}
