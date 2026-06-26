"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, getTranslation } from "@/lib/translations"

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

const translationsLocal: Translations = {
  // Navigation
  home: { en: "Home", fr: "Accueil", pt: "Início", ar: "الرئيسية", sw: "Nyumbani", am: "ቤት", ha: "Gida", zu: "Ikhaya", yo: "Ile", ig: "Ulo" },
  markets: { en: "Markets", fr: "Marchés", pt: "Mercados", ar: "الأسواق", sw: "Masoko", am: "ገበያዎች", ha: "Kasuwanni", zu: "Izimakethe", yo: "Ọja", ig: "Ahịa" },
  invest: { en: "Invest", fr: "Investir", pt: "Investir", ar: "استثمر", sw: "Wekeza", am: "ኢንቬስት", ha: "Saka hannun jari", zu: "Tshala", yo: "Ṣe idoko-owo", ig: "Tinye ego" },
  wallet: { en: "Wallet", fr: "Portefeuille", pt: "Carteira", ar: "المحفظة", sw: "Pochi", am: "ቦርሳ", ha: "Jakar kuɗi", zu: "Isikhwama", yo: "Apo-owo", ig: "Akpa ego" },
  profile: { en: "Profile", fr: "Profil", pt: "Perfil", ar: "الملف", sw: "Wasifu", am: "መገለጫ", ha: "Bayanan sirri", zu: "Iphrofayili", yo: "Profaili", ig: "Profaịlụ" },
  send: { en: "Send", fr: "Envoyer", pt: "Enviar", ar: "إرسال", sw: "Tuma", am: "ላክ", ha: "Aika", zu: "Thumela", yo: "Firanṣẹ", ig: "Zipu" },
  receive: { en: "Receive", fr: "Recevoir", pt: "Receber", ar: "استقبال", sw: "Pokea", am: "ተቀበል", ha: "Karɓa", zu: "Thola", yo: "Gba", ig: "Nata" },
  balance: { en: "Balance", fr: "Solde", pt: "Saldo", ar: "الرصيد", sw: "Salio", am: "ቀሪ ሂሳብ", ha: "Ma'auni", zu: "Ibhalansi", yo: "Iwontunwonsi", ig: "Ego" },
  total: {
    en: "Total Portfolio",
    fr: "Portefeuille Total",
    pt: "Portfólio Total",
    ar: "المحفظة الكاملة",
    sw: "Jumla ya Mkoba",
    am: "ጠቅላላ ፖርትፎሊዮ",
    ha: "Jimlar Fayil",
    zu: "Iphothifoliyo Ephelele",
    yo: "Apapọ Portfolio",
    ig: "Ngụkọta Portfolio",
  },
  totalBalance: { en: "Total Balance", fr: "Solde Total", pt: "Saldo Total", ar: "الرصيد الإجمالي", sw: "Jumla ya Salio", am: "ጠቅላላ ቀሪ ሂሳብ", ha: "Jimlar ma'auni", zu: "Isamba Sebhalansi", yo: "Apao Iwontunwonsi", ig: "Ngụkọta Ego" },
  quickActions: { en: "Quick Actions", fr: "Actions Rapides", pt: "Ações Rápidas", ar: "إجراءات سريعة", sw: "Vitendo vya Haraka", am: "ፈጣን እርምጃዎች", ha: "Masu Sauri Ayyuka", zu: "Izenzo Ezisheshayo", yo: "Awọn Iṣe Kiakia", ig: "Ihe Ngwa Ngwa" },
  viewAll: { en: "View All", fr: "Voir tout", pt: "Ver Tudo", ar: "عرض الكل", sw: "Tazama Zote", am: "ሁሉንም ይመልከቱ", ha: "Duba duka", zu: "Buka Konke", yo: "Wo Gbogbo", ig: "Lee Niile" },
  cryptocurrencies: { en: "Cryptocurrencies", fr: "Cryptomonnaies", pt: "Criptomoedas", ar: "العملات المشفرة", sw: "Sarafu za Dijiti", am: "ክሪፕቶ ምንዛሬዎች", ha: "Kuɗin Crypto", zu: "Imali Yedijithali", yo: "Owo-Crypto", ig: "Ego Crypto" },
  preciousMaterials: { en: "Precious Materials", fr: "Matériaux Précieux", pt: "Materiais Preciosos", ar: "المواد الثمينة", sw: "Vitu vya Thamani", am: "ውድ ቁሳቁሶች", ha: "Kayayyaki masu daraja", zu: "Izinto Eziligugu", yo: "Awọn Ohun Iyebiye", ig: "Ihe Ndị Dị Oke Ọnụ" },
  fiatBalances: { en: "Fiat Balances", fr: "Soldes Fiat", pt: "Saldos Fiat", ar: "أرصدة العملات", sw: "Salio za Fedha", am: "የገንዘብ ቀሪ ሂሳቦች", ha: "Ma'aunin Kuɗi", zu: "Amabhalansi Emali", yo: "Awọn Iwontunwonsi Owo", ig: "Ego Fiat" },
  convert: { en: "Convert", fr: "Convertir", pt: "Converter", ar: "تحويل", sw: "Badilisha", am: "ቀይር", ha: "Canza", zu: "Guqula", yo: "Yipada", ig: "Gbanwee" },
  trade: { en: "Trade", fr: "Échanger", pt: "Negociar", ar: "تداول", sw: "Biashara", am: "ንግድ", ha: "Ciniki", zu: "Thenga", yo: "Ṣowo", ig: "Azụmahịa" },
  portfolio: { en: "Portfolio", fr: "Portefeuille", pt: "Portfólio", ar: "المحفظة", sw: "Mkoba", am: "ፖርትፎሊዮ", ha: "Fayil", zu: "Iphothifoliyo", yo: "Portfolio", ig: "Portfolio" },
  todayGain: { en: "Today's Gain", fr: "Gain du Jour", pt: "Ganho de Hoje", ar: "ربح اليوم", sw: "Faida ya Leo", am: "የዛሬ ትርፍ", ha: "Ribar Yau", zu: "Inzuzo Yanamuhla", yo: "Ere Oni", ig: "Uru Taa" },
  bestPerformer: { en: "Best Performer", fr: "Meilleure Performance", pt: "Melhor Desempenho", ar: "أفضل أداء", sw: "Bora Zaidi", am: "ምርጥ አፈጻጸም", ha: "Mafi Kyau", zu: "Okusebenza Kahle Kakhulu", yo: "Ti O Dara Ju", ig: "Kacha Mma" },
  worstPerformer: { en: "Worst Performer", fr: "Pire Performance", pt: "Pior Desempenho", ar: "أسوأ أداء", sw: "Mbaya Zaidi", am: "መጥፎ አፈጻጸም", ha: "Mafi Muni", zu: "Okusebenza Kabi Kakhulu", yo: "Ti O Buru Ju", ig: "Kacha Njọ" },
  recentActivity: { en: "Recent Activity", fr: "Activité Récente", pt: "Atividade Recente", ar: "النشاط الأخير", sw: "Shughuli za Karibuni", am: "የቅርብ ጊዜ እንቅስቃሴ", ha: "Ayyukan Kwanan Nan", zu: "Umsebenzi Wakamuva", yo: "Iṣẹ Aipẹ", ig: "Ihe Omume N'oge Na-adịbeghị Anya" },
  priceAlerts: { en: "Price Alerts", fr: "Alertes de Prix", pt: "Alertas de Preço", ar: "تنبيهات السعر", sw: "Tahadhari za Bei", am: "የዋጋ ማስጠንቀቂያዎች", ha: "Sanarwar Farashi", zu: "Izexwayiso Zentengo", yo: "Awọn Ikilọ Idiyele", ig: "Ọnụ ahịa Ịdọ aka na ntị" },
  marketNews: { en: "Market News", fr: "Actualités du Marché", pt: "Notícias do Mercado", ar: "أخبار السوق", sw: "Habari za Soko", am: "የገበያ ዜናዎች", ha: "Labaran Kasuwa", zu: "Izindaba Zemakethe", yo: "Iroyin Ọja", ig: "Akụkọ Ahịa" },
  settings: { en: "Settings", fr: "Paramètres", pt: "Configurações", ar: "الإعدادات", sw: "Mipangilio", am: "ቅንብሮች", ha: "Saitunan", zu: "Izilungiselelo", yo: "Eto", ig: "Ntọala" },
  community: { en: "Community", fr: "Communauté", pt: "Comunidade", ar: "المجتمع", sw: "Jamii", am: "ማህበረሰብ", ha: "Al'umma", zu: "Umphakathi", yo: "Awujo", ig: "Obodo" },
  learn: { en: "Learn", fr: "Apprendre", pt: "Aprender", ar: "تعلم", sw: "Jifunze", am: "ተማር", ha: "Koyo", zu: "Funda", yo: "Kọ", ig: "Mụta" },
  recommendations: { en: "Recommendations", fr: "Recommandations", pt: "Recomendações", ar: "التوصيات", sw: "Mapendekezo", am: "ምክሮች", ha: "Shawarwari", zu: "Izincomo", yo: "Awọn Iṣeduro", ig: "Nkwanye" },
  banks: { en: "Banks", fr: "Banques", pt: "Bancos", ar: "البنوك", sw: "Benki", am: "ባንኮች", ha: "Bankuna", zu: "Amabhange", yo: "Awọn Banki", ig: "Ụlọ Akụ" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("ubap_language")
    if (savedLang && ["en", "fr", "pt", "ar", "sw"].includes(savedLang)) {
      setLanguage(savedLang as Language)
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language.split("-")[0]
      const supportedLangs: Language[] = ["en", "fr", "pt", "ar", "sw"]
      if (supportedLangs.includes(browserLang as Language)) {
        setLanguage(browserLang as Language)
      }
    }
  }, [])

  // Save language when it changes
  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("ubap_language", lang)
  }

  const t = (key: string): string => {
    return getTranslation(key, language)
  }

  return <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
