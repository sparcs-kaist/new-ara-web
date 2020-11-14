<template>
  <div class="the-organizations">
    <OrganizationCard
      v-for="organization in organizations"
      :key="organization.id"
      v-bind="organization"
    />
    <div v-for="i in 7" :key="i" class="organization-dummy" />
  </div>
</template>

<style lang="scss" scoped>
.the-organizations {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.organization-dummy {
  width: 120px;
  height: 0 !important;
  margin: 0 0.5%;
}
</style>

<script>
import OrganizationCard from '@/components/OrganizationCard.vue'

export default {
  name: 'the-organizations',
  components: { OrganizationCard },
  data: () => {
    return {
      organizations: [
        { name: '포탈공지', id: 'KAIST', backgroundColor: '#dbdbdb' },
        { name: '전체 게시물', id: 'all', icon: 'dashboard', backgroundColor: '#f9c7c7' },
        { name: '동아리연합회', id: 'UA', slug: 'clubs-union' },
        { name: '생활관 자치회', id: 'GSDC', slug: 'dorm-council' },
        { name: '학생복지위원회', id: 'SWF', slug: 'welfare-cmte' },
        { name: '총학생회', id: 'SA', slug: 'undergrad-assoc' },
        { name: '대학원총학생회', id: 'GSA', slug: 'grad-assoc' },
        { name: '새내기학생회', id: 'NSA', slug: 'freshman-council' },
        { name: '협동조합', id: 'KCOOP', slug: 'kcoop' }
      ]
    }
  }
}
</script>
