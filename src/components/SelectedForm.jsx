export const SelectedForm = ({ setSelectedForm, selectedForm }) => {
  return (
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
  );
};
