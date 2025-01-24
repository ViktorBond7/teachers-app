// import css from "./TeacherItem.module.css";
const TeacherItem = ({ teacher }) => {
  return (
    <>
      <li>
        {/* <img
          className={css.teacherImg}
          src={teacher.avatar_url}
          alt={teacher.name}
        /> */}
        <p>{teacher.name}</p>
      </li>
    </>
  );
};
export default TeacherItem;
