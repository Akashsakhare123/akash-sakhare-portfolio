import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Project = lazy(() => import("./pages/Project"));
const Play = lazy(() => import("./pages/Play"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Play />
            </Suspense>
          }
        />
        <Route path="/projects/:slug" element={<Suspense fallback={<p role="status">Loading project...</p>}><Project /></Suspense>} />
        <Route path="*" element={<main id="main" className="myworks-page"><h1>Page not found</h1><a href="/">Back to Home</a></main>} />
      </Routes>


    </BrowserRouter>
  );
};

export default App;
