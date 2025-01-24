// import useData from "../../hooks/useData";
import TeacherItem from "../TeacherItem/TeacherItem";

const TeachersList = ({ teacher }) => {
  //   const { data } = useData();
  //   console.log("dddddddd", data);

  if (!teacher || teacher.length === 0) {
    return <p>No teachers found.</p>;
  }
  return (
    <ul>
      {teacher.map((teacher) => (
        <TeacherItem key={teacher.id} teacher={teacher} />
      ))}
    </ul>
  );
};
export default TeachersList;
