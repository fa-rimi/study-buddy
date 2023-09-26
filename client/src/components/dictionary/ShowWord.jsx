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
      <div className="relative bg-gray-100 rounded-lg shadow-lg p-4 w-[800px] h-[800px]">
        <button
          onClick={onClose}
          className="absolute top-[30px] right-[30px] m-2 text-gray-600 hover:text-red-500">
          <GrClose size={25} />
        </button>
        {isEditing ? (
          <div>
            <h2>Update Word</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="updatedWord" className="block mb-2">
                  Word
                </label>
                <input
                  type="text"
                  id="updatedWord"
                  name="word"
                  value={updatedWord.word}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="updatedDefinition" className="block mb-2">
                  Definition
                </label>
                <textarea
                  id="updatedDefinition"
                  name="definition"
                  value={updatedWord.definition}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="updatedExample" className="block mb-2">
                  Example
                </label>
                <textarea
                  id="updatedExample"
                  name="example"
                  value={updatedWord.example}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"></textarea>
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>{word.word}</h2>
            <p>Definition: {word.definition}</p>
            <p>Example: {word.example}</p>
            <div>
              <button type="button" onClick={() => setIsEditing(true)}>
                Update
              </button>
              <button type="button" onClick={handleDelete}>
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
