<script lang="ts">
    import Pagination from "./Pagination.svelte";
    import Search from "./Search.svelte";
    import Table from "./Table.svelte";
    import Dashboard from "./Dashboard.svelte";
    import Header from "src/components/Header.svelte";
    import type { RouteProps } from "svelte-router-spa/types/components/route";
    import Modal from "./Modal.svelte";

    export let { currentRoute, params } = {} as RouteProps;
</script>

<Header {currentRoute} {params} />
<Dashboard />
<Search />
<Table />
<Pagination />

<Modal />
