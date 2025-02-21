import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthModal.module.css";
import IconSvg from "../IconSvg";
import PasswordInput from "../PasswordInput/PasswordInput";

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
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          <IconSvg
            iconName="icon-x"
            width="32"
            height="32"
            className={css.icon}
          />
        </button>
        <h2>{type === "login" ? "Log In" : "Sign Up"}</h2>
        <p>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "signup" && (
            <div>
              <input
                {...register("name")}
                placeholder="Name"
                className={css.input}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className={css.input}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <PasswordInput
              className={css.input}
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className={css.submit}>
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
