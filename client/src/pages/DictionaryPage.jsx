import { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import NewEntry from "../components/dictionary/NewEntry";
import ShowWord from "../components/dictionary/ShowWord";
import NavBar from "../components/navbar/Navbar";
import axios from "axios";

const DictionaryPg = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [words, setWords] = useState([]);
  const [newWordData, setNewWordData] = useState({
    word: "",
    definition: "",
    example: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showWord, setShowWord] = useState(null); // Add a state for displaying the word popup

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/AllWords"); // Replace with your API endpoint for fetching words
        setWords(response.data); // Assuming your API returns an array of words
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitNewWord = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new word
      const response = await axios.post("/NewEntry", newWordData);

      if (response.status === 201) {
        // If the word was successfully created, refresh the form
        setNewWordData({
          word: "",
          definition: "",
          example: "",
        });

        // Refresh the word list
        const fetchData = async () => {
          try {
            const response = await axios.get("/AllWords");
            setWords(response.data);
          } catch (error) {
            console.error("Error fetching words:", error);
          }
        };

        fetchData();
      }
    } catch (error) {
      console.error("Error creating word:", error);
    }
  };

  const handleNewWordChange = (e) => {
    const { name, value } = e.target;
    setNewWordData({
      ...newWordData,
      [name]: value,
    });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWords = words.filter((word) => {
    const lowercaseWord = word.word.toLowerCase();
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    console.log("Lowercase Word:", lowercaseWord);
    console.log("Lowercase Search Term:", lowercaseSearchTerm);
    console.log("Is Included?", lowercaseWord.includes(lowercaseSearchTerm));
    return lowercaseWord.includes(lowercaseSearchTerm);
  });

  const handleUpdate = async (updatedWord) => {
    try {
      // Send an API request to update the word
      const response = await axios.put(
        `/updateWord/${updatedWord._id}`,
        updatedWord
      );

      if (response.status === 200) {
        // Update the word in the words state
        setWords((prevWords) => {
          return prevWords.map((word) => {
            if (word._id === updatedWord._id) {
              return updatedWord;
            } else {
              return word;
            }
          });
        });

        // Close the ShowWord popup
        setShowWord(null);
      }
    } catch (error) {
      console.error("Error updating word:", error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  const handleDelete = async (wordId) => {
    try {
      // Send an API request to delete the word
      const response = await axios.delete(`/DeleteWord/${wordId}`);

      if (response.status === 200) {
        // Remove the deleted word from the words state
        setWords((prevWords) => {
          return prevWords.filter((word) => word._id !== wordId);
        });

        // Close the ShowWord popup
        setShowWord(null);
      }
    } catch (error) {
      console.error("Error deleting word:", error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <nav className="w-[60px] fixed">
        <NavBar />
      </nav>

      <div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-600 opacity-70"></div>
            <div className="relative bg-gray-100 rounded-lg shadow-lg p-4 w-[800px] h-[800px]">
              <button
                onClick={closePopup}
                className="absolute top-[30px] right-[30px] m-2 text-gray-600 hover:text-red-500">
                <GrClose size={25} />
              </button>
              <NewEntry
                newWordData={newWordData}
                handleNewWordChange={handleNewWordChange}
                handleSubmitNewWord={handleSubmitNewWord}
              />
            </div>
          </div>
        )}
      </div>
      <main>
        <div>
          <div>
            <h2 className="relative text-[70px] left-24 top-10">Words</h2>
            <form className="fixed right-5 top-16">
              <div>
                <span className="flex flex-row items-center fixed right-[520px]">
                  <button
                    onClick={openPopup}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-3 mr-4">
                    <BsPlusLg size={30} />
                  </button>
                </span>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[500px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Word"
                value={searchTerm}
                onChange={handleSearchTermChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </form>
          </div>
          <table className="table-auto w-[90vw] relative top-24 left-24">
            <thead>
              <tr>
                <th className="px-4 py-2">Word</th>
                <th className="px-4 py-2">Definition</th>
                <th className="px-4 py-2">Example</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.length === 0 ? (
                <tr>
                  <td colSpan="3">No matching words found.</td>
                </tr>
              ) : (
                filteredWords.map((word) => (
                  <tr key={word._id}>
                    <td className="border px-4 py-2">
                      <span
                        onClick={() => setShowWord(word)}
                        className="text-blue-500 cursor-pointer">
                        {word.word}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{word.definition}</td>
                    <td className="border px-4 py-2">{word.example}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      {showWord && (
        <ShowWord
          word={showWord}
          onClose={() => setShowWord(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DictionaryPg;
