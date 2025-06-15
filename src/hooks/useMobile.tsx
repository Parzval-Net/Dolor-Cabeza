
import { useState, useEffect } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Detectar si está en modo standalone (PWA instalada)
    const checkStandalone = () => {
      setIsStandalone(
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    };

    checkMobile();
    checkStandalone();

    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Función para instalar PWA
  const installPWA = async (deferredPrompt: any) => {
    if (!deferredPrompt) return false;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA instalada');
      return true;
    }
    
    return false;
  };

  // Función para vibración háptica
  const vibrate = (pattern: number | number[] = 100) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Función para compartir nativo
  const shareNative = async (data: ShareData) => {
    if ('share' in navigator) {
      try {
        await navigator.share(data);
        return true;
      } catch (error) {
        console.log('Error sharing', error);
        return false;
      }
    }
    return false;
  };

  return {
    isMobile,
    isStandalone,
    canInstall,
    installPWA,
    vibrate,
    shareNative
  };
};
