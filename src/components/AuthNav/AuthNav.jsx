import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AuthModal from "../AuthModal/AuthModal";
import IconSvg from "../IconSvg";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'
  const { error: authError, handleLogin, handleSignUp } = useAuth();

  return (
    <>
      <div className={css.container}>
        <button className={css.buttonHed} onClick={() => setModalType("login")}>
          <IconSvg
            iconName="icon-log"
            width="20"
            height="20"
            className={css.icon}
          />{" "}
          Log In
        </button>
        <button
          className={css.buttonHed}
          onClick={() => setModalType("signup")}
        >
          Registration
        </button>
      </div>

      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={(data) => {
            if (modalType === "login") {
              handleLogin(data, () => setModalType(null));
            } else {
              handleSignUp(data, () => setModalType(null));
            }
          }}
        />
      )}

      {authError && <p className="error">{authError}</p>}
    </>
  );
};
export default AuthNav;
