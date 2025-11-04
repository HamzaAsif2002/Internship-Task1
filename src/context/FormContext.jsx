import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          password: "",
          about: "",
          gender: "",
          country: "",
          city: "",
        };
  });

  // handle local storage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //reset form.
  const resetForm = useCallback(() => {
    const empty = {
      name: "",
      email: "",
      password: "",
      about: "",
      gender: "",
      country: "",
      city: "",
    };
    setFormData(empty);
    try {
      localStorage.removeItem("formData");
    } catch {}
  }, []);

  const value = {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Hook to consume the context
export const useForm = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used inside FormProvider");
  return ctx;
};
