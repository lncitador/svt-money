<script lang="ts">
    import { MagnifyingGlass, XCircle } from "phosphor-svelte";
    import { field } from "svelte-forms";
    import { filter, currentPage, newTransactionModal } from "src/lib/store";
    import type { TransactionsStore } from "src/types";

    export let data: TransactionsStore;

    const input = field<string>("filter", "");

    input.subscribe((it) => {
        setTimeout(() => {
            currentPage.set(1);
            filter.set(it.value);
        }, 500);
    });

    function handleClear() {
        input.set("");
        filter.set("");
        currentPage.set(1);
    }

    function handleOpen() {
        newTransactionModal.update((prev) => !prev);
    }

    data.subscribe(({ data }) => {
        console.log(data);
    })
</script>

{#if $data.isLoading}
    <section class="container">
        <div class="secondary skeleton" />
        <div class="green skeleton" />
    </section>
{:else if $data.isError}
    <span> Error: $data.data.message </span>
{:else}
    <section class="container">
        <aside>
            <input
                type="text"
                placeholder="Busque uma transação"
                bind:value={$input.value}
                class={$input.value && "active"}
            />
            <a
                href="close"
                class={$input.value ? "active" : "disabled"}
                on:click|preventDefault={handleClear}
            >
                {#if $input.value}
                    <XCircle size={24} />
                {:else}
                    <MagnifyingGlass size={24} />
                {/if}
            </a>
        </aside>
        <button on:click={handleOpen}> Nova transação </button>
    </section>
{/if}

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 1rem;
        margin: 2rem 0;
    }

    section aside {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    section aside a {
        position: relative;
        top: 2px;
        left: -2.6rem;
    }

    section aside a.active {
        color: var(--red);
    }

    section aside a.disabled {
        color: var(--gray600);
        cursor: text;
    }

    section button {
        min-width: 200px;
        background-color: var(--green);
        color: #fff;
    }

    section div {
        height: 3.59rem;
        border-radius: 0.25rem;
    }

    section div:first-child {
        width: 100%;
        margin-right: 1.5rem;
    }

    section div:last-child {
        min-width: 200px;
    }
</style>
