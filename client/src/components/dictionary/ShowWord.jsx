/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

const ShowWord = ({ word, onClose, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedWord, setUpdatedWord] = useState({ ...word });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWord({ ...updatedWord, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the word
      const response = await axios.put(`/updateWord/${word._id}`, updatedWord);

      if (response.status === 200) {
        setIsEditing(false); // Exit editing mode
      }
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete called");
    try {
      // Send a DELETE request to delete the word
      const response = await axios.delete(`/DeleteWord/${word._id}`);

      if (response.status === 200) {
        onDelete(word._id); // Notify the parent component of the deletion
        onClose(); // Close the ShowWord popup
      }
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-70"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-[800px] h-[800px]">
        <button
          onClick={onClose}
          className="absolute top-[30px] right-[30px] m-2 text-gray-600 hover:text-red-500">
          <GrClose size={25} />
        </button>
        {isEditing ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Update Word</h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="updatedWord" className="text-lg font-medium">
                  Word
                </label>
                <input
                  type="text"
                  id="updatedWord"
                  name="word"
                  value={updatedWord.word}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="updatedDefinition" className="text-lg font-medium">
                  Definition
                </label>
                <textarea
                  id="updatedDefinition"
                  name="definition"
                  value={updatedWord.definition}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 mt-1 max-h-[200px]"
                  rows="2"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="updatedExample" className="text-lg font-medium">
                  Example
                </label>
                <textarea
                  id="updatedExample"
                  name="example"
                  value={updatedWord.example}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 mt-1 max-h-[250px]"
                  rows="2"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Update
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold">{word.word}</h2>
            <p className="text-lg font-medium">Definition: {word.definition}</p>
            <p className="text-lg font-medium">Example: {word.example}</p>
            <div className="space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowWord;
