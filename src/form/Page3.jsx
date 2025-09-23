import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCityData, getCountryData } from "../services/handleApi";
import { useForm } from "../context/FormContext";

export const Page3 = () => {
  const { formData, handleChange } = useForm();

  // For navigation
  const navigate = useNavigate();

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("../previewform");
  };

  // Get Countrys from Api
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountryData();
        const names = data.map((c) => c.name.common); // extract country names
        setCountries(names);
      } catch (error) {
        console.error("Failed to load countries", error);
      }
    };

    fetchCountries();
  }, []);

  // get cities from Api
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!formData.country) return;

    const fetchCity = async () => {
      try {
        const data = await getCityData(formData.country);
        setCities(data);
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };

    fetchCity();
  }, [formData.country]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-rose-50 p-6">
      <div className="w-full sm:w-[70%] lg:w-[40%] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Form */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-slate-900">
              Step 3: <span className="text-indigo-600">Location</span>
            </h1>
            <p className="text-sm text-slate-600 mb-4 flex justify-center">
              Select your country and city so we can tailor local content.
            </p>

            {/* Progress bar */}
            <div className="w-full mb-8">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-indigo-500 to-sky-400 w-3/3"></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Step 3 of 3
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Country */}
              <div className="flex flex-col">
                <label htmlFor="country" className="mb-1 font-medium">
                  Country:
                </label>
                <select
                  name="country"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm bg-white disabled:opacity-60"
                >
                  <option value="">Select your country</option>
                  {countries.map((country, idx) => (
                    <option key={idx} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Please select your country.
                </p>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label htmlFor="city" className="mb-1 font-medium">
                  City:
                </label>
                <select
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm bg-white disabled:opacity-60"
                >
                  <option value="">Select your City</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Please select your city.
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
                  Submit →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
