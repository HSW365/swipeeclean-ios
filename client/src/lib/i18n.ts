// Internationalization utilities for global subscriber support
export interface Translation {
  [key: string]: string;
}

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  translations: Translation;
}

// Base translations - English (default)
const baseTranslations: Translation = {
  // Landing page
  'landing.title': 'Clean your storage with simple swipes',
  'landing.subtitle': 'Join millions cleaning their devices worldwide',
  'landing.cta': 'JOIN 2.5M+ USERS - START FREE',
  'landing.features.unlimited': 'Unlimited storage cleaning',
  'landing.features.duplicates': 'Smart duplicate detection',
  'landing.features.organization': 'Advanced file organization',
  'landing.features.support': 'Priority customer support',
  'landing.features.ads': 'No ads, ever',
  'landing.testimonial1': 'Freed up 15GB in minutes! This app is incredible.',
  'landing.testimonial2': 'My phone feels brand new. Worth every penny!',
  'landing.testimonial3': 'Best storage cleaner I\'ve ever used.',
  'landing.reviews': 'Over 485,000 five-star reviews worldwide',
  'landing.growth': 'Over 15,847 people joined in the last 6 hours',
  
  // Navigation & Common
  'nav.home': 'Home',
  'nav.clean': 'Clean',
  'nav.organize': 'Organize',
  'nav.stats': 'Stats',
  'nav.profile': 'Profile',
  'nav.viral': 'Share & Earn',
  'common.loading': 'Loading...',
  'common.error': 'Something went wrong',
  
  // Home page
  'home.title': 'Your Storage Overview',
  'home.subtitle': 'See what\'s taking up space on your device',
  'home.quickActions': 'Quick Actions',
  'home.startCleaning': 'Start Cleaning',
  'home.organizeMedia': 'Organize Media',
  'home.cleanEmail': 'Clean Gmail',
  'home.shareEarn': 'Share & Earn - Join 2.5M+ Users',
  
  // Media Organizer
  'organize.title': 'Organize Your Media',
  'organize.subtitle': 'Group photos and videos for easy management',
  'organize.scanDevice': 'Scan Device',
  'organize.scanning': 'Scanning device for media files...',
  'organize.allPhotos': 'All Photos',
  'organize.allVideos': 'All Videos',
  'organize.export': 'Export Selected',
  'organize.delete': 'Delete Selected',
  'organize.selectAll': 'Select All Groups',
  
  // Viral/Referral
  'viral.title': 'Share & Earn Big',
  'viral.subtitle': 'Join 2.5M+ users spreading the storage revolution',
  'viral.referralCode': 'Your Referral Code',
  'viral.earnPerFriend': 'Earn $10 for every friend who joins + they get 1 month FREE',
  'viral.shareOnSocial': 'Share on Social Media',
  'viral.rewards': 'Unlock Rewards',
  
  // Subscription
  'subscribe.title': 'Upgrade to Premium',
  'subscribe.price': '$4.99/month',
  'subscribe.features': 'Premium Features',
  'subscribe.subscribe': 'Subscribe Now',
  'subscribe.guarantee': '30-day money-back guarantee',
  
  // Email Cleaner
  'email.title': 'Gmail Cleaner',
  'email.subtitle': 'Clean spam and emails older than 30 days',
  'email.connect': 'Connect & Scan Gmail',
  'email.scanning': 'Scanning Gmail...',
  'email.cleaning': 'Cleaning Gmail...',
  'email.cleanSpam': 'Clean Spam & Old Emails',
  'email.spamFound': 'spam emails found',
  'email.oldFound': 'old emails found',
  'email.spaceSaved': 'space recovered',
  
  // iCloud Cleaner
  'icloud.title': 'iCloud Cleaner',
  'icloud.subtitle': 'Optimize your iCloud storage and remove unnecessary files',
  'icloud.connect': 'Connect to iCloud',
  'icloud.scanning': 'Scanning iCloud Storage...',
  'icloud.cleaning': 'Cleaning iCloud Storage...',
  'icloud.overview': 'iCloud Storage Overview',
  'icloud.categories': 'Storage Categories',
  'icloud.selectToClean': 'Select categories to clean and free up space',
  'icloud.readyToClean': 'Ready to Clean',
  'icloud.optimized': 'iCloud Storage Optimized!',
  'home.cleaniCloud': 'Clean iCloud'
};

