import { useEffect } from "react";
import useData from "../../hooks/useData";
import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./Teachers.module.css";
import Loader from "../../components/Loader/Loader";
import useFilter from "../../hooks/useFilter";
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

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);
  const { filteredTeachers, setLanguage, setLevel, setPrice } = useFilter(
    data || []
  );

  return (
    <div>
      {/* {(data === null || data.length === 0) && (
        <p>Oops, there was an error, please try reloading!!!</p>
      )} */}
      {/* {data && <p>{JSON.stringify(data, null, 2)}</p>} */}
      <Filters
        setLanguage={setLanguage}
        setLevel={setLevel}
        setPrice={setPrice}
      />
      {loading && <Loader />}
      {data && <TeachersList teacher={filteredTeachers} />}
      {hasMore && data && (
        <button className={css.buttonMore} onClick={loadMoreData}>
          Load More
        </button>
      )}

      {dataError && <p>{dataError}</p>}
    </div>
  );
};

export default Teachers;
