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

<script lang="ts">
    import { Query } from '@sveltestack/svelte-query'
    import { useTransactionQueryFn } from 'src/lib/service/api/schemas/_transactions'
    import { currentPage, filter, user } from 'src/lib/store'
    import type { TransactionQueryVariables } from 'src/types'

    const limit = 8

    let variables: TransactionQueryVariables
    let sub: string;

    $: sub = $user && $user.sub!;

    $: variables = {
        where: {
            _search: $filter,
            authUser: {
                sub,
            }
        },
        first: limit,
        skip: $currentPage * limit - limit,
        orderBy: {
            createdAt: 'DESC',
        },
    }

    function formatCurrency(num: number) {
        return num.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString('pt-BR')
    }
</script>

<Query
    options={{
        queryKey: ['transactions', variables],
        queryFn: useTransactionQueryFn,
        enabled: !!variables?.where?.authUser?.sub
    }}
>
    <div class="query container" slot="query" let:queryResult>
        {#if queryResult.isLoading}
            <div class="secondary skeleton" />
        {:else if queryResult.isError}
            <span
                >Error: <br />
                <pre>{JSON.stringify(queryResult.error, null, 4)}</pre></span
            >
        {:else if queryResult.data && queryResult.data.length === 0}
            <span>Nenhuma transação encontrada</span>
        {:else if queryResult.data && queryResult.data.length > 0}
            <table>
                <tbody>
                    {#each queryResult.data as row}
                        <tr>
                            <td>{row.title}</td>
                            <td class={row.type} style="width: 25%;">
                                {#if row.type === 'WITHDRAWAL'}
                                    -
                                {:else}
                                    &nbsp;
                                {/if}
                                {formatCurrency(row.value)}
                            </td>
                            <td style="width: 25%;">{row.category}</td>
                            <td style="width: 10%;">{formatDate(row.createdAt)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</Query>
<div  />
