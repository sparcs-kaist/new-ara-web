<template>
  <tr>
    <td class="w-35"></td>
    <td class="w-102">{{ heading }}</td>
    <td class="w-313">
      <router-link v-if="!post || item.id !== post.id" :to="{ name: 'PostDetail', params: { board: board.en_name, post_id: item.id }, query: $route.query }">
        {{ item.title }}
      </router-link>
    </td>
    <td class="w-102">{{ item.created_by }}</td>
    <td class="w-50">{{ item.positive_vote_count }}/{{ item.negative_vote_count }}</td>
    <td class="w-50">{{ item.hit_count }}</td>
    <td class="w-102">{{ readable_timeago }}</td>
  </tr>
</template>

<script>
import timeago from 'timeago.js';
import ko from 'timeago.js/locales/ko';

timeago.register('ko', ko);

export default {
  props: ['board', 'item', 'post'],
  computed: {
    heading() {
      if (this.board === 'all') return this.item.parent_board.en_name;
      if (this.item.parent_topic !== null) return this.item.parent_topic.en_name;
      return '';
    },
    readable_timeago() {
      const timestamp = Date.parse(this.item.created_at);
      return timeago().format(timestamp, 'ko');
    },
  },
};
</script>

<style scoped>
.vote-up {
  font-weight: bold;
}
.vote-down {
  font-weight: bold;
  color: darkcyan;
}
</style>
