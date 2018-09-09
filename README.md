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
#### 컴퍼넌트
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

### 관련 문서
[라우팅](src/router/README.md)

## 배포
```bash
# 의존성 설치
npm install

# 배포용 빌드
npm run build
```
