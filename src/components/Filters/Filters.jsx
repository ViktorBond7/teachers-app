import css from "./Filters.module.css";

const Filters = ({ setLanguage, setLevel, setPrice }) => {
  return (
    <div className={css.containerFilter}>
      <div className={css.option}>
        <label htmlFor="language">Languages</label>
        <select id="language" onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          <option value="French">French</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="Ukrainian">Ukrainian</option>
          <option>Polish</option>
        </select>
      </div>
      <div className={css.option}>
        <label htmlFor="level">Level of knowledge</label>
        <select id="level" onChange={(e) => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
          <option>Polish</option>
        </select>
      </div>
      <div className={css.option}>
        <label htmlFor="price">Price</label>
        <select id="price" onChange={(e) => setPrice(e.target.value)}>
          <option value="">All Prices</option>
          <option value="10">10$</option>
          <option value="20">20$</option>
          <option value="30">30$</option>
          <option value="40">40$</option>
        </select>
      </div>
    </div>
  );
};
export default Filters;
