<template>
    <h2>ListLessV2</h2>
    <h3>Drag and drop card</h3>
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

<script setup lang="ts">
import Description from '../components/description.vue'
</script>