<template>
    <div v-if="cardStore.multiCardResults.length > 0">
        <div v-for="r in cardStore.multiCardResults"></div>
    </div>
    <template v-else>
        <div class="filename">{{ cardStore.cardName }}</div>
        <button id="copy-filename" @click="copyName()">Copy</button>
    </template>
</template>

<script>
import { useCardStore } from '../stores/card.ts'

export default {
    setup() {
        const cardStore = useCardStore()

        return { cardStore }
    },
    data () {
        return {
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
                console.log("copied name")
            } catch($e) {
                alert('Cannot copy');
            }
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