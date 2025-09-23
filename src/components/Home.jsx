import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      {/* Left card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 ring-1 ring-slate-100">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Create your profile —{" "}
              <span className="text-indigo-600">fast</span> &{" "}
              <span className="text-sky-600">secure</span>
            </h1>

            <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-lg">
              Start a quick 3-step registration. Your progress is saved
              automatically — come back anytime to finish.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-indigo-50 text-indigo-600 font-semibold">
                  ✓
                </span>
                Auto-save in browser
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-sky-50 text-sky-600 font-semibold">
                  🌍
                </span>
                Country & city picker
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-rose-50 text-rose-600 font-semibold">
                  🔒
                </span>
                Secure password rules
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => navigate("/page1")}
                className=" px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-lg transform transition hover:-translate-y-1 hover:scale-[1.01] active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Start Registration
              </button>

              <button
                onClick={() => navigate("/previewform")}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Preview
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-indigo-500 to-sky-400"
                  style={{ width: "0%" }}
                />
              </div>
              <span>Step 1 of 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
