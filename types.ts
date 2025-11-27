
export enum AppState {
  INTRO = 'INTRO',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface Recipe {
  name: string;
  ingredients: string[];
  reason: string;
}

export interface Supplement {
  name: string; // e.g., "Vitamin B Complex"
  reason: string; // e.g., "Helps with cracks"
  dose: string; // e.g., "Daily with meals"
  code: string; // Affiliate mapping code, e.g., "VIT_B"
}

export interface AnalysisResult {
  valid: boolean; // Is this actually a tongue?
  constitution: string; // e.g., "Damp-Heat", "Yin Deficiency"
  characteristics: {
    color: string; // e.g. Red, Pale
    coating: string; // e.g. Thick Yellow, Thin White
    shape: string; // e.g. Teeth marks, Swollen
  };
  explanation: string; // User friendly explanation of the constitution
  recipes: Recipe[];
  supplements: Supplement[]; // New field for monetization
  avoid: string[]; // Foods to avoid
}

export interface AnalysisError {
  message: string;
}

export type LanguageCode = 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'ar' | 'fr';

export interface Translation {
  intro: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    menuTitle: string;
    menuSubtitle: string;
    button: string;
  };
  camera: {
    permissionDenied: string;
    goBack: string;
    cancel: string;
    guide: string;
  };
  loader: {
    messages: string[];
    didYouKnow: string;
  };
  results: {
    analysisFailedTitle: string;
    analysisFailedMessage: string;
    tryAgain: string;
    bodyCode: string;
    prescription: string;
    basedOn: string;
    avoid: string;
    checkAgain: string;
    recLabel: string;
    // New translations for supplements
    supplementsTitle: string;
    supplementsDisclaimer: string;
    viewButton: string;
    // Privacy
    privacyFooter: string;
    privacyTitle: string;
    privacyContent: string[];
    medicalDisclaimer: string;
  };
}
