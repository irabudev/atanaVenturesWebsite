// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const langButtons = document.querySelectorAll('.lang-button');
    const translatableElements = document.querySelectorAll('[data-translate]');
    const yearSpan = document.getElementById('current-year');
    const themeToggleButton = document.getElementById('theme-toggle'); // Get theme toggle button
    const bodyElement = document.body; // Get body element

    // --- Translations (Same as your last version) ---
    const translations = {
        en: {
            profileName: "Julius Moshiro",
            profileTagline: "Digital Creator | Atana Ventures",
            resourceTitle: "What Are You Looking For?",
            linkStore: "Atana Store",
            linkStoreDesc: "Photos: Digital, Frames, Prints & More",
            linkKidarasa: "Kidarasa", // Changed title slightly
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
             // Specific Page Titles/Headings (Ensure these match HTML)
             storeTitle: "Atana Store", // For store.html <title> and <h1>
             kidarasaTitle: "Kidarasa", // For kidarasa.html <title> and <h1>

        },
        sw: {
            profileName: "Julius Moshiro",
            profileTagline: "Mwana Digitali | Atana Ventures",
            resourceTitle: "Unatafuta Nini?",
            linkStore: "Atana Store",
            linkStoreDesc: "Picha: Za Kidigitali, Fremu na Prints.",
            linkKidarasa: "Kidarasa", // Changed title slightly
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
            aboutTitle: "Kuhusu Mimi & Ushirikiano",
            aboutIntro: "Habari, mimi ni Julius Moshiro. Nagundua ulimwengu wa kidijitali, nashiriki maarifa kutoka kwenye mbio zangu, nasimulia hadithi kupitia picha zangu, na najadili njia za kufanikiwa mtandaoni. Atana Ventures ndio jukwaa langu la safari hii.",
            aboutSkillsTitle: "Ninachozingatia",
            aboutSkillTech: "Zana na Mwenendo wa Kidijitali",
            aboutSkillRunning: "Uvumilivu na Ugunduzi",
            aboutSkillStorytelling: "Uundaji Maudhui kwa Picha",
            aboutSkillDigital: "Mikakati ya Ukuaji Mtandaoni",
            aboutMission: "Dhamira yangu ni kushiriki maarifa yenye vitendo na uzoefu halisi ili kuwawezesha wengine katika ukuaji wao wa kidijitali na kibinafsi.",
            aboutCollabTitle: "Tushirikiane",
            aboutCollabPrompt: "Ungependa kushirikiana? Iwe ni uundaji wa maudhui, uzungumzaji, au ushirikiano wa kibiashara, tujadili jinsi tunavyoweza kuleta thamani pamoja. Tumia mawasiliano yaliyopo au viungo vya mitandao ya kijamii.",
            // Specific Page Titles/Headings (Ensure these match HTML)
            storeTitle: "Duka la Atana", // For store.html <title> and <h1>
            kidarasaTitle: "Kidarasa", // For kidarasa.html <title> and <h1>
        }
    };

    // --- Theme Functions ---
    const applyTheme = (theme) => {
        bodyElement.setAttribute('data-theme', theme);
        // Update toggle button icon based on the theme applied
        if (themeToggleButton) {
             themeToggleButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
         // console.log(`Theme applied: ${theme}`);
    };

    const setThemePreference = (theme) => {
        localStorage.setItem('theme', theme); // Save preference
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

        // Determine current page for title setting
        if (document.body.classList.contains('page-store')) pageKey = 'storeTitle';
        else if (document.body.classList.contains('page-kidarasa')) pageKey = 'kidarasaTitle';
        else if (document.querySelector('.about-content')) pageKey = 'aboutTitle';
        else if (document.querySelector('.profile-header')) pageKey = 'profileName'; // Index page

        // Update title tag
        if (titleElement) {
             if (pageKey && translations[lang][pageKey]) {
                 let baseTitle = translations[lang][pageKey];
                 // Append site name differently for index vs subpages
                 titleElement.textContent = pageKey === 'profileName'
                    ? `${baseTitle} - Atana Ventures`
                    : `${baseTitle} - Julius Moshiro`;
             } else {
                // Fallback title if key missing or page unknown
                 titleElement.textContent = "Julius Moshiro - Atana Ventures";
             }
        }


        // Update text content of translatable elements
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key && translations[lang][key] !== undefined) {
                el.textContent = translations[lang][key];
            }
        });

        // Update active language button style
        langButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === lang);
        });

        // Update UZA Embed Locale (if element exists on the page)
        const uzaProductsElements = document.querySelectorAll('uza-products');
        uzaProductsElements.forEach(uzaEmbed => {
            uzaEmbed.setAttribute('__locale-override', lang);
            // console.log(`UZA locale override set to: ${lang} for embed`, uzaEmbed);
        });


        // Store language preference and update HTML lang attribute
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }

    // --- Event Listeners ---

    // Theme Toggle Listener
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Language Buttons Listener
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Keyboard Shortcuts Listener (Only on index page)
    if (document.querySelector('.profile-header')) {
         document.addEventListener('keydown', (e) => {
            if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
            const key = e.key.toUpperCase();
            let targetUrl = null;
            switch (key) {
                case 'S': targetUrl = 'store.html'; break;
                case 'K': targetUrl = 'kidarasa.html'; break;
                case 'M': targetUrl = document.querySelector('a[href*="moneymindset.tz"]')?.href; break; // Get external URL
                case 'C': targetUrl = 'about.html'; break;
            }
            if (targetUrl) {
                const link = document.querySelector(`.resource-list a[href="${targetUrl}"]`) || (key === 'M' ? document.querySelector('a[href*="moneymindset.tz"]') : null);
                if (link) {
                    link.style.transform = 'scale(0.98)';
                    setTimeout(() => { link.style.transform = ''; }, 100);
                    if (link.target === '_blank') {
                         window.open(link.href, '_blank');
                    } else {
                        window.location.href = link.href;
                    }
                }
                e.preventDefault();
            }
        });
    }


    // --- Initial Setup ---

    // Set Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set Initial Theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Priority: Saved > OS Preference > Default (dark)
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));


    // Set Initial Language (and update titles)
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage); // This also sets the initial page title


}); // End DOMContentLoaded