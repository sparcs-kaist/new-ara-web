<template>
  <div >
    <TheLayout class="home">
      <p class="header">Project</p>
      <div class="the-makers mb" >
        <MakersCard v-for="(i, idx) in projects" :key="i.name" :title = "i.name" :subtitle="i.period" cardType="1" @click.native="projectClicked(idx)" :active="selected === idx ? 'T' : ''"/>
      </div>
      <p class="header">Member</p>

      <div v-if="projects[selected].bundled" v-for="(j, idx) in projects[selected].members" v-bind:key="idx">
        <p class="header-small">{{projects[selected].bundled[idx]}}</p>
        <div class="the-makers">
          <MakersCard v-for="i in j" :key="i" :title = "getTitle(i)" :subtitle="abbr['S']" cardType="2" :position="getPos(i)"/>
        </div>
      </div>

      <div class="the-makers" v-if="!projects[selected].bundled">
        <MakersCard v-for="i in projects[selected].members" :key="i" :title = "getTitle(i)" :subtitle="abbr['S']" cardType="2" :position="getPos(i)"/>
      </div>
    </TheLayout>
  </div>

</template>

<script>
import TheLayout from '@/components/TheLayout.vue'
import MakersCard from '../components/MakersCard'
export default {
  name: 'Makers',
  components: {
    MakersCard,
    TheLayout
  },
  methods: {
    getPos (raw) {
      let s = raw.split(':')
      return this.abbr.hasOwnProperty(s[0]) ? this.abbr[s[0]] : this.abbr['DV']
    },
    getTitle (raw) {
      let s = raw.split(':')
      return s[s.length - 1]
    },
    getSubtitle (raw) {
      let s = raw.split(':')
      return s[s.length - 2]
    },
    projectClicked (idx) {
      this.selected = idx
    }
  },
  data: () => {
    return {
      // TODO: "PM:nickname:이름" or "nickname:이름" 형태로 수정 + 18번째 줄 :subtitle="getSubtitle(i)"
      projects: [
        {name: 'SPARCS BBS', period: '1991~1998', remark: 'Eagle BBS 기반 아라', members: ['cdpark']},
        {name: 'NeoAra', period: '1998~2006', remark: 'NNTP 기반 아라', members: ['kaien', 'godslord', 'algepher', 'neosado', 'tapung']},
        {name: 'NeoAra & WebAra', period: '2006~2008', remark: '', members: ['airlover', 'pcpenpal', 'softdie']},
        {name: 'Arara 1세대', period: '2008~', remark: '', members: ['serialx', 'pipocket', 'ssaljalu', 'breadfish', 'jcob', 'peremen', 'combacsa']},
        {name: 'Arara 2세대', period: '2010~2011', remark: 'XpressEngine 기반 아라', members: ['PM:combacsa', 'mikkang', 'reniowood', 'harry', 'jeanclaire', 'ssaljalu', 'anna418', 'richking', 'xhark', 'leopine', 'snogar', 'imai', 'r4t5y6', 'kuss', 'hodduc', 'leeopop']},
        {name: '모바일 아라', period: '2011~2012', remark: '', members: ['PM:hodduc', 'richking', 'combasa', 'grandmarnier', 'bbashong', 'panda', 'elaborate', 'penguin', 'pocari', 'zzongaly']},
        {name: '아라리', period: '2012~2013', remark: 'WIP', members: ['PM:zzongaly', 'bbashong', 'undead', 'boolgom', 'rodumani', 'panda', 'naldo', 'yasik', 'apple', 'veritas', 'jjus', 'alice', 'penguin']},
        {name: '아라2', period: '2013~', remark: 'WIP', members: ['PM:serialx', 'hodduc', 'raon', 'bbashong', 'richking']},
        {name: '아라플러스', period: '2015~2016', remark: 'WIP', members: ['PM:story', 'PM:kyeome', 'kanon', 'apple', 'zealot', 'undead', 'mandu', 'samjo', 'suckzoo', 'luan', 'george', 'jara']},
        {name: '뉴아라',
          period: '2017~',
          bundled: ['2017', '2018', '2019', '2020'],
          remark: '',
          members: [['PM:raon', 'todo', 'his', 'rongrong', 'yujingaya', 'swan'], ['PM:swan', 'PM:yujingaya', 'raon', 'leesia', 'victory', 'seol', 'youns'], ['PM:leo', 'appleseed', 'nenw', 'raon'], ['PM:victory', 'nenw', 'fi', 'raon', 'ivy', 'jessie', 'james', 'jungnoh', 'triangle', 'hanski', 'doolly', 'idev', 'busan', 'kidevelop', 'holymolly', 'gunwoo',
            'DS:stitch', 'DS:zero', 'DS:luny']]}
      ],
      selected: 9,
      abbr: {
        'PM': 'Project Manager ⚜️',
        'DS': 'Designer',
        'DV': 'Developer',
        'F': 'Frontend',
        'B': 'Backend',
        'S': 'Sparcs'
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .grey{
    background-color: var(--grey-100);
  }
  .the-makers {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .header{
    font-size: 20px;
    font-weight: bold;
    line-height: 1.45;
    margin-left: 48px;
  }
  .header-small{
    margin-top: 12px;
    font-size: 17px;
    font-weight: bold;
    line-height: 1.45;
    margin-left: 48px;
  }
  .home{
    justify-content: center;
  }
  .mb{
    margin-bottom: 56px;
  }

</style>
