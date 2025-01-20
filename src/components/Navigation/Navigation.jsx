import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={buildLinkClass}>
          Teachers
        </NavLink>
        <NavLink to="/favorites" className={buildLinkClass}>
          Favorites
        </NavLink>
      </nav>
    </div>
  );
};
export default Navigation;
