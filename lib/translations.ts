export type Language = "en" | "fr" | "pt" | "ar" | "sw" | "am" | "ha" | "zu" | "yo" | "ig"

export const translations = {
  // Navigation
  home: { en: "Home", fr: "Accueil", pt: "Início", ar: "الرئيسية", sw: "Nyumbani", am: "ቤት", ha: "Gida", zu: "Ikhaya", yo: "Ile", ig: "Ulo" },
  markets: { en: "Markets", fr: "Marchés", pt: "Mercados", ar: "الأسواق", sw: "Masoko", am: "ገበያዎች", ha: "Kasuwanni", zu: "Izimakethe", yo: "Ọja", ig: "Ahịa" },
  invest: { en: "Invest", fr: "Investir", pt: "Investir", ar: "استثمر", sw: "Wekeza", am: "ኢንቬስት", ha: "Saka hannun jari", zu: "Tshala", yo: "Ṣe idoko-owo", ig: "Tinye ego" },
  wallet: { en: "Wallet", fr: "Portefeuille", pt: "Carteira", ar: "المحفظة", sw: "Pochi", am: "ቦርሳ", ha: "Jakar kuɗi", zu: "Isikhwama", yo: "Apo-owo", ig: "Akpa ego" },
  profile: { en: "Profile", fr: "Profil", pt: "Perfil", ar: "الملف", sw: "Wasifu", am: "መገለጫ", ha: "Bayanan sirri", zu: "Iphrofayili", yo: "Profaili", ig: "Profaịlụ" },
  
  // Dashboard
  totalBalance: { en: "Total Balance", fr: "Solde Total", pt: "Saldo Total", ar: "الرصيد الإجمالي", sw: "Jumla ya Salio", am: "ጠቅላላ ቀሪ ሂሳብ", ha: "Jimlar ma'auni", zu: "Isamba Sebhalansi", yo: "Apao Iwontunwonsi", ig: "Ngụkọta Ego" },
  showBalance: { en: "Show Balance", fr: "Afficher le solde", pt: "Mostrar Saldo", ar: "إظهار الرصيد", sw: "Onyesha Salio", am: "ቀሪ ሂሳብ አሳይ", ha: "Nuna ma'auni", zu: "Khombisa Ibhalansi", yo: "Fi Iwontunwonsi han", ig: "Gosi Ego" },
  hideBalance: { en: "Hide Balance", fr: "Masquer le solde", pt: "Ocultar Saldo", ar: "إخفاء الرصيد", sw: "Ficha Salio", am: "ቀሪ ሂሳብ ደብቅ", ha: "Ɓoye ma'auni", zu: "Fihla Ibhalansi", yo: "Fi Iwontunwonsi pamọ", ig: "Zoo Ego" },
  quickActions: { en: "Quick Actions", fr: "Actions Rapides", pt: "Ações Rápidas", ar: "إجراءات سريعة", sw: "Vitendo vya Haraka", am: "ፈጣን እርምጃዎች", ha: "Masu Sauri Ayyuka", zu: "Izenzo Ezisheshayo", yo: "Awọn Iṣe Kiakia", ig: "Ihe Ngwa Ngwa" },
  send: { en: "Send", fr: "Envoyer", pt: "Enviar", ar: "إرسال", sw: "Tuma", am: "ላክ", ha: "Aika", zu: "Thumela", yo: "Firanṣẹ", ig: "Zipu" },
  receive: { en: "Receive", fr: "Recevoir", pt: "Receber", ar: "استقبال", sw: "Pokea", am: "ተቀበል", ha: "Karɓa", zu: "Thola", yo: "Gba", ig: "Nata" },
  convert: { en: "Convert", fr: "Convertir", pt: "Converter", ar: "تحويل", sw: "Badilisha", am: "ቀይር", ha: "Canza", zu: "Guqula", yo: "Yipada", ig: "Gbanwee" },
  trade: { en: "Trade", fr: "Échanger", pt: "Negociar", ar: "تداول", sw: "Biashara", am: "ንግድ", ha: "Ciniki", zu: "Thenga", yo: "Ṣowo", ig: "Azụmahịa" },
  
  // Crypto Assets
  cryptocurrencies: { en: "Cryptocurrencies", fr: "Cryptomonnaies", pt: "Criptomoedas", ar: "العملات المشفرة", sw: "Sarafu za Dijiti", am: "ክሪፕቶ ምንዛሬዎች", ha: "Kuɗin Crypto", zu: "Imali Yedijithali", yo: "Owo-Crypto", ig: "Ego Crypto" },
  viewAll: { en: "View All", fr: "Voir tout", pt: "Ver Tudo", ar: "عرض الكل", sw: "Tazama Zote", am: "ሁሉንም ይመልከቱ", ha: "Duba duka", zu: "Buka Konke", yo: "Wo Gbogbo", ig: "Lee Niile" },
  preciousMaterials: { en: "Precious Materials", fr: "Matériaux Précieux", pt: "Materiais Preciosos", ar: "المواد الثمينة", sw: "Vitu vya Thamani", am: "ውድ ቁሳቁሶች", ha: "Kayayyaki masu daraja", zu: "Izinto Eziligugu", yo: "Awọn Ohun Iyebiye", ig: "Ihe Ndị Dị Oke Ọnụ" },
  fiatBalances: { en: "Fiat Balances", fr: "Soldes Fiat", pt: "Saldos Fiat", ar: "أرصدة العملات", sw: "Salio za Fedha", am: "የገንዘብ ቀሪ ሂሳቦች", ha: "Ma'aunin Kuɗi", zu: "Amabhalansi Emali", yo: "Awọn Iwontunwonsi Owo", ig: "Ego Fiat" },
  linkBank: { en: "Link Bank", fr: "Lier Banque", pt: "Vincular Banco", ar: "ربط البنك", sw: "Unganisha Benki", am: "ባንክ አገናኝ", ha: "Haɗa Banki", zu: "Xhuma Ibhange", yo: "So Banki pọ", ig: "Jikọọ Ụlọ Akụ" },
  
  // Profile
  editProfile: { en: "Edit Profile", fr: "Modifier le profil", pt: "Editar Perfil", ar: "تعديل الملف", sw: "Hariri Wasifu", am: "መገለጫ አርትዕ", ha: "Gyara Bayanan", zu: "Hlela Iphrofayili", yo: "Ṣatunkọ Profaili", ig: "Dezie Profaịlụ" },
  saveChanges: { en: "Save Changes", fr: "Enregistrer", pt: "Salvar", ar: "حفظ التغييرات", sw: "Hifadhi Mabadiliko", am: "ለውጦችን አስቀምጥ", ha: "Ajiye Canje-canje", zu: "Gcina Izinguquko", yo: "Fi Awọn ayipada pamọ", ig: "Chekwaa Mgbanwe" },
  personalInformation: { en: "Personal Information", fr: "Informations Personnelles", pt: "Informações Pessoais", ar: "المعلومات الشخصية", sw: "Taarifa za Kibinafsi", am: "የግል መረጃ", ha: "Bayanan Sirri", zu: "Ulwazi Lomuntu Siqu", yo: "Alaye Ti ara ẹni", ig: "Ozi Nkeonwe" },
  fullName: { en: "Full Name", fr: "Nom Complet", pt: "Nome Completo", ar: "الاسم الكامل", sw: "Jina Kamili", am: "ሙሉ ስም", ha: "Cikakken Suna", zu: "Igama Eligcwele", yo: "Oruko Kikun", ig: "Aha Zuru Oke" },
  email: { en: "Email", fr: "Email", pt: "Email", ar: "البريد الإلكتروني", sw: "Barua pepe", am: "ኢሜይል", ha: "Imel", zu: "I-imeyili", yo: "Imeeli", ig: "Email" },
  phoneNumber: { en: "Phone Number", fr: "Numéro de téléphone", pt: "Número de telefone", ar: "رقم الهاتف", sw: "Nambari ya Simu", am: "ስልክ ቁጥር", ha: "Lambar Waya", zu: "Inombolo Yocingo", yo: "Nọmba Foonu", ig: "Nọmba Ekwentị" },
  
  // Settings
  settings: { en: "Settings", fr: "Paramètres", pt: "Configurações", ar: "الإعدادات", sw: "Mipangilio", am: "ቅንብሮች", ha: "Saitunan", zu: "Izilungiselelo", yo: "Eto", ig: "Ntọala" },
  language: { en: "Language", fr: "Langue", pt: "Idioma", ar: "اللغة", sw: "Lugha", am: "ቋንቋ", ha: "Harshe", zu: "Ulimi", yo: "Ede", ig: "Asụsụ" },
  selectLanguage: { en: "Select Language", fr: "Sélectionner la langue", pt: "Selecionar idioma", ar: "اختر اللغة", sw: "Chagua Lugha", am: "ቋንቋ ይምረጡ", ha: "Zaɓi Harshe", zu: "Khetha Ulimi", yo: "Yan Ede", ig: "Họrọ Asụsụ" },
  
  // Transactions
  transactions: { en: "Transactions", fr: "Transactions", pt: "Transações", ar: "المعاملات", sw: "Miamala", am: "ግብይቶች", ha: "Ma'amaloli", zu: "Ukusebenzisana", yo: "Awọn iṣowo", ig: "Azụmahịa" },
  history: { en: "History", fr: "Historique", pt: "Histórico", ar: "السجل", sw: "Historia", am: "ታሪክ", ha: "Tarihi", zu: "Umlando", yo: "Itan", ig: "Akụkọ ihe mere eme" },
  pending: { en: "Pending", fr: "En attente", pt: "Pendente", ar: "قيد الانتظار", sw: "Inasubiri", am: "በመጠባበቅ ላይ", ha: "Ana jira", zu: "Kulindile", yo: "Ti nduro", ig: "Na-eche" },
  completed: { en: "Completed", fr: "Terminé", pt: "Concluído", ar: "مكتمل", sw: "Imekamilika", am: "ተጠናቅቋል", ha: "An kammala", zu: "Kuqediwe", yo: "Ti pari", ig: "Emechara" },
  failed: { en: "Failed", fr: "Échoué", pt: "Falhado", ar: "فشل", sw: "Imeshindwa", am: "ተሳስቷል", ha: "Ya kasa", zu: "Kuhlulekile", yo: "Kuna", ig: "Dara ada" },
  
  // Quick Actions - Page d'accueil
  deposit: { en: "Deposit", fr: "Déposer", pt: "Depositar", ar: "إيداع", sw: "Weka", am: "አስገባ", ha: "Ajiya", zu: "Faka", yo: "Fi sii", ig: "Tinye" },
  addPi: { en: "Add Pi", fr: "Ajouter Pi", pt: "Adicionar Pi", ar: "أضف Pi", sw: "Ongeza Pi", am: "Pi ጨምር", ha: "Kara Pi", zu: "Faka Pi", yo: "Fi Pi kun", ig: "Tinye Pi" },
  cards: { en: "Cards", fr: "Cartes", pt: "Cartões", ar: "البطاقات", sw: "Kadi", am: "ካርዶች", ha: "Katuna", zu: "Amakhadi", yo: "Awọn kaadi", ig: "Kaadị" },
  pay: { en: "Pay", fr: "Payer", pt: "Pagar", ar: "ادفع", sw: "Lipa", am: "ክፈል", ha: "Biya", zu: "Khokha", yo: "Sanwo", ig: "Kwụọ ụgwọ" },
  escrow: { en: "Escrow", fr: "Garantie", pt: "Garantia", ar: "ضمان", sw: "Dhamana", am: "መያዣ", ha: "Garanti", zu: "Isiqiniseko", yo: "Idaniloju", ig: "Nchekwa" },
  safePay: { en: "Safe Pay", fr: "Paiement Sûr", pt: "Pagamento Seguro", ar: "دفع آمن", sw: "Malipo Salama", am: "ደህንነቱ የተጠበቀ ክፍያ", ha: "Biya mai Aminci", zu: "Inkokhelo Ephephile", yo: "Isanwo Ailewu", ig: "Ụgwọ Nchekwa" },
  
  // Exchange Money
  exchangeMoney: { en: "Exchange Money", fr: "Échanger l'Argent", pt: "Trocar Dinheiro", ar: "صرف الأموال", sw: "Badilisha Pesa", am: "ገንዘብ ቀይር", ha: "Musayar Kuɗi", zu: "Shintsha Imali", yo: "Paarọ Owo", ig: "Gbanwee Ego" },
  convertPiToCash: { en: "Convert Pi to cash", fr: "Convertir Pi en espèces", pt: "Converter Pi em dinheiro", ar: "تحويل Pi إلى نقد", sw: "Badilisha Pi kuwa pesa taslimu", am: "Pi ወደ ጥሬ ገንዘብ ቀይር", ha: "Canza Pi zuwa kuɗi", zu: "Guqula Pi ibe imali", yo: "Yi Pi pada si owo", ig: "Gbanwee Pi ka ọ bụrụ ego" },
  anyAssetToAnyAsset: { en: "Any asset to any asset", fr: "N'importe quel actif", pt: "Qualquer ativo", ar: "أي أصل إلى أصل", sw: "Mali yoyote", am: "ማንኛውም ንብረት", ha: "Kowace kadara", zu: "Noma yimuphi impahla", yo: "Eyikeyi ohun-ini", ig: "Ihe ọ bụla" },
  
  // Tontine
  piTontine: { en: "Pi Tontine", fr: "Tontine Pi", pt: "Tontine Pi", ar: "تونتين Pi", sw: "Tontine ya Pi", am: "Pi ቶንቲን", ha: "Pi Tontine", zu: "I-Pi Tontine", yo: "Pi Tontine", ig: "Pi Tontine" },
  rotatingSavings: { en: "Rotating savings", fr: "Épargne rotative", pt: "Poupança rotativa", ar: "مدخرات دوارة", sw: "Akiba zinazozunguka", am: "ተራ ቁጠባ", ha: "Ajiyar juyi", zu: "Isindingi esijikayo", yo: "Ifowopamọ yiyi", ig: "Nchekwa ntụgharị" },
  myGroups: { en: "My Groups", fr: "Mes Groupes", pt: "Meus Grupos", ar: "مجموعاتي", sw: "Vikundi Vyangu", am: "የኔ ቡድኖች", ha: "Kungiyoyina", zu: "Amaqembu Ami", yo: "Awọn Ẹgbẹ Mi", ig: "Otu M" },
  availableGroups: { en: "Available Groups", fr: "Groupes Disponibles", pt: "Grupos Disponíveis", ar: "المجموعات المتاحة", sw: "Vikundi Vinavyopatikana", am: "የሚገኙ ቡድኖች", ha: "Kungiyoyin da ake da su", zu: "Amaqembu Atholakalayo", yo: "Awọn Ẹgbẹ to wa", ig: "Otu Dị" },
  joinGroup: { en: "Join Group", fr: "Rejoindre", pt: "Entrar", ar: "انضم", sw: "Jiunge", am: "ይቀላቀሉ", ha: "Shiga", zu: "Joyina", yo: "Darapọ", ig: "Sonyere" },
  createGroup: { en: "Create Group", fr: "Créer Groupe", pt: "Criar Grupo", ar: "إنشاء مجموعة", sw: "Unda Kikundi", am: "ቡድን ይፍጠሩ", ha: "Kirkiro Kungiya", zu: "Dala Iqembu", yo: "Ṣẹda Ẹgbẹ", ig: "Mepụta Otu" },
  members: { en: "members", fr: "membres", pt: "membros", ar: "أعضاء", sw: "wanachama", am: "አባላት", ha: "mambobi", zu: "amalungu", yo: "awọn ọmọ ẹgbẹ", ig: "ndị otu" },
  contribution: { en: "Contribution", fr: "Contribution", pt: "Contribuição", ar: "المساهمة", sw: "Mchango", am: "አስተዋጽኦ", ha: "Gudummawa", zu: "Umnikelo", yo: "Idasi", ig: "Ntinye aka" },
  nextPayout: { en: "Next Payout", fr: "Prochain Paiement", pt: "Próximo Pagamento", ar: "الدفع التالي", sw: "Malipo Yanayofuata", am: "ቀጣይ ክፍያ", ha: "Biya na gaba", zu: "Inkokhelo Elandelayo", yo: "Isanwo Tokan", ig: "Ụgwọ Na-esote" },
  groupChat: { en: "Group Chat", fr: "Chat de Groupe", pt: "Chat do Grupo", ar: "دردشة المجموعة", sw: "Mazungumzo ya Kikundi", am: "የቡድን ውይይት", ha: "Hira ta Kungiya", zu: "Ingxoxo Yeqembu", yo: "Ibaraẹnisọrọ Ẹgbẹ", ig: "Mkparịta ụka Otu" },
  
  // Virtual Cards
  virtualCards: { en: "Virtual Cards", fr: "Cartes Virtuelles", pt: "Cartões Virtuais", ar: "البطاقات الافتراضية", sw: "Kadi za Kimajazo", am: "ምናባዊ ካርዶች", ha: "Katuna na Kama", zu: "Amakhadi Ebonakalayo", yo: "Awọn kaadi Foju", ig: "Kaadị Eletrọnịkị" },
  generateNewCard: { en: "Generate New Card", fr: "Nouvelle Carte", pt: "Gerar Cartão", ar: "بطاقة جديدة", sw: "Unda Kadi Mpya", am: "አዲስ ካርድ", ha: "Samar Katu", zu: "Khiqiza Ikhadi", yo: "Ṣẹda Kaadi", ig: "Mepụta Kaadị" },
  cardBalance: { en: "Card Balance", fr: "Solde Carte", pt: "Saldo do Cartão", ar: "رصيد البطاقة", sw: "Salio la Kadi", am: "የካርድ ቀሪ", ha: "Ma'aunin Katu", zu: "Ibhalansi Yekhadi", yo: "Iwontunwonsi Kaadi", ig: "Ego Kaadị" },
  rechargeCard: { en: "Recharge", fr: "Recharger", pt: "Recarregar", ar: "إعادة شحن", sw: "Ongeza", am: "ሙላ", ha: "Caje", zu: "Gcwalisa", yo: "Agbega", ig: "Kwụọ ụgwọ" },
  freezeCard: { en: "Freeze", fr: "Geler", pt: "Congelar", ar: "تجميد", sw: "Simamisha", am: "አቀዝቅዝ", ha: "Daskare", zu: "Misa", yo: "Duro", ig: "Kwụsị" },
  unfreezeCard: { en: "Unfreeze", fr: "Débloquer", pt: "Descongelar", ar: "إلغاء تجميد", sw: "Fungua", am: "ፍታ", ha: "Kwance", zu: "Vula", yo: "Tu silẹ", ig: "Mepee" },
  
  // Common
  cancel: { en: "Cancel", fr: "Annuler", pt: "Cancelar", ar: "إلغاء", sw: "Ghairi", am: "ሰርዝ", ha: "Soke", zu: "Khansela", yo: "Fagilee", ig: "Kagbuo" },
  confirm: { en: "Confirm", fr: "Confirmer", pt: "Confirmar", ar: "تأكيد", sw: "Thibitisha", am: "አረጋግጥ", ha: "Tabbatar", zu: "Qinisekisa", yo: "Jẹrisi", ig: "Kwenye" },
  back: { en: "Back", fr: "Retour", pt: "Voltar", ar: "رجوع", sw: "Rudi", am: "ተመለስ", ha: "Koma", zu: "Buyela", yo: "Pada", ig: "Laghachi azụ" },
  next: { en: "Next", fr: "Suivant", pt: "Próximo", ar: "التالي", sw: "Ifuatayo", am: "ቀጣይ", ha: "Na gaba", zu: "Okulandelayo", yo: "Itele", ig: "Osote" },
  save: { en: "Save", fr: "Enregistrer", pt: "Salvar", ar: "حفظ", sw: "Hifadhi", am: "አስቀምጥ", ha: "Ajiye", zu: "Gcina", yo: "Fipamọ", ig: "Chekwaa" },
  delete: { en: "Delete", fr: "Supprimer", pt: "Excluir", ar: "حذف", sw: "Futa", am: "ሰርዝ", ha: "Share", zu: "Susa", yo: "Paarẹ", ig: "Hichapụ" },
  loading: { en: "Loading...", fr: "Chargement...", pt: "Carregando...", ar: "جارٍ التحميل...", sw: "Inapakia...", am: "በመጫን ላይ...", ha: "Ana lodawa...", zu: "Iyalayisha...", yo: "N ṣiṣẹ...", ig: "Na-ebu..." },
  error: { en: "Error", fr: "Erreur", pt: "Erro", ar: "خطأ", sw: "Kosa", am: "ስህተት", ha: "Kuskure", zu: "Iphutha", yo: "Aṣiṣe", ig: "Njehie" },
  success: { en: "Success", fr: "Succès", pt: "Sucesso", ar: "نجاح", sw: "Mafanikio", am: "ስኬት", ha: "Nasara", zu: "Impumelelo", yo: "Aṣeyọri", ig: "Ihe ịga nke ọma" },
  close: { en: "Close", fr: "Fermer", pt: "Fechar", ar: "إغلاق", sw: "Funga", am: "ዝጋ", ha: "Rufe", zu: "Vala", yo: "Ti", ig: "Mechie" },
  view: { en: "View", fr: "Voir", pt: "Ver", ar: "عرض", sw: "Tazama", am: "ይመልከቱ", ha: "Duba", zu: "Buka", yo: "Wo", ig: "Lee" },
  edit: { en: "Edit", fr: "Modifier", pt: "Editar", ar: "تعديل", sw: "Hariri", am: "አርትዕ", ha: "Gyara", zu: "Hlela", yo: "Ṣatunkọ", ig: "Dezie" },
  continue: { en: "Continue", fr: "Continuer", pt: "Continuar", ar: "متابعة", sw: "Endelea", am: "ቀጥል", ha: "Ci gaba", zu: "Qhubeka", yo: "Tẹsiwaju", ig: "Gaa n'ihu" },
  
  // Materials
  gold: { en: "Gold", fr: "Or", pt: "Ouro", ar: "ذهب", sw: "Dhahabu", am: "ወርቅ", ha: "Zinariya", zu: "Igolide", yo: "Goolu", ig: "Ọlaedo" },
  silver: { en: "Silver", fr: "Argent", pt: "Prata", ar: "فضة", sw: "Fedha", am: "ብር", ha: "Azurfa", zu: "Isiliva", yo: "Fadaka", ig: "Ọlaọcha" },
  diamond: { en: "Diamond", fr: "Diamant", pt: "Diamante", ar: "الماس", sw: "Almasi", am: "አልማዝ", ha: "Lu'ulu'u", zu: "Idayimane", yo: "Okuta iyebiye", ig: "Diamond" },
}

export function getTranslation(key: string, lang: Language): string {
  return translations[key as keyof typeof translations]?.[lang] || key
}
