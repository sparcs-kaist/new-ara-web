// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import * as firebase from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { updateFCMToken, deleteFCMToken } from './api'

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || {})

const app = firebase.initializeApp(firebaseConfig)
let acquired = false

export const acquireFCMToken = async () => {
  if (!acquired && 'Notification' in window) {
    Notification.requestPermission().then(function (result) {
      if (result === 'granted') {
        getToken(getMessaging(app), { vapidKey: process.env.VUE_APP_FIREBASE_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // console.log('[Notification] client token', currentToken)
              updateFCMToken(currentToken)
              acquired = true // prevent from acquiring token again after first access. If the page is reloaded, the token will be acquired again.
            } else {
              // Show permission request UI
              console.log('[Notification] No registration token available. Request permission to generate one.')
            }
          }).catch((err) => {
            console.log('[Notification] An error occurred while retrieving token. ', err)
          })
      } else {
        alert('권한 허용을 해 주셔야 PUSH 알림을 받으실 수 있습니다.')
        acquired = true
      }
    })
  }
}

export const onMessageListener = (context) => {
  // Foreground notification
  onMessage(getMessaging(app), (payload) => {
    navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(async registration => {
      await context.reloadNotification()
      context.$store.dispatch('dialog/toast', payload.notification.title + '\n' + payload.notification.body)
    })
  })
}

export const releaseFCMToken = async () => {
  const messaging = getMessaging(app)
  getToken(messaging, { vapidKey: process.env.VUE_APP_FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken)
        deleteFCMToken(currentToken)
      } else {
        // Nothing to do with
      }
    }).catch((err) => {
      console.log('[Notification] An error occurred while releasing token. ', err)
    })
}
