importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js')
importScripts('swenv.js')

// TODO: Run `npm run swenv` manually to generate process.env.VUE_APP_FIREBASE_CONFIG in local environment
const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG || {})

firebase.initializeApp(firebaseConfig)
firebase.messaging()

self.addEventListener('notificationclick', async (event) => {
  console.log(event)
  // event.notification.close()
  if (event.action === 'action_close') {
    // background: do action when notification close button is clicked
  } else if(event.action === 'action_open') {
    // background: do action when notification open button is clicked
    clients.openWindow(event.notification?.data?.FCM_MSG?.data.action_open_url)
  } else if (event.action === '') {
    // foreground: do action when notification is clicked
    clients.openWindow(event.notification?.data?.action_open_url)
  }
})
