"use client"

import { useLanguage } from "@/contexts/language-context"

// Comprehensive translations object
export const APP_TRANSLATIONS = {
  // Navigation
  home: { en: "Home", fr: "Accueil", pt: "Início", ar: "الرئيسية", sw: "Nyumbani", am: "መነሻ", ha: "Gida", zu: "Ikhaya", yo: "Ile", ig: "Ulo" },
  markets: { en: "Markets", fr: "Marchés", pt: "Mercados", ar: "الأسواق", sw: "Masoko", am: "ገበያዎች", ha: "Kasuwanni", zu: "Izimakethe", yo: "Awọn ọja", ig: "Ahịa" },
  invest: { en: "Invest", fr: "Investir", pt: "Investir", ar: "استثمار", sw: "Wekeza", am: "ኢንቨስት", ha: "Saka hannun jari", zu: "Tshala imali", yo: "Ṣowo", ig: "Tinye ego" },
  wallet: { en: "Wallet", fr: "Portefeuille", pt: "Carteira", ar: "المحفظة", sw: "Mkoba", am: "ቦርሳ", ha: "Jakar", zu: "Isikhwama", yo: "Apamọwọ", ig: "Akpa ego" },
  profile: { en: "Profile", fr: "Profil", pt: "Perfil", ar: "الملف", sw: "Wasifu", am: "መገለጫ", ha: "Bayani", zu: "Iphrofayili", yo: "Profaili", ig: "Profaịlụ" },
  payBills: { en: "Pay Bills", fr: "Payer Factures", pt: "Pagar Contas", ar: "دفع الفواتير", sw: "Lipa Bili", am: "ክፍያ", ha: "Biya Lissafi", zu: "Khokha Izikweletu", yo: "Sanwo Iwe", ig: "Kwụọ Ụgwọ" },
  groupPay: { en: "Group Pay", fr: "Cagnotte", pt: "Vaquinha", ar: "دفع جماعي", sw: "Malipo ya Kikundi", am: "የቡድን ክፍያ", ha: "Biyan Kungiya", zu: "Inkokhelo Yeqembu", yo: "Isanwo Ẹgbẹ", ig: "Ụgwọ Otu" },
  
  // Quick Actions
  deposit: { en: "Deposit", fr: "Déposer", pt: "Depositar", ar: "إيداع", sw: "Weka", am: "አስገባ", ha: "Ajiya", zu: "Faka", yo: "Fi sii", ig: "Tinye" },
  addPi: { en: "Add Pi", fr: "Ajouter Pi", pt: "Adicionar Pi", ar: "أضف Pi", sw: "Ongeza Pi", am: "Pi ጨምር", ha: "Kara Pi", zu: "Faka Pi", yo: "Fi Pi kun", ig: "Tinye Pi" },
  cards: { en: "Cards", fr: "Cartes", pt: "Cartões", ar: "البطاقات", sw: "Kadi", am: "ካርዶች", ha: "Katuna", zu: "Amakhadi", yo: "Awọn kaadi", ig: "Kaadị" },
  pay: { en: "Pay", fr: "Payer", pt: "Pagar", ar: "ادفع", sw: "Lipa", am: "ክፈል", ha: "Biya", zu: "Khokha", yo: "Sanwo", ig: "Kwụọ ụgwọ" },
  escrow: { en: "Escrow", fr: "Garantie", pt: "Garantia", ar: "ضمان", sw: "Dhamana", am: "መያዣ", ha: "Garanti", zu: "Isiqiniseko", yo: "Idaniloju", ig: "Nchekwa" },
  safePay: { en: "Safe Pay", fr: "Paiement Sûr", pt: "Pagamento Seguro", ar: "دفع آمن", sw: "Malipo Salama", am: "ደህንነቱ የተጠበቀ ክፍያ", ha: "Biya mai Aminci", zu: "Inkokhelo Ephephile", yo: "Isanwo Ailewu", ig: "Ụgwọ Nchekwa" },
  
  // Tontine
  piTontine: { en: "Pi Tontine", fr: "Tontine Pi", pt: "Tontine Pi", ar: "تونتين Pi", sw: "Tontine ya Pi", am: "Pi ቶንቲን", ha: "Pi Tontine", zu: "I-Pi Tontine", yo: "Pi Tontine", ig: "Pi Tontine" },
  rotatingSavings: { en: "Rotating savings", fr: "Épargne rotative", pt: "Poupança rotativa", ar: "مدخرات دوارة", sw: "Akiba zinazozunguka", am: "ተራ ቁጠባ", ha: "Ajiyar juyi", zu: "Isindingi esijikayo", yo: "Ifowopamọ yiyi", ig: "Nchekwa ntụgharị" },
  
  // Exchange
  exchangeMoney: { en: "Exchange Money", fr: "Échanger l'Argent", pt: "Trocar Dinheiro", ar: "صرف الأموال", sw: "Badilisha Pesa", am: "ገንዘብ ቀይር", ha: "Musayar Kuɗi", zu: "Shintsha Imali", yo: "Paarọ Owo", ig: "Gbanwee Ego" },
  convertPiToCash: { en: "Convert Pi to cash", fr: "Convertir Pi en espèces", pt: "Converter Pi em dinheiro", ar: "تحويل Pi إلى نقد", sw: "Badilisha Pi kuwa pesa taslimu", am: "Pi ወደ ጥሬ ገንዘብ ቀይር", ha: "Canza Pi zuwa kuɗi", zu: "Guqula Pi ibe imali", yo: "Yi Pi pada si owo", ig: "Gbanwee Pi ka ọ bụrụ ego" },
  
  // Common
  cancel: { en: "Cancel", fr: "Annuler", pt: "Cancelar", ar: "إلغاء", sw: "Ghairi", am: "ሰርዝ", ha: "Soke", zu: "Khansela", yo: "Fagilee", ig: "Kagbuo" },
  confirm: { en: "Confirm", fr: "Confirmer", pt: "Confirmar", ar: "تأكيد", sw: "Thibitisha", am: "አረጋግጥ", ha: "Tabbatar", zu: "Qinisekisa", yo: "Jẹrisi", ig: "Kwenye" },
  loading: { en: "Loading...", fr: "Chargement...", pt: "Carregando...", ar: "جارٍ التحميل...", sw: "Inapakia...", am: "በመጫን ላይ...", ha: "Ana lodawa...", zu: "Iyalayisha...", yo: "N ṣiṣẹ...", ig: "Na-ebu..." },
  success: { en: "Success", fr: "Succès", pt: "Sucesso", ar: "نجاح", sw: "Mafanikio", am: "ስኬት", ha: "Nasara", zu: "Impumelelo", yo: "Aṣeyọri", ig: "Ihe ịga nke ọma" },
} as const

export type TranslationKey = keyof typeof APP_TRANSLATIONS

export function useTranslation() {
  const { language } = useLanguage()
  
  const t = (key: TranslationKey): string => {
    const translation = APP_TRANSLATIONS[key]
    if (!translation) return key
    return translation[language] || translation.en || key
  }
  
  return { t, language }
}
