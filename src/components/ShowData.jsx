import { Edit, Eye, Trash2 } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";

export const ShowData = ({
  forms,
  loading,
  error,
  setSelectedForm,
  openEditModal,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();

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
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 h-auto min-h-[60vh] md:min-h-[80vh] ">
          {forms.map((form) => (
            <article
              key={form._id}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border hover:shadow-md transition bg-white"
            >
              <Avatar name={form.name} />

              {/* Main info */}
              <div className="flex-1 min-w-0 flex-col ">
                <div className="flex items-center justify-center gap-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                    {form.name || "—"}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-5">
                  <div className="mt-3 flex flex-col gap-4 text-sm text-slate-700 ">
                    <p className="truncate">
                      <span className="font-medium text-slate-800">City:</span>{" "}
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
                      <span className="font-medium text-slate-800">About:</span>{" "}
                      <span className="text-slate-700 whitespace-pre-wrap">
                        {form.about.length > 10
                          ? form.about.slice(0, 10) + "..."
                          : form.about}
                      </span>
                    </p>
                  </div>

                  {/* Action placeholder (visual only) */}
                  {isAuthenticated && (
                    <div className="flex flex-row gap-4 ml-auto sm:ml-0 sm:flex-col">
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
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

function Avatar({ name, size = 64 }) {
  // Use name or email as the seed (guarantees uniqueness + consistency)
  const seed = encodeURIComponent(name || "User");

  // Use Avataaars style with professional clothing options
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&clothingType=BlazerShirt,BlazerSweater,CollarSweater&topType=ShortHairShortFlat,ShortHairDreads01,ShortHairFrizzle,LongHairStraight2,LongHairCurvy&accessoriesType=Blank,Prescription01,Wayfarers&clotheColor=Blue03,Gray02,Black,PastelBlue,PastelGreen&backgroundColor=transparent`;

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden shadow-sm bg-gray-100"
      style={{ height: size, width: size }}
    >
      <img
        src={avatarUrl}
        alt={`${name || "User"} avatar`}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default Avatar;
