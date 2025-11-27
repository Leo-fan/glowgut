
import { Translation, LanguageCode } from '../types';

export const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
];

export const translations: Record<LanguageCode, Translation> = {
  en: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "Decode Your Body's Hidden Signals in 3 Seconds",
      step1: "Find natural light",
      step2: "Stick tongue out",
      menuTitle: "Your Daily Protocol",
      menuSubtitle: "AI-Powered Precision Nutrition",
      button: "Begin Scan"
    },
    camera: {
      permissionDenied: "Camera access required.",
      goBack: "Exit",
      cancel: "Cancel",
      guide: "Align Tongue Here"
    },
    loader: {
      messages: [
        "Enhancing topography...",
        "Decoding biomarkers...",
        "Analyzing coating density...",
        "Measuring hydration...",
        "Synthesizing protocol...",
        "Finalizing report..."
      ],
      didYouKnow: "Your tongue regenerates every 10-14 days, offering a near real-time status report of your internal health."
    },
    results: {
      analysisFailedTitle: "Scan Failed",
      analysisFailedMessage: "We need a clearer signal. Please use natural lighting and ensure the tongue is fully visible.",
      tryAgain: "Rescan",
      bodyCode: "Body Code",
      prescription: "Nutritional Protocol",
      basedOn: "TCM Analysis",
      avoid: "Eliminate Today",
      checkAgain: "New Scan",
      recLabel: "Rec",
      supplementsTitle: "Targeted Supplementation",
      supplementsDisclaimer: "Educational use only. Consult a physician.",
      viewButton: "Get It",
      privacyFooter: "Privacy Policy | Terms of Use",
      privacyTitle: "Data & Privacy",
      privacyContent: [
        "Photos are processed in RAM and strictly deleted immediately.",
        "We do not provide medical diagnoses.",
        "Recommendations may contain affiliate links."
      ],
      medicalDisclaimer: "Disclaimer: GlowGut Pro is an AI-powered wellness tool, not a medical device. Results are for reference only. Please consult a doctor for medical conditions."
    }
  },
  zh: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "3秒解码身体的隐秘信号",
      step1: "寻找自然光线",
      step2: "自然伸出舌头",
      menuTitle: "您的每日方案",
      menuSubtitle: "AI 精准营养定制",
      button: "开始扫描"
    },
    camera: {
      permissionDenied: "需要相机权限",
      goBack: "退出",
      cancel: "取消",
      guide: "对准参考线"
    },
    loader: {
      messages: [
        "图像增强中...",
        "解码生物标记...",
        "分析舌苔密度...",
        "测量津液水平...",
        "合成健康方案...",
        "生成最终报告..."
      ],
      didYouKnow: "舌头细胞每10-14天更新一次，是您体内环境最实时的状态报告。"
    },
    results: {
      analysisFailedTitle: "扫描失败",
      analysisFailedMessage: "信号不清。请确保光线充足且舌头完全可见。",
      tryAgain: "重新扫描",
      bodyCode: "体质密码",
      prescription: "食疗方案",
      basedOn: "中医智能分析",
      avoid: "今日忌口",
      checkAgain: "新的扫描",
      recLabel: "推荐",
      supplementsTitle: "精准补剂建议",
      supplementsDisclaimer: "仅供科普，非医疗建议。",
      viewButton: "查看",
      privacyFooter: "隐私政策 | 使用条款",
      privacyTitle: "隐私声明",
      privacyContent: [
        "照片仅在内存中处理，处理完即刻销毁。",
        "不提供医疗诊断服务。",
        "推荐可能包含推广链接。"
      ],
      medicalDisclaimer: "免责声明：GlowGut Pro 是 AI 驱动的健康工具，而非医疗器械。结果仅供参考。如有医疗状况，请咨询医生。"
    }
  },
  ja: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "3秒で体の隠れたシグナルを解読",
      step1: "自然光を探す",
      step2: "舌を出す",
      menuTitle: "デイリープロトコル",
      menuSubtitle: "AIによる精密栄養指導",
      button: "スキャン開始"
    },
    camera: {
      permissionDenied: "カメラの許可が必要です",
      goBack: "戻る",
      cancel: "キャンセル",
      guide: "ガイドに合わせてください"
    },
    loader: {
      messages: [
        "画像を強化中...",
        "バイオマーカー解読中...",
        "舌苔密度を分析中...",
        "水分量を測定中...",
        "プロトコルを作成中...",
        "レポート完成間近..."
      ],
      didYouKnow: "舌の細胞は10〜14日で再生され、体内の状態をリアルタイムで反映します。"
    },
    results: {
      analysisFailedTitle: "スキャン失敗",
      analysisFailedMessage: "信号が不明瞭です。明るい場所で撮影してください。",
      tryAgain: "再スキャン",
      bodyCode: "ボディコード",
      prescription: "栄養プロトコル",
      basedOn: "東洋医学分析",
      avoid: "今日は避ける",
      checkAgain: "新しいスキャン",
      recLabel: "推奨",
      supplementsTitle: "サプリメント提案",
      supplementsDisclaimer: "教育目的のみ。医師に相談してください。",
      viewButton: "入手",
      privacyFooter: "プライバシーポリシー | 利用規約",
      privacyTitle: "プライバシー",
      privacyContent: [
        "写真は処理後すぐに削除されます。",
        "医療診断は提供しません。",
        "アフィリエイトリンクが含まれています。"
      ],
      medicalDisclaimer: "免責事項：GlowGut ProはAI搭載のウェルネスツールであり、医療機器ではありません。結果は参考用です。病状については医師にご相談ください。"
    }
  },
  ko: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "3초 만에 몸의 숨겨진 신호를 해독하세요",
      step1: "자연광 찾기",
      step2: "혀 내밀기",
      menuTitle: "데일리 프로토콜",
      menuSubtitle: "AI 정밀 영양 분석",
      button: "스캔 시작"
    },
    camera: {
      permissionDenied: "카메라 권한 필요",
      goBack: "종료",
      cancel: "취소",
      guide: "가이드에 맞춰주세요"
    },
    loader: {
      messages: [
        "이미지 향상 중...",
        "바이오마커 해독 중...",
        "설태 밀도 분석 중...",
        "수분도 측정 중...",
        "프로토콜 합성 중...",
        "리포트 생성 중..."
      ],
      didYouKnow: "혀 세포는 10-14일마다 재생되어 신체 내부 상태를 실시간으로 보여줍니다."
    },
    results: {
      analysisFailedTitle: "스캔 실패",
      analysisFailedMessage: "신호가 불분명합니다. 밝은 곳에서 다시 시도해주세요.",
      tryAgain: "재스캔",
      bodyCode: "바디 코드",
      prescription: "영양 프로토콜",
      basedOn: "한의학 분석",
      avoid: "오늘 피하기",
      checkAgain: "새 스캔",
      recLabel: "추천",
      supplementsTitle: "맞춤 영양제",
      supplementsDisclaimer: "참고용입니다. 의사와 상담하세요.",
      viewButton: "보기",
      privacyFooter: "개인정보 보호 | 이용약관",
      privacyTitle: "데이터 및 개인정보",
      privacyContent: [
        "사진은 처리 후 즉시 삭제됩니다.",
        "의료 진단을 제공하지 않습니다.",
        "제휴 링크가 포함되어 있습니다."
      ],
      medicalDisclaimer: "면책 조항: GlowGut Pro는 AI 기반 웰니스 도구이며 의료 기기가 아닙니다. 결과는 참고용일 뿐입니다. 의학적 상태에 대해서는 의사와 상담하십시오."
    }
  },
  de: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "Entschlüsseln Sie Ihre Körpersignale in 3 Sekunden",
      step1: "Natürliches Licht suchen",
      step2: "Zunge herausstrecken",
      menuTitle: "Ihr Tagesprotokoll",
      menuSubtitle: "AI-Präzisionsernährung",
      button: "Scan starten"
    },
    camera: {
      permissionDenied: "Kamerazugriff erforderlich",
      goBack: "Zurück",
      cancel: "Abbrechen",
      guide: "Zunge hier ausrichten"
    },
    loader: {
      messages: [
        "Bildverbesserung...",
        "Biomarker-Decodierung...",
        "Analyse der Belagsdichte...",
        "Hydratationsmessung...",
        "Protokoll-Synthese...",
        "Bericht wird erstellt..."
      ],
      didYouKnow: "Ihre Zunge regeneriert sich alle 10-14 Tage und bietet einen Echtzeit-Statusbericht."
    },
    results: {
      analysisFailedTitle: "Scan fehlgeschlagen",
      analysisFailedMessage: "Signal unklar. Bitte nutzen Sie natürliches Licht.",
      tryAgain: "Erneut scannen",
      bodyCode: "Körper-Code",
      prescription: "Ernährungsprotokoll",
      basedOn: "TCM-Analyse",
      avoid: "Heute meiden",
      checkAgain: "Neuer Scan",
      recLabel: "Empf",
      supplementsTitle: "Gezielte Ergänzung",
      supplementsDisclaimer: "Kein medizinischer Rat.",
      viewButton: "Ansehen",
      privacyFooter: "Datenschutz | AGB",
      privacyTitle: "Datenschutz",
      privacyContent: [
        "Fotos werden sofort gelöscht.",
        "Keine medizinische Diagnose.",
        "Enthält Affiliate-Links."
      ],
      medicalDisclaimer: "Haftungsausschluss: GlowGut Pro ist ein KI-gestütztes Wellness-Tool, kein medizinisches Gerät. Die Ergebnisse dienen nur als Referenz. Bitte konsultieren Sie bei medizinischen Problemen einen Arzt."
    }
  },
  fr: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "Décodez les signaux cachés de votre corps en 3 secondes",
      step1: "Lumière naturelle",
      step2: "Tirez la langue",
      menuTitle: "Votre protocole quotidien",
      menuSubtitle: "Nutrition de précision par IA",
      button: "Lancer le scan"
    },
    camera: {
      permissionDenied: "Accès caméra requis",
      goBack: "Retour",
      cancel: "Annuler",
      guide: "Alignez la langue"
    },
    loader: {
      messages: [
        "Amélioration de l'image...",
        "Décodage des biomarqueurs...",
        "Analyse de la densité...",
        "Mesure de l'hydratation...",
        "Synthèse du protocole...",
        "Finalisation..."
      ],
      didYouKnow: "Votre langue se régénère tous les 10-14 jours, offrant un rapport d'état en temps réel."
    },
    results: {
      analysisFailedTitle: "Échec du scan",
      analysisFailedMessage: "Signal peu clair. Utilisez un éclairage naturel.",
      tryAgain: "Rescanner",
      bodyCode: "Code Corporel",
      prescription: "Protocole Nutritionnel",
      basedOn: "Analyse MTC",
      avoid: "Éliminer aujourd'hui",
      checkAgain: "Nouveau Scan",
      recLabel: "Rec",
      supplementsTitle: "Supplémentation ciblée",
      supplementsDisclaimer: "Usage éducatif uniquement.",
      viewButton: "Voir",
      privacyFooter: "Confidentialité | Conditions",
      privacyTitle: "Confidentialité",
      privacyContent: [
        "Photos supprimées immédiatement.",
        "Pas de diagnostic médical.",
        "Liens affiliés inclus."
      ],
      medicalDisclaimer: "Avis de non-responsabilité : GlowGut Pro est un outil de bien-être alimenté par l'IA, pas un dispositif médical. Les résultats sont fournis à titre indicatif. Veuillez consulter un médecin pour tout problème de santé."
    }
  },
  ar: {
    intro: {
      title: "GlowGut Pro",
      subtitle: "فك شفرة إشارات جسمك الخفية في 3 ثوانٍ",
      step1: "إضاءة طبيعية",
      step2: "أخرج لسانك",
      menuTitle: "بروتوكولك اليومي",
      menuSubtitle: "تغذية دقيقة بالذكاء الاصطناعي",
      button: "بدء المسح"
    },
    camera: {
      permissionDenied: "مطلوب إذن الكاميرا",
      goBack: "خروج",
      cancel: "إلغاء",
      guide: "حاذاة اللسان"
    },
    loader: {
      messages: [
        "تحسين الصورة...",
        "فك تشفير المؤشرات الحيوية...",
        "تحليل الكثافة...",
        "قياس الرطوبة...",
        "توليف البروتوكول...",
        "إنهاء التقرير..."
      ],
      didYouKnow: "يتجدد لسانك كل 10-14 يومًا، مما يقدم تقرير حالة فوري لصحتك الداخلية."
    },
    results: {
      analysisFailedTitle: "فشل المسح",
      analysisFailedMessage: "الإشارة غير واضحة. يرجى استخدام إضاءة طبيعية.",
      tryAgain: "إعادة المسح",
      bodyCode: "شفرة الجسم",
      prescription: "البروتوكول الغذائي",
      basedOn: "تحليل الطب الصيني",
      avoid: "تجنب اليوم",
      checkAgain: "مسح جديد",
      recLabel: "توصية",
      supplementsTitle: "مكملات مستهدفة",
      supplementsDisclaimer: "للاستخدام التعليمي فقط.",
      viewButton: "عرض",
      privacyFooter: "الخصوصية | الشروط",
      privacyTitle: "الخصوصية",
      privacyContent: [
        "يتم حذف الصور فورًا.",
        "لا نقدم تشخيصًا طبيًا.",
        "يحتوي على روابط تابعة."
      ],
      medicalDisclaimer: "إخلاء مسؤولية: GlowGut Pro هو أداة صحية تعمل بالذكاء الاصطناعي، وليس جهازًا طبيًا. النتائج هي كمرجع فقط. يرجى استشارة الطبيب للحالات الطبية."
    }
  }
};
