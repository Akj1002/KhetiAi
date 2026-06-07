import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Core Features": "Core Features",
      "Dashboard": "Dashboard",
      "Weather": "Weather",
      "Crop Recs": "Crop Recs",
      "Disease AI": "Disease AI",
      "Chatbot": "Chatbot",
      "Market & Economy": "Market & Economy",
      "Market Prices": "Market Prices",
      "Gov Schemes": "Gov Schemes",
      "Smart Farm IoT": "Smart Farm IoT",
      "Soil Health": "Soil Health",
      "Irrigation": "Irrigation",
      "Livestock": "Livestock",
      "Monitoring & Community": "Monitoring & Community",
      "Drone Mapping": "Drone Mapping",
      "Smart Alerts": "Smart Alerts",
      "Community": "Community",
      "Task Board": "Task Board",
      "Teleconsult": "Teleconsult",
      "Sign Out": "Sign Out",
      "Language": "Language"
    }
  },
  hi: {
    translation: {
      "Core Features": "मुख्य विशेषताएं",
      "Dashboard": "डैशबोर्ड",
      "Weather": "मौसम",
      "Crop Recs": "फसल सुझाव",
      "Disease AI": "रोग एआई",
      "Chatbot": "चैटबॉट",
      "Market & Economy": "बाजार और अर्थव्यवस्था",
      "Market Prices": "बाजार मूल्य",
      "Gov Schemes": "सरकारी योजनाएं",
      "Smart Farm IoT": "स्मार्ट फार्म IoT",
      "Soil Health": "मिट्टी का स्वास्थ्य",
      "Irrigation": "सिंचाई",
      "Livestock": "पशुधन",
      "Monitoring & Community": "निगरानी और समुदाय",
      "Drone Mapping": "ड्रोन मैपिंग",
      "Smart Alerts": "स्मार्ट अलर्ट",
      "Community": "समुदाय",
      "Task Board": "कार्य बोर्ड",
      "Teleconsult": "टेलीकंसल्ट",
      "Sign Out": "लॉग आउट",
      "Language": "भाषा"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
