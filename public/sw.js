self.addEventListener('push', event => {
    console.log("Push Notification received", event);
    const data = JSON.parse(event.data.text());
  
    //notification
    event.waitUntil(
        self.registration.showNotification(data.title, data.options)
    )
  });


// TODO
self.addEventListener('notificationclick', event => {
    if(event.action === 'confirm') {
      event.waitUntil(clients.openWindow('/'));
    } else {
      console.log("######## Not Confirm button clicked");
    }
    event.notification.close();
  });

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetched resource '+event.request.url);
  });