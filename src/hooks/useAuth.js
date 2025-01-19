import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const handleLogin = async (data, closeModal) => {
    try {
      setError(null); // Очищення помилок перед логіном
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(userCredential.user);
      closeModal();
    } catch (error) {
      console.error("Помилка логіну:", error.message);
      setError("Неправильний email або пароль."); // Встановлюємо текст помилки
    }
  };

  // Функція для реєстрації
  const handleSignUp = async (data, closeModal) => {
    try {
      setError(null); // Очищення помилок перед реєстрацією
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Оновлюємо профіль користувача в Firebase, додаємо ім'я
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      setUser({ ...userCredential.user, displayName: data.name });
      closeModal();
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
      setError("Цей email вже зареєстрований або дані некоректні."); // Встановлюємо текст помилки
    }
  };

  // Функція для виходу
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Очищення підписки при розмонтуванні компонента
    return () => unsubscribe();
  }, [auth]);

  return { user, error, handleLogin, handleSignUp, handleLogout };
};

export default useAuth;
