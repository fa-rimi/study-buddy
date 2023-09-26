import { ImBook } from "react-icons/im";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const NavBar = () => {
  return (
    <nav className="h-[100vh] w-[60px] bg-slate-800 flex flex-col items-center pt-3 pb-3">
      <div className="flex flex-col flex-grow items-center">
        <Link to="/Home">
          <HiHome size={40} color="white" className="mb-4" />
        </Link>
        <Link to="/Dictionary">
          <ImBook size={35} color="white" />
        </Link>
      </div>

      <LogoutBtn />
    </nav>
  );
};

export default NavBar;
