<template>
  <div class="post-recomment">
    <div class="recomment-metadata">
      <div class="recomment-author"> {{ author }} </div>
      <div class="recomment-time"> {{ date }} </div>
    </div>
    <div class="recomment-content"> {{ recomment.content }} </div>
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
import { date } from '@/helper.js'

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
    disliked () { return this.recomment.my_vote === false },
    author () { return this.recomment.created_by },
    date () { return date(this.recomment.created_at) }
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

<style lang="scss" scoped>
.post-recomment {
  margin: 1rem 0;
}

.recomment-metadata {
  .recomment-author {
    display: inline-block;
    font-weight: 700;
    padding-right: 0.75rem;
  }
  .recomment-time {
    display: inline-block;
    color: #888;
  }
}

.recomment-content {
  margin: 0.75rem 0;
}
</style>
