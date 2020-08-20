import axios from 'axios'
import cookie from './utils/cookie'
import router from './router'

const apiUrl = (function () {
  if (process.env.NODE_ENV === 'production') {
    return 'https://newara.sparcs.org'
  } else if (process.env.NODE_ENV === 'development') {
    return 'https://newara.dev.sparcs.org'
  } else {
    throw Error('Unknown NODE_ENV')
  }
}())
const baseApiAddress = `${apiUrl}/api/`

const instance = axios.create({
  baseURL: baseApiAddress,
  withCredentials: true
})

instance.interceptors
  .request.use(
    config => {
      config.headers['X-CSRFToken'] = cookie('csrftoken')
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
      if (err.response.status === 401) {
        router.push('/logout')
      } else if (err.response.status === 404) {
        router.push('/404')
      }

      return Promise.reject(err)
    }
  )

export { apiUrl }
export default instance
