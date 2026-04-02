import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approache to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approache to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `You are an expert interviewer.
Return STRICT JSON only.

IMPORTANT:
- technicalQuestions MUST be an array of objects with:
  { "question": string, "intention": string, "answer": string }

- behavioralQuestions MUST be an array of objects with same structure

- skillGaps MUST be array of:
  { "skill": string, "severity": "low" | "medium" | "high" }

- preparationPlan MUST be array of:
  { "day": number, "focus": string, "tasks": string[] }

RULES:
- matchScore MUST be a number between 0 and 100
- Do not return empty fields
- Each "answer" must be detailed (3-5 sentences)
- Do not include markdown or explanations
- Return ONLY valid JSON
- Each array item MUST be a valid JSON object.
- Do NOT wrap objects in strings.

Generate:
- title of the job
- matchScore (0-100)
- 5 technicalQuestions WITH answers
- 3 behavioralQuestions WITH answers
- 3 skillGaps
- 5 day preparationPlan

CRITICAL:
- technicalQuestions MUST be an array of EXACTLY 5 objects
- behavioralQuestions MUST be an array of EXACTLY 3 objects
- skillGaps MUST be an array of EXACTLY 3 objects
- preparationPlan MUST be an array of EXACTLY 5 objects

- DO NOT return numbers in place of objects
- DO NOT rename fields (use exact keys: title, matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan)

- If unsure, still return valid objects (never numbers or null)

Do not approximate.
Do not summarize.
Do not replace objects with numbers.

DATA:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      //responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return interviewReportSchema.parse(JSON.parse(res.text));
};

export default generateInterviewReport;
