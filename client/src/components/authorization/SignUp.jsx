import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const isPasswordValid =
    registerData.confirm === registerData.password &&
    registerData.confirm.length >= 6;

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerData;

    try {
      const response = await axios.post("/SignUp", {
        name,
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirm: "",
        });

        toast.success("Registered successfully");
        toast.success(`${name}'s dictionary created.`);

        navigate("/Home");
        toast.success("Register Success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-blue-400 p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={registerData.name}
            onChange={handleChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={registerData.email}
            onChange={handleChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={registerData.password}
            onChange={handleChange}
            required
            className="border rounded-md py-2 px-3 w-full"
          />
          <div className="password-confirm flex items-center border rounded-md py-2 px-3 w-full">
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={registerData.confirm}
              onChange={handleChange}
              required
              className="w-full"
            />
            {isPasswordValid && (
              <FaCheckCircle className="checkmark-icon" color="green" />
            )}
          </div>
          <button
            type="submit"
            disabled={!isPasswordValid}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full">
            Create Account
          </button>
        </form>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/SignIn" className="text-blue-600">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
