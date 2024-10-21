interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Khai báo các biến môi trường bạn cần
    readonly VITE_API_SECRET_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
