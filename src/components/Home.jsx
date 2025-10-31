import { PlusCircle, RefreshCcw, VenusAndMars } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  const BASE_URL = "http://localhost:5000";

  // change baseUrl via env var in production if needed

  useEffect(() => {
    let mounted = true;

    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/forms");
        const data = await res.json();
        if (!mounted) return;
        if (res.ok && data.success) {
          setForms(data.data || []);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch forms");
        }
      } catch (err) {
        if (!mounted) return;
        setError("Network error: " + err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchForms();
    return () => {
      mounted = false;
    };
  }, [BASE_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <main className="w-[80%] justify-center items-center m-auto">
        <div className="flex items-center justify-center mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Multi-Step Registration
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Data saved to your backend — view, refresh, or add new entries.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="mt-8">
            <div className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VenusAndMars size={18} />
                <select
                  name="gender"
                  id="gender"
                  className="bg-transparent text-white font-medium outline-none appearance-none cursor-pointer"
                >
                  <option value="select" className="text-slate-800">
                    Select Gender
                  </option>
                  <option value="male" className="text-slate-800">
                    Male
                  </option>
                  <option value="female" className="text-slate-800">
                    Female
                  </option>
                  <option value="others" className="text-slate-800">
                    Others
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center bg-gradient-to-r from-indigo-600 to-sky-500 rounded-full shadow-md">
              <input
                type="text"
                placeholder="Search by country..."
                className="w-full px-5 py-3 bg-transparent text-white placeholder-white placeholder-opacity-80 font-medium rounded-full outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/page1")}
              className="flex gap-2 w-full px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
            >
              <PlusCircle size={20} />
              <p>Add</p>
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetch(`${BASE_URL}/api/forms`)
                  .then((r) => r.json())
                  .then((d) => {
                    if (d.success) setForms(d.data || []);
                    else setError(d.message || "Failed to fetch");
                  })
                  .catch((e) => setError("Network error: " + e.message))
                  .finally(() => setLoading(false));
              }}
              className="flex gap-2 w-full px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
            >
              <RefreshCcw size={20} />
              <p>Refresh</p>
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 border border-transparent ">
          {loading ? (
            <div className="py-14 text-center text-slate-500">Loading…</div>
          ) : error ? (
            <div className="py-10 text-center text-red-600">{error}</div>
          ) : forms.length === 0 ? (
            <div className="py-12 text-center text-slate-600">
              No form data found.
            </div>
          ) : (
            <div className="space-y-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {forms.map((form) => (
                <article
                  key={form._id}
                  className="h-[200px] group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border hover:shadow-md transition bg-white"
                >
                  {/* Avatar / initials */}
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-lg">
                    {(form.name && form.name[0]?.toUpperCase()) || "U"}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div className="truncate">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                          {form.name || "—"}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-slate-700 ">
                      <p className="truncate">
                        <span className="font-medium text-slate-800">
                          City:
                        </span>{" "}
                        {form.city || "—"}
                      </p>
                      <p className="truncate">
                        <span className="font-medium text-slate-800">
                          Country:
                        </span>{" "}
                        {form.country || "—"}
                      </p>
                      <p className="truncate">
                        <span className="font-medium text-slate-800">
                          Gender:
                        </span>{" "}
                        {form.gender || "—"}
                      </p>
                      <p className="sm:col-span-2 break-words">
                        <span className="font-medium text-slate-800">
                          About:
                        </span>{" "}
                        <span className="text-slate-700 whitespace-pre-wrap">
                          {form.about.length > 10
                            ? form.about.slice(0, 10) + "..."
                            : form.about}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Action placeholder (visual only) */}
                  <div className="flex-shrink-0 ml-auto sm:ml-0">
                    <button
                      onClick={() => setSelectedForm(form)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-sm px-3 py-1 rounded-full border bg-slate-50 hover:bg-slate-100"
                      title="View (UI-only)"
                    >
                      View
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      {selectedForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[400px] p-6 relative">
            <button
              onClick={() => setSelectedForm(null)} // close modal
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-slate-800">
              {selectedForm.name}'s Details
            </h2>

            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>Email:</strong> {selectedForm.email}
              </p>
              <p>
                <strong>Password:</strong> {selectedForm.password}
              </p>
              <p>
                <strong>Gender:</strong> {selectedForm.gender}
              </p>
              <p>
                <strong>Country:</strong> {selectedForm.country}
              </p>
              <p>
                <strong>City:</strong> {selectedForm.city}
              </p>
              <p>
                <strong>About:</strong> {selectedForm.about}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedForm(null)}
                className="px-4 py-2 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
