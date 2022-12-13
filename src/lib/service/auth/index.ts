import createAuth0Client from '@auth0/auth0-spa-js'
import type { Auth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js'
import config from './config'

import { user, isAuthentificated, popupOpen } from 'src/lib/store'

async function createClient() {
    return createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    })
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions) {
    popupOpen.set(true)

    try {
        await client.loginWithPopup(options)

        const userAuth = await client.getUser()

        user.set(userAuth)
        isAuthentificated.set(true)
    } catch (error) {
        console.error(error)
    } finally {
        popupOpen.set(false)
    }
}

async function logout(client: Auth0Client) {
    await client.logout()
}

export const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth
