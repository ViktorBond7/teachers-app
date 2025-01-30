import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const handleLogin = async (data, closeModal) => {
    try {
      setError(null); 
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(userCredential.user);
      closeModal();
    } catch (error) {
      console.error("Помилка логіну:", error.message);
      setError("Неправильний email або пароль."); 
    }
  };

  
  const handleSignUp = async (data, closeModal) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      setUser({ ...userCredential.user, displayName: data.name });
      closeModal();
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
      setError("Цей email вже зареєстрований або дані некоректні."); 
    }
  };

 
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

   
    return () => unsubscribe();
  }, [auth]);

  return { user, error, handleLogin, handleSignUp, handleLogout };
};

export default useAuth;
