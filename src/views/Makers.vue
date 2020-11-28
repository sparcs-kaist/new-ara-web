<template>
  <TheLayout>
    <p class="header side">Project</p>
    <div class="the-makers makers-1 mb">
      <MakersCard v-for="(i, idx) in projects" :key="i.name" :title="(i.remark !== 'WIP' ? '🚀 ' : '') + i.name"
                  :subtitle="i.period" cardType="1" @click.native="projectClicked(idx)"
                  :active="selected === idx ? 'T' : ''"/>
    </div>

    <div class="desc-wrapper mb" v-if="projects[selected].desc">
      <p class="header side">Description</p>
      <div class="desc side">
        <p>
          {{projects[selected].desc}}
        </p>
      </div>
    </div>

    <p class="header side">Member</p>
    <div class="the-makers makers-2">
      <MakersCard v-for="i in projects[selected].members" :key="i" :title="getTitle(i)" :subtitle="getSubtitle(i)"
                  cardType="2" :position="getPos(i)"/>
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
      projects: [
        {
          name: 'SPARCS BBS',
          period: '1991~1998',
          remark: 'Eagle BBS 기반 아라',
          desc: '1991년에 창립된 SPARCS가 가장 먼저 선보였던 아라입니다. ' +
              'Eagle BBS (Pirite BBS) 기반으로 개발된 아라로, 우리나라에서 두번째로 생긴 Internet에 연결된 BBS (Bulletin Board System) 서비스입니다. 이때부터 아라는 계속해서 리뉴얼되어 왔으며, 현존하는 BBS 서비스 중에서는 가장 오래되었습니다.',
          members: ['SO:cdpark:박종대']
        },
        {
          name: 'NeoAra',
          period: '1998~2006',
          remark: 'NNTP 기반 아라',
          desc: 'NeoAra는 NewsGroup을 연동하고자 한 NNTP 기반의 아라입니다. ' +
              'KAIST 구성원만을 위한 NewsGroup 뿐만 아니라 KAIST 주변의 한국 내 인터넷 사용자 모두를 위한 NewsGroup 으로서의 역할도 하려고 하였습니다',
          members: ['SO:kaien:박상진', 'SO:godslord:권용철', 'SO:algepher:변창환', 'SO:neosado:김영준', 'SO:tapung:채주병']
        },
        {
          name: 'NeoAra & WebAra',
          period: '2006~2008',
          remark: '',
          desc: 'NeoAra & WebAra는 웹과의 연동이 시작된 아라입니다. 덕분에 Telnet, NNTP 뿐만 아니라 Web 으로도 아라를 이용이 가능해졌습니다. 또한 파일 첨부기능이 추가되어 학우들이 더 다양한 방식으로 아라를 이용할 수 있었습니다.',
          members: ['SO:airlover:김유승', 'SO:pcpenpal:박용수', 'SO:softdie:김동주']
        },
        {
          name: 'Arara 1세대',
          period: '2008~2010',
          remark: '',
          desc: 'Arara 1세대는 유지보수가 어려워진 NeoAra & WebAra를 대체하기 위해 출범하였으며, 이종 언어가 자유로이 쓰이는 확장가능 구조로 개발되었습니다. ' +
              'Python을 기반으로 백엔드에서는 SQLAlchemy, 미들웨어로는 Thrift RPC, 프론트엔드에서는 Django Template Engine 을 사용하였습니다.',
          members: ['serialx:홍성진', 'pipocket:서우석', 'ssaljalu:조준희', 'breadfish:구성모', 'jcob:조지혁', 'peremen:박신조', 'combacsa:변규홍']
        },
        {
          name: 'Arara 2세대',
          period: '2010~2011',
          remark: 'XpressEngine 기반 아라',
          desc: 'Arara 2세대는 2010년부터 2020년 10월까지 학우들이 가장 오랫동안 이용한 아라입니다. 2011년 리뉴얼된 당시 동시접속자수 200명, 하루 평균 접속자수가 7000명으로 KAIST 학내 공식 커뮤니티로서 아라의 위상을 확인할 수 있었습니다.' +
              '기존 ARAra 엔진 디자인을 새롭게 하고, 동시에 XpressEngine 기반 아라를 개발하려는 노력이 있었습니다. 또한 RSS 등 사용자들이 필요로 한 기능이 구현되었습니다.',
          members: ['PM:combacsa:변규홍', 'mikkang:김문범', 'reniowood:김진혁', 'harry:이대근', 'jeanclaire:이현진', 'ssaljalu:조준희', 'anna418:조유정', 'richking:김창하', 'xhark:김재홍', 'leopine:이가영', 'snogar:차동훈', 'imai:배성경', 'r4t5y6:임규리', 'kuss:안재만', 'hodduc:이준성', 'leeopop:이근홍']
        },
        {
          name: '모바일 아라',
          period: '2011~2012',
          remark: '',
          desc: '모바일 아라는 아라를 모바일로 이용하는 수요가 늘면서, 그에 맞게 디자인을 개선시키고 Arara의 엔진 성능을 개선하고자한 프로젝트입니다.',
          members: ['PM:hodduc:이준성', 'richking:김창하', 'combasa:변규홍', 'grandmarnier:차준호', 'bbashong:최낙현', 'panda:조민지', 'elaborate:안병욱', 'penguin:민서영', 'pocari:이경태', 'zzongaly:정진근']
        },
        {
          name: '아라리',
          period: '2012~2013',
          remark: 'WIP',
          members: ['PM:zzongaly:정진근', 'bbashong:최낙현', 'undead:이창원', 'boolgom:심규민', 'rodumani:정창제', 'panda:조민지', 'naldo:박지혁', 'yasik:박중언', 'apple:김영석', 'veritas:정진훈', 'jjus:김지현', 'alice:문슬기', 'penguin:민서영']
        },
        {
          name: '아라2',
          period: '2013~2014',
          remark: 'WIP',
          members: ['PM:serialx:홍성진', 'hodduc:이준성', 'raon:김강인', 'bbashong:최낙현', 'richking:김창하']
        },
        {
          name: '아라플러스',
          period: '2015~2016',
          remark: 'WIP',
          desc: "아라플러스는 KAIST 학생 사회에서 ARA를 다시 활성화하기 위해, 커뮤니티 활동을 즐길 수 있는 풍부한 기능들을 새로운 UI와 함께 제공하고자 했던 프로젝트입니다. 사용자들이 특정 주제에 대해 채팅을 나눌 수 있는 '불판', 동아리나 자치단체, 소모임을 위한 '그룹게시판', 익명 글작성, 포인트 제도 등 재미있는 기능들이 기획되고 개발되었습니다.",
          members: ['PM:story:김동화', 'PM:kyeome:김태겸', 'kanon:김민수', 'apple:김영석', 'zealot:한승현', 'undead:이창원', 'mandu:황태현', 'samjo:조성원', 'suckzoo:홍석주', 'luan:이상국', 'george:조형준', 'jara:이문영']},
        {
          name: '뉴아라',
          period: '2017~2020',
          remark: '',
          desc: "2020년 11월 출범한 뉴아라는 '가장 정확한 정보를 가장 신속하게'라는 슬로건으로 10년간 이용되던 Arara 를 새롭게 리뉴얼한 프로젝트입니다. " +
              '뉴아라에서는 카이스트 포탈공지를 아라에서도 제공하기 시작했고, 기존 ARA의 게시물과 댓글을 모두 이전시켰음에도 빠른 속도를 유지했으며, elasticsearch를 도입해 발전된 검색기능을 선보였습니다. 또한 아라의 아이덴티티가 잘 드러나도록 홈페이지 디자인을 개선하였습니다.',
          members: ['PM:victory:김주연', 'PM:leo:정진우', 'PM:yujingaya:김유진', 'PM:swan:지수환', 'PM:raon:김강인', 'nenw:김요한', 'fi:김도현', 'ivy:이융희', 'jessie:윤지수', 'james:문재호', 'jungnoh:노정훈', 'triangle:주예준', 'hanski:한석휘', 'doolly:김제윤', 'idev:이재현', 'busan:안재웅', 'kidevelop:함종현', 'holymolly:김태원', 'gunwoo:김건우', 'DS:stitch:이채영', 'DS:zero:임현정', 'DS:luny:김나영', 'todo:김동관', 'his:황인승', 'rongrong:이승민', 'leesia:강현우', 'seol:설윤아', 'youns:최윤서', 'appleseed:강찬규']
        }
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
  },
  beforeCreate: function () {
    document.body.style.background = '#fafafa'
  }
}

