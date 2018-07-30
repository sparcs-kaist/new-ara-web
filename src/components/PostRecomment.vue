<template>
  <div class="post-recomment">
    대댓글by{{ recomment.created_by }}: {{ recomment.content }}
    <button
      @click="vote(true)"
      class="button"
      :class="{ 'is-primary': liked, 'is-loading': isVoting }">
      추천
    </button>
    <button
      @click="vote(false)"
      class="button"
      :class="{ 'is-primary': disliked, 'is-loading': isVoting }">
      비추천
    </button>
  </div>
</template>

<script>
import { voteComment } from '@/api'

export default {
  name: 'post-recomment',
  props: {
    recomment: { required: true }
  },
  data () {
    return {
      isVoting: false
    }
  },
  computed: {
    liked () { return this.recomment.my_vote === true },
    disliked () { return this.recomment.my_vote === false }
  },
  methods: {
    async vote (ballot) {
      this.isVoting = true
      await voteComment(this.recomment.id,
        this.recomment.my_vote === ballot
          ? 'vote_cancel'
          : ballot ? 'vote_positive' : 'vote_negative'
      )
      this.$emit('vote')
      this.isVoting = false
    }
  }
}
</script>

<style>

</style>