// Language configurations with regional translations
export const languages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    translations: baseTranslations
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    translations: {
      ...baseTranslations,
      'landing.title': 'Limpia tu almacenamiento con gestos simples',
      'landing.subtitle': 'Únete a millones limpiando sus dispositivos en todo el mundo',
      'landing.cta': 'ÚNETE A 2.5M+ USUARIOS - GRATIS',
      'landing.features.unlimited': 'Limpieza ilimitada de almacenamiento',
      'landing.features.duplicates': 'Detección inteligente de duplicados',
      'landing.features.organization': 'Organización avanzada de archivos',
      'landing.features.support': 'Soporte prioritario al cliente',
      'landing.features.ads': 'Sin anuncios, nunca',
      'landing.testimonial1': '¡Liberé 15GB en minutos! Esta app es increíble.',
      'landing.testimonial2': 'Mi teléfono se siente como nuevo. ¡Vale cada centavo!',
      'landing.reviews': 'Más de 485,000 reseñas de cinco estrellas en todo el mundo',
      'home.title': 'Resumen de tu Almacenamiento',
      'home.startCleaning': 'Empezar Limpieza',
      'home.organizeMedia': 'Organizar Medios',
      'organize.title': 'Organiza tus Medios',
      'organize.allPhotos': 'Todas las Fotos',
      'organize.allVideos': 'Todos los Videos',
      'viral.title': 'Comparte y Gana',
      'subscribe.title': 'Actualizar a Premium'
    }
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    translations: {
      ...baseTranslations,
      'landing.title': 'Limpe seu armazenamento com gestos simples',
      'landing.subtitle': 'Junte-se a milhões limpando seus dispositivos no mundo todo',
      'landing.cta': 'JUNTE-SE A 2.5M+ USUÁRIOS - GRÁTIS',
      'landing.features.unlimited': 'Limpeza ilimitada de armazenamento',
      'landing.features.duplicates': 'Detecção inteligente de duplicatas',
      'landing.features.organization': 'Organização avançada de arquivos',
      'landing.features.support': 'Suporte prioritário ao cliente',
      'landing.features.ads': 'Sem anúncios, nunca',
      'landing.testimonial1': 'Liberei 15GB em minutos! Este app é incrível.',
      'landing.testimonial2': 'Meu telefone parece novo. Vale cada centavo!',
      'landing.reviews': 'Mais de 485.000 avaliações cinco estrelas mundialmente',
      'home.title': 'Visão Geral do seu Armazenamento',
      'home.startCleaning': 'Iniciar Limpeza',
      'home.organizeMedia': 'Organizar Mídia',
      'organize.title': 'Organize sua Mídia',
      'organize.allPhotos': 'Todas as Fotos',
      'organize.allVideos': 'Todos os Vídeos',
      'viral.title': 'Compartilhe e Ganhe',
      'subscribe.title': 'Atualizar para Premium'
    }
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    translations: {
      ...baseTranslations,
      'landing.title': 'Nettoyez votre stockage avec des gestes simples',
      'landing.subtitle': 'Rejoignez des millions d\'utilisateurs nettoyant leurs appareils',
      'landing.cta': 'REJOIGNEZ 2.5M+ UTILISATEURS - GRATUIT',
      'landing.features.unlimited': 'Nettoyage illimité du stockage',
      'landing.features.duplicates': 'Détection intelligente des doublons',
      'landing.features.organization': 'Organisation avancée des fichiers',
      'landing.features.support': 'Support client prioritaire',
      'landing.features.ads': 'Aucune publicité, jamais',
      'home.title': 'Aperçu de votre Stockage',
      'home.startCleaning': 'Commencer le Nettoyage',
      'home.organizeMedia': 'Organiser les Médias',
      'organize.title': 'Organisez vos Médias',
      'organize.allPhotos': 'Toutes les Photos',
      'organize.allVideos': 'Toutes les Vidéos',
      'viral.title': 'Partagez et Gagnez',
      'subscribe.title': 'Passer à Premium'
    }
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    translations: {
      ...baseTranslations,
      'landing.title': 'Bereinigen Sie Ihren Speicher mit einfachen Wischgesten',
      'landing.subtitle': 'Schließen Sie sich Millionen an, die ihre Geräte weltweit bereinigen',
      'landing.cta': 'SCHLIESSEN SIE SICH 2.5M+ NUTZERN AN - KOSTENLOS',
      'landing.features.unlimited': 'Unbegrenzte Speicherbereinigung',
      'landing.features.duplicates': 'Intelligente Duplikatserkennung',
      'landing.features.organization': 'Erweiterte Dateiorganisation',
      'landing.features.support': 'Prioritärer Kundensupport',
      'landing.features.ads': 'Keine Werbung, niemals',
      'home.title': 'Ihre Speicher-Übersicht',
      'home.startCleaning': 'Bereinigung Starten',
      'home.organizeMedia': 'Medien Organisieren',
      'organize.title': 'Organisieren Sie Ihre Medien',
      'organize.allPhotos': 'Alle Fotos',
      'organize.allVideos': 'Alle Videos',
      'viral.title': 'Teilen und Verdienen',
      'subscribe.title': 'Auf Premium Upgraden'
    }
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    translations: {
      ...baseTranslations,
      'landing.title': '通过简单滑动清理您的存储空间',
      'landing.subtitle': '加入全球数百万用户清理设备的行列',
      'landing.cta': '加入250万+用户 - 免费开始',
      'landing.features.unlimited': '无限存储清理',
      'landing.features.duplicates': '智能重复文件检测',
      'landing.features.organization': '高级文件整理',
      'landing.features.support': '优先客户支持',
      'landing.features.ads': '永远无广告',
      'home.title': '您的存储概览',
      'home.startCleaning': '开始清理',
      'home.organizeMedia': '整理媒体',
      'organize.title': '整理您的媒体',
      'organize.allPhotos': '所有照片',
      'organize.allVideos': '所有视频',
      'viral.title': '分享赚钱',
      'subscribe.title': '升级到高级版'
    }
  },
  {
    code: 'hi',
    name: 'हिंदी',
    flag: '🇮🇳',
    translations: {
      ...baseTranslations,
      'landing.title': 'सरल स्वाइप के साथ अपना स्टोरेज साफ करें',
      'landing.subtitle': 'दुनियाभर में अपने डिवाइस साफ करने वाले लाखों लोगों से जुड़ें',
      'landing.cta': '2.5M+ उपयोगकर्ताओं से जुड़ें - मुफ्त',
      'landing.features.unlimited': 'असीमित स्टोरेज सफाई',
      'landing.features.duplicates': 'स्मार्ट डुप्लिकेट खोज',
      'landing.features.organization': 'उन्नत फाइल व्यवस्था',
      'landing.features.support': 'प्राथमिकता ग्राहक सहायता',
      'landing.features.ads': 'कोई विज्ञापन नहीं, कभी नहीं',
      'home.title': 'आपका स्टोरेज अवलोकन',
      'home.startCleaning': 'सफाई शुरू करें',
      'home.organizeMedia': 'मीडिया व्यवस्थित करें',
      'organize.title': 'अपना मीडिया व्यवस्थित करें',
      'organize.allPhotos': 'सभी फोटो',
      'organize.allVideos': 'सभी वीडियो',
      'viral.title': 'साझा करें और कमाएं',
      'subscribe.title': 'प्रीमियम में अपग्रेड करें'
    }
  },
  {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    translations: {
      ...baseTranslations,
      'landing.title': 'シンプルなスワイプでストレージをクリーンアップ',
      'landing.subtitle': '世界中でデバイスをクリーンアップする数百万人のユーザーに参加',
      'landing.cta': '250万人以上のユーザーに参加 - 無料',
      'landing.features.unlimited': '無制限ストレージクリーニング',
      'landing.features.duplicates': 'スマート重複検出',
      'landing.features.organization': '高度なファイル整理',
      'landing.features.support': '優先カスタマーサポート',
      'landing.features.ads': '広告なし、永久に',
      'home.title': 'ストレージ概要',
      'home.startCleaning': 'クリーニング開始',
      'home.organizeMedia': 'メディア整理',
      'organize.title': 'メディアを整理',
      'organize.allPhotos': 'すべての写真',
      'organize.allVideos': 'すべての動画',
      'viral.title': 'シェアして稼ぐ',
      'subscribe.title': 'プレミアムにアップグレード'
    }
  }
];

