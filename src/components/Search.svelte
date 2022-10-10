<script>
    import {MagnifyingGlass} from "phosphor-svelte";
</script>

<div class="search">
    <input type="text" placeholder="Busque uma transação">
    <button>
        <MagnifyingGlass size={20} />
        Buscar
    </button>
</div>

<style>
    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 10rem;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .search button {
        background: none;
        border: 2px solid var(--green);
        width: 147px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: var(--green);
    }
</style>