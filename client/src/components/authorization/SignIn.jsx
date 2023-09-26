import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      const response = await axios.post("/SignIn", {
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setLoginData({
          email: "",
          password: "",
        });

        navigate("/Home");
        toast.success("Login Success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-400 p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          />
          <div className="password-input flex items-center border rounded-md py-2 px-3 w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full"
            />
            <span
              className="password-toggle ml-2 cursor-pointer"
              onClick={handlePasswordToggle}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full">
            Login
          </button>
        </form>
        <p className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/SignUp" className="text-blue-600">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
