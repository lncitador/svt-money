<script lang="ts">
    import { CaretLeft, CaretRight } from "phosphor-svelte";
    import type { Caret } from "src/types";
    import { currentPage, totalPages } from "src/lib/store";

    let pages: number[] = [];

    totalPages.subscribe((total) => {
        pages = Array.from({ length: total }, (_, i) => i + 1);
    });

    let right: Caret;
    let left: Caret;

    currentPage.subscribe((page) => {
        right = {
            color: page === pages.at(-1) ? "var(--gray600)" : "var(--green)",
            active: page < pages.length,
        };

        left = {
            color: page === 1 ? "var(--gray600)" : "var(--green)",
            active: page !== 1,
        };
    });

    const handleClick = (page: number) => () => {
        currentPage.update(() => page);
    };

    const increment = () => {
        right.active && currentPage.update((prev) => prev + 1);
    };

    const decrement = () => {
        left.active && currentPage.update((prev) => prev - 1);
    };
</script>

{#if pages.length}
    <footer>
        <nav>
            <ul>
                <li class:active={left.active} on:click={decrement}>
                    <CaretLeft size={24} color={left.color} />
                </li>
                {#each pages as page}
                    <li>
                        <a
                            href={`${page}`}
                            class:active={page === $currentPage}
                            on:click|preventDefault={handleClick(page)}
                        >
                            {page}
                        </a>
                    </li>
                {/each}
                <li class:active={right.active} on:click={increment}>
                    <CaretRight size={24} color={right.color} />
                </li>
            </ul>
        </nav>
    </footer>
{/if}

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
        transition: filter ease-in-out 0.2s;
    }

    footer nav ul li a.active {
        background: var(--green);
    }

    footer nav ul li a:hover {
        filter: brightness(0.9);
    }

    footer nav ul li.active {
        cursor: pointer;
    }
</style>
