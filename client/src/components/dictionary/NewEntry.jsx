import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
  const navigate = useNavigate();

  const [entryData, setEntryData] = useState({
    word: "",
    definition: "",
    example: "",
    tags: "", // Initialize tags as an empty string
  });

  const handleChange = (e) => {
    if (e.target.name === "tags") {
      setEntryData({
        ...entryData,
        [e.target.name]: e.target.value,
      });
    } else {
      setEntryData({
        ...entryData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { word, definition, example } = entryData;

    try {
      const response = await axios.post("/NewEntry", {
        word,
        definition,
        example,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setEntryData({
          word: "",
          definition: "",
          example: "",
        });

        navigate("/Dictionary");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error: Does word exist?");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[800px]">
        <h2 className="text-2xl font-semibold mb-4">Create a New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="word" className="text-lg font-medium">
              Word
            </label>
            <input
              type="text"
              name="word"
              id="word"
              placeholder="Enter Word"
              onChange={handleChange}
              value={entryData.word}
              className="border rounded-md py-2 px-3 mt-1"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="definition" className="text-lg font-medium">
              Definition
            </label>
            <textarea
              name="definition"
              id="definition"
              placeholder="Enter Definition"
              onChange={handleChange}
              value={entryData.definition}
              className="border rounded-md py-2 px-3 mt-1 max-h-[200px]"
              rows="2"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="example" className="text-lg font-medium">
              Example
            </label>
            <textarea
              type="text"
              name="example"
              id="example"
              placeholder="Enter Example"
              onChange={handleChange}
              value={entryData.example}
              className="border rounded-md py-2 px-3 mt-1 max-h-[250px]"
              rows="2"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Create New Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEntry;
