<section class="container">
    <hgroup>
        <h2><strong>Svelte</strong> Money</h2>
        <p>Gerencie suas finanças de forma simples e fácil</p>
    </hgroup>
</section>

<style lang="scss">
    $img: url("https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");

    hgroup {
        margin-top: -5rem;
        color: var(--gray100);
        font-size: 0.85rem;
        font-weight: 400;
        padding: 3rem;
        width: 100%;
        border-radius: 0.5rem;
        background-color: var(--gray700);
        box-shadow: 0 0 0.5rem 0.1rem var(--gray700);
        background-image: $img;
        background-size: cover;

        h2 {
            margin-top: 0;
            color: var(--gray100);
            font-size: 2.5rem;
            font-weight: 700;

            strong {
                color: #FF3E00;
            }
        }

        p {
            color: var(--gray100);
            text-align: justify;
            text-align-last: left;
            font-weight: 400;
            font-size: 1.5rem;
            // letter-spacing: 0.8px;
        }
    }
</style>
