import './styles/global.css'
import App from './App.svelte'
import { makeServer } from './lib/service/api'

makeServer()

const app = new App({
    target: document.getElementById('app') as HTMLElement,
})

export default app
