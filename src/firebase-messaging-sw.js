// importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAfbY1Y0o_ZvmBzfJojX0CYm30-eJ04J3U",
    authDomain: "push-notifications-95f2c.firebaseapp.com",
    projectId: "push-notifications-95f2c",
    storageBucket: "push-notifications-95f2c.appspot.com",
    messagingSenderId: "560560113170",
    appId: "1:560560113170:web:610099dc6d0f1722b33acb",
    measurementId: "G-DXXZEF0F1R"
});
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });
}

