const jwt = require("jsonwebtoken");

const createToken = () => {
  return jwt.sign({}, process.env.SECRET, { expiresIn: "24h" });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
