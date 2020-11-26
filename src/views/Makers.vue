<template>
    <TheLayout>
      <p class="header">Project</p>
      <div class="the-makers makers-1 mb" >
        <MakersCard v-for="(i, idx) in projects" :key="i.name" :title = "(i.remark !== 'WIP' ? '🚀 ' : '') + i.name" :subtitle="i.period" cardType="1" @click.native="projectClicked(idx)" :active="selected === idx ? 'T' : ''"/>
      </div>
      <p class="header">Member</p>

      <div class="the-makers makers-2">
        <MakersCard v-for="i in projects[selected].members" :key="i" :title = "getTitle(i)" :subtitle="getSubtitle(i)" cardType="2" :position="getPos(i)"/>
      </div>
    </TheLayout>
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
      return s.length > 2 ? this.abbr[s[0]] : this.abbr['DV']
    },
    getTitle (raw) {
      let s = raw.split(':')
      return s.length > 2 ? s[2] : s[1]
    },
    getSubtitle (raw) {
      let s = raw.split(':')
      return s.length > 2 ? s[1] : s[0]
    },
    projectClicked (idx) {
      this.selected = idx
    }
  },
  data: () => {
    return {
      // TODO: "PM:nickname:이름" or "nickname:이름" 형태로 수정 + 18번째 줄 :subtitle="getSubtitle(i)"
      projects: [
        {name: 'SPARCS BBS', period: '1991~1998', remark: 'Eagle BBS 기반 아라', members: ['SO:cdpark:박종대']},
        {name: 'NeoAra', period: '1998~2006', remark: 'NNTP 기반 아라', members: ['SO:kaien:박상진', 'SO:godslord:권용철', 'SO:algepher:변창환', 'SO:neosado:김영준', 'SO:tapung:채주병']},
        {name: 'NeoAra & WebAra', period: '2006~2008', remark: '', members: ['airlover:김유승', 'pcpenpal:박용수', 'softdie:김동주']},
        {name: 'Arara 1세대', period: '2008~', remark: '', members: ['serialx:홍성진', 'pipocket:서우석', 'ssaljalu:조준희', 'breadfish:구성모', 'jcob:조지혁', 'peremen:박신조', 'combacsa:변규홍']},
        {name: 'Arara 2세대', period: '2010~2011', remark: 'XpressEngine 기반 아라', members: ['PM:combacsa:변규홍', 'mikkang:김문범', 'reniowood:김진혁', 'harry:이대근', 'jeanclaire:이현진', 'ssaljalu:조준희', 'anna418:조유정', 'richking:김창하', 'xhark:김재홍', 'leopine:이가영', 'snogar:차동훈', 'imai:배성경', 'r4t5y6:임규리', 'kuss:안재만', 'hodduc:이준성', 'leeopop:이근홍']},
        {name: '모바일 아라', period: '2011~2012', remark: '', members: ['PM:hodduc:이준성', 'richking:김창하', 'combasa:변규홍', 'grandmarnier:차준호', 'bbashong:최낙현', 'panda:조민지', 'elaborate:안병욱', 'penguin:민서영', 'pocari:이경태', 'zzongaly:정진근']},
        {name: '아라리', period: '2012~2013', remark: 'WIP', members: ['PM:zzongaly:정진근', 'bbashong:최낙현', 'undead:이창원', 'boolgom:심규민', 'rodumani:정창제', 'panda:조민지', 'naldo:박지혁', 'yasik:박중언', 'apple:김영석', 'veritas:정진훈', 'jjus:김지현', 'alice:문슬기', 'penguin:민서영']},
        {name: '아라2', period: '2013~', remark: 'WIP', members: ['PM:serialx:홍성진', 'hodduc:이준성', 'raon:김강인', 'bbashong:최낙현', 'richking:김창하']},
        {name: '아라플러스', period: '2015~2016', remark: 'WIP', members: ['PM:story:김동화', 'PM:kyeome:김태겸', 'kanon:김민수', 'apple:김영석', 'zealot:한승현', 'undead:이창원', 'mandu:황태현', 'samjo:조성원', 'suckzoo:홍석주', 'luan:이상국', 'george:조형준', 'jara:이문영']},
        {name: '뉴아라',
          period: '2020.11~',
          remark: '',
          members: ['PM:victory:김주연', 'PM:leo:정진우', 'PM:yujingaya:김유진', 'PM:swan:지수환', 'PM:raon:김강인', 'nenw:김요한', 'fi:김도현', 'ivy:이융희', 'jessie:윤지수', 'james:문재호', 'jungnoh:노정훈', 'triangle:주예준', 'hanski:한석휘', 'doolly:김제윤', 'idev:이재현', 'busan:안재웅', 'kidevelop:함종현', 'holymolly:김태원', 'gunwoo:김건우', 'DS:stitch:이채영', 'DS:zero:임현정', 'DS:luny:김나영', 'todo:김동관', 'his:황인승', 'rongrong:이승민', 'leesia:강현우', 'seol:설윤아', 'youns:최윤서', 'appleseed:강찬규'
          ]}
      ],
      selected: 9,
      abbr: {
        'SO': 'SysOp',
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
@import "@/theme.scss";

  .the-makers {
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    padding: 20px 0;
    margin-bottom: 10px;
  }
  .makers-1{
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
    @include breakPoint (mobile) {
      grid-template-columns: repeat(auto-fit, minmax(110px, max-content));
    }
  }
  .makers-2{
    grid-template-columns: repeat(auto-fit, minmax(280px, max-content));
    @include breakPoint (mobile) {
      grid-template-columns: repeat(auto-fit, minmax(140px, max-content));
    }
  }
  .header{
    font-size: 20px;
    font-weight: bold;
    line-height: 1.45;
    margin-left: 48px;
  }
  .mb{
    margin-bottom: 56px;
  }

</style>
