import "./App.css";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { signInWithGoogle } from "./Firebase";
import database from "./Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Відстеження зміни стану авторизації
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Встановлюємо користувача
        console.log("Користувач відновлений:", currentUser);
      } else {
        setUser(null); // Якщо немає авторизації
      }
    });

    // Очищення слухача при відключенні компонента
    return () => unsubscribe();
  }, []);

  // Отримання даних з бази після авторизації
  useEffect(() => {
    if (user) {
      const dbRef = ref(database, "/");
      console.log("user", user);
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val()); // Зберігаємо отримані дані в стан
            console.log("Data:", snapshot.val());
          } else {
            setError("Немає даних у базі");
            console.log("Немає даних у базі");
          }
        })
        .catch((error) => {
          setError("Помилка при отриманні даних");
          console.error("Помилка при отриманні даних:", error);
        });
    }
  }, [user]); // Виконувати запит тільки після авторизації користувача

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null); // Очищуємо стан користувача
        setData(null); // Очищуємо дані
        console.log("Користувач вийшов із системи");
      })
      .catch((error) => {
        console.error("Помилка при виході з системи:", error);
      });
  };

  return (
    <div>
      <h1>Firebase Google Sign-In</h1>
      {user ? (
        <div>
          <p>Ласкаво просимо, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <button onClick={() => signInWithGoogle(setUser)}>
          Увійти через Google
        </button>
      )}

      {/* Виведення отриманих даних або повідомлення про помилку */}
      {data && user && (
        <div>
          <h2>Дані з бази:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";
// // import AuthModal from "./AuthModal"; // Імпортуємо компонент модального вікна
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import AuthModal from "./AuthModal/AuthModal";

// function App() {
//   const [user, setUser] = useState(null); // Стан для зберігання поточного користувача
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Стан для відкриття/закриття модального вікна

//   const auth = getAuth();

//   // Перевірка авторизованого користувача при завантаженні застосунку
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   // Функція для виходу з облікового запису
//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//       })
//       .catch((error) => {
//         console.error("Помилка при виході:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>Welcome to the App</h1>

//       {/* Кнопка для відкриття модального вікна або виходу */}
//       {!user ? (
//         <button onClick={() => setIsAuthModalOpen(true)}>
//           Log In / Sign Up
//         </button>
//       ) : (
//         <div>
//           <p>Ви увійшли як: {user.email}</p>
//           <button onClick={handleLogout}>Log Out</button>
//         </div>
//       )}

//       {/* Модальне вікно авторизації */}
//       {isAuthModalOpen && (
//         <AuthModal closeModal={() => setIsAuthModalOpen(false)} />
//       )}
//     </div>
//   );
// }

// export default App;

// const auth = getAuth();
// const provider = new GoogleAuthProvider();

// const signInWithGoogle = () => {
//   signInWithRedirect(auth, provider);
// };

// function App() {
//   useEffect(() => {
//     const dbRef = ref(database, "/");
//     get(dbRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           console.log("Data:", snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <p>fgfgfgfgfgfg</p>
//     </>
//   );
// }

// export default App;

//  const database = firebase.database();

//  // Отримання даних із кореневого вузла бази даних
//  database
//    .ref("/")
//    .once("value")
//    .then((snapshot) => {
//      console.log(snapshot.val()); // Вивід усіх даних у консоль
//    })
//    .catch((error) => {
//      console.error("Error fetching data: ", error);
//    });

// if (user) {
//   const userRef = ref(database, "users/" + user.uid);
//   get(userRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log("Дані користувача:", snapshot.val());
//       } else {
//         console.log("Дані відсутні");
//       }
//     })
//     .catch((error) => {
//       console.error("Помилка отримання даних:", error);
//     });
// }

// const projectId = "hkhkh-3589f"; // Twój identyfikator projektu Firebase
// const url = `https://${projectId}-default-rtdb.europe-west1.firebasedatabase.app`;

// // Odczytywanie danych za pomocą fetch
// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log("Pobrane dane:", data); // Wyświetlanie danych w konsoli
//   })
//   .catch((error) => {
//     console.error("Błąd podczas pobierania danych:", error);
//   });

// useEffect(() => {
//   if (user) {
//     const dbRef = ref(database, "users/" + user.uid); // Fixed to fetch user-specific data
//     get(dbRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setUser(snapshot.exists());
//           console.log("Data:", snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }
// }, [user]); // Re-run the effect when 'user' state changes
