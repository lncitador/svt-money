<script lang="ts">
    import type { Auth0Client } from "@auth0/auth0-spa-js";
    import { UserCircle } from "phosphor-svelte";
    import auth from "src/lib/service/auth";

    export let auth0Client: Auth0Client;

    const handleClickLogout = async () => {
        await auth.logout(auth0Client);
    };
</script>

<details>
    <summary aria-haspopup="listbox">
        <UserCircle />
    </summary>
    <ul role="listbox" class="menu">
        <li><a href="perfil">Perfil</a></li>
        <li><a href="sair" on:click={handleClickLogout}>Sair</a></li>
    </ul>
</details>

<style lang="scss">
    $color_1: #fff;
    $color_2: var(--gray600);
    $color_3: var(--gray800);
    $background-color_1: var(--gray100);

    details {
        display: inline-block;

        summary {
            position: relative;
            display: inline-block;
            padding: 0;
            border: none;
            background: none;
            color: $color_1;
            font-size: 2.5rem;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }

        ul {
            position: absolute;
            display: none;
            padding: 0.2rem 0;
            margin: 0;
            margin-left: -1rem;
            list-style: none;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1;

            &::before {
                content: "";
                position: absolute;
                top: -6px;
                left: 42%;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid #fff;
            }

            li {
                padding: 0.5rem 1rem;
                &:hover {
                    background-color: $background-color_1;
                }
                a {
                    display: block;
                    text-decoration: none;
                    color: $color_2;
                    font-weight: 500;
                    &:hover {
                        color: $color_3;
                    }
                }
            }
        }
    }
    details[open] {
        ul {
            display: block;
        }
    }
</style>
