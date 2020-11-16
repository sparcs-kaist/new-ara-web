<template>
  <div class="modal" :class="{ 'is-active': termsPopup }">
    <div class="modal-background"/>
    <div class="modal-content">
      <a v-if="agreeTosAt" class="close delete is-medium" role="button" @click="exitTermsPopup"/>

      <div class="popup">
        <div class="title">
          <img src="@/assets/ServiceAra.svg" class="Services-Ara"/>
          <h1>{{ $t("title") }}</h1>
          <a class="toggle-language"
             @click="changeLocale"
             id="toggle-language">

            <span class="icon">
              <i class="material-icons">language</i>
            </span>
          </a>
        </div>

        <div class="container scrollbar">
          <div class="tos-section">
            {{ $t('tos-header') }}
          </div>

          <div class="tos-section" v-for="(section, index) in sections" :key="index">
            <h2 class="tos-title">{{ section.title }}</h2>
            <p class="tos-content" v-html = "section.contents"/>
          </div>

          <div class="tos-section">
            {{ $t('tos-footer') }}
          </div>
        </div>

        <div class="button-container">
          <button class="button" v-if="!agreeTosAt" @click="askAgain">
            {{ $t('disagree') }}
          </button>
          <button class="button right-button" v-if="!agreeTosAt" @click="agree">
            {{ $t('agree') }}
          </button>
          <p v-if="agreeTosAt">{{ $t("already-agreed") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsPopup',
  props: {
    agreeTosAt: {},
    show: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      termsPopup: this.show !== false
    }
  },

  computed: {
    sections () {
      return this.$i18n.messages[this.$i18n.locale]['tos-sections']
    }
  },

  methods: {
    async askAgain () {
      const response = await this.$store.dispatch('dialog/confirm', this.$t('exit-confirm'))
      if (response) {
        this.disagree()
      }
    },

    async agree () {
      await this.$store.dispatch('agreeTos')
      await this.$store.dispatch('dialog/alert', this.$t('agreed'))
      this.exitTermsPopup()
      this.$router.push('/')
    },

    disagree () {
      window.location = 'about:blank'
    },

    exitTermsPopup () {
      this.termsPopup = false
    },

    openTermsPopup () {
      this.termsPopup = true
    },

    changeLocale () {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'en' ? 'ko' : 'en'
    }
  }
}
</script>

