<template>
    <h2>ListLessV2</h2>
    <div class="drop-top-bar">
      <h3>Drag and drop card</h3>
      <button class="clear-drop-btn" @click="clearDrop">Clear Drop</button>
    </div>
    <input type="file" @change="drop" class="drop-input" ref="dropBox" />
    <div class="image-box">
    </div>
    <Name 
      v-if="cardName"  
      :name="cardName"
    />

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
import Name from '../components/name.vue'

export default {
  data () {
    return {
      cardName: ''
    }
  },
  components: {
    Description,
    Name
  },
  methods: {
    drop (e) {
      this.cardName = ''
      setTimeout(() => {  
        const filePath = e.target.value.split('\\')
        // change the + sign in name to / because cant have / in filenames in windows
        const file = filePath[filePath.length - 1].replace(/\+/, "/")


        this.cardName = file.split('.')[0] // split the extension
      },1)
    },
    clearDrop () {  
      this.$refs.dropBox.value = ''
      this.cardName = ''
    }
  }
}
</script>

<style>
.drop-top-bar {
  display:flex;
  margin-bottom: 1rem;
}
.clear-drop-btn {
  margin-left: 1rem;
}
.drop-input {
  width:100%; 
  height: 10rem;
  border: 5px dotted #fff;
}
::-webkit-file-upload-button {
   display: none;
}
</style>