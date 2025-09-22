import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "./components/Home";
import { Page1 } from "./form/Page1";
import { Page2 } from "./form/Page2";
import { Page3 } from "./form/Page3";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "page1",
          element: <Page1 />,
        },
        {
          path: "page2",
          element: <Page2 />,
        },
        {
          path: "page3",
          element: <Page3 />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
