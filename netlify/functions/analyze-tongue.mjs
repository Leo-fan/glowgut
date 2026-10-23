const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export default async (request) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = process.env.AGNES_API_KEY;
  if (!apiKey) return json({ error: "Analysis service is not configured" }, 503);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5_500_000) return json({ error: "Image is too large" }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const image = payload?.image;
  const supportedLanguages = new Set(["en", "zh", "ja", "ko", "de", "ar", "fr"]);
  const requestedLanguage = typeof payload?.language === "string" ? payload.language : "en";
  const language = supportedLanguages.has(requestedLanguage) ? requestedLanguage : "en";
  if (
    typeof image !== "string" ||
    !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(image) ||
    image.length > 5_000_000
  ) {
    return json({ error: "Invalid image" }, 400);
  }

  const prompt = `You are a wellness assistant analyzing a tongue photo. This is educational wellness guidance, not a medical diagnosis. Do not identify severe diseases or claim certainty. If the image is unclear or is not a human tongue, set valid to false.

Return only a JSON object with this exact shape:
{
  "valid": boolean,
  "constitution": string,
  "characteristics": { "color": string, "coating": string, "shape": string },
  "explanation": string,
  "recipes": [{ "name": string, "ingredients": string[], "reason": string }],
  "supplements": [{ "name": string, "reason": string, "dose": string, "code": string }],
  "avoid": string[]
}
Suggest exactly 3 simple meals, 1-2 supplements, and 3-4 items to avoid. For supplement code choose only one of: VIT_B, VIT_C, VIT_D, MULTIVITAMIN, PROBIOTICS, OMEGA3, IRON, MAGNESIUM, ZINC, ASHWAGANDHA, TURMERIC, GINSENG, GOJI, TEA, DIGESTIVE_ENZYMES, FIBER. Translate all values into language code "${language}", but keep keys and supplement codes in English.`;

  let response;
  try {
    response = await fetch("https://apihub.agnes-ai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(30_000),
      body: JSON.stringify({
        model: "agnes-2.5-flash",
        temperature: 0.4,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
      }),
    });
  } catch {
    return json({ error: "Analysis service is temporarily unavailable" }, 502);
  }

  if (!response.ok) return json({ error: "Analysis service is temporarily unavailable" }, 502);

  try {
    const completion = await response.json();
    const content = completion?.choices?.[0]?.message?.content;
    const result = JSON.parse(typeof content === "string" ? content : "");
    const validResult =
      result &&
      typeof result.valid === "boolean" &&
      typeof result.constitution === "string" &&
      result.characteristics &&
      typeof result.characteristics.color === "string" &&
      typeof result.characteristics.coating === "string" &&
      typeof result.characteristics.shape === "string" &&
      typeof result.explanation === "string" &&
      Array.isArray(result.recipes) &&
      Array.isArray(result.supplements) &&
      Array.isArray(result.avoid);
    if (!validResult) throw new Error("Invalid response shape");
    return json(result);
  } catch {
    return json({ error: "Analysis returned an invalid response" }, 502);
  }
};
