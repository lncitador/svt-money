import { writable } from 'svelte/store'
import type { User } from '@auth0/auth0-spa-js'

export const isAuthentificated = writable(false)
export const user = writable<User>()
export const popupOpen = writable(false)
export const error = writable()

export const totalPages = writable<number>(0)
export const currentPage = writable<number>(1)
export const filter = writable<string>('')
export const newTransactionModal = writable<boolean>(false)

export const isLoading = writable<boolean>(false)
