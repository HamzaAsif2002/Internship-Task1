import { Link, useNavigate } from "react-router";
import { useForm } from "../context/FormContext";

export const Page2 = () => {
  const { formData, handleChange } = useForm();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("../page3");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <div className="w-full sm:w-[70%] lg:w-[40%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form column */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-slate-900">
              Step 2: <span className="text-indigo-600">Personal Details</span>
            </h1>
            <p className="text-sm text-slate-600 mb-4 flex justify-center">
              A few personal details to help us personalize your experience.
            </p>

            {/* Progress bar */}
            <div className="w-full mb-8">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-sky-400 w-2/3"></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Step 2 of 3
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Gender */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-slate-700">
                  Gender
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="accent-indigo-600 h-4 w-4"
                    />
                    <span className="text-slate-700">Male</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="accent-indigo-600 h-4 w-4"
                    />
                    <span className="text-slate-700">Female</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleChange}
                      className="accent-indigo-600 h-4 w-4"
                    />
                    <span className="text-slate-700">Other</span>
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Please choose one option.
                </p>
              </div>

              {/* About */}
              <div className="flex flex-col">
                <label
                  htmlFor="about"
                  className="mb-2 font-medium text-slate-700"
                >
                  About
                </label>
                <textarea
                  name="about"
                  id="about"
                  placeholder="Tell us about your background, interests or goals..."
                  value={formData.about}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="resize-y border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Share a short bio — this helps us personalize recommendations.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-3">
                <button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                >
                  ← Previous
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-lg hover:-translate-y-0.5 active:scale-95 transition transform"
                >
                  Next →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
