
import React, { useState } from 'react';
import { AnalysisResult, Recipe, Translation } from '../types';
import { getAffiliateLink } from '../utils/affiliate';

interface ResultsProps {
  result: AnalysisResult;
  onRetake: () => void;
  text: Translation['results'];
}

const RecipeCard: React.FC<{ recipe: Recipe; index: number; label: string }> = ({ recipe, index, label }) => (
  <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-stone-100 mb-4 animate-slide-up" style={{ animationDelay: `${index * 100 + 300}ms` }}>
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-semibold text-lg text-stone-900 leading-tight">{recipe.name}</h4>
      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
        {label} {index + 1}
      </span>
    </div>
    <p className="text-stone-500 text-sm mb-4 leading-relaxed">{recipe.reason}</p>
    <div className="flex flex-wrap gap-2">
      {recipe.ingredients.map((ing, i) => (
        <span key={i} className="bg-stone-50 text-stone-600 text-xs font-medium px-2.5 py-1.5 rounded-lg">
          {ing}
        </span>
      ))}
    </div>
  </div>
);

export const Results: React.FC<ResultsProps> = ({ result, onRetake, text }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (!result.valid) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#F2F2F7]">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-rose-500">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h2 className="text-xl font-semibold text-stone-900 mb-2">{text.analysisFailedTitle}</h2>
        <p className="text-stone-500 mb-8 max-w-xs leading-relaxed">
          {text.analysisFailedMessage}
        </p>
        <button 
          onClick={onRetake}
          className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm active:scale-95 transition-transform"
        >
          {text.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto pb-28 no-scrollbar bg-[#F2F2F7]">
        {/* Header - Apple Health Summary Style */}
        <div className="pt-12 px-6 pb-6 bg-white rounded-b-[2.5rem] shadow-sm mb-6 relative overflow-hidden z-10">
          <div className="flex justify-between items-end mb-4">
              <div>
                  <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">{text.bodyCode}</p>
                  <h1 className="text-3xl font-bold text-stone-900 tracking-tight">{result.constitution}</h1>
              </div>
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-stone-100">
                🧬
              </div>
          </div>

          <div className="flex gap-2 mb-6">
              <span className="px-3 py-1.5 bg-stone-50 rounded-full text-xs font-semibold text-stone-600 border border-stone-200/60">
                  {result.characteristics.color}
              </span>
               <span className="px-3 py-1.5 bg-stone-50 rounded-full text-xs font-semibold text-stone-600 border border-stone-200/60">
                  {result.characteristics.coating}
              </span>
          </div>
          
          <div className="bg-[#F2F2F7] p-5 rounded-2xl border border-stone-200/50">
             <p className="text-stone-700 leading-relaxed text-sm font-medium">
                {result.explanation}
             </p>
          </div>
        </div>

        <div className="px-6 space-y-8">
          
          {/* Supplements Section - "Widget" Style */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
             <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                    Rx
                </span>
               {text.supplementsTitle}
             </h3>
             <div className="grid gap-3">
               {result.supplements && result.supplements.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-stone-100">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-lg">
                              💊
                          </div>
                          <div>
                              <h4 className="font-semibold text-stone-900 text-sm">{item.name}</h4>
                              <p className="text-xs text-stone-500 mt-0.5">{item.reason}</p>
                          </div>
                      </div>
                      <a 
                        href={getAffiliateLink(item.code)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-full active:scale-95 transition-transform"
                      >
                          {text.viewButton}
                      </a>
                  </div>
               ))}
             </div>
             <p className="text-[10px] text-stone-400 mt-3 ml-1">{text.supplementsDisclaimer}</p>
          </div>

          {/* Recipes Section */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
             <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                    Fl
                </span>
                {text.prescription}
             </h3>
             <div>
                {result.recipes.map((recipe, i) => (
                <RecipeCard key={i} recipe={recipe} index={i} label={text.recLabel} />
                ))}
            </div>
          </div>

          {/* Avoid List - Compact Style */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold">
                    No
                </span>
              {text.avoid}
            </h3>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
                <ul className="space-y-3">
                {result.avoid.map((item, i) => (
                    <li key={i} className="text-stone-600 text-sm flex items-center border-b border-stone-50 last:border-0 pb-2 last:pb-0">
                    <span className="text-rose-500 mr-3 text-xs">●</span>
                    {item}
                    </li>
                ))}
                </ul>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="text-center pt-4 pb-2">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-[10px] font-medium text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors"
            >
              {text.privacyFooter}
            </button>
          </div>
        </div>

        {/* Floating Bottom Bar (Glassmorphism) */}
        <div className="fixed bottom-6 left-6 right-6 z-20">
          <button 
            onClick={onRetake}
            className="w-full bg-stone-900/90 backdrop-blur-md text-white py-4 rounded-3xl font-semibold text-lg shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/10"
          >
             <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
             {text.checkAgain}
          </button>
        </div>
      </div>

      {/* Privacy Sheet Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setShowPrivacy(false)}></div>
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl z-10 p-8 pb-12 animate-slide-up m-0 sm:m-4 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-6 shrink-0"></div>
            <h3 className="text-xl font-bold text-stone-900 mb-6 tracking-tight">{text.privacyTitle}</h3>
            <ul className="space-y-4 mb-8">
              {text.privacyContent.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-sm text-stone-600 leading-relaxed">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Core Declaration / Medical Disclaimer */}
            <div className="bg-stone-50 p-4 rounded-2xl mb-8 border border-stone-100">
                <p className="text-xs text-stone-500 leading-relaxed font-medium">
                    {text.medicalDisclaimer}
                </p>
            </div>

            <button 
              onClick={() => setShowPrivacy(false)}
              className="w-full py-4 bg-[#F2F2F7] hover:bg-stone-200 text-stone-900 rounded-2xl font-semibold transition-colors text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
