import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/Home/Home"));
const Teachers = lazy(() => import("./pages/Teachers/Teachers"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
import AppBar from "./components/AppBar/AppBar";
import RiadMore from "./components/RiadMore/RiadMore";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<Teachers />}>
          <Route path="about" element={<RiadMore />} />
        </Route>
        <Route path="/favorites" element={<Favorites />}>
          <Route path="about" element={<RiadMore />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
