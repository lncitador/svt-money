<script lang="ts">
    import Pagination from "./Pagination.svelte";
    import Search from "./Search.svelte";
    import Table from "./Table.svelte";
    import Dashboard from "./Dashboard.svelte";
    import Header from "src/components/Header.svelte";

    import { user } from "src/lib/store";
    import { useQuery } from "@sveltestack/svelte-query";
    import { graphql } from "src/lib/graphql";
    import { gql } from "graphql-request";
    import type { RouteProps } from "svelte-router-spa/types/components/route";

    export let { currentRoute, params } = {} as RouteProps;
    let email: string;

    const transactions = useQuery(
        ["transactions", email],
        () =>
            graphql
                .request(
                    gql`
                        query ($email: String!) {
                            transactions(
                                where: { authUser: { email: $email } }
                            ) {
                                id
                                title
                                type
                                value
                                createdAt
                            }
                        }
                    `,
                    { email: $user.email }
                )
                .then(({ data }) => data.transactions),
        { enabled: !!email?.length }
    );

    user.subscribe((user) => {
        email = user?.email;
    });
</script>

<Header {currentRoute} {params} />
<Dashboard data={transactions} />
<Search data={transactions} />
<Table />
<Pagination />
