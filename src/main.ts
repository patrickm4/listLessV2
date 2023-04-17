import { createApp } from 'vue'
import { createPinia } from 'pinia'
import pokemon from 'pokemontcgsdk'
import config from '../config.js'

pokemon.configure({apiKey: config.pokeApiKey})

import App from './App.vue'
import router from './router'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// get pokemon sets and save to local
if (!window.localStorage.getItem('pokemon_sets')) {
    pokemon.set.all()
    .then((sets: any) => {
        window.localStorage.setItem('pokemon_sets', JSON.stringify(sets))
        app.mount('#app')
    })
    .catch((err: string) => {
        console.log("Error getting pokemon sets: ", err)
        app.mount('#app')
    })
} else {
    app.mount('#app')
}
