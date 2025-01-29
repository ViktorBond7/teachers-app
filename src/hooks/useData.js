import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import database from "../Firebase";
import { useCallback, useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMoreData = async () => {
    // if (!lastKey || !hasMore) return;
    setError(null);
    setLoading(true);
    const dataQuery = query(
      ref(database, "/teachers"),
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(10)
    );

    try {
      const snapshot = await get(dataQuery);
      const items = snapshot.val();

      if (!items) {
        setHasMore(false);
        return;
      }

      const itemsArray = Object.entries(items).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      setData((prevData) => [...prevData, ...itemsArray]);
      setLastKey(itemsArray[itemsArray.length - 1].id);

      if (itemsArray.length < 2) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const dataQuery = query(ref(database, "/teachers"), limitToFirst(10));

      const snapshot = await get(dataQuery);
      if (snapshot.exists()) {
        const items = snapshot.val();
        const itemsArray = Object.entries(items).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setData(itemsArray);
        setLastKey(itemsArray[itemsArray.length - 1].id);

        if (itemsArray.length < 2) {
          setHasMore(false);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return { data, loadInitialData, loadMoreData, hasMore, error, loading };
};

export default useData;

// const loadInitialData = async () => {
//   try {
//     const dataQuery = query(ref(database, "/"), limitToFirst(4));

//     const snapshot = await get(dataQuery);
//     if (snapshot.exists()) {
//       const items = snapshot.val();
//       const itemsArray = Object.entries(items).map(([key, value]) => ({
//         id: key,
//         ...value,
//       }));

//       setData(itemsArray);
//       setLastKey(itemsArray[itemsArray.length - 1].id);

//       if (itemsArray.length < 2) {
//         setHasMore(false);
//       }
//     } else {
//       setError("Немає даних у базі");
//       console.log("Немає даних у базі");
//     }
//   } catch (error) {
//     setError("Помилка при отриманні даних");
//     console.error("Помилка при отриманні даних:", error);
//   }
// };
