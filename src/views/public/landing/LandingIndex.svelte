<script>
    import Header from "src/components/Header.svelte";
    import Footer from "./Footer.svelte";
    import Hero from "./Hero.svelte";
    import Main from "./Main.svelte";
    import Subscription from "./Subscription.svelte";

    export let currentRoute, params;
</script>

<Header currentRoute={currentRoute} params={params} />
<Hero />
<Main />
<Subscription />
<Footer />