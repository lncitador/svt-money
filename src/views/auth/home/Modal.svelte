<script lang="ts">
    import CircularLoading from "src/components/CircularLoading.svelte";
    import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-svelte";
    import { field, form } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { newTransactionModal, currentPage, user } from "src/lib/store";

    import type {
        Transactions,
        ErrorResult,
        TransactionMutation,
    } from "src/types";

    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { graphql } from "src/lib/graphql";
    import { gql } from "graphql-request";

    const mutation = useMutation<
        Transactions,
        ErrorResult,
        TransactionMutation
    >("transactions", (variables) =>
        graphql.request(
            gql`
                mutation (
                    $category: String!
                    $title: String!
                    $type: Transactions!
                    $value: Float!
                    $email: String!
                ) {
                    createTransaction(
                        data: {
                            title: $title
                            value: $value
                            type: $type
                            category: $category
                            authUser: { connect: { email: $email } }
                        }
                    ) {
                        title
                        value
                        type
                        category
                        createdAt
                    }
                }
            `,
            variables
        )
    );

    const title = field("title", "", [required()]);
    const value = field("value", "", [required()]);
    const category = field("category", "", [required()]);
    const type = field("type", "", [required()]);

    const data = form(title, value, category, type);

    const queryClient = useQueryClient();

    function handleClose() {
        newTransactionModal.set(false);
        data.reset();
    }

    async function handleSubmit() {
        await data.validate();

        if ($data.valid) {
            $mutation.mutate(
                {
                    title: $title.value,
                    value: +$value.value,
                    category: $category.value,
                    type: $type.value as any,
                    email: $user.email,
                    date: new Date(),
                },
                {
                    onSuccess: (res) => {
                        handleClose();
                        currentPage.set(1);

                        queryClient.setQueryData("transactions", (prev) => [
                            res,
                            ...(prev as any),
                        ]);
                        queryClient.invalidateQueries(["transactions", 1]);
                    },
                }
            );
        }
    }

    $: {
        console.log($newTransactionModal);
    }
</script>

<section class={$newTransactionModal ? "open" : "closed"}>
    <div class="overlay" on:click={handleClose} />
    <div class="modal">
        <header>
            <h2>Nova transação</h2>
            <button on:click={handleClose}>
                <X size={20} />
            </button>
        </header>
        <form on:submit|preventDefault={handleSubmit}>
            <input
                class={$title.invalid && "error"}
                type="text"
                placeholder="Título"
                bind:value={$title.value}
            />
            <input
                class={$value.invalid && "error"}
                type="number"
                placeholder="Valor"
                bind:value={$value.value}
            />
            <input
                class={$category.invalid && "error"}
                type="text"
                placeholder="Categoria"
                bind:value={$category.value}
            />
            <grid class={$type.invalid && "error"}>
                <button
                    class={$type.value === "deposit" &&
                        `active__${$type.value}`}
                    on:click|preventDefault={() => type.set("deposit")}
                >
                    <ArrowCircleUp size={24} color="var(--green)" />
                    <span>Entrada</span>
                </button>
                <button
                    class={$type.value === "withdrawal" &&
                        `active__${$type.value}`}
                    on:click|preventDefault={() => type.set("withdrawal")}
                >
                    <ArrowCircleDown size={24} color="var(--red)" />
                    <span>Saída</span>
                </button>
            </grid>
            <button
                disabled={!$data.valid || $mutation.isLoading}
                class="green"
                type="submit"
            >
                {#if $mutation.isLoading}
                    <CircularLoading />
                {:else}
                    Cadastrar
                {/if}
            </button>
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

    .modal form grid.error {
        border: 2px solid var(--red);
        border-radius: 0.25rem;
    }

    .modal form grid button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--gray700);
        color: var(--gray100);
        border: 2px solid var(--gray700);
        margin: 0.5rem 0;
    }

    .modal form grid button.active__deposit {
        border: 2px solid var(--green);
    }

    .modal form grid button.active__withdrawal {
        border: 2px solid var(--red);
    }

    .modal form button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
