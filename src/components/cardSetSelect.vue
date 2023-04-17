<template>
    <!-- maybe use vue-select? -->
    <select v-model="set">
        <!-- <option v-for="p in pokemonSetsStore.sets">
            {{ p.name }}
            <img 
                :src="p.images.symbol" 
                :alt="p.name"
                height="50px"
                width="50px"
            />
        </option> -->
        <!-- <option 
            v-for="p in pokemonSetsStore.sets"
            :style="{backgroundImage: `url('${p.images.symbol}')`}"
        >
            {{ p.name }}
        </option> -->
        <template v-for="p in pokemonSetsStore.sets">
            <option>
                {{ p.name }}
            </option>
            <img 
                :src="p.images.symbol" 
                :alt="p.name"
                height="50px"
                width="50px"
            />
        </template>
    </select>
</template>

<script>
import { usePokemonSetsStore } from '../stores/pokemonSets.ts'

export default {
    setup() {
        const pokemonSetsStore = usePokemonSetsStore()

        return { pokemonSetsStore }
    },
    data () {
        return {
            set: ''
        }
    }
}
</script>