import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3l5bUJUJA-0wimluYTyAtiPDIcH2O6Zk",
  authDomain: "teachers-app-147bf.firebaseapp.com",
  databaseURL:
    "https://teachers-app-147bf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teachers-app-147bf",
  storageBucket: "teachers-app-147bf.firebasestorage.app",
  messagingSenderId: "662700529137",
  appId: "1:662700529137:web:f2cbd859baa5b027dc6050",
  measurementId: "G-B9GGZ0PWG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

export default database;

// / Функція для входу через Google
export const signInWithGoogle = (setUser) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      setUser(user);
      console.log("Авторизований користувач:", user);
      // Зберігаємо дані користувача в базу даних
      set(ref(database, "users/" + user.uid), {
        username: user.displayName,
        email: user.email,
      });
    })
    .catch((error) => {
      console.error("Помилка авторизації:", error);
    });
};
