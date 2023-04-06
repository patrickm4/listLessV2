<template>
    <h2>ListLessV2</h2>
    <h3>Drag and drop card</h3>
    <button @click="clearDrop">Clear Drop</button>
    <input type="file" @change="drop" class="drop-input" ref="dropBox" />
    <!-- <div class="drop-area" style="background-color: antiquewhite;border:2px dotted #fff; width: 100%; height: 20rem"></div> -->
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
    
    <Description />

    <div id="name-btns"></div>
</template>

<script>
import Description from '../components/description.vue'

export default {
  components: {
    Description
  },
  methods: {
    drop (e) {
      console.log("drop method ", e)
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