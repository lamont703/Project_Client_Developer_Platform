// Google Analytics global declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    mobileAnalyticsConfig?: {
      slowConnection: boolean;
      reducedFrequency: boolean;
      batchEvents: boolean;
    };
  }
  
  interface Navigator {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    };
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
    }>;
  }
}

export {}; 