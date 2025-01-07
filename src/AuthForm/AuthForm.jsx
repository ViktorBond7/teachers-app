import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const API_KEY = "AIzaSyB3l5bUJUJA-0wimluYTyAtiPDIcH2O6Zk";

// Схема валідації за допомогою yup
const schema = yup.object().shape({
  email: yup.string().email("Некоректний email").required("Email обов’язковий"),
  password: yup
    .string()
    .min(6, "Пароль має містити щонайменше 6 символів")
    .required("Пароль обов’язковий"),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Стан для перемикання між реєстрацією та логінізацією
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Функція для обробки реєстрації та логінізації
  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);

    const endpoint = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      });
      setSuccess(isLogin ? "Успішний вхід!" : "Успішна реєстрація!");
      console.log("Відповідь сервера:", response.data);
      reset(); // Очистити форму після успішної операції
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Сталася помилка, спробуйте ще раз"
      );
      console.error("Помилка:", err);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Введіть ваш email"
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Введіть ваш пароль"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">{isLogin ? "Увійти" : "Зареєструватись"}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Перемикання між реєстрацією та логінізацією */}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Перейти до реєстрації" : "Перейти до входу"}
      </button>
    </div>
  );
};

export default AuthForm;
