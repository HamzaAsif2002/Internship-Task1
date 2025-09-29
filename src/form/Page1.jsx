import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../context/FormContext"; // your existing context
import { Form } from "antd";

export const Page1 = () => {
  const { formData, handleChange } = useForm(); // keep your existing context usage
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // errors object: { name: string|null, email: string|null, password: string|null }
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const validateAll = () => {
    const newErrors = { name: null, email: null, password: null };

    // name: required + length 10-15
    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 10) {
      newErrors.name = "Name must be at least 10 characters";
    } else if (formData.name.length > 15) {
      newErrors.name = "Name must be at most 15 characters";
    }

    // email: simple pattern
    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // password: regex
    const pw = formData.password ?? "";
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!pw) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(pw)) {
      newErrors.password =
        "Password must be 8–16 chars, include 1 uppercase, 1 number & 1 special character";
    }

    setErrors(newErrors);

    // return whether valid
    return Object.values(newErrors).every((v) => v === null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      // all good -> navigate and/or persist to context
      navigate("../page2");
    } else {
      // focus first invalid field (optional)
      const firstField = Object.keys(errors).find((k) => errors[k]);
      if (firstField) {
        const el = document.getElementById(firstField);
        if (el) el.focus();
      }
    }
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
          <Form.Item
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
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
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm w-full"
            />
            <p className="text-xs text-slate-500 mt-1">
              Name must be 10–15 characters long
            </p>
          </Form.Item>

          {/* E-mail */}
          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
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
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm w-full"
            />
            <p className="text-xs text-slate-500 mt-1">
              Example: user@example.com
            </p>
          </Form.Item>

          {/* Password */}
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password}
          >
            <label
              htmlFor="password"
              className="mb-1 font-medium text-slate-700"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm pr-12 w-full"
              />

              {/* Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Must be 8–16 chars, include 1 uppercase, 1 number & 1 special
              character.
            </p>
          </Form.Item>

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

export default Page1;
