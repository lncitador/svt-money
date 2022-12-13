<style lang="scss">
    section {
        padding: 2rem 0;
        > .container {
            > article {
                background-color: var(--gray600);
                border-radius: 0.5rem;
                padding: 4rem 2rem;

                > hgroup {
                    > h2 {
                        margin-top: 0;
                        color: var(--gray100);
                        font-weight: 400;
                    }
                    > h3 {
                        margin-bottom: 1rem;
                        color: var(--gray200);
                        font-weight: 400;
                    }
                }
                > form {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 1rem;

                    > button {
                        background-color: var(--green);
                        color: #fff;
                    }
                }
            }
        }
    }
</style>

<section aria-label="Subscribe example">
    <div class="container">
        <article>
            <hgroup>
                <h2>Subscribe</h2>
                <h3>Litora torquent per conubia nostra</h3>
            </hgroup>
            <form class="grid">
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="First name"
                    aria-label="First name"
                    required
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                />
                <button type="submit"> Subscribe </button>
            </form>
        </article>
    </div>
</section>
