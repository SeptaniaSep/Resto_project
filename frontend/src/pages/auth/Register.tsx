import { useState } from "react";
import { RegisterUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Kasir",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await RegisterUser(formData);
      console.log("Register success:", res.data);
      navigate("/login");
      alert("User registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        {/* Icon */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white mb-2">
            🔒
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Register</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            >
              <option value="Kasir">Kasir</option>
              <option value="Pelayan">Pelayan</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Register
          </button>
        </form>

        {/* Link ke login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-gray-700 hover:text-gray-900"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
