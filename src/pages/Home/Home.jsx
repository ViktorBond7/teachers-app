import { useState, useEffect } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import useData from "../../hooks/useData";
import useAuth from "../../hooks/useAuth";
// import css from "./Home.module.css";
const HomePage = () => {
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'
  const {
    user,
    error: authError,
    handleLogin,
    handleSignUp,
    handleLogout,
  } = useAuth();
  const {
    data,
    loadInitialData,
    loadMoreData,
    hasMore,
    error: dataError,
  } = useData();

  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]); // Виконувати запит тільки після авторизації користувача

  return (
    <div className="App">
      <h1>Firebase Auth with React</h1>
      {user && data && <p>{JSON.stringify(data, null, 2)}</p>}

      {hasMore && data && <button onClick={loadMoreData}>Load More</button>}
      {user ? (
        <div>
          <p>Вітаємо, {user.displayName || user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setModalType("login")}>Log In</button>
          <button onClick={() => setModalType("signup")}>Sign Up</button>
        </div>
      )}

      {/* Відображення модального вікна */}
      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={(data) =>
            modalType === "login"
              ? handleLogin(data, () => setModalType(null))
              : handleSignUp(data, () => setModalType(null))
          }
        />
      )}

      {authError && <p className="error">{authError}</p>}
      {dataError && <p className="error">{dataError}</p>}
    </div>
  );
};

export default HomePage;
