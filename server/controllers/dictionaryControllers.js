const Dictionary = require("../models/dictionary"); // Make sure to import your Dictionary model

const newEntry = async (req, res) => {
  try {
    // Extract the word data from the request body
    const { word, definition, example } = req.body;

    // Check if the word already exists in the dictionary
    const existingWord = await Dictionary.findOne({ word });

    if (existingWord) {
      // If the word exists, send an error response
      return res.status(400).json({ error: "Word already exists" });
    }

    // Create a new word entry
    const newWord = new Dictionary({
      word,
      definition,
      example,
    });

    // Save the new word entry to the database
    await newWord.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Word created successfully", word: newWord });
  } catch (error) {
    console.error("Error creating word:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const displayWords = async (req, res) => {
  try {
    // Fetch all words from the database
    const words = await Dictionary.find().sort({ word: "asc" });

    // Send the words as a JSON response
    res.json(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateWord = async (req, res) => {
  try {
    const { _id } = req.params; // Assuming you pass the word ID as a route parameter
    const { word, definition, example } = req.body; // Assuming you send the updated word data in the request body

    // Find the word by ID and update it
    const updatedWord = await Dictionary.findByIdAndUpdate(
      _id,
      { word, definition, example },
      { new: true }
    );

    if (!updatedWord) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.status(200).json(updatedWord);
  } catch (error) {
    console.error("Error updating word:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteWord = async (req, res) => {
  try {
    const { _id } = req.params; // Assuming you pass the word ID as a route parameter

    // Find the word by ID and remove it
    const deletedWord = await Dictionary.findByIdAndRemove(_id);

    if (!deletedWord) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.status(200).json({ message: "Word deleted successfully" });
  } catch (error) {
    console.error("Error deleting word:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  newEntry,
  displayWords,
  updateWord,
  deleteWord,
};
