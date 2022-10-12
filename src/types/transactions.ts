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