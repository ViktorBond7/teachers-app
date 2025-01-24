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
  const [data, setData] = useState(null);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadMoreData = async () => {
    // if (!lastKey || !hasMore) return;
    const dataQuery = query(
      ref(database, "/"),
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(4)
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
      setError("Помилка при завантаженні даних");
      console.error("Помилка при завантаженні даних:", error);
    }
  };

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
  const loadInitialData = useCallback(async () => {
    try {
      const dataQuery = query(ref(database, "/"), limitToFirst(4));

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
      } else {
        setError("Немає даних у базі");
        console.log("Немає даних у базі");
      }
    } catch (error) {
      setError("Помилка при отриманні даних");
      console.error(error);
    }
  }, []);
  return { data, loadInitialData, loadMoreData, hasMore, error };
};

export default useData;
