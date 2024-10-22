declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initDataUnsafe: any; // You can refine this type if needed
          ready: () => void;
          close: () => void;
          sendData: (data: string) => void;
        };
      };
    }
  }
  
  export {};
  