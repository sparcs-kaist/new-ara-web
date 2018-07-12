import store from '@/store'

export const progressHandler = ({ loaded, total }) => {
  store.commit('fetch/updateProgress', loaded / total)
}
