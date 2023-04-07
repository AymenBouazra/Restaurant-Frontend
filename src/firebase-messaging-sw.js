import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBZkPXV50dXv13861uMq3eT1Euc7z6o_E4",
    authDomain: "restaurant-app-e4b59.firebaseapp.com",
    projectId: "restaurant-app-e4b59",
    storageBucket: "restaurant-app-e4b59.appspot.com",
    messagingSenderId: "1054213987064",
    appId: "1:1054213987064:web:168e8500a8417061f6390d"
};


function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            getToken(messaging, {
                vapidKey:
                    "BFPQmozQlfvlq5HhEUvWldNcz81l8pQ9qeGf-gweqTAkrCro_wwa95peD-01ywIQ-DLhKMlTazxo9KvDD7tb2iE",
            }).then((currentToken) => {
                if (currentToken) {
                    console.log("currentToken: ", currentToken);
                } else {
                    console.log("Can not get token");
                }
            });
        } else {
            console.log("Do not have permission!");
        }
    });
}
requestPermission()