import { Edit, Eye, Trash2 } from "lucide-react";

export const ShowData = ({
  forms,
  loading,
  error,
  setSelectedForm,
  openEditModal,
  handleDelete,
}) => {
  return (
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
                    <span className="font-medium text-slate-800">City:</span>{" "}
                    {form.city || "—"}
                  </p>
                  <p className="truncate">
                    <span className="font-medium text-slate-800">Country:</span>{" "}
                    {form.country || "—"}
                  </p>
                  <p className="truncate">
                    <span className="font-medium text-slate-800">Gender:</span>{" "}
                    {form.gender || "—"}
                  </p>
                  <p className="sm:col-span-2 break-words">
                    <span className="font-medium text-slate-800">About:</span>{" "}
                    <span className="text-slate-700 whitespace-pre-wrap">
                      {form.about.length > 10
                        ? form.about.slice(0, 10) + "..."
                        : form.about}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action placeholder (visual only) */}
              <div className="flex flex-col gap-4 ml-auto sm:ml-0">
                <button
                  onClick={() => setSelectedForm(form)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-600"
                  title="View (UI-only)"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleDelete(form._id)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-600"
                  title="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => openEditModal(form)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-600"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
