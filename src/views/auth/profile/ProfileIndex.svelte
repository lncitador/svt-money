<style lang="scss">
    form {
        margin-top: -6rem;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;
        column-gap: 3rem;
        justify-content: center;
        align-items: center;

        a {
            display: flex;
            align-items: center;
            color: var(--gray200);
            font-size: 1.3rem;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
            gap: 0.8rem;

            &:hover {
                color: var(--gray300);
            }
        }

        hgroup {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;

            h1 {
                font-size: 1.5rem;
                font-weight: 400;
                color: var(--gray200);
            }

            h2 {
                font-size: 1rem;
                font-weight: 400;
                color: var(--gray200);
            }
        }

        section {
            background: var(--gray800);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 0.5rem;

            label {
                font-size: 0.875rem;
                font-weight: 700;
                color: var(--gray300);
                margin-bottom: 0.5rem;
            }

            input {
                background: var(--gray700);
                color: var(--gray300);
                margin-bottom: 1rem;
            }
        }
    }
</style>

<script>
    import { ArrowLeft } from 'phosphor-svelte'
    import Header from 'src/components/Header.svelte'
    import { user } from 'src/lib/store'
    import { navigateTo } from 'svelte-router-spa'

    let currentPage, params

    const handleClick = () => {
        navigateTo('/home')
    }
</script>

<Header currentRoute={currentPage} {params} />
<form class="container">
    <a href="back" on:click={handleClick}>
        <ArrowLeft weight="bold" />
        Voltar
    </a>
    <hgroup>
        <h1>Perfil</h1>
        <h2>Veja seus dados pessoais</h2>
    </hgroup>

    <section>
        <label for="name">Nome</label>
        <input type="text" id="name" bind:value={$user.given_name} disabled />
    </section>

    <section>
        <label for="family_name">Sobrenome</label>
        <input type="text" id="family_name" bind:value={$user.family_name} disabled />
    </section>

    <section>
        <label for="nickname">Nickname</label>
        <input type="text" id="nickname" bind:value={$user.nickname} disabled />
    </section>

    <section>
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={$user.email} disabled />
    </section>
</form>
