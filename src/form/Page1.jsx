import { useNavigate, useOutletContext } from "react-router";

export const Page1 = () => {
  const { formData, handleChange } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (formData.name.length < 10 || formData.name.length > 15) {
      alert("Name must be 10–15 characters long");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formData.password
      )
    ) {
      alert(
        "Password must be 8–16 chars with 1 uppercase, 1 number, 1 special char"
      );
      return;
    }

    // if everything is valid -> go to Page2

    navigate("../page2");
  };

  return (
    <div className="w-full h-screen bg-gray-500 p-4">
      <input
        type="range"
        min="1"
        max="3"
        Value="1"
        readOnly
        className="w-full mb-6"
      />

      <div className="w-full bg-white rounded-xl shadow-2xl flex justify-center items-center m-auto p-6 sm:w-[60%] lg:w-[40%]">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-1 text-center">
            Tell Us About Yourself
          </h1>
          <h1 className="text-md mb-5 text-center">
            (Start with the basics — this helps us personalize your experience.)
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-medium">
                Full Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-sm text-gray-500 mt-1">
                Name must be 10–15 characters long
              </p>
            </div>

            {/* E-mail */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium">
                E-mail:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-sm text-gray-500 mt-1">
                Email must be a valid (e.g., user@example.com)
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-sm text-gray-500 mt-1">
                Password must be 8–16 characters long, with at least one
                uppercase letter, one number, and one special character.
              </p>
            </div>

            {/* Submit button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="p-3 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
