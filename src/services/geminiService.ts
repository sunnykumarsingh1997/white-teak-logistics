import { GoogleGenerativeAI } from "@google/generative-ai";

// NOTE: In a real app, this key should be in an environment variable.
// For this demo, we'll assume the user might provide one or we'll mock it if it fails/is missing.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const generateConciergeNote = async (items: string[]): Promise<string> => {
    if (!API_KEY) {
        console.warn("No Gemini API Key found. Returning mock response.");
        return new Promise(resolve => setTimeout(() => resolve(getMockNote(items)), 1000));
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a concierge for a luxury lighting brand called "White Teak LLC".
      Write a sophisticated, 40-word "Care & Maintenance" note for the following items: ${items.join(', ')}.
      The tone should be ultra-luxurious, authoritative, and polite.
      Do not use markdown. Just plain text.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating note:", error);
        return getMockNote(items);
    }
};

const getMockNote = (items: string[]) => {
    return `To preserve the pristine finish of your ${items[0] || 'lighting masterpiece'}, we recommend gentle dusting with a microfiber cloth. Avoid harsh chemicals. For crystal elements, a specialized cleaner ensures enduring brilliance. Thank you for choosing White Teak.`;
}
