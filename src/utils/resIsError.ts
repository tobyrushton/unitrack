interface ErrorRes {
    error: string
}

export const resIsError = <T extends object>(
    res: ErrorRes | T
): res is ErrorRes => {
    if ((res as ErrorRes).error) return true
    return false
}
