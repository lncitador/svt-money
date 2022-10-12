import { writable } from "svelte/store";

export const totalPages = writable<number>(0);
export const currentPage = writable<number>(1);
export const filter = writable<string>("");
export const newTransactionModal = writable<boolean>(false);
