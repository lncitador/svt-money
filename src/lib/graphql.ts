import { GraphQLClient } from 'graphql-request'

const url = import.meta.env.VITE_API_BASE_URL

export const graphql = new GraphQLClient(url)

export type Error = {
    message: string
}[]
