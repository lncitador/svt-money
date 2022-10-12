<script>
    import {
        QueryClient,
        QueryClientProvider,
    } from "@sveltestack/svelte-query";
    import Header from "./components/Header.svelte";
    import Dashboard from "./components/Dashboard.svelte";
    import Search from "./components/Search.svelte";
    import Table from "./components/Table.svelte";
    import Pagination from "./components/Pagination.svelte";
    import Modal from "./components/Modal.svelte";

    export const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <Header />
    <Dashboard />
    <Search />
    <Table />
    <Pagination />
    <Modal />
</QueryClientProvider>
