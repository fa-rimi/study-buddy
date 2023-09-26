const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/hash");
const { createToken, verifyToken } = require("../helpers/jwt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for name
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    // Check for password
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password must contain 6 characters",
      });
    }

    // Check for email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: "Email is already in use",
      });
    }

    // Hash the provided password
    const hashedPassword = await hashPassword(password);

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a new token and set it as a cookie
    const token = createToken(user);

    // Respond with the newly created user and token
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user,
      token,
    });
  } catch (error) {
    // Handle and respond with appropriate error messages
    console.error(error);
    res.status(400).json({ error: error.message || "Registration failed" });
  }
};

// Handler for logging in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "Email not found",
      });
    }

    // Check if the provided password matches the stored hashed password
    const checkMatch = await comparePassword(password, user.password);
    if (checkMatch) {
      // Password is correct, generate a new token
      const token = createToken(user);

      // Verify the token to ensure the user is authenticated
      const decodedToken = verifyToken(token);
      if (decodedToken) {
        // Set the token as a cookie
        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Respond with a success message, user details, and token
        res.json({
          message: "Correct password",
          user, // Send the user details
          token, // Send the token as part of the response
        });
      } else {
        // Token verification failed
        return res.json({
          error: "Token verification failed",
        });
      }
    } else {
      // Password is incorrect
      return res.json({
        error: "Incorrect password",
      });
    }
  } catch (error) {
    // Handle and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
