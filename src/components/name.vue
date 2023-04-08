<template>
    <div v-if="multiResults.length > 0">
        <div v-for="r in multiResults"></div>
    </div>
    <template v-else>
        <div class="filename">{{ cardStore.cardName }}</div>
        <button id="copy-filename" @click="copyName()">Copy</button>
    </template>
</template>

<script>
import { useCardStore } from '../stores/card.ts'
import pokemon from 'pokemontcgsdk'
import config from '../../config.js'

pokemon.configure({apiKey: config.pokeApiKey})

export default {
    setup() {
        const cardStore = useCardStore()

        return { cardStore }
    },
    data () {
        return {
            multiResults: []
        }
    },
    computed: {
        isPoke () {
            return this.cardStore.cardName.toLowerCase().split('').includes('/')
        },
        isYugi () {
            return !this.isPoke
        }
    },
    methods: {
        async copyName() {
            try {
                await navigator.clipboard.writeText(this.cardStore.cardName);
                alert('Copied');
            } catch($e) {
                alert('Cannot copy');
            }
        }
    },
    mounted () {
        //handle the name
        if (this.isPoke) {
            const nameSplit = this.cardStore.cardName.split(' ')

            // if its not an old card
            if (!nameSplit.includes('Set') && !nameSplit.includes('set')) {
                const nameSplitCopy = nameSplit.slice();

                let num = 0
                let total = 0
                let name = []

                for (const e of nameSplitCopy) {
                    if (e.includes('/')) {
                        let x = e.split('/');
                        num = Number(x[0]);
                        total = Number(x[1]) ;
                    } else {
                        // we dont want the multi rename parenthesis if it has it
                        if (!e.includes('(')) {
                            name.push(e)
                        }
                    }
                }

                name = name.join(' ')

                this.cardStore.setEbaySearchQuery(`${name} ${num}/${total}`)

                const nameSplitLength = name.split(' ').length

                // pokemon.card.all({ q: `number:${num} set.total:${total}` })
                pokemon.card.all({ q: `name:${nameSplitLength === 1 ? name : `"${name}"`} number:${num} set.total:${total}` })
                    .then(result => {
                        // console.log("check res", result)

                        if (result.length) {
                            if (result.length > 1) {
                                console.warn("More than 1 card matched!")

                                this.multiResults = result

                                console.log(result)
                            } else {
                                this.cardStore.selectCard(`${result[0].name} ${result[0].number}/${result[0].set.total} ${result[0].rarity} ${result[0].set.name} Set Pokemon TCG`)

                                this.$emit('incrementKey')
                            }


                        } else {
                            console.log("No card found")
                        }
                    })

            } else {
                this.cardStore.selectCard(`${this.cardStore.cardName} Pokemon TCG`)
            }

        }

        this.$emit('incrementKey')
    }
}
</script>

<style>
.filename {
    font-size: 18pt;
}
#copy-filename, .filename {
    margin-top: 1rem;
}
</style>