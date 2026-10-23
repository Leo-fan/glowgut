import type { AnalysisResult } from "../types";

export const analyzeTongueImage = async (
  image: string,
  language: string,
): Promise<AnalysisResult> => {
  const response = await fetch("/.netlify/functions/analyze-tongue", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ image, language }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image. Please try again.");
  }

  return (await response.json()) as AnalysisResult;
};
