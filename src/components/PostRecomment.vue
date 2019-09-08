<template>
  <div class="post-recomment">
    <div class="recomment-metadata">
      <img :src="authorProfilePictureUrl" class="recomment-author-profile-picture"/>
      <div class="recomment-author"> {{ author }} </div>
      <div class="recomment-time"> {{ date }} </div>
    </div>
    <div class="recomment-content">{{ recomment.content }}</div>
    <a class="button button-default" @click="vote(true)"
      :class="{ 'button-selected': liked, 'is-loading': isVoting }">
      <span class="icon">
        <i class="material-icons">thumb_up</i>
      </span>
      <span>
        {{ likedCount }}
      </span>
    </a>
    <a class="button button-default" @click="vote(false)"
      :class="{ 'button-selected': disliked, 'is-loading': isVoting }">
      <span class="icon">
        <i class="material-icons">thumb_down</i>
      </span>
      <span>
        {{ dislikedCount }}
      </span>
    </a>
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
    likedCount () { return this.recomment.positive_vote_count },
    dislikedCount () { return this.recomment.negative_vote_count },
    author () { return this.recomment.created_by.profile.nickname },
    authorProfilePictureUrl() { return this.recomment.created_by.profile.picture },
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
.material-icons {
  font-size: 15px;
}

.post-recomment {
  margin: 1rem 0;
  padding-left: 15px;
  border-left: 2px solid rgba(0,0,0,0.1);
}

.recomment-metadata {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  .recomment-author-profile-picture {
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 10px;
  }


  .recomment-author {
    display: inline-block;
    font-weight: 700;
    padding-right: 0.75rem;
  }
  .recomment-time {
    font-size: 12px;
    display: inline-block;
    color: #888;
  }
}

.recomment-content {
  margin: 0.75rem 0;
  white-space: pre-line;
  word-break: break-all;
}

.button-default {
  color: #888888;
  border: none;
  font-size: 14px;
  margin-right: 5px;
  text-decoration: none;
}
.button-selected {
  color: #ED3A3A;
}
</style>
