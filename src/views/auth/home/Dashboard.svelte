<script lang="ts">
    import {
        ArrowCircleUp,
        ArrowCircleDown,
        CurrencyDollar,
    } from "phosphor-svelte";
    import type { Transactions, TransactionsStore } from "src/types";

    let entradas: string;
    let saidas: string;
    let total: string;

    export let data: TransactionsStore;

    function getValueBy(param: "deposit" | "withdrawal") {
        return (transactions: Transactions[]) => {
            return transactions
                ?.filter((it) => it.type === param)
                .reduce((acc, act) => acc + act.value, 0);
        };
    }

    data.subscribe(({ data }) => {
        const ent = getValueBy("deposit")(data) ?? 0;
        const sai = getValueBy("withdrawal")(data) ?? 0;

        total = (ent - sai)?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        saidas = sai?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        entradas = ent?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    });
</script>

<grid class="container">
    {#if $data.isLoading}
        <section class="secondary skeleton" />
        <section class="secondary skeleton" />
        <section class="green skeleton" />
    {:else if $data.isError}
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
        <section class={total.includes("-") ? "red" : "green"}>
            <header>
                <p>Total</p>
                <CurrencyDollar size={32} />
            </header>
            <h1>{total}</h1>
        </section>
    {/if}
</grid>

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
