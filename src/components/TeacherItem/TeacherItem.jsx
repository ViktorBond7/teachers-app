import { Link, Outlet } from "react-router-dom";
import IconSvg from "../IconSvg";
import Levels from "../Levels/Levels";
import css from "./TeacherItem.module.css";
import { useEffect, useState } from "react";
import BookModal from "../BookModal/BookModal";
import { ref, set, remove, get } from "firebase/database";
import database, { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const TeacherItem = ({ teacher }) => {
  const [isOpen, setIsopen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userAuth, setUserAuth] = useState(null);

  const handleClick = () => {
    setIsopen((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
      if (!currentUser) {
        setUserAuth([]);
        setIsFavorite(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const checkFavorite = async () => {
      const teacherRef = ref(database, `favorites/${user.uid}/${teacher.id}`);
      const snapshot = await get(teacherRef);
      setIsFavorite(snapshot.exists());
    };

    checkFavorite();
  }, [teacher.id, user]);

  const handleClickFavorit = async () => {
    if (!user) {
      toast.error("Log in to your account to add a teacher to your favorites!");
      return;
    }

    const teacherRef = ref(database, `favorites/${user.uid}/${teacher.id}`);

    if (isFavorite) {
      await remove(teacherRef);
    } else {
      await set(teacherRef, teacher);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <li className={css.containerRoot}>
        <div className={css.containerImg}>
          <img
            className={css.teacherImg}
            src={teacher.avatar_url}
            alt={teacher.name}
          />
          <IconSvg
            iconName="icon-Group"
            width="12"
            height="12"
            className={css.icon}
          />
        </div>
        <div className={css.containerLeft}>
          <div className={css.header}>
            <p className={css.pageLanguages}>Languages</p>
            <div className={css.info}>
              <p className={css.pageSpan}>
                <span className={`${css.svg} ${css.svgAfter}`}>
                  <IconSvg
                    iconName="icon-book"
                    width="16"
                    height="16"
                    className={`${css.iconBook} ${css.icon}`}
                  />
                  Lessons online
                </span>
                <span className={css.svgAfter}>
                  Lessons done: {teacher.lessons_done}
                </span>
                <span className={`${css.svg} ${css.svgAfter}`}>
                  {" "}
                  <IconSvg
                    iconName="icon-star"
                    width="16"
                    height="16"
                    className={css.icon}
                  />{" "}
                  Rating: {teacher.rating}
                </span>
                <span>
                  Price / 1 hour:{" "}
                  <span className={css.price}>{teacher.price_per_hour}$</span>
                </span>
              </p>
              <button
                onClick={handleClickFavorit}
                className={css.buttonFavorites}
              >
                <IconSvg
                  iconName="icon-Vector-9"
                  width="26"
                  height="26"
                  className={
                    isFavorite ? css.iconFavorite : css.iconNotFavorite
                  }
                />
              </button>
            </div>
          </div>
          <h3>{`${teacher.name} ${teacher.surname}`}</h3>
          <div className={css.pageContext}>
            <p>
              <span>Speaks:</span>{" "}
              <span className={css.speak}>{teacher.languages.join(", ")}</span>
            </p>
            <p>
              <span>Lesson Info:</span> {teacher.lesson_info}
            </p>
            <p>
              <span>Conditions:</span> {teacher.conditions}
            </p>
          </div>

          {!isOpen ? (
            <Link to="about">
              <button
                className={css.buttonReadMore}
                onClick={() => {
                  handleClick();
                }}
              >
                Read more
              </button>
            </Link>
          ) : (
            <p className={css.pageExperience}>{teacher.experience}</p>
          )}
          {isOpen && <Outlet context={{ teacher }} />}
          <Levels levels={teacher} />
          {isOpen && (
            <button
              type="submit"
              className={css.bookTrial}
              onClick={() => setIsModalOpen(true)}
            >
              Book trial lesson
            </button>
          )}
        </div>
      </li>
      {isModalOpen && (
        <BookModal teacher={teacher} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
export default TeacherItem;
