import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";

const LogoutBtn = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    // Clear user authentication (e.g., remove tokens, clear cookies, etc.)
    localStorage.removeItem("authToken"); // Clear JWT token from local storage

    // Redirect the user to the login page or any other appropriate route
    navigate("/SignIn"); // Navigate back to sign in page
  };

  return (
    <div className="">
      <button type="button" onClick={handleLogout}>
        <BsBoxArrowRight size={40} color="white" />{" "}
      </button>
    </div>
  );
};

export default LogoutBtn;
