<template>
    <div class="desc-top-bar">
        <h3>Description HTML</h3>
        <button @click="copyURL" class="copy-btn">Copy Desc</button>
    </div>
    <textarea rows="7" cols="150" v-model="desc">
    </textarea>
    <div v-html="desc"></div>
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
            desc: `
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;600&display=swap" rel="stylesheet">


            <div style="display:flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.175); padding: 10px 15px;">
            <div style="font-size: 16pt; font-weight:600; font-family: 'Dosis', sans-serif; width: 80%; overflow-wrap: break-word;">${this.cardStore.cardName}</div>

            <div style="margin-left: 2rem;">
            <ul>
            <li style="font-size: 12pt; margin-bottom: 1em; font-weight:300; font-family: 'Dosis', sans-serif;">One Card.</li>

            <li style="font-size: 12pt; margin-bottom: 1em; font-weight:300; font-family: 'Dosis', sans-serif;">Ships inside penny sleeve and top loader.</li>

            <li style="font-size: 12pt; margin-bottom: 1em; font-weight:300; font-family: 'Dosis', sans-serif;">Orders are usually shipped in a plain white envelope. Depending on the value and/or quantity of cards, orders will be shipped either in a bubble mailer or box.</li>

            <li style="font-size: 12pt; font-weight:300; font-family: 'Dosis', sans-serif;">Card shipped out from BC, Canada</li>
            </ul>
            </div>
            </div>
            `
        }
    },
    methods: {
        async copyURL() {
            try {
                await navigator.clipboard.writeText(this.desc);
                console.log("copied description")
            } catch($e) {
                alert('Cannot copy');
            }
        }
    }
}
</script>

<style>
.desc-top-bar {
    display:flex;
    margin-bottom: 1rem;
    margin-top: 1rem;
}
.copy-btn {
    margin-left: 1rem;
}
textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    width: 100%;
}
</style>