export * from './transactions'

export type Caret = {
    color: string
    active: boolean
}

export type SortOrder = 'ASC' | 'DESC'

export type ErrorResult = {
    message: string
}
