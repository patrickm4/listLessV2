<template>
    <div v-if="cardStore.multiCardResults.length > 0">
        <div v-for="r in cardStore.multiCardResults"></div>
    </div>
    <template v-else>
        <div class="filename">{{ cardStore.cardName }}</div>
        <button id="copy-filename" @click="copyName()">Copy Name</button>
    </template>
    <div 
        v-if="!cardStore.hasFoundCard"
        class="card-detail-append-bar"
    >
        <button 
            v-for="d in cardDetails"
            @click="changeName(d)"
        >{{ d }}</button>
        <button @click="removeDetail()">Delete Last Detail</button>
        <CardSetSelect />
    </div>
</template>

<script>
import { useCardStore } from '../stores/card.ts'
import CardSetSelect from '../components/cardSetSelect.vue'

export default {
    setup() {
        const cardStore = useCardStore()

        return { cardStore }
    },
    components: {
        CardSetSelect
    },
    data () {
        return {
            cardDetails: [
                'Holo',
                'Reverse Holo',
                'Uncommon',
                'Common',
                'Rare'
            ]
        }
    },
    computed: {
        isPoke () {
            return this.cardStore.cardName.toLowerCase().split('').includes('/')
        },
        isYugi () {
            return !this.isPoke
        },
    },
    methods: {
        async copyName() {
            try {
                await navigator.clipboard.writeText(this.cardStore.cardName);
                console.log("copied name")
            } catch($e) {
                alert('Cannot copy');
            }
        },
        // hasDetail (detail) {
        //     return this.cardStore.cardName.split(' ').includes(detail)
        // },
        changeName (detail) {
            //append to existing name
            const name = `${this.cardStore.cardName} ${detail}`

            this.cardStore.selectCard(name)
        },
        removeDetail () {
            const nameCopy = this.cardStore.cardName.slice()
            const name = nameCopy.split(' ')
            name.pop()

            this.cardStore.selectCard(name.join(' '))

        }
    }
}
</script>

<style>
.filename {
    font-size: 18pt;
}
#copy-filename, .filename, .card-detail-append-bar {
    margin-top: 1rem;
}
</style>