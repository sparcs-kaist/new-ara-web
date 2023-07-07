import i18n from '@/i18n'
import store from '@/store'
import progressBar from '@/progressBar'

export const fetchWithProgress = async (targets, errText) => {
  store.dispatch('fetch/startProgress')

  try {
    const results = await Promise.all(targets)
    store.dispatch('fetch/endProgress')

    return results
  } catch (err) {
    if (errText) {
      store.dispatch('dialog/toast', {
        type: 'error',
        text: i18n.t(errText) + (err.apierr ? '\n' + err.apierr : '')
      })
    }
    progressBar.$Progress.fail()
    store.dispatch('fetch/endProgress')

    throw err
  }
}
