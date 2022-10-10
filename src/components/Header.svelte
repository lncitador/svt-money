<script>
    import logoSvg from "../assets/svelte.svg";
</script>

<header >
    <div class="logo__name">
        <img src={logoSvg} alt="Logo do svelte">
        <h2>Money</h2>
    </div>

    <button class="green">
        Nova transação
    </button>
</header>

<style>
    header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        height: 212px;
        padding: 2.5rem 10rem;
        background: var(--gray900);
    }

    .logo__name {
        display: flex;
        align-items: center;
        color: #fff;
    }

    .logo__name img {
        margin-right: 10px;
    }
</style>