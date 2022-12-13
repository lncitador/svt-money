/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createServer } from 'miragejs'
import { createGraphQLHandler, mirageGraphQLFieldResolver } from '@miragejs/graphql'
import graphQLSchema from './schemas'
import config from '../auth/config'
import type {
    FilterTransactionResponse,
    TransactionCreateInput,
    TransactionCreateInputResponse,
    TransactionQueryVariables,
    Transactions
} from 'src/types'
import type Schema from 'miragejs/orm/schema'

const url = import.meta.env.VITE_API_BASE_URL

const getPastDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString()
}

export const makeServer = () => {
    return createServer({
        routes() {
            const handler = createGraphQLHandler(graphQLSchema, this.schema, {
                resolvers: {
                    Mutation: {
                        createTransaction(
                            obj: unknown,
                            args: TransactionCreateInput,
                            context: unknown,
                            info: unknown
                        ) {
                            args.data.createdAt = new Date().toISOString()
                            args.data.sub = '1'

                            return mirageGraphQLFieldResolver(
                                obj,
                                args,
                                context,
                                info
                            ) as TransactionCreateInputResponse
                        }
                    },
                    Query: {
                        transactions(
                            obj: unknown,
                            args: TransactionQueryVariables,
                            context: {
                                mirageSchema: Schema<{ transactions: Transactions }>
                            },
                            info: unknown
                        ) {
                            console.log(args)
                            console.log(context)

                            const { where, first, skip, orderBy } = args

                            if (where && first) {
                                const _search = where._search || ''

                                const data: Transactions[] =
                                    context.mirageSchema.db.transactions.where({})

                                return data
                                    .filter(transaction => {
                                        const values = Object.values(transaction)

                                        return values.some(value => {
                                            if (typeof value === 'string') {
                                                return value
                                                    .toLowerCase()
                                                    .includes(_search.toLowerCase())
                                            }

                                            return false
                                        })
                                    })
                                    .slice(skip, skip! + first)
                                    .sort((a, b) => {
                                        if (orderBy?.createdAt === 'ASC') {
                                            return a.createdAt < b.createdAt ? -1 : 1
                                        }

                                        return a.createdAt > b.createdAt ? -1 : 1
                                    })
                            }

                            delete args.where

                            const records = mirageGraphQLFieldResolver(
                                obj,
                                args,
                                context,
                                info
                            ) as Transactions[]

                            if (orderBy) {
                                const { createdAt } = orderBy

                                if (createdAt) {
                                    records.sort((a, b) => {
                                        if (createdAt === 'ASC') {
                                            return a.createdAt > b.createdAt ? 1 : -1
                                        }

                                        return a.createdAt < b.createdAt ? 1 : -1
                                    })
                                }
                            }

                            return records
                        }
                    }
                }
            } as any)

            this.post(url, handler)

            this.passthrough('https://' + config.domain + '/**')
        },

        seeds(server) {
            server.create('Transaction', {
                id: '1',
                title: 'Salário',
                value: 5000,
                type: 'DEPOSIT',
                category: 'Renda',
                sub: '1',
                createdAt: getPastDate(2)
            })

            server.create('Transaction', {
                id: '2',
                title: 'Pagamento de aluguel',
                value: 1500,
                type: 'WITHDRAWAL',
                category: 'Moradia',
                sub: '1',
                createdAt: getPastDate(3)
            })

            server.create('Transaction', {
                id: '3',
                title: 'Internet',
                value: 230,
                type: 'WITHDRAWAL',
                category: 'Serviços',
                sub: '1',
                createdAt: getPastDate(5)
            })

            server.create('Transaction', {
                id: '4',
                title: 'Agua',
                value: 80,
                type: 'WITHDRAWAL',
                category: 'Serviços',
                sub: '1',
                createdAt: getPastDate(7)
            })

            server.create('Transaction', {
                id: '5',
                title: 'Parcela do carro',
                value: 1200,
                type: 'WITHDRAWAL',
                category: 'Moradia',
                sub: '1',
                createdAt: getPastDate(10)
            })
        }
    })
}

export * from './schemas'
