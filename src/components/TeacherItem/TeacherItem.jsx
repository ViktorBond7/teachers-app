import IconSvg from "../IconSvg";
import Levels from "../Levels/Levels";
import css from "./TeacherItem.module.css";
const TeacherItem = ({ teacher }) => {
  return (
    <>
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
            <IconSvg
              iconName="icon-Vector-9"
              width="26"
              height="26"
              className={css.iconFavorites}
            />
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
          <button className={css.buttonReadMore}>Read more</button>
          <Levels levels={teacher} />
        </div>
      </li>
    </>
  );
};
export default TeacherItem;
