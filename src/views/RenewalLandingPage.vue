<template>
    <div class="parent">
        <div class="Popup_Landing">
            <div class="internal">
                <div class="origin" v-if="!help_popup">
                <img src="@/assets/ServiceAra.svg"
                    class="Services-Ara">

                <h3 class="px20 bold">{{$t('title')}}</h3>
                <div class="renewal_inf">
                    <p>{{$t('from_oct')}}</p>
                    <p>{{$t('notice')}}<span class="red">{{$t('highlight')}}</span>{{$t('let_access')}}</p>
                </div>
                <div class="change">
                    <p class="through_renewal">{{$t('please')}}</p>
                    <div class="improve"><span class="check red">✓</span><span>{{$t('please_1')}}</span></div>
                    <div class="improve"><span class="check red">✓</span><span>{{$t('please_2')}}</span></div>
                    <div class="improve"><span class="check red">✓</span><span>{{$t('please_3')}}</span></div>
                </div>
                <div class="change2">
                    <p class="through_renewal">{{$t('aware')}}</p>
                    <div class="improve"><span class="check red">✓</span><span>{{$t('aware_1')}}</span></div>
                    <div class="improve"><span class="check red">✓</span><span>{{$t('aware_2')}}</span></div>
                </div>
                <div class="other">
                    <p>{{$t('more_info')}}</p>
                    <p>{{$t('start_with')}}</p>
                </div>
                <div class="buttons">
                    <router-link :to="{name: 'board',params: {boardSlug: 'ara-notice'}}" class="long_button">
                        <h4><span class="red">{{$t('new_ara')}}</span>{{ $t('new_ara_guide_name')}}</h4>
                        <p>{{ $t('new_ara_guide_exp')}} </p>
                        <img src='@/assets/arrow.svg'>
                    </router-link>
                    <router-link :to="{ name: 'home' }" class="BtnSh"> <p><span class="red">{{$t('new_ara')}}</span>{{$t('new_ara_link')}}</p><img src='@/assets/arrow.svg'></router-link>
                    <a class="BtnSh" href="https://ara.kaist.ac.kr"><p>{{ $t('old_ara_link')}}</p><img src='@/assets/arrow.svg'></a>
                </div>
            </div>
            <div class="Contact">
                <p>Contact</p>
                <p>ara@kaist.ac.kr</p>
            </div>
            </div>
        </div>
    </div>
</template>

<i18n>
ko:
    title: 'KAIST 공식 커뮤니티 ARA가 리뉴얼되었습니다.'
    from_oct: '10월 31일부로, 리뉴얼된 아라와 함께할 수 있습니다.'
    notice: 'KAIST 학내 모든 정보에 대하여, '
    highlight: '가장 정확한 정보를 가장 신속하게'
    let_access: ' 접근할 수 있도록 합니다.'
    please: '부탁사항'
    please_1: '기존 ARA 회원분들도 New-ARA에서 새로 가입을 진행해주셔야 합니다.'
    please_2: 'New-ARA에 대한 각종 피드백은 [여기](https://forms.gle/Gb3jJbdpjFRsThAY6) 로 보내주세요.'
    please_3: '교내 식당, 카페 등 입주업체 분들은 [여기](https://forms.gle/vFgZHfoQve2a5Di36)에서 회원등록을 부탁드릴게요.'
    aware: '유의사항'
    aware_1: '베타기간 동안에는 기존 ARA와 new ARA가 함께 운영되며, 새로운 글은 new ARA에만 남길 수 있습니다.'
    aware_2: '베타기간이 끝나면, 기존 ARA 사이트는 내릴 예정입니다.'
    more_info: '보다 자세한 내용은 아래 New ARA 이용가이드에서 확인하실 수 있습니다.'
    start_with: '지금 새로운 ARA와 함께하세요.'
    new_ara: 'New ARA'
    new_ara_guide_name: ' 이용 가이드 바로가기'
    new_ara_guide_exp: '변화된 아라에 대한 가이드를 제공합니다.'
    new_ara_link: ' 바로가기'
    old_ara_link: '기존 ARA 바로가기'
    back_button_label: '뒤로 가기'
