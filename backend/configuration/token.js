import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },                 // ✅ payload as object
      process.env.JWT_TOKEN || "secretkey", // ✅ fallback secret
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
};

export default generateToken;
