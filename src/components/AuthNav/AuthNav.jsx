import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AuthModal from "../AuthModal/AuthModal";
// import css from "./AuthNav.module.css";

const AuthNav = () => {
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'
  const { error: authError, handleLogin, handleSignUp } = useAuth();

  return (
    <div>
      <div>
        <svg width="48" height="48">
          <use href="../../img/symbol-defs.svg/#icon-ukraine">1111</use>
        </svg>

        <button onClick={() => setModalType("login")}>Log In</button>
        <button onClick={() => setModalType("signup")}>Registration</button>
      </div>

      {/* Відображення модального вікна */}
      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={(data) => {
            // modalType === "login"
            //   ? handleLogin(data, () => setModalType(null))
            //   : handleSignUp(data, () => setModalType(null));
            if (modalType === "login") {
              handleLogin(data, () => setModalType(null));
            } else {
              handleSignUp(data, () => setModalType(null));
            }
          }}
        />
      )}

      {authError && <p className="error">{authError}</p>}
    </div>
  );
};
export default AuthNav;
