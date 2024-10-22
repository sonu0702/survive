import { useEffect, useState } from 'react';



export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      // Initialize the WebApp
      tg.ready();
      setWebApp(tg);
      
      // Get user data if available
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUser(user);
      }
    }
  }, []);

  return { webApp, user };
};