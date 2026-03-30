import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const invokeai = async () => {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hi!!!, What does fullstack mean?",
  });

  console.log(res.text);
};

export default invokeai;
