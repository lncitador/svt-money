import type { Route } from "svelte-router-spa/types/components/router"
import HomeIndexSvelte from "src/views/auth/home/HomeIndex.svelte"
import LandingIndexSvelte from "src/views/public/landing/LandingIndex.svelte"

const routes: Route[] = [
    {
        name: "/home",
        component: HomeIndexSvelte,
    },
    {
        name: "/",      
        component: LandingIndexSvelte,
    }
]

export { routes }