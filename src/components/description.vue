<template>
    <textarea rows="5" cols="50">
        {{ desc }}
    </textarea>
</template>

<script>

export default {
    props: [
        'cardname'
    ],
    data () {
        return {
        }
    },
    computed: {
        desc () {
            return `
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;600&display=swap" rel="stylesheet">


            <div style="display:flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.175); padding: 10px 15px;">
            <div style="font-size: 16pt; font-weight:600; font-family: 'Dosis', sans-serif; width: 80%; overflow-wrap: break-word;">${this.cardname || 'NO NAME'}</div>

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
    }
}
</script>