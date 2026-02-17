
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateProjectSummary(serviceTitle: string, clientRequirements: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional project summary for a marketplace interaction. 
      Service: ${serviceTitle}
      Client Requirements: ${clientRequirements}
      Summarize into 3 key bullet points of scope and a recommended price range.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating summary. Please describe manually.";
  }
}

export async function getSmartResponseSuggestions(lastMessage: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful assistant for a tech marketplace. Based on this message: "${lastMessage}", suggest 3 short, professional replies. Return them as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return ["Tell me more", "I am interested", "What is the price?"];
  }
}
