import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
  try {
   
    const token = req.cookies && req.cookies.jwt 

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).send('Unauthorized - Invalid Token');
    }
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(404).send('User not found');
    }

   req.user= user
   console.log('Request Headers:', req.headers);
    next()

  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


