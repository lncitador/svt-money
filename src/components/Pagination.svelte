<script>
    import { CaretLeft, CaretRight } from "phosphor-svelte";
    let pages = [1, 2, 3]
    let currentPage = 1

    const righyColor = currentPage === pages.at(-1)
        ? "var(--gray600)"
        : "var(--green)"

    const leftColor = currentPage === pages[0]
        ? "var(--gray600)"
        : "var(--green)"
</script>

<footer>
    <nav>
        <ul>
            <li>
                <CaretLeft size={24} color={leftColor} />
            </li>
        {#each pages as page}
            <li>
            <a
                href="#"
                class:active={page === currentPage}
                on:click|preventDefault={() => currentPage = page}
            >
                {page}
            </a>
            </li>
        {/each}
            <li>
                <CaretRight size={24} color={righyColor}  />
            </li>
        </ul>
    </nav>
</footer>

<style>
    footer {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    footer nav ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        list-style: none;
    }
    
    footer nav ul li {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    footer nav ul li a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 0.25rem;
        color: #fff;
        text-decoration: none;
        background-color: var(--gray600);
    }

    footer nav ul li a.active {
        background: var(--green);
    }
</style>