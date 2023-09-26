const express = require('express');
const { newEntry, displayWords, updateWord, deleteWord } = require('../controllers/dictionaryControllers');
const router = express.Router();

// Dictionary Routes
// Get: See All Words
router.get("/AllWords", displayWords)

// Post: Create Word 
router.post("/NewEntry", newEntry)

// Post: Update Word
router.put("/UpdateWord/:_id", updateWord);

// Delete: Delete Word
router.delete("/DeleteWord/:_id", deleteWord)

module.exports = router;