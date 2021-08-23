import i18n from '@/i18n'
import store from '@/store'

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

    store.dispatch('fetch/endProgress')

    throw err
  }
}
