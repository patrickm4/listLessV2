<template>
    <a :href="link" target="_blank">Ebay Sold Prices</a>
</template>

<script>
import { useCardStore } from '../stores/card.ts'

export default {
    setup() {
        const cardStore = useCardStore()

        return { cardStore }
    },
    computed: {
        link () {
            // TODO only have the name and serial numbers
            const searchQ = this.cardStore.cardName
            return `https://www.ebay.ca/sch/i.html?_from=R40&_nkw=${encodeURIComponent(searchQ)}&_sacat=0&rt=nc&LH_Sold=1&LH_Complete=1`
        }
    }
}
</script>