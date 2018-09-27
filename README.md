# 뉴아라
## 개발
```bash
# 의존성 설치
npm install

# localhost:8080 개발 모드로 서비스
npm run serve

# Jest로 테스트
npm run test:unit
```

### 컨벤션
#### 컴퍼넌트 분류
`vue-router`에 등록된 컴퍼넌트, 즉 url을 가지는 컴퍼넌트는 `/views` 아래에 있습니다. 그 외의 url을 가지지 않는 컴퍼넌트는 `/components` 아래에 있습니다.
```
views/
|- Archive.vue
|- Board.vue
components/
|- TheAd.vue
|- TheApiErrorNotification.vue
```

#### 컴퍼넌트 이름
컴퍼넌트 이름은 **CamelCase**입니다.
```
components/
|- NavbarNotificationItem.vue
```
한 페이지에 오직 하나의 인스턴스만 존재할 수 있는 컴퍼넌트의 이름은 **The**로 시작합니다.
```
components/
|- TheNavbar
|- TheFooter
|- TheLayout
```
특정 부모 컴퍼넌트와 강하게 연관이 있는 자식 컴퍼넌트의 이름은 부모 컴퍼넌트의 이름으로 시작합니다. 따라서 컴퍼넌트를 사전순으로 정렬하면 보기 좋습니다.
```
components/
|- TheNavbar.vue
|- TheNavbarAraLogo.vue
|- TheNavbarArchives.vue
|- TheNavbarNotifications.vue
```
템플릿에서 컴퍼넌트의 이름은 **CamelCase**입니다.
```vue
<template>
    <div>
        <ThePostDetail/>
    </div>
</template>
```

#### 컴퍼넌트 최상위 엘리먼트 순서
```vue
<template>
    <div>
    </div>
</template>

<script>
export default {

}
</script>

<!-- Use yaml to translate -->
<i18n>
ko:
    message: '안녕 세상!'
en:
    message: 'Hello, world!'
</i18n>

<!-- scoped scss style is preferred -->
<style lang="scss" scoped>
.component.has-property {
    /* Some property */
}
</style>
```
Sfc에서 최상위 엘리먼트의 순서는 항상 `template`, `script`, `i18n`, `style`입니다.

#### 어트리뷰트
`v-bind:`와 `v-on:`은 언제나 축약형인 `:`, `@`를 씁니다.
```vue
<div
    :foo="bar"
    @baz="qux"
>
```

#### 이벤트 이름
이벤트 이름은 **kebab-case**입니다. [참고](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names)
```vue
<!-- child.vue -->
<div
    @click="$emit('save-post')"
>
```

```vue
<!-- parent -->
<child
    @save-post="savePost"
>
```

#### i18n 키 이름
번역어의 키 이름은 **kebab-case**입니다.
```vue
<template>
    <div>
        {{ $t('want-pulbitmaru') }}
    </div>
</template>
<i18n>
ko:
    want-pulbitmaru: '풀빛마루 덮밥이 먹고싶다'
en:
    want-pulbitmaru: 'I want some pulbitmaru'
</i18n>
```

### 관련 문서
[라우팅](src/router/README.md)

## 배포
```bash
# 의존성 설치
npm install

# 배포용 빌드
npm run build
```
