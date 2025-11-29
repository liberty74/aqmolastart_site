import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production build, this key would be secured via a backend proxy.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Вы — "Aqmola Start AI Mentor", умный помощник стартап-экосистемы Акмолинской области (Кокшетау, Бурабай, Степногорск и др.).
Ваша цель — помогать местным предпринимателям, студентам и инвесторам.
- Консультируйте по AgriTech (агротехнологии) и Туризму — это ключевые ниши региона.
- Помогайте искать сооснователей, опираясь на навыки.
- Отвечайте на РУССКОМ ЯЗЫКЕ.
- Будьте кратким, профессиональным и мотивирующим.
- Если спрашивают про гранты, упоминайте "Astana Hub" или местные акиматы.
`;

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "Извините, в данный момент я не могу ответить. Попробуйте позже.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};