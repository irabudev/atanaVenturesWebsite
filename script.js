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
    const ALLOWED_PARAMS = ['refCode', 'refcode', 'source', 'donation', 'lang', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    // --- Translations ---
    const translations = {
        en: {
            profileName: "Julius Moshiro",
            profileTagline: "Digital Creator | Atana Ventures",
            resourceTitle: "What Are You Looking For?",
            linkKarani: "Karani",
            linkKaraniDesc: "Automate receipts with my open-source tool.",
            linkStore: "Atana Store",
            linkStoreDesc: "Get: Skills, Tools, Frames, Photo Prints & More",
            linkKidarasa: "Kidarasa",
            linkKidarasaDesc: "Skills, Guides & More.",
            linkMoney: "Money Mindset Mondays",
            linkMoneyDesc: "Dialogues on Finance and Money.",
            linkCollab: "Collaboration",
            linkCollabDesc: "My story & how we can partner.",
            footerRights: "All rights reserved.",
            backLink: "Back",
            aboutTitle: "About & Collaboration",
            aboutIntro: "I’m Julius Moshiro. Through Atana Ventures, I bridge the gap between digital growth and real-world endurance. Whether I’m behind a lens, on a long-distance run, or writing code, my focus is building tools that return time and autonomy to creators and businesses.",
            aboutToolkitTitle: "My Open-Source Toolkit",
            aboutNyotaTitle: "Nyota ✨",
            aboutNyotaDesc: "It’s a simple storefront for your video courses, podcasts, e-books, templates and anything digital with zero subscription costs. Just radical simplicity: your audience pays via M-Pesa or Card and gets instant, passwordless access. Want a demo?",
            aboutStokiTitle: "Stoki 📦",
            aboutStokiDesc: "A simple tool for managing stock and sales. It tracks your inventory without the need for expensive POS hardware or heavy upfront costs.",
            aboutKaraniTitle: "Karani 🧾",
            aboutKaraniDesc: "Your business has a silent thief: paperwork. Karani automates receipt data entry, giving you back the hours to focus on your dream.",
            aboutProductionTitle: "Digital Content Production",
            aboutProductionDesc: "I help organizations tell their stories and document their impact across Africa. My work focuses on capturing real human experiences with authenticity and care. Over the years, I've collaborated with respected organizations including the European Union, African Wildlife Foundation, World Bank, and the Bill & Melinda Gates Foundation, creating content that brings their missions to life.",
            aboutBuildTitle: "Let’s Build Something",
            aboutBuildDesc: "I believe in tools that solve real problems. If you are a creator ready to own your platform or a business looking to automate the mundane, let’s connect.",
            aboutCta: "", /* Deprecated/Moved into Nyota Desc to keep context or just removed from usage */
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
            linkStoreDesc: "Jipatie: Picha, Ujuzi, Vifaa, Fremu na vinginevyo",
            linkKidarasa: "Kidarasa",
            linkKidarasaDesc: "Vijarida na Juzi tofauti",
            linkMoney: "Money Mindset Mondays",
            linkMoneyDesc: "Majadiliano ya kila mwezi kuhusu fikra na fedha.",
            linkCollab: "Tushirikiane",
            linkCollabDesc: "Hadithi yangu & jinsi tunavyoweza kushirikiana.",
            footerRights: "Haki zote zimehifadhiwa.",
            backLink: "Rudi",
            aboutTitle: "Kuhusu & Ushirikiano",
            aboutIntro: "Mimi ni Julius Moshiro. Kupitia Atana Ventures, naunganisha ukuaji wa kidijitali na uhalisia wa maisha. Niwe nyuma ya kamera, nakimbia mbio ndefu, au naandika kodi, lengo langu ni kutengeneza zana zinazorudisha muda na uhuru kwa wabunifu na wafanyabiashara.",
            aboutToolkitTitle: "Zana Zangu za Open-Source",
            aboutNyotaTitle: "Nyota ✨",
            aboutNyotaDesc: "Ni duka lako binafsi la kidijitali kwa ajili ya kozi za video, podcast, vitabu (e-books), na 'templates' bila gharama za kila mwezi. Inawezesha wateja wako kukulipa kwa M-Pesa, AirtelMoney, Mixx au Kadi na wanapata bidhaa zao papo hapo. Kwa namba ya simu pekee, bila kuhitaji password. Je, unahitaji maelezo zaidi?",
            aboutStokiTitle: "Stoki 📦",
            aboutStokiDesc: "Zana rahisi ya kusimamia bidhaa na mauzo. Inakuwezesha kufuatilia stoki bila kuhitaji mashine za bei ghali za POS au gharama kubwa za kuanzia.",
            aboutKaraniTitle: "Karani 🧾",
            aboutKaraniDesc: "Biashara yako ina mwizi wa kimya: makaratasi. Karani inaweka risiti zako kidigitali kiotomatiki, ikikupa muda zaidi wa kuzingatia ndoto yako.",
            aboutProductionTitle: "Uzalishaji wa Maudhui ya Kidijitali",
            aboutProductionDesc: "Ninasaidia mashirika kusimulisha hadithi zao na kurekodi mafanikio yao kote Afrika. Kwa miaka kadhaa, nimefanya kazi na mashirika yaliyoheshimiwa ikiwa ni pamoja na Umoja wa Ulaya (EU), 'African Wild Life Foundation(AWF)', 'World Bank', na 'Bill & Melinda Gates Foundation', nikiumba maudhui yanayowasilisha nia zao kwa uhai.",
            aboutBuildTitle: "Tujenge Kitu Pamoja",
            aboutBuildDesc: "Naamini katika zana zinazotatua matatizo halisi. Ikiwa wewe ni mbunifu uliye tayari kumiliki jukwaa lako, au mfanyabiashara unayetaka kurahisisha kazi za kila siku, tuwasiliane.",
            aboutCta: "",
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