import useAuth from "../../hooks/useAuth";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import css from "./AppBar.module.css";
import IconSvg from "../IconSvg";

const AppBar = () => {
  const { user } = useAuth();

  return (
    <header className={css.header}>
      <div>
        <IconSvg
          iconName="icon-ukraine"
          width="24"
          height="24"
          className={css.icon}
        />
        <p>jhjhjj</p>
      </div>
      <Navigation />
      {user ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
export default AppBar;
