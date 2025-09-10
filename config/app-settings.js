// Application Settings Configuration
// ⚙️ Edit application settings here

const appSettings = {
    app: { name: "Prepe Learning Platform", version: "2.0.0", build: "20250910", author: "Vin Soni", 
           description: "Complete Competitive Exam Preparation Platform", url: "https://prepe.com", logo: "🎓" },
    contact: { email: "support@prepe.com", phone: "+91-9876543210", whatsapp: "+91-9876543210", 
              telegram: "@prepe_support", address: "Rajasthan, India" },
    features: { darkMode: true, notifications: true, offline: true, analytics: true, chatSupport: true,
               videoLectures: true, liveClasses: false, downloadContent: false, certificateGeneration: true,
               progressTracking: true, competitiveLeaderboard: false, referralProgram: true, multiLanguage: false },
    security: { sessionTimeout: 7200000, maxLoginAttempts: 5, passwordMinLength: 8, passwordRequireSpecialChar: true,
               passwordRequireNumbers: true, enableDeviceBinding: true, enableWatermark: true, preventScreenCapture: true,
               enableRightClickDisable: true, enableDevToolsBlock: true, enableCopyPasteBlock: true, maxDevicesPerUser: 3, enableOTP: false },
    content: { itemsPerPage: 20, maxSearchResults: 10, autoSave: true, autoSaveInterval: 30000, offlineSync: false,
              defaultVideoQuality: "720p", enableVideoDownload: false, enablePDFDownload: true, maxFileSize: 50,
              supportedImageFormats: ["jpg", "jpeg", "png", "gif", "webp"], supportedVideoFormats: ["mp4", "webm", "ogg"],
              supportedDocumentFormats: ["pdf", "doc", "docx", "ppt", "pptx"] },
    ui: { defaultTheme: "light", animationSpeed: "normal", showProgressBars: true, showBreadcrumbs: true,
         showTooltips: true, compactMode: false, fontSize: "medium", showAchievements: true, showRecentActivity: true, sidebarCollapsible: true },
    performance: { lazyLoading: true, imageOptimization: true, cacheTimeout: 3600000, preloadNextPage: true,
                  enableServiceWorker: true, enableCompression: true, maxConcurrentRequests: 6 },
    analytics: { enableGoogleAnalytics: false, googleAnalyticsId: "GA_MEASUREMENT_ID", enableFacebookPixel: false,
                facebookPixelId: "FACEBOOK_PIXEL_ID", trackUserBehavior: true, trackPerformance: true, trackErrors: true, enableHeatmaps: false },
    social: { website: "https://prepe.com", instagram: "https://instagram.com/prepe_official", telegram: "https://t.me/prepe_official",
             youtube: "https://youtube.com/@prepe_official", facebook: "https://facebook.com/prepe.official",
             twitter: "https://twitter.com/prepe_official", linkedin: "https://linkedin.com/company/prepe" },
    payment: { currency: "INR", taxRate: 18, enableEMI: true, enableWallet: true, enableUPI: true,
              enableNetBanking: true, enableCards: true, minimumAmount: 99, maximumAmount: 50000, refundPolicy: 7, enableAutoRefund: false },
    notifications: { enablePushNotifications: true, enableEmailNotifications: true, enableSMSNotifications: false,
                    dailyReminder: true, weeklyProgress: true, examAlerts: true, newContentAlert: true, achievementNotification: true }
};

window.appConfig = {
    get: function(path) {
        const keys = path.split('.');
        let value = appSettings;
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return null;
            }
        }
        return value;
    },
    set: function(path, newValue) {
        const keys = path.split('.');
        let obj = appSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in obj) || typeof obj[key] !== 'object') {
                obj[key] = {};
            }
            obj = obj[key];
        }
        obj[keys[keys.length - 1]] = newValue;
        localStorage.setItem('prepe-settings', JSON.stringify(appSettings));
    },
    isFeatureEnabled: function(featureName) {
        return this.get(`features.${featureName}`) === true;
    },
    getAll: function() {
        return appSettings;
    },
    reset: function() {
        localStorage.removeItem('prepe-settings');
        location.reload();
    },
    load: function() {
        const savedSettings = localStorage.getItem('prepe-settings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                Object.assign(appSettings, parsed);
            } catch (error) {
                console.warn('Could not load saved settings:', error);
            }
        }
    }
};

window.appConfig.load();
window.appSettings = appSettings;
console.log('⚙️ App settings loaded');