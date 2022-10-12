<script lang="ts">
    import { currentPage, totalPages, filter } from "../store";
    import { transactions } from "../service/api";
    import { Query } from "@sveltestack/svelte-query";

    let page: number = 1;
    let search: string = "";

    currentPage.subscribe((it) => {
        page = it;
    });

    filter.subscribe((it) => {
        search = it;
    });

    function formatCurrency(num: number) {
        return num.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString("pt-BR");
    }

    console.log(page);
</script>

<Query
    options={{
        queryKey: ["transactions", page, search],
        queryFn: () =>
            transactions.get({
                _page: page,
                _limit: 8,
                _sort: "date",
                _order: "desc",
                q: search,
            }),
        onSuccess: ({ headers }) => {
            const link = headers.link
                .split(",")
                .map((part) => part.split(";"))
                .reduce(
                    (acc, part) => {
                        const [url, rel] = part;
                        const key = rel?.split("=")[1].replace(/"/g, "");
                        const value = url?.split(">")[0].replace(/</g, "");

                        return { ...acc, [key]: value };
                    },
                    { last: "" }
                );

            $totalPages =
                +link?.last
                    .split("?")
                    .map((part) => part.split("&"))
                    .flat()
                    .find((part) => part.includes("_page="))
                    ?.split("=")[1] ?? 1;
        },
        keepPreviousData: true,
    }}
>
    <div class="query" slot="query" let:queryResult>
        {#if queryResult.isLoading}
            <span>Loading...</span>
        {:else if queryResult.isError}
            <span>Error: {queryResult.error}</span>
        {:else}
            <table>
                <tbody>
                    {#each queryResult.data.data as row}
                        <tr>
                            <td>{row.title}</td>
                            <td class={row.type} style="width: 25%;">
                                {#if row.type === "withdrawal" || row.type === "invoice"}
                                    -
                                {:else}
                                    &nbsp;
                                {/if}
                                {formatCurrency(row.value)}
                            </td>
                            <td style="width: 25%;">{row.category}</td>
                            <td style="width: 10%;">{formatDate(row.date)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</Query>

<style>
    table {
        width: 100%;
        height: 5rem;
        border-spacing: 0 0.5rem;
        padding: 0 10rem;
        min-width: var(--min);
    }

    table td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--gray900);
        color: var(--gray200);
    }

    table td:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
    }

    table td:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
    }

    table td.deposit {
        color: var(--green);
    }

    table td.withdrawal {
        color: var(--red);
    }

    table td.payment {
        color: var(--green);
    }

    table td.invoice {
        color: var(--red);
    }

    .query {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        height: 30rem;
        min-width: var(--min);
    }
</style>
