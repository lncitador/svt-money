<script>
    import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
    import { Router } from 'svelte-router-spa'
    import { routes } from './lib/routes'

    let queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
    <Router {routes} />
</QueryClientProvider>
