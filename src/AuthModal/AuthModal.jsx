import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
// import axios from "axios";

function AuthModal({ type, onSubmit, onClose }) {
  const schema = yup.object().shape({
    name:
      type === "signup"
        ? yup.string().required("Ім'я обов'язкове")
        : yup.string().notRequired(),
    email: yup
      .string()
      .email("Некоректний email")
      .required("Email обов'язковий"),
    password: yup
      .string()
      .min(6, "Пароль має містити щонайменше 6 символів")
      .required("Пароль обов'язковий"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose(); // Викликаємо функцію закриття модалки
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        console.log("Close");
      }
    };
  }, []);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h2>{type === "login" ? "Log In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "signup" && (
            <div>
              <label>Ім'я</label>
              <input {...register("name")} />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <label>Email</label>
            <input {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// // import database from "./Firebase";

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Невірний формат email")
//     .required("Email обовʼязковий"),
//   password: yup
//     .string()
//     .min(6, "Пароль має містити мінімум 6 символів")
//     .required("Пароль обовʼязковий"),
// });

// function AuthModal({ closeModal }) {
//   const [isRegister, setIsRegister] = useState(true); // Стан для перемикання між реєстрацією та логіном
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);

//   const auth = getAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // Перевірка поточного користувача при завантаженні
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         closeModal();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [closeModal]);

//   // Функція для реєстрації
//   const onRegister = async (data) => {
//     try {
//       setError(null);
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       setUser(userCredential.user);
//       closeModal();
//     } catch (error) {
//       setError("Помилка реєстрації: " + error.message);
//     }
//   };

//   // Функція для логіну
//   const onLogin = async (data) => {
//     try {
//       setError(null);
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       setUser(userCredential.user);
//       closeModal();
//     } catch (error) {
//       setError("Помилка входу: " + error.message);
//     }
//   };

//   // Функція для виходу
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
//     <div className="modal-backdrop" onClick={closeModal}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={closeModal}>
//           &times;
//         </button>
//         <h2>{isRegister ? "Реєстрація" : "Авторизація"}</h2>
//         <form onSubmit={handleSubmit(isRegister ? onRegister : onLogin)}>
//           <div>
//             <label>Email:</label>
//             <input type="email" {...register("email")} />
//             <p>{errors.email?.message}</p>
//           </div>
//           <div>
//             <label>Пароль:</label>
//             <input type="password" {...register("password")} />
//             <p>{errors.password?.message}</p>
//           </div>
//           <button type="submit">
//             {isRegister ? "Зареєструватися" : "Увійти"}
//           </button>
//         </form>
//         {error && <p className="error">{error}</p>}
//         <p onClick={() => setIsRegister(!isRegister)}>
//           {isRegister
//             ? "Вже є обліковий запис? Увійти"
//             : "Немає облікового запису? Зареєструватися"}
//         </p>
//         {user && (
//           <div>
//             <p>Ласкаво просимо, {user.email}</p>
//             <button onClick={handleLogout}>Вийти</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AuthModal;
