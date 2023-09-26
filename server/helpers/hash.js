const bcrypt = require("bcrypt");

// Define a function to hash a password using bcrypt
const hashPassword = async (password) => {
  // Generate a salt and hash the password in a single step
  const saltRounds = 10; // This variable determines the number of salt rounds to use when generating a salt. More rounds increase security but also make the hashing process slower. You can adjust this value based on your security requirements.

  try {
    // Generate a salt and hash the password using bcrypt.hash
    // We call bcrypt.hash to generate a salt and hash the password in a single step. This simplifies the code and eliminates the need for a separate bcrypt.genSalt call.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword; // Return the securely hashed password
  } catch (error) {
    // Handle any errors that occur during the hashing process
    console.error("Error hashing password:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

const comparePassword = (password, hashed) => {
  // This function will be used to compare a plain text password with a hashed password stored in the database.

  // Use bcrypt.compare to compare the plain text password with the stored hashed password
  return bcrypt.compare(password, hashed);
  // The function returns a promise that resolves to a boolean value:
  // - If the passwords match, it resolves to true.
  // - If the passwords don't match, it resolves to false.
};

module.exports = {
  hashPassword,
  comparePassword,
};
