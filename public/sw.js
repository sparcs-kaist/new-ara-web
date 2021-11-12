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
      console.log("######## Confirm was chosen");
    } else {
      console.log("######## Not Confirm button clicked");
    }
    event.notification.close();
  });