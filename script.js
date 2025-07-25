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
    const ALLOWED_PARAMS = ['refCode', 'refcode', 'source','donation', 'lang', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    // --- Translations ---
    const translations = {
        en: {
            profileName: "Julius Moshiro",
            profileTagline: "Digital Creator | Atana Ventures",
            resourceTitle: "What Are You Looking For?",
            linkKarani: "Karani",
            linkKaraniDesc: "Automate receipts with my open-source tool.",
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
            aboutTitle: "About & Collaboration",
            aboutIntro: "Hi, I'm Julius Moshiro. I explore the digital world, share insights from my runs, tell stories through my lens, and discuss practical ways to thrive online. Atana Ventures is my platform for this journey.",
            aboutSkillsTitle: "What I Focus On",
            aboutSkillTech: "Digital Tools & Trends",
            aboutSkillRunning: "Endurance & Exploration",
            aboutSkillStorytelling: "Visual Content Creation",
            aboutSkillDigital: "Online Growth Strategies",
            aboutProjectsTitle: "My Projects",
            aboutKaraniProject: "I believe in building tools to solve real problems. That's why I created <strong>Karani</strong>, a tool to eliminate the 'silent thief' of paperwork for businesses. It started as a personal solution and has grown into a powerful, open-source project. For those interested in the code, you can explore the <a href='https://github.com/juliustm/taxConsultant' target='_blank' rel='noopener noreferrer'>Karani repository on GitHub</a>.",
            aboutMission: "My mission is to share actionable knowledge, authentic experiences, and useful tools to empower others in their digital and personal growth.",
            aboutCollabTitle: "Let's Collaborate",
            aboutCollabPrompt: "Interested in collaborating? Whether it's about Karani, content creation, speaking engagements, or brand partnerships, let's discuss how we can create value together.",
            storeTitle: "Atana Store",
            kidarasaTitle: "Kidarasa",
            karaniTitle: "Karani",
            karaniIntro: "Your business has a silent thief: paperwork. Karani automates receipt data entry, giving you back the hours to focus on your dream. Get started with a package below.",

        },
        sw: {
            profileName: "Julius Moshiro",
            profileTagline: "Mwana Digitali | Atana Ventures",
            resourceTitle: "Unatafuta Nini?",
            linkKarani: "Karani",
            linkKaraniDesc: "Ondoa usumbufu wa risiti na zana yangu.",
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
            aboutTitle: "Kuhusu & Ushirikiano",
            aboutIntro: "Habari, mimi ni Julius Moshiro. Nagundua ulimwengu wa kidijitali, nashiriki maarifa kutoka kwenye mbio zangu, nasimulia hadithi kupitia picha zangu, na najadili njia za kufanikiwa mtandaoni. Atana Ventures ndio jukwaa langu la safari hii.",
            aboutSkillsTitle: "Ninachozingatia",
            aboutSkillTech: "Zana na Mwenendo wa Kidijitali",
            aboutSkillRunning: "Uvumilivu na Ugunduzi",
            aboutSkillStorytelling: "Uundaji Maudhui kwa Picha",
            aboutSkillDigital: "Mikakati ya Ukuaji Mtandaoni",
            aboutProjectsTitle: "Miradi Yangu",
            aboutKaraniProject: "Ninaamini katika kuunda zana za kutatua matatizo halisi. Ndiyo maana niliunda <strong>Karani</strong>, zana ya kuondoa 'mwizi wa kimya' wa makaratasi kwa wafanyabiashara. Ilianza kama suluhisho binafsi na imekua mradi imara wa 'open-source'. Kwa wanaopenda kuona 'code', unaweza kutembelea <a href='https://github.com/juliustm/taxConsultant' target='_blank' rel='noopener noreferrer'>repo ya Karani kwenye GitHub</a>.",
            aboutMission: "Dhamira yangu ni kushiriki maarifa yenye vitendo, uzoefu halisi, na zana muhimu ili kuwawezesha wengine katika ukuaji wao wa kidijitali na kibinafsi.",
            aboutCollabTitle: "Tushirikiane",
            aboutCollabPrompt: "Ungependa kushirikiana? Iwe ni kuhusu Karani, uundaji wa maudhui, uzungumzaji, au ushirikiano wa kibiashara, tujadili jinsi tunavyoweza kuleta thamani pamoja.",
            storeTitle: "Duka la Atana",
            kidarasaTitle: "Kidarasa",
            karaniTitle: "Karani",
            karaniIntro: "Biashara yako ina mwizi wa kimya: makaratasi. Karani inaweka risiti zako kidigitali kiotomatiki, ikikupa muda zaidi wa kuzingatia ndoto yako. Anza na kifurushi hapa chini.",
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
        let activeParams = { ...storedParams };
        let paramsChanged = false;

        ALLOWED_PARAMS.forEach(paramName => {
            if (urlParams.has(paramName)) {
                const urlValue = urlParams.get(paramName);
                if (activeParams[paramName] !== urlValue) {
                    activeParams[paramName] = urlValue;
                    paramsChanged = true;
                }
            }
        });

        for (const key in activeParams) {
            if (!ALLOWED_PARAMS.includes(key) || activeParams[key] === null || activeParams[key] === '') {
                delete activeParams[key];
                paramsChanged = true;
            }
        }

        if (paramsChanged || JSON.stringify(activeParams) !== JSON.stringify(getStoredParams())) {
            storeParams(activeParams);
        }

        const newSearchParams = new URLSearchParams();
        Object.entries(activeParams).forEach(([key, value]) => {
            if (value) newSearchParams.set(key, value);
        });
        const newSearchString = newSearchParams.toString();

        if (currentUrl.search.substring(1) !== newSearchString) {
            currentUrl.search = newSearchString ? `?${newSearchString}` : '';
            history.replaceState(null, '', currentUrl.toString());
        }
        return activeParams;
    }

    function updatePageLinks(activeParams) {
        const links = document.querySelectorAll('a[href]');
        const currentOrigin = window.location.origin;

        links.forEach(link => {
            try {
                const linkUrl = new URL(link.href, window.location.href);

                if (linkUrl.protocol.startsWith('http') && linkUrl.origin === currentOrigin) {
                    const linkParams = new URLSearchParams(linkUrl.search);
                    Object.entries(activeParams).forEach(([key, value]) => {
                        if (value) {
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

        if (document.body.classList.contains('page-karani')) pageKey = 'karaniTitle';
        else if (document.body.classList.contains('page-store')) pageKey = 'storeTitle';
        else if (document.body.classList.contains('page-kidarasa')) pageKey = 'kidarasaTitle';
        else if (document.querySelector('.about-content')) pageKey = 'aboutTitle';
        else if (document.querySelector('.profile-header')) pageKey = 'profileName';

        if (titleElement) {
             if (pageKey && translations[lang][pageKey]) {
                 let baseTitle = translations[lang][pageKey];
                 if (pageKey === 'profileName') {
                    titleElement.textContent = `${baseTitle} - Atana Ventures`;
                 } else if (pageKey === 'karaniTitle') {
                    titleElement.textContent = `${baseTitle} - Receipt Automation by Julius Moshiro`;
                 } else {
                    titleElement.textContent = `${baseTitle} - Julius Moshiro`;
                 }
             } else {
                 titleElement.textContent = "Julius Moshiro - Atana Ventures";
             }
        }

        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key && translations[lang][key] !== undefined) {
                el.innerHTML = translations[lang][key];
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
                case 'A': targetLinkElement = document.querySelector('a[href^="karani"]'); break;
                case 'S': targetLinkElement = document.querySelector('a[href^="store"]'); break;
                case 'K': targetLinkElement = document.querySelector('a[href^="kidarasa"]'); break;
                case 'M': targetLinkElement = document.querySelector('a[href*="moneymindset.tz"]'); break;
                case 'C': targetLinkElement = document.querySelector('a[href^="about"]'); break;
            }
            if (targetLinkElement) {
                targetLinkElement.style.transform = 'scale(0.98)';
                setTimeout(() => { targetLinkElement.style.transform = ''; }, 100);
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

    const activeParams = processUrlParameters();
    updatePageLinks(activeParams);

}); // End DOMContentLoaded