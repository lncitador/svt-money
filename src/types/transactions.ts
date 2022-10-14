import type { UseQueryStoreResult } from "@sveltestack/svelte-query";

export enum TransactionsType {
    deposit = 'deposit',
    withdraw = 'withdrawal',
    payment = 'payment',
    invoice = 'invoice'
}

export interface Transactions {
    title: string;
    value: number;
    type: TransactionsType
    category: string;
    date: Date;
}

export type TransactionsStore = UseQueryStoreResult<Transactions[]>

export type TransactionMutation = Transactions & {
    email: string;
}