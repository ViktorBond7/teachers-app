import css from "./Levels.module.css";

const Levels = ({ levels }) => {
  return (
    <ul className={css.container}>
      {levels.levels.map((level, index) => (
        <li className={css.list} key={index}>
          <p>#{level}</p>
          {/* <button>{level}</button> */}
        </li>
      ))}
    </ul>
  );
};
export default Levels;
