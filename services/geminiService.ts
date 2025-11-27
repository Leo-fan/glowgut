
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the JSON schema for the response to ensure standardized output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    valid: {
      type: Type.BOOLEAN,
      description: "Set to true if the image contains a clear human tongue. Set to false if image is blurry, too dark, or not a tongue.",
    },
    constitution: {
      type: Type.STRING,
      description: "The TCM constitution diagnosis (e.g., Dampness-Heat, Qi Deficiency, Blood Stasis, Balanced). Use simplified, modern terms.",
    },
    characteristics: {
      type: Type.OBJECT,
      properties: {
        color: { type: Type.STRING },
        coating: { type: Type.STRING },
        shape: { type: Type.STRING },
      },
      required: ["color", "coating", "shape"],
    },
    explanation: {
      type: Type.STRING,
      description: "A friendly, empathetic explanation of what the body is saying. 2-3 sentences max. Focus on 'here and now'.",
    },
    recipes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          reason: { type: Type.STRING, description: "Why this helps the specific constitution." },
        },
        required: ["name", "ingredients", "reason"],
      },
      description: "Suggest exactly 3 simple meals tailored to the diagnosis.",
    },
    supplements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the supplement (e.g. Vitamin B Complex, Probiotics)" },
          reason: { type: Type.STRING, description: "Connection to tongue feature (e.g. 'Helps repair cracks')" },
          dose: { type: Type.STRING, description: "General usage suggestion (e.g. 'Daily with breakfast')" },
          code: { 
            type: Type.STRING, 
            description: "CRITICAL: Select the most appropriate Product Code from this list: VIT_B, VIT_C, VIT_D, MULTIVITAMIN, PROBIOTICS, OMEGA3, IRON, MAGNESIUM, ZINC, ASHWAGANDHA, TURMERIC, GINSENG, GOJI, TEA, DIGESTIVE_ENZYMES, FIBER. If none match perfectly, use MULTIVITAMIN." 
          }
        },
        required: ["name", "reason", "dose", "code"],
      },
      description: "Suggest 1-2 nutritional supplements based on tongue signs (e.g., cracks -> Vitamin B; pale -> Iron/Vitamin C; Thick coating -> Probiotics/Enzymes).",
    },
    avoid: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-4 types of food or habits to avoid today.",
    },
  },
  required: ["valid", "constitution", "characteristics", "explanation", "recipes", "supplements", "avoid"],
};

export const analyzeTongueImage = async (base64Image: string, language: string): Promise<AnalysisResult> => {
  try {
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64,
            },
          },
          {
            text: `You are an expert TCM (Traditional Chinese Medicine) practitioner and modern nutritionist. 
            Analyze this image of a tongue.
            
            IMPORTANT RULES:
            1. This is for wellness advice only, NOT medical diagnosis. Do not mention cancer, severe diseases, or medical emergencies.
            2. Focus on "Body Constitution" (e.g., Dampness, Heat, Cold, Dryness).
            3. If the image is too dark, blurry, or not a tongue, set 'valid' to false.
            4. Provide practical, appetizing food suggestions that are easy to buy.
            5. Identify patterns indicating nutritional deficiencies (e.g., cracks -> Vitamin B; pale -> Iron/Vitamin C) for the 'supplements' field.
            
            AFFILIATE MAPPING INSTRUCTION:
            For the 'supplements.code' field, you MUST strictly select one of the following codes that best matches the recommendation:
            [VIT_B, VIT_C, VIT_D, MULTIVITAMIN, PROBIOTICS, OMEGA3, IRON, MAGNESIUM, ZINC, ASHWAGANDHA, TURMERIC, GINSENG, GOJI, TEA, DIGESTIVE_ENZYMES, FIBER]
            
            LANGUAGE REQUIREMENT:
            Translate ALL string values in the JSON output to ${language}. 
            The keys (like 'constitution', 'supplements', 'code') must remain in English as defined by the schema, but the content (values) MUST be in ${language}. 
            EXCEPTION: The 'code' value must remain one of the exact uppercase codes listed above (e.g., "VIT_B"), do not translate the code.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more consistent analysis
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};
