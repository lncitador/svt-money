<style>
    grid {
        margin-top: -5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    section {
        padding: 1.5rem;
        border-radius: 0.25rem;
        color: #fff;
        height: 137px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    section header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    section header p {
        font-weight: 400;
    }
</style>

<script lang="ts">
    import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-svelte'

    import type { TransactionQueryVariables, Transactions, TransactionsType } from 'src/types'
    import { user } from 'src/lib/store'
    import { useTransactionQuery, useTransactionQueryFn } from 'src/lib/service/api'

    let variables: TransactionQueryVariables;
    let sub: string;

    $: sub = $user && $user.sub!;

    $: variables = {
        where: {
            authUser: { sub }
        }
    }

    const queryResult = useTransactionQuery(variables, {
        enabled: !!variables?.where?.authUser?.sub
    })

    $: {
        queryResult.setOptions({
            queryKey: ["transactions", variables],
            queryFn: useTransactionQueryFn
        })
    }

    let entradas: string
    let saidas: string
    let total: string

    function getValueBy(param: TransactionsType) {
        return (transactions?: Transactions[]) => {
            return (
                transactions
                    ?.filter(it => it.type === param)
                    ?.reduce((acc, act) => acc + act.value, 0) ?? 0
            )
        }
    }

    queryResult.subscribe(subscription => {
        const ent = getValueBy('DEPOSIT')(subscription.data)
        const sai = getValueBy('WITHDRAWAL')(subscription.data)

        total = (ent - sai)?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        saidas = sai?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        entradas = ent?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    })
</script>
<grid class="container">
    {#if $queryResult.isLoading}
        <section class="secondary skeleton" />
        <section class="secondary skeleton" />
        <section class="green skeleton" />
    {:else if $queryResult.isError}
        <span>Error: $data.data.message </span>
    {:else}
        <section class="secondary">
            <header>
                <p>Entradas</p>
                <ArrowCircleUp color="var(--green)" size={32} />
            </header>
            <h1>{entradas}</h1>
        </section>
        <section class="secondary">
            <header>
                <p>Saídas</p>
                <ArrowCircleDown color="var(--red)" size={32} />
            </header>
            <h1>{saidas}</h1>
        </section>
        <section class={total.includes('-') ? 'red' : 'green'}>
            <header>
                <p>Total</p>
                <CurrencyDollar size={32} />
            </header>
            <h1>{total}</h1>
        </section>
    {/if}
</grid>
