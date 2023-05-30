<template>
    <!-- TODO add filtering -->
    <div class="dropdown-container">
        <input 
            placeholder="Select Pokemon Set"
            v-model="set"
            @focus="openDropdown"
            @blur="closeDropdown($event)"
            type="text"
            size="30"
            />
            <!-- TODO add icon for dropdown open and close -->
        <div 
            v-if="isSelectActive"
            class="dropdown-list"    
        >
            <div 
                v-for="p in processedList"
                class="dropdown-item"
                @mousedown="selectSet(p)"
            >
                <img 
                    :src="p.images.symbol" 
                    :alt="p.name"
                    height="25"
                    width="25"
                />
                {{ p.name }}
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
            isSelectActive: false,
            isSelecting: false
        }
    },
    computed: {
        processedList () {
            return this.pokemonSetsStore.sets.filter(set => {
                return set.name.toLowerCase().includes(this.set.toLowerCase())
            })
        }
    },
    methods: {
        openDropdown () {
            this.isSelectActive = true
        },
        closeDropdown (event) {
            if (!this.isSelecting) {
                this.isSelectActive = false
            }
        },
        selectSet (set) {
            this.isSelecting = true
            this.set = set.name
            this.isSelecting = false
            this.addSetUp()
        },
        addSetUp () {
            this.$emit('addSet', this.set)
        }
    }
}
</script>

<style>
.dropdown-list {
    position: absolute;
    left: 0;
    top: 25px;
    height: 350px;
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
    margin-top: 0.5rem;
    position: relative
}
</style>