en:
    title: 'The official KAIST community, ARA, has been renewed.'
    notice: 'For all the informations in KAIST, '
    from_oct: 'From Oct 31th, you can be with the Renewed ARA,'
    highlight: 'the fastest delivery of the most accurate information.'
    let_access: ' '
    please: 'Requests'
    please_1: 'The users of old ARA also have to sign up for New-ARA.'
    please_2: 'Please give us feedbacks for New-ARA here.(https://forms.gle/Gb3jJbdpjFRsThAY6)'
    please_3: 'Moving-in enterprise like restaurant, caffe should sign up here.(https://forms.gle/vFgZHfoQve2a5Di36)'
    aware: 'Note'
    aware_1: 'During Beta period, both old ARA and new ARA will be supported, however, new posts only can be uploaded on new ARA.'
    aware_2: 'After Beta test, we will shut down old ARA.'
    more_info: 'For more information, please check in below New ARA Guide.'
    start_with: 'Now, start with New ARA.'
    new_ara: 'New ARA'
    new_ara_guide_name: ' guide'
    new_ara_guide_exp: 'We introduce the changed ARA.'
    new_ara_link: ' Link'
    old_ara_link: 'Go to Old ARA.'
    back_button_label: 'Back'
</i18n>

<script>
export default {
  name: 'RenewalLandingPage',
  data () {
    return {
      msg: 'Message',
      help_popup: false
    }
  },
  components: {
      
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/theme.scss";
.parent{
    width:100%;
    @media all and (min-width:790px) and (min-height:740px){
        position:fixed;
        height:100vh;
        background-color:rgba(0, 0, 0, 0.18);
    }
}
.Popup_Landing{
    @media all and (min-width:790px) and (min-height:740px){
        position:absolute;
        top:50%; left:50%;
        transform: translate(-50%,-50%);
        background-color: var(--grey-100);
        max-height:833px;
    }
    height:fit-content;
    max-width:822px;
    width:100%;
    height:100%;
    border-radius: 10px;
    align-content:center;
}
.internal{
    margin:56px 56px 56px 56px;
}
.Services-Ara{
    width: 92.1px;
    height: 50px;
}
.px20{
    font-size:20px;
}
.px13{
    font-size:13px;
}
.bold{
    font-weight:bold;
}
span,p{
    font-size:13px;
    font-weight:bold;
    line-height:1.92;
}

.red{
    color:#ed3a3a;
}
.check{
    margin-right:15.6px;
}

.renewal_inf, .change, .other{
    margin-top:48px;
}
.change2{
    margin-top:24px;
}
.through_renewal{
    margin-bottom:10px;
}
.improve{
    padding:0px 0px 0px 0px;
    margin-top:5px;
    margin-bottom:0px;
    font-weight:500;
}
.updated{
    margin-top:18px;
}
.Contact{
    @media all and (min-width:790px) and (min-height:740px){
        position:absolute;
    }
    position:static;
    bottom:18px;
    right:18px;
}
.Contact p{
    display:inline;
    color: #666666;
    font-weight:500;
    margin-left:12px;
}

.close {
  cursor:pointer;
}

.buttons{
    margin-top:40px;
    display:flex;
}

.long_button{
    cursor:pointer;
    position:relative;
    background-color:#ffffff;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
    display:inline-block;
    height:61px;
    min-width:240px;
    @media all and (min-width:790px){
        min-width:290px;
    }
}
.long_button img{
    position:absolute;
    bottom:20px;
    right:18px;
}
.long_button h4{
    margin-left:18px;
    margin-right:18px;
    margin-bottom:6px;
    margin-top:10px;
    font-size:12px;
    font-weight:bold;
    span{
        line-height:normal;
    }
}
.long_button p{
    margin-top:0px;
    margin-left:18px;
    font-size:9px;
    font-weight:500;
    margin-bottom:12px;
}

.BtnSh{
    margin-top:0px;
    position:relative;
    font-size:0px;
    width:100%;
    display:inline-block;
    height:61px;
    text-align:center;
    max-width:182px;
    background-color:#ffffff;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
    color:black;
    text-decoration:none;
    @media all and (max-width:790px){
        min-width:240px;
    }
}
.BtnSh p{
    padding-left:21px;
    margin-top:18px;
    margin-bottom:21px;
    text-align:left;
    font-weight:bold;
    font-size:12px;
    color:black;
}
.BtnSh img{
    display:inline-block;
    position:absolute;
    right:18px;
    bottom:19px;
}

.back_button{
    .angle{
        margin-right:12px;
    }
    padding:8px 8px 8px 8px;
    text-align:left;
    //background-color:var(--grey-100);
    //border-radius: 10px;
    font-size:16px;
    font-weight:bold;
    max-width:120px;
    cursor:pointer;
    //box-shadow: 0 3px 6px 0 rgba(169, 169, 169, 0.16);
}
</style>
