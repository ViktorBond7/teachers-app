import { useEffect, useMemo, useState } from "react";

const useFilteredTeachers = (teachers) => {
  //   const [language, setLanguage] = useState(
  //     localStorage.getItem("language") || ""
  //   );
  //   const [level, setLevel] = useState(localStorage.getItem("level") || "");
  //   const [price, setPrice] = useState(localStorage.getItem("price") || "");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  //   useEffect(() => {
  //     localStorage.setItem("language", language);
  //     localStorage.setItem("level", level);
  //     localStorage.setItem("price", price);
  //   }, [language, level, price]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      return (
        (!language || teacher.languages.includes(language)) &&
        (!level || teacher.levels.includes(level)) &&
        (!price || teacher.price_per_hour === parseInt(price))
      );
    });
  }, [teachers, language, level, price]);

  return {
    filteredTeachers,
    setLanguage,
    setLevel,
    setPrice,
  };
};

export default useFilteredTeachers;
