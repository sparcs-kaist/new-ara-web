<template>
  <div class="the-organizations">
    <OrganizationCard
      v-for="organization in organizations"
      :key="organization.name"
      :name="organization.name"
      :id="organization.id"
      :backgroundColor="organization.backgroundColor || undefined"
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
  width: 140px;
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
        { name: '전체 게시물', id: null, backgroundColor: '#f9c7c7' },
        { name: '동아리연합회', id: 'UA' },
        { name: '생활관 자치회', id: null },
        { name: '학생복지위원회', id: 'SWF' },
        { name: '총학생회', id: 'SA' },
        { name: '새내기학생회', id: 'NSA' },
        { name: '협동조합', id: 'KCOOP' }
      ]
    }
  }
}
</script>
