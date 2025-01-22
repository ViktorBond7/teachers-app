import { useEffect } from "react";
import useData from "../../hooks/useData";

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
  }, []);

  return (
    <div className="App">
      <h1>Firebase Auth with React</h1>
      {/* {data && <p>{JSON.stringify(data, null, 2)}</p>} */}

      {hasMore && data && <button onClick={loadMoreData}>Load More</button>}

      {dataError && <p className="error">{dataError}</p>}
    </div>
  );
};

export default Teachers;
