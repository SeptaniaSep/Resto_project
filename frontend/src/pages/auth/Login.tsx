import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../hooks/auth";

type LoginPageProps = {
  onLogin?: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await LoginUser(formData);

      if (res.data.status !== 200) {
        alert(res.data.message);
        return;
      }

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("name", res.data.data.user.name);
      localStorage.setItem("role", res.data.data.user.roles[0]);

      alert("Login berhasil!");
      if (onLogin) onLogin();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login gagal, cek email & password!");
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
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-gray-700 hover:text-gray-900"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
