import { useEffect, useState } from "react";

const useFilteredTeachers = (teachers, fetchMoreData) => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Накопичені відфільтровані дані
  const [isFiltering, setIsFiltering] = useState(true); // Контроль стану фільтрації

  useEffect(() => {
    const newFilteredTeachers = teachers.filter((teacher) => {
      return (
        (!language || teacher.languages.includes(language)) &&
        (!level || teacher.levels.includes(level)) &&
        (!price || teacher.price_per_hour <= parseInt(price))
      );
    });

    setFilteredData((prev) => {
      // Якщо фільтруємо вперше, очищуємо prev
      if (isFiltering) {
        return newFilteredTeachers;
      }

      // Додаємо тільки унікальні елементи до списку
      const updatedData = [...prev, ...newFilteredTeachers].reduce(
        (acc, teacher) => {
          if (!acc.some((t) => t.id === teacher.id)) {
            acc.push(teacher);
          }
          return acc;
        },
        []
      );

      return updatedData;
    });
  }, [teachers, language, level, price]);

  // Очищаємо `filteredData`, якщо змінюються фільтри

  useEffect(() => {
    setFilteredData([]);
    setIsFiltering(false);
  }, [language, level, price]);

  useEffect(() => {
    if (filteredData.length < 4) {
      fetchMoreData();
      console.log("🔄 Дозавантаження...");
    }
  }, [filteredData, fetchMoreData]);
  console.log("isFiltering", isFiltering);

  return {
    filteredTeachers: filteredData,
    setLanguage,
    setLevel,
    setPrice,
  };
};

export default useFilteredTeachers;
