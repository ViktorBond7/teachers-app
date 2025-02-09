import {
  get,
  limitToFirst,
  limitToLast,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import database from "../Firebase";
import { useCallback, useEffect, useRef, useState } from "react";

const useData1 = () => {
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const getTotalCount = async () => {
    try {
      const snapshot = await get(ref(database, "/teachers"));

      return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    } catch (error) {
      console.error("Помилка отримання кількості елементів:", error);
      return 0;
    }
  };

  useEffect(() => {
    getTotalCount().then(setTotalCount);
  }, []);

  const loadMoreData = async () => {
    // if (!lastKey || !hasMore) return;
    setError(null);
    setLoading(true);
    const dataQuery = query(
      ref(database, "/teachers"),
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

      if (itemsArray.length < 3) {
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
    setHasMore(false);
    try {
      const dataQuery = query(ref(database, "/teachers"), limitToFirst(4));

      const snapshot = await get(dataQuery);
      if (snapshot.exists()) {
        const items = snapshot.val();
        const itemsArray = Object.entries(items).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setData(itemsArray);
        setLastKey(itemsArray[itemsArray.length - 1].id);

        if (itemsArray.length < 3) {
          setHasMore(false);
        } else {
          setHasMore(true);
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

// export default useData;

const useData = () => {
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const lastKeyRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Отримуємо загальну кількість викладачів
  const getTotalCount = async () => {
    try {
      const snapshot = await get(ref(database, "/teachers"));

      return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    } catch (error) {
      console.error("Помилка отримання кількості елементів:", error);
      return 0;
    }
  };

  useEffect(() => {
    getTotalCount().then(setTotalCount);
  }, []);

  // Завантажуємо викладачів з урахуванням пагінації
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

        // 🔥 Враховуємо тільки фільтровані елементи
        if (newData.length < 4) {
          setTimeout(() => loadInitialData(newData, newLastKey), 1000);
        }
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
    // if (!lastKey || !hasMore) return;

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
      // setLastKey(newLastKey);

      if (itemsArray.length < 4 && `${data.length + itemsArray.length}` <= 30) {
        setTimeout(() => loadMoreData(itemsArray, newLastKey), 1000);
      }

      if (itemsArray.length < 3) {
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

// const useData = () => {
//   const [data, setData] = useState([]);
//   const [lastKey, setLastKey] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchMoreData = async (currentData = [], currentLastKey = lastKey) => {
//     if (!hasMore) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const dataQuery = query(
//         ref(database, "/teachers"),
//         orderByKey(),
//         currentLastKey ? startAfter(currentLastKey) : limitToFirst(4),
//         limitToFirst(4)
//       );

//       const snapshot = await get(dataQuery);
//       if (!snapshot.exists()) {
//         setHasMore(false);
//         setLoading(false);
//         return;
//       }

//       const items = snapshot.val();
//       const newItems = Object.entries(items).map(([key, value]) => ({
//         id: key,
//         ...value,
//       }));

//       const newData = [...currentData, ...newItems];
//       const newLastKey = newItems[newItems.length - 1]?.id;

//       if (newData.length < 4) {
//         // Якщо ще недостатньо елементів — викликаємо рекурсію
//         return fetchMoreData(newData, newLastKey);
//       }

//       // Якщо вже 4 або більше елементів — оновлюємо стан
//       setData((prevData) => [...prevData, ...newData]);
//       setLastKey(newLastKey);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMoreData(); // Викликаємо рекурсивну функцію при першому рендері
//   }, []);

//   return { data, fetchMoreData, hasMore, error, loading };
// };

// export default useData;
