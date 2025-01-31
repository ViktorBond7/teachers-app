import { useEffect, useState } from "react";
import TeachersList from "../../components/TeachersList/TeachersList";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import css from "./Favorites.module.css";
import database from "../../firebase";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [userAuth, setUserAuth] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
      if (!currentUser) {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const favoritesRef = ref(database, `favorites/${user.uid}`);

    // Слухаємо зміни у реальному часі
    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      const favoritesList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setFavorites(favoritesList);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {userAuth && favorites.length !== 0 ? (
        <TeachersList teacher={favorites} updateFavorites={favorites} />
      ) : (
        <p className={css.page}>
          Unfortunately does not yet have selected teachers
        </p>
      )}
    </>
  );
};

export default Favorites;
