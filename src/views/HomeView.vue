<template>
    <h2>ListLessV2</h2>
    <h3>Drag and drop card</h3>
    <button @click="clearDrop">Clear Drop</button>
    <input type="file" @change="drop" class="drop-input" ref="dropBox" />
    <div class="image-box">
    </div>
    <div class="filename"></div>
    <div>
      <button id="copy-filename">Copy</button>
      <button id="generate-btn">Force Generate</button>
      <input type="radio" id="pokemon" name="card-type" value="poke" checked>
      <label for="pokemon">Poke</label>
      <input type="radio" id="yugioh" name="card-type" value="yugi">
      <label for="yugioh">Yugi</label>
    </div>

    <br />

    <div id="research-link-box"></div>

    <br />
    <br />
    
    <Description 
      v-if="cardName"
      :cardname="cardName"
    />

    <div id="name-btns"></div>
</template>

<script>
import Description from '../components/description.vue'

export default {
  data () {
    return {
      cardName: ''
    }
  },
  components: {
    Description
  },
  methods: {
    drop (e) {
      this.cardName = ''
      setTimeout(() => {
        const filePath = e.target.value.split('\\')
        const file = filePath[filePath.length - 1]
        this.cardName = file
      },1)
    },
    clearDrop () {  
      this.$refs.dropBox.value = ''
    }
  }
}
</script>

<style>
.drop-input {
  width:100%; 
  height: 10rem;
  border: 5px dotted #fff;
}
::-webkit-file-upload-button {
   display: none;
}
</style>