// Get user's preferred language based on browser/location
export function detectUserLanguage(): string {
  // Try browser language first
  const browserLang = navigator.language.split('-')[0];
  
  // Check if we support this language
  const supportedLang = languages.find(lang => lang.code === browserLang);
  if (supportedLang) {
    return browserLang;
  }
  
  // Fallback to English
  return 'en';
}

// Get user's country/region for localization
export async function detectUserRegion(): Promise<string> {
  try {
    // Use IP geolocation API to detect user's country
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch region data');
    }
    const data = await response.json();
    return data.country_code || 'US';
  } catch (error) {
    // Silent fallback without logging to prevent unhandled rejections
    return 'US';
  }
}

// Map regions to languages
export function getLanguageForRegion(region: string): string {
  const regionLanguageMap: { [key: string]: string } = {
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es',
    'BR': 'pt', 'PT': 'pt',
    'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CA': 'fr',
    'DE': 'de', 'AT': 'de',
    'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
    'IN': 'hi',
    'JP': 'ja'
  };
  
  return regionLanguageMap[region] || 'en';
}

// Get translation for a key
export function translate(key: string, lang: string = 'en'): string {
  const language = languages.find(l => l.code === lang);
  if (!language) {
    return key; // Return key if language not found
  }
  
  return language.translations[key] || key;
}

import { useState } from 'react';

// React hook for translations
export function useTranslation(initialLang?: string) {
  const [currentLang, setCurrentLang] = useState(initialLang || detectUserLanguage());
  
  const t = (key: string) => translate(key, currentLang);
  
  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred-language', lang);
  };
  
  return { t, currentLang, changeLanguage, languages };
}