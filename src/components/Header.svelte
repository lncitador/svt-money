<style lang="scss">
    header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        height: 212px;
        background: var(--gray900);
        padding-top: 2.5rem;

        .logo__name {
            display: flex;
            align-items: center;
            color: #fff;

            img {
                margin-right: 0.8rem;
            }
        }

        button {
            background-color: var(--green);
            color: #fff;
            padding: 1rem 2rem;
        }
    }
</style>

<script lang="ts">
    import logoSvg from 'src/assets/svelte.svg'
    import Avatar from './Avatar.svelte'
    import { onMount } from 'svelte'
    import { isAuthentificated, user } from 'src/lib/store'
    import auth from 'src/lib/service/auth'

    import type { Auth0Client } from '@auth0/auth0-spa-js'
    import { navigateTo } from 'svelte-router-spa'
    import type { RouteProps } from 'svelte-router-spa/types/components/route'
    import { graphql } from 'src/lib/graphql'
    import { gql } from 'graphql-request'

    export let { currentRoute, params } = {} as RouteProps

    let auth0Client: Auth0Client

    onMount(async () => {
        console.log('onMount')
        auth0Client = await auth.createClient()

        const isAuth = await auth0Client.isAuthenticated()
        isAuthentificated.set(isAuth)

        if (isAuth) {
            const userData = await auth0Client.getUser()
            user.set(userData)

            console.log('user', userData)

            if (currentRoute.name === '/') {
                navigateTo('/home')
            }
        } else {
            if (currentRoute.name !== '/') {
                navigateTo('/')
            }
        }
    })

    const handleClick = async () => {
        await auth.loginWithPopup(auth0Client)
        const user = await auth0Client.getUser()

        const { authUser } = await graphql.request(
            gql`
                query ($sub: String!) {
                    authUser(where: { sub: $sub }) {
                        id
                    }
                }
            `,
            { sub: user.sub }
        )

        console.log('authUser', authUser)

        if (!authUser) {
            const { createUser } = await graphql.request(
                gql`
                    mutation ($data: AuthUserCreateInput!) {
                        createAuthUser(data: $data) {
                            id
                        }
                    }
                `,
                {
                    data: {
                        sub: user.sub,
                        name: user.name,
                        email: user.email
                    }
                }
            )

            console.log('createUser', createUser)
        }

        navigateTo('/home')
    }
</script>

<header class="container">
    <div class="logo__name">
        <img src={logoSvg} alt="Logo do svelte" />
        <h2>Money</h2>
    </div>
    {#if $isAuthentificated}
        <Avatar {auth0Client} />
    {:else}
        <button on:click={handleClick}>Fazer login</button>
    {/if}
</header>
