/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useMutation,
    type QueryFunction,
    type UseQueryOptions
} from '@sveltestack/svelte-query'
import { useQuery } from '@sveltestack/svelte-query'
import { gql } from 'graphql-request'
import { graphql } from 'src/lib/graphql'
import type {
    Transactions,
    FilterTransactionResponse,
    TransactionQueryVariables,
    TransactionCreateInput,
    TransactionCreateInputResponse,
    ErrorResult
} from 'src/types'

type UseTransactionsQueryKey = ['transactions', TransactionQueryVariables]

type UseTransactionsOptions = Omit<
    UseQueryOptions<Transactions[], ErrorResult, Transactions[], UseTransactionsQueryKey>,
    'queryFn' | 'queryKey'
>

export const useTransactionQueryFn: QueryFunction<
    Transactions[],
    UseTransactionsQueryKey
> = async ({ queryKey }) => {
    const [, variables] = queryKey
    
    const document = gql`
        query (
            $where: TransactionWhereInput
            $after: Int
            $before: Int
            $first: Int
            $last: Int
            $skip: Int
            $orderBy: TransactionOrderByInput
        ) {
            transactions(
                where: $where
                after: $after
                before: $before
                first: $first
                last: $last
                skip: $skip
                orderBy: $orderBy
            ) {
                id
                title
                value
                type
                category
                createdAt
            }
        }
    `

    return graphql
        .request<FilterTransactionResponse>(document, variables)
        .then(data => data.transactions)
}

/**
 * It returns a `useQuery` hook that will fetch the `transactions` query with the
 * given `variables` and `options`
 * @param {TransactionQueryVariables} variables - The variables that will be passed
 * to the query.
 * @param {UseTransactionsOptions} [options] - UseTransactionsOptions
 * @returns A function that returns a query result.
 */
export function useTransactionQuery(
    variables: TransactionQueryVariables,
    options?: UseTransactionsOptions
) {
    return useQuery(['transactions', variables], useTransactionQueryFn, options)
}

/**
 * It returns a function that takes a `TransactionCreateInput` and returns a
 * `Transaction`
 * @returns A function that takes a TransactionCreateInput and returns a Promise that
 * resolves to a Transaction
 */
export function useCreateTransactionMutation() {
    const mutationFn = async (variables: TransactionCreateInput) => {
        const document = gql`
            mutation ($data: TransactionCreateInput!) {
                createTransaction(data: $data) {
                    id
                    title
                    value
                    type
                    category
                    createdAt
                }
            }
        `

        return graphql
            .request<TransactionCreateInputResponse>(document, variables)
            .then(response => {
                return response.createTransaction
            })
    }
    return useMutation<Transactions, ErrorResult, TransactionCreateInput>(
        'transactions',
        mutationFn
    )
}
