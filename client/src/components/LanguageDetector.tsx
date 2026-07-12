import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectUserRegion, getLanguageForRegion, languages } from '@/lib/i18n';

interface LanguageDetectorProps {
  onLanguageSet: (language: string) => void;
}

export default function LanguageDetector({ onLanguageSet }: LanguageDetectorProps) {
  const [detectedLang, setDetectedLang] = useState<string>('en');
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const region = await detectUserRegion();
        const language = getLanguageForRegion(region);
        setDetectedLang(language);
      } catch (error) {
        // Silent fallback to English
        setDetectedLang('en');
      } finally {
        setIsDetecting(false);
      }
    };

    detectLanguage().catch(() => {
      // Ensure any unhandled promise is caught
      setDetectedLang('en');
      setIsDetecting(false);
    });
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    localStorage.setItem('preferred-language', langCode);
    onLanguageSet(langCode);
  };

  if (isDetecting) {
    return (
      <motion.div 
        className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-center text-gray-600">Detecting your region...</p>
        </div>
      </motion.div>
    );
  }

  const detectedLanguage = languages.find(lang => lang.code === detectedLang);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-white rounded-lg p-6 max-w-sm mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center mb-6">
          <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Choose Your Language</h3>
          <p className="text-gray-600 text-sm">
            We detected you might prefer {detectedLanguage?.flag} {detectedLanguage?.name}
          </p>
        </div>

        <div className="space-y-3">
          {detectedLang !== 'en' && (
            <Button 
              onClick={() => handleLanguageSelect(detectedLang)}
              className="w-full justify-start"
              variant="default"
            >
              <span className="text-lg mr-2">{detectedLanguage?.flag}</span>
              Use {detectedLanguage?.name}
            </Button>
          )}
          
          <Button 
            onClick={() => handleLanguageSelect('en')}
            className="w-full justify-start"
            variant={detectedLang === 'en' ? 'default' : 'outline'}
          >
            <span className="text-lg mr-2">🇺🇸</span>
            Continue in English
          </Button>

          <details className="text-sm">
            <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
              Other languages
            </summary>
            <div className="mt-2 space-y-1">
              {languages.filter(lang => lang.code !== 'en' && lang.code !== detectedLang).map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded flex items-center"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </details>
        </div>
      </motion.div>
    </motion.div>
  );
}