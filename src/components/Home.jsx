import {
  PlusCircle,
  RefreshCcw,
  VenusAndMars,
  LogOut,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { ShowData } from "./ShowData";
import { SelectedForm } from "./SelectedForm";
import { EditingData } from "./EditingData";

export const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();

  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);

  const BASE_URL = "http://localhost:5000";

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

  //Delete Method
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry? This cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/api/forms/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to delete");
        return;
      }
      setForms((cur) => cur.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // handle Put Method
  const [editingData, setEditingData] = useState(null);
  const [editSaving, setEditSaving] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // includes the refreshToken cookie
      });

      if (res.ok) {
        localStorage.removeItem("accessToken");
        alert("LogOut Sececcfully");
        setIsAuthenticated(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // When user clicks Edit (e.g., edit button per card) call this:
  const openEditModal = (form) => {
    // clone to avoid mutating original object directly
    setEditingData({
      _id: form._id,
      name: form.name || "",
      email: form.email || "",
      password: form.password || "",
      about: form.about || "",
      gender: form.gender || "",
      country: form.country || "",
      city: form.city || "",
    });
  };

  // handle field changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData((s) => ({ ...s, [name]: value }));
  };

  // call API to update
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editingData || !editingData._id) return;
    setEditSaving(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/forms/${editingData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingData.name,
          email: editingData.email,
          password: editingData.password,
          about: editingData.about,
          gender: editingData.gender,
          country: editingData.country,
          city: editingData.city,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update");
        return;
      }

      // update local forms state with returned updated document
      setForms((cur) =>
        cur.map((f) => (f._id === data.data._id ? data.data : f))
      );

      // close modal
      setEditingData(null);
    } catch (err) {
      console.error("Update error:", err);
      setError("Network error: " + err.message);
    } finally {
      setEditSaving(false);
    }
  };

  // close without saving
  const cancelEdit = () => {
    setEditingData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <main className="w-[80%] justify-center items-center m-auto">
        <div className="flex items-center justify-center mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Multi-Step Registration
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Data saved to your backend — view, refresh, or add new entries.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between mb-4 sm:flex-row gap-5 ">
          <button
            title={!isAuthenticated ? "Please log in to continue" : ""}
            onClick={() => navigate("/page1")}
            disabled={!isAuthenticated}
            className={`flex gap-2 w-fit px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 ${
              !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
            className="flex gap-2 w-fit px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
          >
            <RefreshCcw size={20} />
            <p>Refresh</p>
          </button>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex gap-2 w-fit px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
              >
                <LogOut size={20} />
                <p>Logout</p>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex gap-2 w-full px-5 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5"
              >
                <LogIn size={20} />
                <p>Login</p>
              </button>
            )}
          </div>
        </div>

        {/* Show data Component */}
        <ShowData
          forms={forms}
          loading={loading}
          error={error}
          setSelectedForm={setSelectedForm}
          handleDelete={handleDelete}
          openEditModal={openEditModal}
          isAuthenticated={isAuthenticated}
        />
      </main>
      {/* show full data when user click on view option */}
      {selectedForm && (
        <SelectedForm
          setSelectedForm={setSelectedForm}
          selectedForm={selectedForm}
        />
      )}
      {/* show Edit page when user click on edit option */}
      {editingData && (
        <EditingData
          cancelEdit={cancelEdit}
          submitEdit={submitEdit}
          editingData={editingData}
          handleEditChange={handleEditChange}
          editSaving={editSaving}
        />
      )}
    </div>
  );
};
