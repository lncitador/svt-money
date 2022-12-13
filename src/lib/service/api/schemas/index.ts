import { gql } from "graphql-request";

const schema = gql`
enum TransactionType {
    DEPOSIT
    WITHDRAWAL
}

enum SortOrder {
    ASC
    DESC
}

type AuthUser {
    id: ID!
    sub: String!
}

input AuthUserWhereInput {
    sub: String
}

type Transaction {
    id: ID!
    title: String!
    value: Int!
    category: String!
    type: TransactionType!
    sub: String!
    createdAt: String!
}

input TransactionWhereInput {
    _search: String
    authUser: AuthUserWhereInput
}

input TransactionOrderByInput {
    createdAt: SortOrder
}

input TransactionCreateInput {
    title: String!
    value: Int!
    category: String!
    type: TransactionType!
    sub: String!
}

type Query {
    transactions(
        where: TransactionWhereInput
        after: Int
        before: Int
        first: Int
        last: Int
        limit: Int
        skip: Int
        orderBy: TransactionOrderByInput
    ): [Transaction]
    authUser(sub: String!): AuthUser!
}

type Mutation {
    createTransaction(data: TransactionCreateInput!): Transaction!
    deleteTransaction(id: ID!): Transaction!
    createAuthUser(sub: String!): AuthUser!
}
`;

export default schema;

export * from "./_transactions";