</script>

<style lang="scss" scoped>
  @import "@/theme.scss";

  .the-makers {
    display: grid;
    grid-gap: 10px;
    justify-content: center;
    margin-bottom: 10px;
  }

  .makers-1 {
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
    @include breakPoint(mobile) {
      grid-template-columns: repeat(auto-fit, minmax(110px, max-content));
    }
  }

  .makers-2 {
    grid-template-columns: repeat(auto-fit, minmax(280px, max-content));
    @include breakPoint(mobile) {
      grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
    }
  }

  .desc-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }

  .desc {
    border-radius: 10px;
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);
    background-color: white;
    padding: 22px 64px;
    margin-top: 30px;

    @include breakPoint(mobile) {
      padding: 22px 22px;
    }

    p {
      font-size: 15px;
      font-weight: 500;
      line-height: 1.47;
      text-align: left;

      @include breakPoint(mobile) {
        font-size: 12px;
      }
    }
  }

  .side {
    margin: 5px 90px;

    @include breakPoint(mid) {
      margin: 5px 0;
    }
    @include breakPoint(min) {
      margin: 5px 50px;
    }
    @include breakPoint(mobile) {
      margin: 5px 20px;
    }
  }

  .header {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.45;
    margin-bottom: 18px;
  }

  .mb {
    margin-bottom: 48px;
  }

</style>
