import TeacherItem from "../TeacherItem/TeacherItem";
import css from "./TeachersList.module.css";

const TeachersList = ({ teacher }) => {
  if (!teacher || teacher.length === 0) {
    return <p>No teachers found.</p>;
  }

  return (
    <ul className={css.list}>
      {teacher.map((teacher) => (
        <TeacherItem key={teacher.id} teacher={teacher} />
      ))}
    </ul>
  );
};
export default TeachersList;
