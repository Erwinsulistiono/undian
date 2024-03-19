// App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, DoorPrize, GrandPrize, Winner } from "./pages";
import { DataProvider } from "./pages/DataContext";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/grandprize",
    element: <GrandPrize />,
  },
  {
    path: "/doorprize",
    element: <DoorPrize />,
  },
  {
    path: "/winner",
    element: <Winner />,
  },
]);

const App: React.FC = () => {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
