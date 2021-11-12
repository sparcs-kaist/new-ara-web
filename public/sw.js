self.addEventListener('push', function (e) {
    console.log(e.data.json());
  
    const resultData = JSON.parse(e.data.json().data.notification);
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.icon,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  self.addEventListener('notificationclick', function (event) {
    const url = '/';
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });