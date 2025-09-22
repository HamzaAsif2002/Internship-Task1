import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

// get countrys
export const getCountryData = async () => {
  try {
    const response = await api.get("/all?fields=name");
    return response.data; // return data directly
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

//get cities

export const getCityData = async (country) => {
  try {
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      { country },
      { headers: { "Content-Type": "application/json" } }
    );
    return Array.isArray(response?.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
