import { useState } from "react";
import { Link, Outlet } from "react-router";

export const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    gender: "",
    country: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);
  return (
    <div>
      <div className="my-7 flex justify-center">
        <Link
          to="page1"
          className="p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"
        >
          Start Registration
        </Link>
      </div>

      <div className="w-[80%] flex justify-center m-auto">
        <Outlet context={{ formData, handleChange }} />
      </div>
    </div>
  );
};
