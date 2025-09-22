import { Link, useNavigate, useOutletContext } from "react-router";

export const Page2 = () => {
  const { formData, handleChange } = useOutletContext();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("../page3");
  };
  return (
    <div className="w-full h-screen bg-gray-500 p-4">
      {/* Full-width range slider */}
      <input
        type="range"
        min="1"
        max="3"
        Value="2"
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
            {/* Gender */}
            <div className="flex flex-col">
              <span className="mb-1 font-medium">Gender:</span>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    required // put required on ONE radio in the group
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Please choose one option.
              </p>
            </div>

            {/* About */}
            <div className="flex flex-col">
              <label htmlFor="about" className="mb-1 font-medium">
                About:
              </label>
              <textarea
                name="about"
                id="about"
                placeholder="Write something about yourself..."
                required
                onChange={handleChange}
                value={formData.about}
                rows={4} // controls height
                className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                You can share your background, interests, or goals here.
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
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
