<template>
    <div v-if="cardStore.multiCardResults.length > 0">
        <div v-for="r in cardStore.multiCardResults"></div>
    </div>
    <template v-else>
        <div class="filename">{{ cardStore.cardName }}</div>
        <button class="copy-filename" @click="copyName">Copy Name</button>
    </template>
    <div class="add-name-container">
        <div class="name-append-item">
            <Label>PSA</Label>
            <select 
                v-model.number="psaGrade"
                @change="changeName(`PSA ${psaGrade}`)"
            >
                <option v-for="grade in 10">{{ grade  }}</option>
            </select>
        </div>
        <div>
            <button 
                v-for="d in cardDetails"
                @click="changeName(d)"
                class="name-append-item"
            >{{ d }}</button>
            <button @click="removeDetail()">Delete Last Detail</button>
        </div>
    </div>
    <CardSetSelect @addSet="appendSet"/>
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
            psaGrade: 0,
            cardDetails: [
                'Holo',
                'Reverse Holo',
                'Uncommon',
                'Common',
                'Rare',
                'Pokemon TCG'
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
        async copyNameDescEbay() {
            try {
                await navigator.clipboard.writeText(this.cardStore.cardName);

                await navigator.clipboard.writeText(this.cardStore.description);

                window.open(this.cardStore.ebayLink, '_blank')

                console.log("copied name, desc and open ebay link")
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
        appendSet (setName) {
            const name = `${this.cardStore.cardName} ${setName} Set`

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
.copy-filename, .filename, .add-name-container {
    margin-top: 1rem;
}
.copy-filename {
    margin-left: 1rem;
}
.add-name-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}
.name-append-item {
    margin-right: 0.5rem;
}
.name-append-item > label {
    margin-right: 0.25rem;
}
</style>