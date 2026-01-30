
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const safetyTipsSchema = {
  type: Type.OBJECT,
  properties: {
    tips: {
      type: Type.ARRAY,
      description: "A list of 3-5 actionable safety tips.",
      items: {
        type: Type.STRING,
      },
    },
    summary: {
        type: Type.STRING,
        description: "A brief, 1-2 sentence summary of the scam type."
    }
  },
  required: ["tips", "summary"],
};

export const analyzeScamDescription = async (description: string): Promise<{ tips: string[]; summary: string } | null> => {
  if (!API_KEY) {
    return {
        tips: ["Enable two-factor authentication on all your accounts.", "Never share personal information with unverified sources.", "Be cautious of unsolicited offers that seem too good to be true."],
        summary: "AI analysis is disabled. Please configure your API key."
    }
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following scam report description and provide a brief summary and actionable safety tips. Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: safetyTipsSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error analyzing scam description with Gemini:", error);
    return null;
  }
};
