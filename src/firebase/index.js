import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdDiEHsetzTy6QBu3ZIqi5ZgI7JGOcLOc",
  authDomain: "fb-react-auth-app.firebaseapp.com",
  databaseURL:
    "https://fb-react-auth-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fb-react-auth-app",
  storageBucket: "fb-react-auth-app.appspot.com",
  messagingSenderId: "527159500362",
  appId: "1:527159500362:web:65f657db56355766ab50b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
