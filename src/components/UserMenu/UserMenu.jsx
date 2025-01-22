import useAuth from "../../hooks/useAuth";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const {
    user,
    error: authError,

    handleLogout,
  } = useAuth();

  return (
    <div className={css.container}>
      {user && <p>Welcome, {user.displayName}</p>}
      <button className={css.buttonLogOut} onClick={handleLogout}>
        Log Out
      </button>
      {authError && <p className="error">{authError}</p>}
    </div>
  );
};
export default UserMenu;
