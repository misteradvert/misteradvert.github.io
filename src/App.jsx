// import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import MainPage from "./components/pages/MainPage";
import PostPage from "./components/pages/PostPage";

function App() {
  // const [user, setUser] = useState();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/message/:userId/:postId",
          element: <PostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
