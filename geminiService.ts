
import { GoogleGenAI } from "@google/genai";
import { QuizResults } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPersonalizedReflection(results: QuizResults) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an empathetic psychologist analyzing a user's FOMO survey results. 
      Their score is ${results.totalScore} out of 24. 
      Their category is ${results.level} FOMO.
      Emotional FOMO score: ${results.breakdown.emotional}/6
      Compulsive Habit score: ${results.breakdown.compulsive}/6
      Loss of Control score: ${results.breakdown.control}/6
      Awareness/Screen Time score: ${results.breakdown.awareness}/6
      
      Provide a short, 3-paragraph "Mirror Reflection" that avoids judgment. 
      1st paragraph: Reflect their current state like a mirror. 
      2nd paragraph: Explain the psychological 'why' behind one of their high scoring areas. 
      3rd paragraph: Offer one gentle 'offline' experiment they could try. 
      Keep it encouraging and insightful.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return "The mirror is a bit cloudy right now, but your results show a pattern that many of us experience in this hyper-connected age. Focus on mindfulness and setting small digital boundaries.";
  }
}
