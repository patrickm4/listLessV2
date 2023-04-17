import { defineStore } from 'pinia'
import pokemon from 'pokemontcgsdk'
import config from '../../config.js'

pokemon.configure({apiKey: config.pokeApiKey})

export const usePokemonSetsStore = defineStore('pokeSets', {
    state: () => {
        // if (window.localStorage.getItem('pokemon_sets')) {
        //     return { 
        //         sets: JSON.parse(window.localStorage.getItem('pokemon_sets') || '[]')
        //     }
        // } else {
        //     console.error("No pokemon sets in store!")
        //     return { 
        //         sets:[]
        //     }
        // }

        return { 
            sets: JSON.parse(window.localStorage.getItem('pokemon_sets') || '[]')
        }
    },
})
