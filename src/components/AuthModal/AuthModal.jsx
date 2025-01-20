import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthModal.module.css";

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
    // event.stopPropagation();
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Закриття модалки по натисканню клавіші ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose(); // Викликаємо функцію закриття модалки
      }
    };

    // Додаємо обробник події при монтуванні
    window.addEventListener("keydown", handleEsc);

    // Очищуємо обробник події при розмонтуванні
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>{type === "login" ? "Log In" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "signup" && (
            <div>
              <label>Name</label>
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
