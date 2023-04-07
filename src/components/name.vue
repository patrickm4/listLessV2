<template>
    <div class="filename">{{ cardStore.cardName }}</div>
    <button id="copy-filename">Copy</button>
</template>

<script>
import { useCardStore } from '../stores/card.ts'

export default {
    setup() {
        const cardStore = useCardStore()

        return { cardStore }
    },
    computed: {
        isPoke () {
            return this.cardStore.cardName.toLowerCase().split('').includes('/')
        },
        isYugi () {
            return !this.isPoke
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

                this.cardStore.selectCard(`${name} ${num}/${total}`)
            } else {
                this.cardStore.selectCard(`${this.cardStore.cardName} Pokemon TCG`)
            }

            this.$emit('incrementKey')
        }
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