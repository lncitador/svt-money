<style lang="scss">
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

        &.open {
            opacity: 1;
            pointer-events: all;
        }

        &.closed {
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

            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1.25rem;

                h2 {
                    font-size: 1.5rem;
                    font-weight: 500;
                }

                button {
                    background: transparent;
                    border: 0;
                    cursor: pointer;
                    color: var(--gray300);
                }
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;

                    &.error {
                        border: 2px solid var(--red);
                        border-radius: 0.25rem;
                    }

                    button {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        background-color: var(--gray700);
                        color: var(--gray100);
                        border: 2px solid var(--gray700);
                        margin: 0.5rem 0;

                        &.active__deposit {
                            border: 2px solid var(--green);
                        }

                        &.active__withdrawal {
                            border: 2px solid var(--red);
                        }
                    }
                }

                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>

<script lang="ts">
    import CircularLoading from 'src/components/CircularLoading.svelte'
    import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-svelte'
    import { field, form } from 'svelte-forms'
    import { required } from 'svelte-forms/validators'
    import { newTransactionModal, currentPage, user, filter } from 'src/lib/store'

    import type { TransactionQueryVariables, Transactions } from 'src/types'

    import { useQueryClient } from '@sveltestack/svelte-query'
    import { useCreateTransactionMutation } from 'src/lib/service/api/schemas'

    let variables: TransactionQueryVariables
    let sub: string

    $: sub = $user && $user.sub!

    const limit = 8

    $: variables = {
        where: {
            _search: $filter,
            authUser: {
                sub
            }
        },
        first: limit,
        skip: $currentPage * limit - limit,
        orderBy: {
            createdAt: 'DESC',
        },
    }

    const mutation = useCreateTransactionMutation()

    const title = field('title', '', [required()])
    const value = field('value', '', [required()])
    const category = field('category', '', [required()])
    const type = field('type', '', [required()])

    const data = form(title, value, category, type)

    const queryClient = useQueryClient()

    function handleClose() {
        newTransactionModal.set(false)
        data.reset()
    }

    async function handleSubmit() {
        await data.validate()

        if ($data.valid) {
            $mutation.mutate(
                {
                    data: {
                        title: $title.value,
                        value: +$value.value,
                        category: $category.value,
                        type: $type.value as any,
                        sub: $user.sub as any
                    }
                },
                {
                    onSuccess: ({ id, createdAt }) => {
                        handleClose()
                        currentPage.set(1)

                        queryClient.setQueryData<Transactions[]>(
                            [
                                'transactions',
                                {
                                    where: {
                                        authUser: { sub }
                                    }
                                }
                            ],
                            prev => [
                                {
                                    id,
                                    title: $title.value,
                                    value: +$value.value,
                                    category: $category.value,
                                    type: $type.value as any,
                                    sub: $user.sub!,
                                    createdAt,
                                },
                                ...(prev ?? [])
                            ]
                        )
                        queryClient.invalidateQueries(['transactions', variables])
                    }
                }
            )
        }
    }
</script>

<section class={$newTransactionModal ? 'open' : 'closed'}>
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
                class:error={$title.invalid}
                type="text"
                placeholder="Título"
                bind:value={$title.value}
            />
            <input
                class:error={$value.invalid}
                type="number"
                placeholder="Valor"
                bind:value={$value.value}
            />
            <input
                class:error={$category.invalid}
                type="text"
                placeholder="Categoria"
                bind:value={$category.value}
            />
            <grid class:error={$type.invalid}>
                <button
                    class:active__deposit={$type.value === 'DEPOSIT'}
                    on:click|preventDefault={() => type.set('DEPOSIT')}
                >
                    <ArrowCircleUp size={24} color="var(--green)" />
                    <span>Entrada</span>
                </button>
                <button
                    class:active__withdrawal={$type.value === 'WITHDRAWAL'}
                    on:click|preventDefault={() => type.set('WITHDRAWAL')}
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
