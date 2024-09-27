declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_URL: string;
  }
}
declare global {
  interface Window {
    appConfig: {
      serverUrl: string;
      causaliDoc: {
        ritiroComodato: string[] | null;
        consegnaComodato: string[] | null;
        intervento: string[] | null;
      };
    };
  }
}
export {};
