import { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";

import useAuth from "../../hooks/useAuth";
import css from "./Home.module.css";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  // const [modalType, setModalType] = useState(null); // 'login' or 'signup'
  // const {
  //   user,
  //   error: authError,
  //   handleLogin,
  //   handleSignUp,
  //   handleLogout,
  // } = useAuth();

  const handleClick = () => {
    navigate("/teachers");
  };
  return (
    <div className={css.containerRoot}>
      <div className={css.container}>
        <div className={css.left}>
          <h1>
            Unlock your potential with <br /> the best{" "}
            <span className={css.highlight}>language</span> tutors
          </h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language <br />
            Tutors. Elevate your language proficiency to new heights by <br />
            connecting with highly qualified and experienced tutors.
          </p>
          <button className={css.btn} onClick={handleClick}>
            Get started
          </button>
        </div>
        <div className={css.right}>
          <img src="../../img/block.png" alt="Emoji with Laptop" />
        </div>
      </div>

      <div className={css.stats}>
        <div className={css.stat}>
          <span className={css.namber}>32,000+</span>
          <span className={css.label}>
            Experienced <br /> tutors
          </span>
        </div>
        <div className={css.stat}>
          <span className={css.namber}>300,000+</span>
          <span className={css.label}>
            5-star tutor <br /> reviews
          </span>
        </div>
        <div className={css.stat}>
          <span className={css.namber}>120+</span>
          <span className={css.label}>
            Subjects <br /> taught
          </span>
        </div>
        <div className={css.stat}>
          <span className={css.namber}>200+</span>
          <span className={css.label}>
            Tutor <br /> nationalities
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
