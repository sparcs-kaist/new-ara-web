import store from '@/store'

export const fetchWithProgress = async (targets) => {
  store.dispatch('fetch/startProgress')
  const results = await Promise.all(targets)
  store.dispatch('fetch/endProgress')
  return results
}
