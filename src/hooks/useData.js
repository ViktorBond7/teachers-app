import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import database from "../Firebase";
import { useCallback, useEffect, useRef, useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);
  const lastKeyRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadInitialData = useCallback(
    async (currentData = [], currentLastKey = lastKeyRef.current) => {
      if (!hasMore) return;
      setLoading(true);
      setError(null);

      try {
        const dataQuery = currentLastKey
          ? query(
              ref(database, "/teachers"),
              orderByKey(),
              startAfter(currentLastKey),
              limitToFirst(4)
            )
          : query(ref(database, "/teachers"), orderByKey(), limitToFirst(4));

        const snapshot = await get(dataQuery);

        if (!snapshot.exists()) {
          setHasMore(false);
          return;
        }

        const items = snapshot.val();
        const newItems = Object.entries(items).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        const newData = [...currentData, ...newItems];

        const newLastKey = newItems[newItems.length - 1]?.id;

        setData(newData);
        lastKeyRef.current = newLastKey;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadMoreData = async () => {
    if (!lastKeyRef.current || !hasMore) return;

    setError(null);
    setLoading(true);

    const dataQuery = query(
      ref(database, "/teachers"),
      orderByKey(),
      startAfter(lastKeyRef.current),
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
      const newLastKey = itemsArray[itemsArray.length - 1]?.id;

      lastKeyRef.current = newLastKey;

      if (itemsArray.length < 4) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loadInitialData,
    hasMore,
    error,
    loading,
    loadMoreData,
  };
};

export default useData;
