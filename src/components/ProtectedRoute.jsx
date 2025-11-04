import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { Home } from "./Home";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to refresh access token using refresh cookie
        const res = await fetch("http://localhost:5000/api/auth/refresh", {
          method: "POST",
          credentials: "include", // sends cookies to backend
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("accessToken", data.token); // store new access token
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // show loading while checking
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }
  return <Outlet context={{ isAuthenticated, setIsAuthenticated }} />;

  // if not authenticated, redirect to login
  //   if (!isAuthenticated) {
  //     return (
  //       <Home
  //         isAuthenticated={isAuthenticated}
  //         setIsAuthenticated={setIsAuthenticated}
  //       />
  //     );
  //   }

  // if authenticated, render child route
};
