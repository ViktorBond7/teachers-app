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
      <div className={css.logo}>
        <IconSvg
          iconName="icon-ukraine"
          width="28"
          height="28"
          className={css.icon}
        />
        <p>LearnLingo</p>
      </div>
      <div className={css.containerNav}>
        <div className={css.navigation}>
          <Navigation />
        </div>
        <div>{user ? <UserMenu /> : <AuthNav />}</div>
      </div>
    </header>
  );
};
export default AppBar;
