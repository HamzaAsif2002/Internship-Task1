import { useNavigate } from "react-router";
import { useForm } from "../context/FormContext";
import { useState } from "react";

export const PreviewForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { formData, resetForm } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    // go back to page1 for editing (change path if your edit page differs)
    navigate("/page1");
  };

  //handle reset.
  const handleReset = () => {
    resetForm();
    navigate("/");
  };

  //handle submitButton.
  // inside handleConfirm in PreviewForm component
  const handleConfirm = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        resetForm();
        console.log("Saved to backend:", data.data);
      } else {
        console.error("Failed to save:", data);
        // show user-friendly error
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <div className="w-full sm:w-[70%] lg:w-[40%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-extrabold mb-6 text-center text-slate-900">
              <span className="text-indigo-600">Preview Your Details</span>
            </h1>

            <div className="grid grid-cols-1 gap-5">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  Full Name
                </label>
                <div className="mt-1 text-slate-800">{formData?.name}</div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  Email
                </label>
                <div className="mt-1 text-slate-800">{formData?.email}</div>
              </div>

              {/* Password*/}
              <div className="flex flex-col relative">
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <div className="mt-1 text-gray-800 pr-10">
                  {/* {showPassword ? formData?.password : "••••••••"} */}
                  {showPassword
                    ? formData?.password || "" // show actual password if exists, otherwise empty
                    : formData?.password // if password exists
                    ? "••••••••" // show dots
                    : ""}
                </div>
                {/*Password Toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* About */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  About
                </label>
                <div className="mt-1 whitespace-pre-wrap text-slate-800">
                  {formData?.about}
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  Gender
                </label>
                <div className="mt-1 text-slate-800">{formData?.gender}</div>
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  Country
                </label>
                <div className="mt-1 text-slate-800">{formData?.country}</div>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-slate-600">
                  City
                </label>
                <div className="mt-1 text-slate-800">{formData?.city}</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Reset
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow hover:-translate-y-0.5 transition transform"
                >
                  Edit
                </button>

                <button
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 text-indigo-700 hover:bg-indigo-50 transition"
                >
                  Confirm
                </button>
              </div>
            </div>

            {/* small note */}
            <p className="mt-4 text-xs text-slate-500 text-center">
              You can edit your information or confirm to finish. Data is stored
              locally and can be reset.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Your form submitted successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              You can now go back to the home page.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Go Back Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
