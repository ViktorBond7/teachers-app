import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
  const {
    user,
    error: authError,

    handleLogout,
  } = useAuth();

  return (
    <>
      {user && <p>Вітаємо, {user.displayName}</p>}
      <button onClick={handleLogout}>Log Out</button>
      {authError && <p className="error">{authError}</p>}
    </>
  );
};
export default UserMenu;
