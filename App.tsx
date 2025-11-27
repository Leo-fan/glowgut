import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { AnalysisLoader } from './components/AnalysisLoader';
import { Results } from './components/Results';
import { AppState, AnalysisResult, LanguageCode } from './types';
import { analyzeTongueImage } from './services/geminiService';
import { translations, LANGUAGES } from './utils/translations';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageData, setImageData] = useState<string | null>(null);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = translations[language];

  const handleStart = () => {
    setAppState(AppState.CAMERA);
  };

  const handleCapture = async (image: string) => {
    setImageData(image);
    setAppState(AppState.ANALYZING);
    
    try {
      const minWaitTime = new Promise(resolve => setTimeout(resolve, 3000));
      const analysisPromise = analyzeTongueImage(image, language);
      
      const [result] = await Promise.all([analysisPromise, minWaitTime]);
      
      setAnalysisResult(result);
      setAppState(AppState.RESULTS);
    } catch (error) {
      console.error(error);
      alert("Analysis interrupted. Please check connection.");
      setAppState(AppState.INTRO);
    }
  };

  const handleRetake = () => {
    setAnalysisResult(null);
    setImageData(null);
    setAppState(AppState.INTRO);
  };

  return (
    <div className="h-full w-full bg-[#F2F2F7] overflow-hidden relative font-sans text-stone-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Intro Screen - Apple Style */}
      {appState === AppState.INTRO && (
        <div className="h-full flex flex-col items-center p-6 pt-12 animate-fade-in relative">
          
          {/* Top Bar / Language */}
          <div className="w-full flex justify-between items-center mb-8 z-20">
             <div className="w-8"></div> {/* Spacer */}
             <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="bg-white/60 backdrop-blur-xl px-4 py-1.5 rounded-full text-xs font-semibold text-stone-600 border border-white/20 shadow-sm flex items-center gap-1 active:scale-95 transition-transform"
                >
                  {LANGUAGES.find(l => l.code === language)?.label.toUpperCase()}
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden py-1 z-30">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-center px-4 py-2.5 text-xs font-medium hover:bg-black/5 ${language === lang.code ? 'text-black font-bold' : 'text-stone-500'}`}
                      >
                        {lang.native}
                      </button>
                    ))}
                  </div>
                )}
             </div>
             <div className="w-8"></div> {/* Spacer */}
          </div>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center w-full z-10 -mt-10">
            {/* Logo/Icon Container */}
            <div className="mb-8 relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-stone-100 to-white rounded-[2rem] shadow-2xl flex items-center justify-center border border-white/50 relative z-10">
                    <span className="text-5xl filter drop-shadow-md">👅</span>
                </div>
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl"></div>
            </div>

            <h1 className="text-4xl font-semibold text-stone-900 tracking-tight text-center mb-4 leading-tight">
              {t.intro.title}
            </h1>
            <p className="text-stone-500 text-lg text-center max-w-xs leading-relaxed font-normal">
              {t.intro.subtitle}
            </p>

            {/* Feature Cards - Glass style */}
            <div className="w-full max-w-sm mt-12 grid grid-cols-2 gap-4">
                <div className="bg-white/40 backdrop-blur-md p-5 rounded-3xl border border-white/40 flex flex-col items-center text-center shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-stone-900 font-bold text-lg">1</div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Step 1</span>
                    <span className="text-sm text-stone-800 font-medium">{t.intro.step1}</span>
                </div>
                <div className="bg-white/40 backdrop-blur-md p-5 rounded-3xl border border-white/40 flex flex-col items-center text-center shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-stone-900 font-bold text-lg">2</div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Step 2</span>
                    <span className="text-sm text-stone-800 font-medium">{t.intro.step2}</span>
                </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="w-full max-w-sm pb-8 z-10">
             <button 
                onClick={handleStart}
                className="w-full bg-stone-900 text-white h-14 rounded-full font-semibold text-lg shadow-xl shadow-stone-900/10 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                {t.intro.button}
                <svg className={`w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-center text-[10px] text-stone-400 mt-4 font-medium uppercase tracking-widest opacity-60">
                  Powered by Gemini 1.5 Pro
              </p>
          </div>
          
          {/* Subtle Ambient Background */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-200/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
        </div>
      )}

      {/* Camera State */}
      {appState === AppState.CAMERA && (
        <Camera 
          onCapture={handleCapture}
          onCancel={() => setAppState(AppState.INTRO)}
          text={t.camera}
        />
      )}

      {/* Analyzing State */}
      {appState === AppState.ANALYZING && (
        <AnalysisLoader 
          messages={t.loader.messages}
          didYouKnow={t.loader.didYouKnow}
        />
      )}

      {/* Results State */}
      {appState === AppState.RESULTS && analysisResult && (
        <Results 
          result={analysisResult} 
          onRetake={handleRetake}
          text={t.results}
        />
      )}
    </div>
  );
};

export default App;