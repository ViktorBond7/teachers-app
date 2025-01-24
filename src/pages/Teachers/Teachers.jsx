import { useEffect } from "react";
import useData from "../../hooks/useData";
import TeachersList from "../../components/TeachersList/TeachersList";

const Teachers = () => {
  const {
    data,
    loadInitialData,
    loadMoreData,
    hasMore,
    error: dataError,
  } = useData();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);
  console.log("2222222222", data);

  return (
    <div>
      {dataError ||
        ((data === null || data.length === 0) && (
          <p>Oops, there was an error, please try reloading!!!</p>
        ))}
      {/* {data && <p>{JSON.stringify(data, null, 2)}</p>} */}
      <TeachersList teacher={data} />
      {hasMore && data && <button onClick={loadMoreData}>Load More</button>}

      {dataError && <p>{dataError}</p>}
    </div>
  );
};

export default Teachers;
