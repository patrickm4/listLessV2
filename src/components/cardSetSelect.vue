<template>
    <!-- @blur="closeDropdown" -->
    <div class="dropdown-container">
        <input 
            placeholder="Select Pokemon Set"
            v-model="set"
            @focus="openDropdown"
            type="text"
            size="50"
            />
        <div 
            v-if="isSelectActive"
            class="dropdown-list"    
        >
            <div 
                v-for="p in pokemonSetsStore.sets"
                class="dropdown-item"
            >
                {{ p.name }}
                <img 
                    :src="p.images.symbol" 
                    :alt="p.name"
                    height="25"
                    width="25"
                />
            </div>
        </div>
    </div>
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
            set: '',
            isSelectActive: false
        }
    },
    methods: {
        openDropdown () {
            this.isSelectActive = true
        },
        closeDropdown () {
            this.isSelectActive = false
        }
    }
}
</script>

<style>
.dropdown-list {
    position: absolute;
    left: 0;
    top: 25px;
    height: 550px;
    width: auto;
    background-color: azure;
    border: 1px solid rgb(65, 65, 65);
    color: #000;
    z-index: 99;
    overflow: auto;
}
.dropdown-item {
    display: flex;
}
.dropdown-item:hover {
    background-color:cadetblue;
}
.dropdown-container {
    position: relative
}
</style>