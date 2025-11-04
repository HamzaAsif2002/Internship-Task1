import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./components/Home";
import { Page1 } from "./form/Page1";
import { Page2 } from "./form/Page2";
import { Page3 } from "./form/Page3";
import { PreviewForm } from "./form/PreviewForm";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignUpPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />, // protect everything inside
      children: [
        { path: "/", element: <Home /> },
        { path: "page1", element: <Page1 /> },
        { path: "page2", element: <Page2 /> },
        { path: "page3", element: <Page3 /> },
        { path: "previewform", element: <PreviewForm /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
