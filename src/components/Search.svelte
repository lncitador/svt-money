<script lang="ts">
    import { MagnifyingGlass, XCircle } from "phosphor-svelte";
    import { field } from "svelte-forms";
    import { filter, currentPage, newTransactionModal } from "../store";

    const input = field<string>("filter", "");

    input.subscribe((it) => {
        filter.set(it.value);
    });

    function handleClear() {
        input.set("");
        filter.set("");
        currentPage.set(1);
    }

    function handleOpen() {
        newTransactionModal.update((prev) => !prev);
    }
</script>

<section>
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

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0 10rem;
        gap: 1rem;
        margin-bottom: 2rem;
        min-width: var(--min);
    }

    section aside {
        width: 45%;
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
</style>
