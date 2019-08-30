import axios from 'axios'
import store from './store'
import router from './router'

const apiUrl = 'http://ssal.sparcs.org:32816'
const baseApiAddress = `${apiUrl}/api/`

const instance = axios.create({
  baseURL: baseApiAddress,
  headers: {
    /*
     * # 문제
     * header를 String으로 넘겨주면 axios 인스턴스를 만드는 시점에
     * 토큰 값이 고정된다. 그런데 토큰 값은 로그아웃으로 사라질 수도 있고,
     * refresh 되면서 바뀔 수도 있기 때문에 토큰값이 바뀔 때 헤더도
     * 달라져야한다.
     *
     * # 해결
     * `String` 대신 `toString() 메소드를 가지는 Object`를 넘겨줘서
     * 매 API 콜 시점마다 localStorage에서 토큰을 가져온다
     *
     * # 참고
     * [toString](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
     */
    Authorization: {
      toString () {
        return `JWT ${store.state.auth.jwt}`
      }
    }
  }
})

instance.interceptors
  .request.use(
    config => {
      // 써드파티 서버에 JWT을 보내는건 보안 문제가 될 수 있다.
      if (config.baseURL !== baseApiAddress) {
        console.info('뉴아라 Api 서버에 요청을 보내려면 상대 경로를 이용하세요.')
        console.warn('뉴아라 Api 서버가 아니므로 헤더에 인증 정보를 포함하지 않습니다.')
        config.headers.Authorization = ''
      }
      return config
    },
    err => err
  )

/*
 * JWT이 expire된 경우 로그아웃,
 * 다른 경우는 알아서 처리할 수 있게
 */
instance.interceptors
  .response.use(
    resp => resp,
    err => {
      const { exp } = store.getters.jwtPayload // jwt의 만기 시점 (초 단위)
      const now = Date.now() / 1000 // 현재 시점 (초 단위)

      if (exp < now) {
        // @TODO: 세션 만료였다는 메시지가 필요하려나? 백엔드 설정 변경을 확인하자.
        // 세션 만료가 없어지면 굳이 이 부분이 필요 없을테니.
        router.push('/logout')
      } else {
        store.dispatch('fetch/showError', '서버 통신 장애')
      }

      return Promise.reject(err)
    }
  )

export { apiUrl }
export default instance
