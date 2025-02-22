import { useEffect } from "react";
import useData from "../../hooks/useData";
import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./Teachers.module.css";
import Loader from "../../components/Loader/Loader";
import useFilteredTeachers from "../../hooks/useFilter";
import Filters from "../../components/Filters/Filters";

const Teachers = () => {
  const {
    data,
    loadInitialData,
    loadMoreData,
    hasMore,
    loading,
    error: dataError,
  } = useData();

  const { filteredTeachers, setLanguage, setLevel, setPrice } =
    useFilteredTeachers(data, loadInitialData);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <div>
      <Filters
        setLanguage={setLanguage}
        setLevel={setLevel}
        setPrice={setPrice}
      />

      <div className={css.container}>
        {data && <TeachersList teacher={filteredTeachers} />}

        {loading && <Loader />}
        {hasMore && !loading && data && (
          <button className={css.buttonMore} onClick={loadMoreData}>
            Load More
          </button>
        )}

        {dataError && <p>{dataError}</p>}
      </div>
    </div>
  );
};

export default Teachers;
