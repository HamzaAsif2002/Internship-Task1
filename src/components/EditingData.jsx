import { Save, X } from "lucide-react";

export const EditingData = ({
  cancelEdit,
  submitEdit,
  editingData,
  handleEditChange,
  editSaving,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={cancelEdit}
      />

      <form
        onSubmit={submitEdit}
        className="relative w-[95%] max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing when clicking inside
      >
        <button
          type="button"
          onClick={cancelEdit}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
          aria-label="Close edit"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Edit Entry</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Full name
            </label>
            <input
              name="name"
              value={editingData.name}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={editingData.email}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Password
            </label>
            <input
              name="password"
              type="text"
              value={editingData.password}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Gender</label>
            <select
              name="gender"
              value={editingData.gender}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Country</label>
            <input
              name="country"
              value={editingData.country}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">City</label>
            <input
              name="city"
              value={editingData.city}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-600 mb-1">About</label>
            <textarea
              name="about"
              value={editingData.about}
              onChange={handleEditChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
            disabled={editSaving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold"
            disabled={editSaving}
          >
            {editSaving ? (
              "Saving..."
            ) : (
              <>
                <Save size={14} />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
