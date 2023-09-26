import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import NewEntry from "../components/dictionary/NewEntry";
import SearchBar from "../components/dictionary/SearchBar";
import NavBar from "../components/navbar/Navbar";

const DictionaryPg = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-row w-[100vw] h-[100vh]">
      <nav className="w-[60px]">
        <NavBar />
      </nav>

      <div className="flex w-[100vw] h-full">
        <span className="flex flex-row items-center fixed top-5 right-5">
          <button
            onClick={openPopup}
            className="flex items-center text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-3 mr-4">
            <BsPlusLg size={30} />
          </button>
          <SearchBar />
        </span>
      </div>

      <main className="flex w-[100vw]">
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-600 opacity-70"></div>
            <div className="relative bg-gray-100 rounded-lg shadow-lg p-4 w-[800px] h-[800px]">
              <button
                onClick={closePopup}
                className="absolute top-[30px] right-[30px] m-2 text-gray-600 hover:text-red-500">
                <GrClose size={25} />
              </button>
              <NewEntry />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DictionaryPg;
