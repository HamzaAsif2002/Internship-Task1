import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { getCityData, getCountryData } from "../services/handleApi";

export const Page3 = () => {
  const { formData, handleChange } = useOutletContext();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
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

  // get countrys from Api
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
    <div className="w-full h-screen bg-gray-500 p-4">
      {/* Full-width range slider */}
      <input
        type="range"
        min="1"
        max="3"
        Value="3"
        readOnly
        className="w-full mb-6"
      />

      {/* Centered Form Card */}
      <div className="w-full bg-white rounded-xl shadow-2xl flex justify-center items-center m-auto p-6 sm:w-[60%] lg:w-[40%]">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-1 text-center">
            Tell Us About Yourself
          </h1>
          <h1 className="text-md  mb-5 text-center">
            (Start with the basics — this helps us personalize your experience.)
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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

            <div className="flex justify-between mt-8 ">
              <button
                className="p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"
                onClick={handleNavigate}
              >
                Previous
              </button>

              <button
                type="submit"
                className="p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
