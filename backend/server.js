import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/database.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server Started At Port ${PORT}`);
});
