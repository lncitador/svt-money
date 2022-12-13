<style lang="scss">
    h2 {
        margin-top: 0;
        color: var(--gray100);
        font-size: 2rem;
        font-weight: 400;
    }

    p {
        margin-bottom: 1rem;
        color: var(--gray200);
        text-align: justify;
        text-align-last: left;
        font-weight: 200;
        font-size: medium;
        // letter-spacing: 0.8px;
    }

    h3 {
        margin-top: 0;
        color: var(--gray100);
        font-weight: 400;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    main {
        display: grid;
        grid-template-columns: 1fr 300px;
        grid-gap: 2rem;
        margin: 2rem 0;

        section {
            grid-column: 1 / 2;

            figure {
                margin: 2rem 0;

                img {
                    display: block;
                    width: 100%;
                }

                figcaption {
                    font-size: 0.8rem;
                    text-align: center;
                    color: var(--gray100);
                    margin-top: 1rem;
                    a {
                        color: var(--gray300);
                    }
                }
            }
        }

        aside {
            grid-column: 2 / 3;
            a {
                display: block;
                position: relative;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;
                }
            }

            p {
                color: var(--gray100);
                display: flex;
                flex-direction: column;
                margin: 0.5rem 0 2rem 0;

                a {
                    color: var(--gray300);
                    font-weight: 700;
                    text-decoration: none;
                    font-size: 1.2rem;
                    margin-bottom: 0.2rem;
                }

                small {
                    color: var(--gray200);
                    font-weight: 400;
                }
            }
        }
    }
</style>

<script>
    import img1 from 'src/assets/maarten-deckers-T5nXYXCf50I-unsplash-1500x750.jpg'
    import img2 from 'src/assets/daniel-von-appen-tb4heMa-ZRo-unsplash-1500-750.jpg'
    import img3 from 'src/assets/matthew-hamilton-Ru3Ap8TNcsk-unsplash-1500-750.jpg'
</script>

<main class="container">
    <section>
        <hgroup>
            <h2>Ut sit amet sem ut velit</h2>
            <h3>Quisque mi est</h3>
        </hgroup>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis
            est vel velit bibendum ultrices. Sed aliquam tortor vel odio fermentum
            ullamcorper eu vitae neque. Sed non diam at tellus venenatis viverra.
            Vestibulum et leo laoreet arcu tempor eleifend venenatis ac leo. Pellentesque
            euismod justo sed nisl sollicitudin varius. Duis venenatis nisl sit amet ante
            rutrum posuere. Etiam nec ullamcorper leo, sed placerat mauris.
        </p>
        <figure>
            <img
                src="https://source.unsplash.com/o1SKqmgSDbg/1500x750"
                alt="Architecture"
            />
            <figcaption>
                Image from{' '}
                <a href="https://unsplash.com">unsplash.com</a>
            </figcaption>
        </figure>
        <h3>Nulla augue metus</h3>
        <p>
            Pacilisis sed ante ut, posuere volutpat quam. Maecenas maximus blandit mi ac
            finibus. Proin quis lacinia tellus. Aliquam erat volutpat. Aliquam erat
            volutpat. Phasellus suscipit nisi augue, id accumsan tortor auctor ut. Duis
            odio arcu, egestas nec nulla vel, fermentum bibendum ex.
        </p>
        <h3>Sed purus sapien, porta a cursus sed, maximus et metus.</h3>
        <p>
            Phasellus molestie ante sed massa bibendum, eget tempus ex sollicitudin.
            Vestibulum libero nulla, porttitor nec faucibus et, scelerisque eget quam.
            Nullam finibus tempor dui, vel congue urna condimentum ac. Fusce ultricies
            mauris justo, nec vulputate mauris pulvinar eu. Sed tempus ligula lorem, at
            tincidunt risus mollis non. Quisque et turpis sit amet sapien gravida
            ullamcorper in eu velit. Curabitur luctus ornare finibus. Proin tempor nulla
            sagittis est fermentum dapibus. Vestibulum posuere mattis congue. Ut porttitor
            id sem euismod tristique. Quisque mi est, posuere nec lorem eu, vulputate
            vehicula diam. Nullam scelerisque, libero posuere efficitur bibendum, urna
            odio finibus lorem, sed volutpat dolor ligula in dolor. Suspendisse suscipit
            efficitur neque, ut porta tellus mollis vel. Nam consequat arcu ac tellus
            porta, nec egestas orci sodales.
        </p>
    </section>
    <aside>
        <a href="a" aria-label="Example" on:click={() => {}}>
            <img src={img1} alt="Architecture" />
        </a>
        <p>
            <a href="a" on:click={() => {}}> Donec sit amet </a>
            <small>
                Class aptent taciti sociosqu ad litora torquent per conubia nostra
            </small>
        </p>
        <a href="b" aria-label="Example" on:click={() => {}}>
            <img src={img2} alt="Architecture" />
        </a>
        <p>
            <a href="b" on:click={() => {}}> Suspendisse potenti </a>
            <small> Proin non condimentum tortor. Donec in feugiat sapien. </small>
        </p>
        <a href="c" aria-label="Example" on:click={() => {}}>
            <img src={img3} alt="Architecture" />
        </a>
        <p>
            <a href="c" on:click={() => {}}> Nullam lobortis placerat </a>
            <small>
                Maecenas vitae nibh blandit dolor commodo egestas vel eget neque. Praesent
                semper justo orci, vel imperdiet mi auctor in.
            </small>
        </p>
    </aside>
</main>
