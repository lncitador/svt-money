<script lang="ts">
    import { X, ArrowCircleUp, ArrowCircleDown, } from 'phosphor-svelte';
    import { newTransactionModal } from "../store";

    function handleClose() {
        newTransactionModal.update((prev) => !prev);
    }
</script>

<section class={$newTransactionModal ? "open" : "closed"}>
    <div class="overlay" on:click={handleClose}></div>
    <div class="modal">
        <header>
            <h2>Nova transação</h2>
            <button on:click={handleClose}>
                <X size={20} />
            </button>
        </header>
        <form>
            <input type="text" id="title" placeholder="Título" />
            <input type="number" id="value" placeholder="Valor" />
            <input type="text" id="category" placeholder="Categoria" />
            <grid>
                <button>
                    <ArrowCircleUp size={24} color="var(--green)" />
                    <span>Entrada</span>
                </button>
                <button >
                    <ArrowCircleDown size={24} color="var(--red)" />
                    <span>Saída</span>
                </button>
            </grid>
            <button class="green" type="submit">Cadastrar</button>
        </form>
    </div>

</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
        color: var(--gray100);
        font-weight: 700;
        font-size: 2rem;
    }

    section.open {
        opacity: 1;
        pointer-events: all;
    }

    section.closed {
        opacity: 0;
        pointer-events: none;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal {
        position: relative;
        width: 100%;
        max-width: 500px;
        background: var(--gray800);
        border-radius: 5px;
        padding: 2rem;
    }

    .modal header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
    }

    .modal header h2 {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .modal header button {
        background: transparent;
        border: 0;
        cursor: pointer;
        color: var(--gray300);
    }

    .modal form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .modal form grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .modal form grid button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--gray700);
        color: var(--gray100);
        margin: 0.5rem 0;
    }
</style>
