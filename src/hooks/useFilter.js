import { useEffect, useState } from "react";

const useFilteredTeachers = (teachers, fetchMoreData) => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [prevTeachers, setPrevTeachers] = useState([]);

  useEffect(() => {
    setPrevTeachers((prev) => {
      const updated = [...prev, ...teachers].reduce((acc, teacher) => {
        if (!acc.some((t) => t.id === teacher.id)) {
          acc.push(teacher);
        }
        return acc;
      }, []);
      return updated;
    });
  }, [teachers]);

  useEffect(() => {
    const newFilteredTeachers = prevTeachers.filter((teacher) => {
      return (
        (!language || teacher.languages.includes(language)) &&
        (!level || teacher.levels.includes(level)) &&
        (!price || teacher.price_per_hour <= parseInt(price))
      );
    });

    setFilteredData(newFilteredTeachers);
  }, [prevTeachers, language, level, price]);

  useEffect(() => {
    if (filteredData.length < 4) {
      fetchMoreData();
    }
  }, [filteredData, fetchMoreData]);

  return {
    filteredTeachers: filteredData,
    setLanguage,
    setLevel,
    setPrice,
  };
};

export default useFilteredTeachers;
