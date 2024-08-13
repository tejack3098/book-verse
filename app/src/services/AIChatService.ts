import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const API_KEY = 'AIzaSyDztI2-qCP2WB3MtpjSeavCa1Y7aB-CsD8'; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getBookRecommendations = async (prompt: string): Promise<string> => {
    try {
        const result = await model.generateContent([{ text: prompt }]);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
};
