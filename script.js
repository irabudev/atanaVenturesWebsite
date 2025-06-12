// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const langButtons = document.querySelectorAll('.lang-button');
    const translatableElements = document.querySelectorAll('[data-translate]');
    const yearSpan = document.getElementById('current-year');
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // --- Config for Persistent Parameters ---
    const TRACKED_PARAMS_KEY = 'persistentUrlParams';
    const ALLOWED_PARAMS = ['refCode', 'lang', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']; // Add any params you want to track

    // --- Translations (Same as your last version - truncated for brevity) ---
    const translations = {
        en: {
            profileName: "Julius Moshiro",
            profileTagline: "Digital Creator | Atana Ventures",
            resourceTitle: "What Are You Looking For?",
            linkStore: "Atana Store",
            linkStoreDesc: "Photos: Digital, Frames, Prints & More",
            linkKidarasa: "Kidarasa",
            linkKidarasaDesc: "Skills, Guides & More.",
            linkMoney: "Money Mindset",
            linkMoneyDesc: "Dialogues on Finance and Money.",
            linkCollab: "Collaboration",
            linkCollabDesc: "My story & how we can partner.",
            footerRights: "All rights reserved.",
            backLink: "Back",
            storeComingSoon: "The Atana Store is launching soon! Stay tuned for digital photos, frames, and stickers.",
            kidarasaComingSoon: "Kidarasa digital guides are under development. Get ready to learn!",
            moneyComingSoon: "Money Mindset sessions are being planned. Expect practical financial insights.",
            contactTitle: "Let's Connect",
            contactIntro: "Interested in working together or have a question? Reach out:",
            contactEmailLabel: "Email:",
            contactPhoneLabel: "Phone / WhatsApp:",
            contactSocialPrompt: "Find me on social media (links below).",
            aboutTitle: "About & Collaboration",
            aboutIntro: "Hi, I'm Julius Moshiro. I explore the digital world, share insights from my runs, tell stories through my lens, and discuss practical ways to thrive online. Atana Ventures is my platform for this journey.",
            aboutSkillsTitle: "What I Focus On",
            aboutSkillTech: "Digital Tools & Trends",
            aboutSkillRunning: "Endurance & Exploration",
            aboutSkillStorytelling: "Visual Content Creation",
            aboutSkillDigital: "Online Growth Strategies",
            aboutMission: "My mission is to share actionable knowledge and authentic experiences to empower others in their digital and personal growth.",
            aboutCollabTitle: "Let's Collaborate",
            aboutCollabPrompt: "Interested in collaborating? Whether it's content creation, speaking engagements, or brand partnerships, let's discuss how we can create value together. Use the contact details or social links.",
            storeTitle: "Atana Store",
            kidarasaTitle: "Kidarasa",

        },
        sw: {
            profileName: "Julius Moshiro",
            profileTagline: "Mwana Digitali | Atana Ventures",
            resourceTitle: "Unatafuta Nini?",
            linkStore: "Atana Store",
            linkStoreDesc: "Picha: Za Kidigitali, Fremu na Prints.",
            linkKidarasa: "Kidarasa",
            linkKidarasaDesc: "Vijarida na Juzi tofauti",
            linkMoney: "Mtazamo wa Pesa",
            linkMoneyDesc: "Majadiliano Kuhusu fedha.",
            linkCollab: "Tushirikiane",
            linkCollabDesc: "Hadithi yangu & jinsi tunavyoweza kushirikiana.",
            footerRights: "Haki zote zimehifadhiwa.",
            backLink: "Rudi",
            storeComingSoon: "Duka la Atana linakuja hivi karibuni! Kaa tayari kwa picha za kidijitali, fremu, na stika.",
            kidarasaComingSoon: "Miongozo ya Kidarasa inatayarishwa. Jiandae kujifunza!",
            moneyComingSoon: "Vikao vya Mtazamo wa Pesa vinapangwa. Tarajia maarifa halisi ya kifedha.",
            contactTitle: "Tuwasiliane",
            contactIntro: "Ungependa tushirikiane au una swali? Wasiliana nami:",
            contactEmailLabel: "Barua Pepe:",
            contactPhoneLabel: "Simu / WhatsApp:",
            contactSocialPrompt: "Nipate kwenye mitandao ya kijamii (viungo vipo chini).",
            aboutTitle: "Tushirikiane",
            aboutIntro: "Habari, mimi ni Julius Moshiro. Nagundua ulimwengu wa kidijitali, nashiriki maarifa kutoka kwenye mbio zangu, nasimulia hadithi kupitia picha zangu, na najadili njia za kufanikiwa mtandaoni. Atana Ventures ndio jukwaa langu la safari hii.",
            aboutSkillsTitle: "Ninachozingatia",
            aboutSkillTech: "Zana na Mwenendo wa Kidijitali",
            aboutSkillRunning: "Uvumilivu na Ugunduzi",
            aboutSkillStorytelling: "Uundaji Maudhui kwa Picha",
            aboutSkillDigital: "Mikakati ya Ukuaji Mtandaoni",
            aboutMission: "Dhamira yangu ni kushiriki maarifa yenye vitendo na uzoefu halisi ili kuwawezesha wengine katika ukuaji wao wa kidijitali na kibinafsi.",
            aboutCollabTitle: "Tushirikiane",
            aboutCollabPrompt: "Ungependa kushirikiana? Iwe ni uundaji wa maudhui, uzungumzaji, au ushirikiano wa kibiashara, tujadili jinsi tunavyoweza kuleta thamani pamoja. Tumia mawasiliano yaliyopo au viungo vya mitandao ya kijamii.",
            storeTitle: "Duka la Atana",
            kidarasaTitle: "Kidarasa",
        }
    };

    // --- Persistent Parameter Functions ---
    function getStoredParams() {
        try {
            const paramsString = localStorage.getItem(TRACKED_PARAMS_KEY);
            return paramsString ? JSON.parse(paramsString) : {};
        } catch (e) {
            console.error("Error reading stored params:", e);
            return {};
        }
    }

    function storeParams(paramsObject) {
        try {
            localStorage.setItem(TRACKED_PARAMS_KEY, JSON.stringify(paramsObject));
        } catch (e) {
            console.error("Error storing params:", e);
        }
    }

    function processUrlParameters() {
        const currentUrl = new URL(window.location.href);
        const urlParams = new URLSearchParams(currentUrl.search);
        let storedParams = getStoredParams();
        let activeParams = { ...storedParams }; // Start with stored params
        let paramsChanged = false;

        // Merge URL params, URL params take precedence
        ALLOWED_PARAMS.forEach(paramName => {
            if (urlParams.has(paramName)) {
                const urlValue = urlParams.get(paramName);
                if (activeParams[paramName] !== urlValue) {
                    activeParams[paramName] = urlValue;
                    paramsChanged = true;
                }
            } else if (!activeParams.hasOwnProperty(paramName) && storedParams.hasOwnProperty(paramName)) {
                // This case is covered by initial spread, but good for clarity
                // If URL doesn't have it, but storage did, it's already in activeParams
            } else if (!urlParams.has(paramName) && !activeParams.hasOwnProperty(paramName)) {
                // Parameter is neither in URL nor in current active (or storage)
                // If we want to REMOVE a param from storage if it's not in URL, we'd do it here.
                // For "sticky" behavior, we keep it if it was in storage.
            }
        });

        // Clean up activeParams: remove any params not in ALLOWED_PARAMS or empty
        for (const key in activeParams) {
            if (!ALLOWED_PARAMS.includes(key) || activeParams[key] === null || activeParams[key] === '') {
                delete activeParams[key];
                paramsChanged = true;
            }
        }


        if (paramsChanged || JSON.stringify(activeParams) !== JSON.stringify(getStoredParams())) {
            storeParams(activeParams);
        }

        // Update current browser URL if it doesn't reflect activeParams
        const newSearchParams = new URLSearchParams();
        Object.entries(activeParams).forEach(([key, value]) => {
            if (value) newSearchParams.set(key, value);
        });
        const newSearchString = newSearchParams.toString();

        if (currentUrl.search.substring(1) !== newSearchString) {
            currentUrl.search = newSearchString ? `?${newSearchString}` : '';
            // Using replaceState to avoid adding to history and reloading
            history.replaceState(null, '', currentUrl.toString());
        }
        return activeParams;
    }

    function updatePageLinks(activeParams) {
        const links = document.querySelectorAll('a[href]');
        const currentOrigin = window.location.origin;

        links.forEach(link => {
            try {
                const linkUrl = new URL(link.href, window.location.href); // Resolve relative URLs

                // Only modify internal links, not mailto: or tel: or external ones
                if (linkUrl.protocol.startsWith('http') && linkUrl.origin === currentOrigin) {
                    const linkParams = new URLSearchParams(linkUrl.search);
                    Object.entries(activeParams).forEach(([key, value]) => {
                        if (value) { // Ensure value is not empty
                            linkParams.set(key, value);
                        }
                    });
                    linkUrl.search = linkParams.toString();
                    link.href = linkUrl.toString();
                }
            } catch (e) {
                // console.warn(`Could not process link: ${link.href}`, e);
            }
        });
    }

    // --- Theme Functions ---
    const applyTheme = (theme) => {
        bodyElement.setAttribute('data-theme', theme);
        if (themeToggleButton) {
             themeToggleButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    };

    const setThemePreference = (theme) => {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setThemePreference(newTheme);
    };

    // --- Language Functions ---
    function setLanguage(lang) {
        if (!translations[lang]) return;

        const titleElement = document.querySelector('title');
        let pageKey = null;

        if (document.body.classList.contains('page-store')) pageKey = 'storeTitle';
        else if (document.body.classList.contains('page-kidarasa')) pageKey = 'kidarasaTitle';
        else if (document.querySelector('.about-content')) pageKey = 'aboutTitle';
        else if (document.querySelector('.profile-header')) pageKey = 'profileName';

        if (titleElement) {
             if (pageKey && translations[lang][pageKey]) {
                 let baseTitle = translations[lang][pageKey];
                 titleElement.textContent = pageKey === 'profileName'
                    ? `${baseTitle} - Atana Ventures`
                    : `${baseTitle} - Julius Moshiro`;
             } else {
                 titleElement.textContent = "Julius Moshiro - Atana Ventures";
             }
        }

        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key && translations[lang][key] !== undefined) {
                el.textContent = translations[lang][key];
            }
        });

        langButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === lang);
        });

        const uzaProductsElements = document.querySelectorAll('uza-products');
        uzaProductsElements.forEach(uzaEmbed => {
            uzaEmbed.setAttribute('__locale-override', lang);
        });

        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }

    // --- Event Listeners ---
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    if (document.querySelector('.profile-header')) {
         document.addEventListener('keydown', (e) => {
            if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
            const key = e.key.toUpperCase();
            let targetLinkElement = null;
            switch (key) {
                case 'S': targetLinkElement = document.querySelector('a[href^="store"]'); break;
                case 'K': targetLinkElement = document.querySelector('a[href^="kidarasa"]'); break;
                case 'M': targetLinkElement = document.querySelector('a[href*="moneymindset.tz"]'); break;
                case 'C': targetLinkElement = document.querySelector('a[href^="about"]'); break;
            }
            if (targetLinkElement) {
                targetLinkElement.style.transform = 'scale(0.98)';
                setTimeout(() => { targetLinkElement.style.transform = ''; }, 100);

                // Get the potentially modified href (with persistent params)
                const targetUrl = targetLinkElement.href;

                if (targetLinkElement.target === '_blank') {
                     window.open(targetUrl, '_blank');
                } else {
                    window.location.href = targetUrl;
                }
                e.preventDefault();
            }
        });
    }

    // --- Initial Setup ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage);

    // Process URL parameters and update links (MUST BE AFTER other DOM manipulations if they add links)
    const activeParams = processUrlParameters();
    updatePageLinks(activeParams);

}); // End DOMContentLoaded