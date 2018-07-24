<template>
  <div>
    <h1> 포스트 작성 </h1>
    제목
    <input
      v-model="title"
      class="input"
      type="text"/>
    내용
    <VueEditor
      v-model="content"/>
    <button class="button is-primary"> 저장 </button>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'the-post-write',
  props: [ 'post' ],
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    if (this.post) {
      this.title = this.post.title
      this.content = this.post.content
    }
  },
  components: { VueEditor }
}
</script>

<style>

</style>
