import { useNavigate } from "react-router";
import { useForm } from "../context/FormContext";
import { useState } from "react";

export const Page1 = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formData, handleChange } = useForm();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (formData.name.length < 10 || formData.name.length > 15) {
      alert("Name must be 10–15 characters long");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formData.password
      )
    ) {
      alert(
        "Password must be 8–16 chars with 1 uppercase, 1 number, 1 special char"
      );
      return;
    }

    // if everything is valid -> go to Page2

    navigate("../page2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <div className="w-full sm:w-[70%] lg:w-[40%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        {/* Step Heading */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-slate-900">
          Step 1: <span className="text-indigo-600">Basic Info</span>
        </h1>

        {/* Progress bar */}
        <div className="w-full mb-8">
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-sky-400 w-1/3"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">Step 1 of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-slate-700">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              Name must be 10–15 characters long
            </p>
          </div>

          {/* E-mail */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-slate-700">
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
            <p className="text-xs text-slate-500 mt-1">
              Example: user@example.com
            </p>
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-slate-700"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm pr-12"
            />

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            <p className="text-xs text-slate-500 mt-1">
              Must be 8–16 chars, include 1 uppercase, 1 number & 1 special
              character.
            </p>
          </div>

          {/* Submit button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-500 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-95"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
