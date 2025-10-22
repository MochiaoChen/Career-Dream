
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const generateCareerImage = async (
  base64Image: string,
  mimeType: string,
  profession: string
): Promise<string> => {
  const imagePart = fileToGenerativePart(base64Image, mimeType);
  const textPart = {
    text: `A photorealistic, candid action shot of the person in this photo working as a ${profession}. The image should look like a natural moment captured during their workday, not a posed studio portrait. Maintain the person's facial features and characteristics. The overall composition and lighting should be beautiful and professional, with an artistic photographic quality.`,
  };

  try {
    const result = await model.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const response = result;
    const firstPart = response.candidates?.[0]?.content?.parts?.[0];

    if (firstPart && firstPart.inlineData) {
      return firstPart.inlineData.data;
    } else {
      throw new Error("No image was generated. The response may have been blocked.");
    }
  } catch (error) {
    console.error("Error generating career image:", error);
    throw new Error("Failed to generate image. Please check the console for more details.");
  }
};

export const editImage = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const imagePart = fileToGenerativePart(base64Image, mimeType);
  const textPart = { text: prompt };

  try {
    const result = await model.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const response = result;
    const firstPart = response.candidates?.[0]?.content?.parts?.[0];

    if (firstPart && firstPart.inlineData) {
      return firstPart.inlineData.data;
    } else {
      throw new Error("No image was returned from the edit request. The response may have been blocked.");
    }
  } catch (error) {
    console.error("Error editing image:", error);
    throw new Error("Failed to edit image. Please check the console for more details.");
  }
};
