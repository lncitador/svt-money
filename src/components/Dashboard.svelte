<script>
    import {
        ArrowCircleUp,
        ArrowCircleDown,
        CurrencyDollar,
    } from "phosphor-svelte";
</script>

<grid>
    <section class="secondary">
        <header>
            <p>Entradas</p>
            <ArrowCircleUp color="#00875F" size={32} />
        </header>
        <h1>R$ 1000,00</h1>
    </section>
    <section class="secondary">
        <header>
            <p>Saídas</p>
            <ArrowCircleDown color="#F75A68" size={32} />
        </header>
        <h1>R$ 500,00</h1>
    </section>
    <section class="green">
        <header>
            <p>Total</p>
            <CurrencyDollar size={32} />
        </header>
        <h1>R$ 500,00</h1>
    </section>
</grid>

<style>
    grid {
        margin-top: -8rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 2.5rem 10rem;
        min-width: var(--min);
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
