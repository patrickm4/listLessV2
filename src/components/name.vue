<template>
    <div class="filename">{{ name }}</div>
    <button id="copy-filename">Copy</button>
</template>

<script>

export default {
    props: [
        'name'
    ],
    computed: {
        isPoke () {
            return this.name.toLowerCase().split('').includes('/')
        },
        isYugi () {
            return !this.isPoke
        }
    },
    mounted () {
        //handle the name
        if (this.isPoke) {
            const nameSplit = this.name.split(' ')

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

                // ebaySearchQuery = `${name} ${num}/${total}`

            } else {
                regenName = `${listName} Pokemon TCG`
                // genEbaySite()
                filename.innerText = regenName
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