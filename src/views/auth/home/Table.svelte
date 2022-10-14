<script lang="ts">
    import { useQuery } from "@sveltestack/svelte-query";
    import { gql } from "graphql-request";
    import { graphql } from "src/lib/graphql";
    import { currentPage, filter, user } from "src/lib/store";

    let page: number = 1;
    let search: string = "";

    currentPage.subscribe((it) => {
        page = it;
    });

    filter.subscribe((it) => {
        search = it;
    });

    function formatCurrency(num: number) {
        return num.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString("pt-BR");
    }

    const queryResult = useQuery(
        ["transactions", page, search],
        async () => {
            const response = await graphql.request(
                gql`
                    query (
                        $_search: String = ""
                        $email: String!
                        $first: Int = 10
                        $skip: Int = 1
                    ) {
                        transactions(
                            first: $first
                            skip: $skip
                            where: {
                                _search: $_search
                                authUser: { email: $email }
                            }
                        ) {
                            category
                            createdAt
                            title
                            type
                            value
                        }
                    }
                `,
                {
                    _search: search,
                    first: 8,
                    skip: page * 8 - 8,
                    email: $user.email,
                }
            );

            return response.transactions;
        },
        {
            enabled: !!$user,
        }
    );
</script>

<div class="query container">
    {#if $queryResult.isLoading}
        <div class="secondary skeleton" />
    {:else if $queryResult.isError}
        <span>Error: {$queryResult.error}</span>
    {:else if $queryResult.data.length === 0}
        <span>Nenhuma transação encontrada</span>
    {:else}
        <table>
            <tbody>
                {#each $queryResult.data ?? [] as row}
                    <tr>
                        <td>{row.title}</td>
                        <td class={row.type} style="width: 25%;">
                            {#if row.type === "withdrawal" || row.type === "invoice"}
                                -
                            {:else}
                                &nbsp;
                            {/if}
                            {formatCurrency(row.value)}
                        </td>
                        <td style="width: 25%;">{row.category}</td>
                        <td style="width: 10%;">{formatDate(row.date)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>

<style>
    span {
        display: block;
        text-align: center;
        margin-top: 1rem;
        color: var(--gray200);
    }

    table {
        width: 100%;
        height: 5rem;
        border-spacing: 0 0.5rem;
    }

    table td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--gray900);
        color: var(--gray200);
    }

    table td:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
    }

    table td:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
    }

    table td.deposit {
        color: var(--green);
    }

    table td.withdrawal {
        color: var(--red);
    }

    table td.payment {
        color: var(--green);
    }

    table td.invoice {
        color: var(--red);
    }

    .query {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        height: 30rem;
    }

    .query div {
        height: 100%;
        width: 100%;
        border-radius: 0.25rem;
    }
</style>
