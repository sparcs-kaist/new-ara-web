<template>
  <div>
    reports
    <router-link
      v-for="report in reports"
      :key="report.id"
      :to="{ name: 'post', params: { postId: report.parent_article.id } }">
      <div>
        - {{ report.parent_article.title }}
      </div>
    </router-link>
  </div>
</template>

<script>
import { fetchReports } from '@/api'

export default {
  name: 'the-setting-reports',
  data () {
    return {
      reports: [],
      current: 1
    }
  },
  async created () {
    const { results: reports, current } = await fetchReports()
    this.reports = reports
    this.current = current
  }
}
</script>

<style>

</style>