<i18n>
ko:
  title: '이용 약관'
  agreed: '동의하셨습니다'
  already-agreed: '이미 동의하셨습니다.'
  exit-confirm: '약관에 동의하지 않으면 서비스를 이용하실 수 없습니다. 이대로 나가시겠습니까?'
  agree: '동의'
  disagree: '동의하지 않음'

  tos-header: 'new Ara (이하 아라) 이용약관은 현재 적용 중입니다.'
  tos-sections:
    - title: '제 1조. 아라의 목적'
      contents: |-
        1. 아라는 KAIST 구성원의 원활한 정보공유를 위해 KAIST 학부 동아리 SPARCS (이하 "SPARCS")에서 제공하는 공용 게시판 서비스 (Bulletin Board System) 입니다.
        2. 1조 1항에서의 KAIST 구성원이란 교수, 교직원, 그리고 재학생과 졸업생, 입주 업체 등을 나타냅니다.

    - title: '제 2조. 가입 및 탈퇴'
      contents: |-
        1. 아라는 KAIST 구성원만 이용 가능합니다.
        2. 아라는 SPARCS SSO를 통해 가입할 수 있습니다.
          - SPARCS SSO에서 카이스트 통합인증으로 가입시 별도 승인 없이 바로 서비스 이용이 가능합니다. (교수, 교직원, 재학생, 졸업생 등)
          - SPARCS SSO에서 카이스트 통합인증 외 다른 방법으로 가입시 아라 운영진이 승인해야만 서비스 이용이 가능합니다. (입주 업체 등)
        3. 아라는 회원탈퇴 기능이 없습니다. 다만, 아라 운영진에게 회원 탈퇴를 요청할 수 있습니다.
        4. 다음의 경우에는 회원자격이 박탈될 수 있습니다.
          - 카이스트 구성원이 아닌 것으로 밝혀졌을 경우
          - new Ara 이용약관에 명시된 회원의 의무를 지키지 않은 경우
          - 아라 이용 중 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 관계 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우

    - title: '제 3조. 회원의 의무'
      contents: |-
        1. 회원은 아라 이용과 관련하여 다음의 행위를 하여서는 안 됩니다.
          - SPARCS, 아라 운영진, 또는 특정 개인 및 단체를 사칭하는 행위
          - 아라를 이용하여 얻은 정보를 원작자나 아라 운영진의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송, 기타의 방법으로 사용하거나 이를 타인에게 제공하는 행위
          - 다른 회원의 계정을 부정 사용하는 행위
          - 타인의 명예를 훼손하거나 모욕하는 행위
          - 타인의 지적재산권 등의 권리를 침해하는 행위
          - 해킹행위 또는 컴퓨터바이러스의 유포 행위
          - 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위
          - 서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위
          - 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위
          - SPARCS의 동의 없이 아라를 영리목적으로 사용하는 행위
          - 기타 아라의 커뮤니티 강령에 반하거나 아라 서비스 운영상 부적절하다고 판단하는 행위
        2. 회원은 아라 이용시 모든 상황에서 다음의 커뮤니티 강령을 유의해야합니다.
          - 언제나 스스로의 말에 책임감을 가져주시기 바랍니다.
          - KAIST 인권윤리센터의 방침에 따라 증오와 차별 표현은 지양해주시고, 국가인권위원회법이 규정한 평등권 침해의 차별행위가 포함되지 않도록 부탁드립니다.
          - 국가인권위원회법이 금지하는 차별행위 19가지
          - 글에 욕설/비속어/은어를 자제해주시기 바랍니다.
          - 글에 상대방이 불쾌감을 느낄 수 있는 표현, 일체의 성적 대상화를 자제해주시기 바랍니다.

    - title: '제 4조. 게시물에 대한 권리'
      contents: |-
        1. 회원이 아라 내에 올린 게시물의 저작권은 게시한 회원에게 귀속됩니다.
        2. 서비스의 게시물 또는 내용물이 위의 약관에 위배될 경우 사전 통지나 동의 없이 삭제될 수 있습니다.
        3. 제 3조 회원의 의무에 따라, 아라를 이용하여 얻은 정보를 원작자나 아라 운영진의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송, 기타의 방법으로 사용하거나, 영리목적으로 활용하거나, 이를 타인에게 제공하는 행위는 금지됩니다.

    - title: '제 5조. 책임의 제한'
      contents: |-
        1. SPARCS는 다음의 사유로 서비스 제공을 중지하는 것에 대해 책임을 지지 않습니다.
          - 설비의 보수 등을 위해 부득이한 경우
          - KAIST가 전기통신서비스를 중지하는 경우
          - 천재지변, 정전 및 전시 상황인 경우
          - 기타 본 서비스를 제공할 수 없는 사유가 발생한 경우
        2. SPARCS는 다음의 사항에 대해 책임을 지지 않습니다.
          - 개재된 회원들의 글에 대한 신뢰도, 정확도
          - 아라를 매개로 회원 상호 간 및 회원과 제 3자 간에 발생한 분쟁
          - 기타 아라 사용 중 발생한 피해 및 분쟁
        3. 법적 수사 요청이 있는 경우, SPARCS는 수사기관에 회원 개인정보를 제공할 수 있습니다.

    - title: '제 6조. 문의 및 제보'
      contents: |-
        1. 아라에 대한 건의사항 또는 버그에 대한 사항은 구글폼을 통해 문의 및 제보할 수 있습니다. (<a style="color: #00b8d4;" target="_blank" href="https://forms.gle/qR6tQheLyzAoLPZeA">https://forms.gle/qR6tQheLyzAoLPZeA</a>)
        2. 6조 1항의 구글폼이 작동하지 않거나, 기타 사항의 경우 new-ara@sparcs.org 를 통해 문의 및 제보할 수 있습니다.

    - title: '제 7조. 게시, 개정 및 해석'
      contents: |-
        1. 아라 운영진은 본 약관에 대해 아라 회원가입시 회원의 동의를 받습니다.
        2. 아라 운영진은 약관의규제에관한법률, 정보통신망이용촉진및정보보호등에관한법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
        3. 본 약관을 개정하는 경우 적용일자, 개정 내용 및 사유를 명시하여 개정 약관의 적용일자 7일 전부터 적용일자 전일까지 아라의 '뉴아라 공지' 게시판을 통해 공지합니다.
        4. 회원은 개정약관이 공지된 지 7일 내에 개정약관에 대한 거부의 의사표시를 할 수 있습니다. 이 경우 회원은 아라 운영진에게 메일을 발송하여 즉시 사용 중인 모든 지원 서비스를 해지하고 본 서비스에서 회원 탈퇴할 수 있습니다.
        5. 아라 운영진은 개정약관이 공지된 지 7일 내에 거부의 의사표시를 하지 않은 회원에 대해 개정약관에 대해 동의한 것으로 간주합니다.
        6. 본 약관의 해석은 아라 운영진이 담당하며, 분쟁이 있을 경우 민법 등 관계 법률과 관례에 따릅니다.

  tos-footer: '본 약관은 2020-09-26부터 적용됩니다.'

en:
  title: 'Terms of service'
  agreed: "You've agreed to the Terms of Service"
  already-agreed: "You've already agreed."
  exit-confirm: 'If you do not agree to the terms of service, you will not be able to use the service. Would you like to leave?'
  agree: 'Agree'
  disagree: 'Disagree'
  tos-header: 'The terms and conditions of new Ara ("Ara") are currently in effect.'
  tos-sections:
    - title: "I. Ara's Purpose"
      contents: |-
        1. Ara is a public bulletin board system provided by KAIST undergraduate club SPARCS ("SPARCS") for the smooth sharing of information among KAIST members.
        2. In section I.1, KAIST members refer to professors, faculty, students, graduates, tenant companies, etc.

    - title: 'II. Register and Withdraw'
      contents: |-
        1. Ara is only available to KAIST members.
        2. Ara can be registered through SPARCS SSO.
          - When you sign up with KAIST IAM in SPARCS SSO, you can use the service immediately without any additional approval (professors, faculty, students, graduates, etc.).
          - When you sign up with other methods without KAIST IAM in SPARCS SSO, The service can only be used by the Ara management team (such as tenant companies).
        3. Ara does not have a withdrawal function. However, you can request Ara's management team to withdraw membership.
        4. Membership may be revoked in the following cases:
        - If found not to be a member of KAIST;
        - Failure to comply with the obligations of the members specified in the Ara's Terms of Service;
        - Where the Act on Promotion of Information and Communications Network Utilization and Information Protection, the related statute, prohibited acts by the Terms of Service or an act contrary to the public order during the use of Ara;

    - title: "III. Member's duty"
      contents: |-
        1. The member shall not perform any of the following acts in connection with the use of Ara:
          - Impersonating SPARCS, Ara management team, or a specific individual or organization.
          - Copying, duplicating, changing, translating, publishing, broadcasting, or providing information obtained using Ara to others without prior consent from the authorship or Ara management team.
          - Fraudulently using another member's account
          - Defaming or insulting others.
          - Infringing on the rights of others, such as intellectual property, etc.
          - Hacking or distributing computer viruses
          - Continuously transmitting certain contents, such as advertising information.
          - Any act that is likely to interfere with or hinder the safe operation of the service.
          - Any act aimed at or related to a criminal act.
          - The act of using Ara for profit without the consent of SPARCS.
          - Other acts against Ara's Community Code or deemed inappropriate in the operation of Ara services.
        2. When using Ara, members should pay attention to the following Community Code in all situations.
          - Always be responsible for what you say.
          - Please refrain from expressing hatred and discrimination in accordance with the policy of KAIST's Human Rights Ethics Center, and do not include discriminatory acts against the infringement of equal rights as stipulated by the National Human Rights Commission of Korea Act.
          - 19 Discrimination Actions Banned by the National Human Rights Commission of Korea Act
          - Please refrain from swearing / slang in your post.
          - Please refrain from sexually objectifying, and any expressions that may offend the other people.

    - title: 'IV. Right to Post'
      contents: |-
        1. The copyright of the posting posted within Ara belongs to the member who posted it.
        2. If the posts or contents of the service violate the terms of service above, they may be deleted without prior notice or consent.
        3. In accordance with the obligations of the members of III, copying, changing, translating, publishing, broadcasting, or providing information obtained using Ara to others is prohibited without prior consent from the original author or Ara management team.

    - title: 'V. Limitation of Liability'
      contents: |-
        1. SPARCS is not responsible for discontinuing the service due to the following reasons:
          - In case it is inevitable for repair of equipment, etc.
          - When KAIST stops telecommunication service
          - In case of natural disasters, power outages and wartime situations
          - Other reasons for not being able to provide this service arise.
        2. SPARCS is not responsible for the following matters:
          - Accuracy, and reliability of the members' posts.
          - Disputes arising between members and and third parties through Ara's medium
          - Other damages and disputes arising from the use of Ara
        3. SPARCS may provide member's personal information to the investigative agency in the event of a legal investigation request.

    - title: 'VI. Inquiries and reports'
      contents: |-
        1. Suggestions for Ara or bug can be inquired and reported through Google forms. (<a style="color: #00b8d4;" target="_blank" href="https://forms.gle/qR6tQheLyzAoLPZeA">https://forms.gle/qR6tQheLyzAoLPZeA</a>)
        2. If the Google Form does not work or if there is anything else to inquire, you can contact and inform us at new-ara@sparcs.org.

    - title: 'VII. Publish, revise, and interpret'
      contents: |-
        1. The Ara management team obtains the consent of the members when signing up for Ara membership in this Agreement.
        2. The Ara management team may amend this Agreement to the extent that it does not violate the relevant laws, such as the Act on the Regulation of Terms and Conditions and the Act on the Promotion of Information and Communication Network Utilization and Information Protection, etc.
        3. In the event of amending this Agreement, the date of application, details and reasons for the amendment shall be stated and notified through the 'New Ara Notice' bulletin board from 7 days before the date of application to the day before the date of application.
        4. The member may express his/her rejection of the revised terms within 7 days after the announcement of the revised terms of service. In this case, the member may immediately terminate all support services in use by sending an email to Ara management team and withdraw from this service.
        5. The Ara management team considers the members who have not expressed their rejection within 7 days of the announcement of the revised terms to have agreed to the amended terms of service.
        6. The interpretation of these terms and conditions is handled by the Ara management team, and if there is a dispute, it is in accordance with relevant laws and practices, such as civil law.

  tos-footer: 'These terms of service apply from 2020-09-26.'

</i18n>

<style lang="scss" scoped>
  @import "@/theme.scss";

  .modal-content {
    width: 1168px;
    margin: 0 20px;
    @media screen and (max-height: 750px){
      max-height: calc(100vh - 40px);
    }

  }

  .modal {
    z-index: 30;
  }

  .container {
    background-color: var(--grey-100);
    padding: 28px;
    width: auto;
    overflow-y: auto;
    max-height: calc(100vh - 494px);

    @media screen and (max-height: 750px){
      max-height: calc(100vh - 280px);
    }
  }

  .tos-section {
    margin-bottom: 20px;
  }

  .tos-title {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .tos-content {
    margin-left: 10px;
    white-space: pre-wrap;
  }

  .popup {
    font-size: 13px;
    color: var(--text);
    font-family: var(--font);
    padding: 56px 56px;
    @media screen and (max-width: 400px) {
      padding-left: 18px;
      padding-right: 18px;
    }

    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.64);
    word-break: keep-all;
    line-height: 1.92;
  }

  .button-container {
    height: auto;
    width: 100%;
    margin-top: 18px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .button {
      font-size: 15px;
      font-family: var(--font);
      font-weight: bold;
      padding: 0 20px;
    }

    .right-button {
      color: var(--theme-400);
      margin-left: 12px;
    }
  }

  .Services-Ara {
    width: 49.8px;
    height: 27px;
    object-fit: contain;
  }

  .title {
    display: flex;
    flex-direction: row;
    margin-bottom: 18px;

    h1 {
      word-break: keep-all;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      margin-left: 9.2px;

      line-height: 1.5;
      color: var(--theme-400);
    }

    .toggle-language{
      margin-left: auto;
      margin-right: 30px;
    }
  }

  .close {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  .scrollbar::-webkit-scrollbar {
    background-color:#fff;
    width:16px
  }

  /* background of the scrollbar except button or resizer */
  .scrollbar::-webkit-scrollbar-track {
    background-color:#fff
  }
  .scrollbar::-webkit-scrollbar-track:hover {
    background-color:#f4f4f4
  }

  /* scrollbar itself */
  .scrollbar::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:5px solid #fff
  }
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color:#a0a0a5;
    border:4px solid #f4f4f4
  }

  /* set button(top and bottom of the scrollbar) */
  .scrollbar::-webkit-scrollbar-button {display:none}
</style>
