import type { UseQueryStoreResult } from '@sveltestack/svelte-query'
import type { SortOrder } from '.'

export type TransactionsType = "DEPOSIT" | "WITHDRAWAL"
export interface Transactions {
    id: string
    title: string
    value: number
    type: TransactionsType
    category: string
    createdAt: Date
}

export type TransactionsStore = UseQueryStoreResult<Transactions[]>

export type TransactionCreateInput = {
    data: Omit<Transactions, 'id' | 'createdAt'> & {
        sub: string,
        createdAt?: string
    }
}

export type TransactionCreateInputResponse = {
    createTransaction: Transactions
}

export type TransactionOrderByInput = {
    createdAt?: SortOrder
}

type TransactionWhereInput = {
    _search?: string
    authUser?: {
        sub?: string
    }
}

export type TransactionQueryVariables = {
    where?: TransactionWhereInput
    after?: number
    before?: number
    first?: number
    last?: number
    skip?: number
    orderBy?: TransactionOrderByInput
}

export type FilterTransactionResponse = {
    transactions: Transactions[]
}