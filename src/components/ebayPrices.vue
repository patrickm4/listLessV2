<template>
    <div class="ebay-link-box">
        <a :href="link" target="_blank">Ebay Sold Prices</a>
    </div>
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
            const searchQ = this.cardStore.ebaySearchQuery
            return `https://www.ebay.ca/sch/i.html?_from=R40&_nkw=${encodeURIComponent(searchQ)}&_sacat=0&rt=nc&LH_Sold=1&LH_Complete=1`
        }
    }
}
</script>

<style>
.ebay-link-box {
    margin-top: 1rem;
}
</style>