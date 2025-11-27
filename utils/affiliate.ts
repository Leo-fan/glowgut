
export const AFFILIATE_CODE = 'GRV0907';

// Mapping internal AI codes to specific iHerb category URLs
const LINK_MAP: Record<string, string> = {
  'VIT_B': `https://www.iherb.com/c/vitamin-b-complex?rcode=${AFFILIATE_CODE}`,
  'VIT_C': `https://www.iherb.com/c/vitamin-c?rcode=${AFFILIATE_CODE}`,
  'VIT_D': `https://www.iherb.com/c/vitamin-d?rcode=${AFFILIATE_CODE}`,
  'MULTIVITAMIN': `https://www.iherb.com/c/multivitamins?rcode=${AFFILIATE_CODE}`,
  'PROBIOTICS': `https://www.iherb.com/c/probiotics?rcode=${AFFILIATE_CODE}`,
  'OMEGA3': `https://www.iherb.com/c/omega-3-fish-oil?rcode=${AFFILIATE_CODE}`,
  'IRON': `https://www.iherb.com/c/iron?rcode=${AFFILIATE_CODE}`,
  'MAGNESIUM': `https://www.iherb.com/c/magnesium?rcode=${AFFILIATE_CODE}`,
  'ZINC': `https://www.iherb.com/c/zinc?rcode=${AFFILIATE_CODE}`,
  'ASHWAGANDHA': `https://www.iherb.com/c/ashwagandha?rcode=${AFFILIATE_CODE}`,
  'TURMERIC': `https://www.iherb.com/c/turmeric-curcumin?rcode=${AFFILIATE_CODE}`,
  'GINSENG': `https://www.iherb.com/c/ginseng?rcode=${AFFILIATE_CODE}`,
  'GOJI': `https://www.iherb.com/c/goji-berries?rcode=${AFFILIATE_CODE}`,
  'TEA': `https://www.iherb.com/c/herbal-tea?rcode=${AFFILIATE_CODE}`,
  'DIGESTIVE_ENZYMES': `https://www.iherb.com/c/digestive-enzymes?rcode=${AFFILIATE_CODE}`,
  'FIBER': `https://www.iherb.com/c/fiber?rcode=${AFFILIATE_CODE}`,
  'DEFAULT': `https://www.iherb.com/?rcode=${AFFILIATE_CODE}`
};

export const getAffiliateLink = (code: string): string => {
  return LINK_MAP[code] || LINK_MAP['DEFAULT'];
};
