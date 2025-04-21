// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const langButtons = document.querySelectorAll('.lang-button');
    const translatableElements = document.querySelectorAll('[data-translate]');
    const yearSpan = document.getElementById('current-year');

    // --- Translations (Includes keys from all pages) ---
    const translations = {
        en: {
            // Index Page
            profileName: "Julius Moshiro",
            profileTagline: "Digital Creator | Atana Ventures",
            resourceTitle: "Explore Resources & Services",
            linkFreeResources: "Free Resources",
            linkFreeResourcesDesc: "Download guides & tips",
            linkNewsletter: "Newsletter",
            linkNewsletterDesc: "Subscribe for updates",
            linkStickers: "Buy Stickers",
            linkStickersDesc: "Duka Stika Merch",
            linkPdfGuides: "PDF Guides",
            linkPdfGuidesDesc: "Purchase detailed guides",
            linkFramedPictures: "Framed Pictures",
            linkFramedPicturesDesc: "Buy photography prints",
            linkCollaboration: "Collaboration",
            linkCollaborationDesc: "Let's work together",
            linkBooking: "Book Me",
            linkBookingDesc: "Tech, Running, Storytelling",
            footerRights: "All rights reserved.",

            // Sub Pages (General)
            backLink: "Back",

            // Placeholder/Embed Content
            stickerShopEmbed: "Sticker shop content will be embedded here.", // Example, may not be needed if embed has text
            guideListEmbed: "PDF Guides content or embed will go here.", // Example

            // Contact Page
            contactTitle: "Contact Me",
            contactIntro: "Get in touch for collaborations, bookings, or inquiries:",
            contactEmailLabel: "Email:",
            contactPhoneLabel: "Phone / WhatsApp:",
            contactSocialPrompt: "Connect on Social Media (links in footer).",

            // About Page
            aboutTitle: "About Me",
            aboutIntro: "Hi, I'm Julius Moshiro, a digital creator based in Tanzania. Through Atana Ventures, I focus on exploring technology, sharing insights from running, crafting visual stories, and providing tips on digital monetization. My goal is to share valuable insights and resources to help others learn and grow.", // Example text
            aboutSkillsTitle: "What I Do",
            aboutSkillTech: "Tech Exploration & Tips",
            aboutSkillRunning: "Running & Endurance",
            aboutSkillStorytelling: "Visual Storytelling",
            aboutSkillDigital: "Digital Monetization Strategies",
            aboutMission: "I believe in the power of sharing knowledge and experiences. Whether it's through photography, practical guides, or tech advice, I aim to empower individuals in the digital space. Atana Ventures is the platform for these activities.", // Example text

        },
        sw: {
            // Index Page
            profileName: "Julius Moshiro", // Translate as needed
            profileTagline: "Muundaji Dijitali | Atana Ventures", // Example translation
            resourceTitle: "Gundua Rasilimali na Huduma", // Example translation
            linkFreeResources: "Rasilimali za Bure",
            linkFreeResourcesDesc: "Pakua miongozo na vidokezo",
            linkNewsletter: "Jarida",
            linkNewsletterDesc: "Jisajili kupata taarifa",
            linkStickers: "Jipatie Stika",
            linkStickersDesc: "Stika kali kutoka DukaStika",
            linkPdfGuides: "Vijarida na Miongozo",
            linkPdfGuidesDesc: "Vidokezo na miongozo ya kina",
            linkFramedPictures: "Picha za Fremu",
            linkFramedPicturesDesc: "Nunua picha zilizochapishwa",
            linkCollaboration: "Tushirikiane",
            linkCollaborationDesc: "Tufanye kazi pamoja",
            linkBooking: "Nihifadhi", // Or "Book Appointment" etc.
            linkBookingDesc: "Teknolojia, Mbio, Usimulizi",
            footerRights: "Haki zote zimehifadhiwa.", // Example translation

            // Sub Pages (General)
            backLink: "Rudi",

            // Placeholder/Embed Content
            stickerShopEmbed: "Maudhui ya duka la stika yatawekwa hapa.", // Example
            guideListEmbed: "Maudhui ya Miongozo ya PDF au embed itawekwa hapa.", // Example

            // Contact Page
            contactTitle: "Wasiliana Nami",
            contactIntro: "Wasiliana nami kushirikiana au maswali:",
            contactEmailLabel: "Barua Pepe:",
            contactPhoneLabel: "Simu / WhatsApp:",
            contactSocialPrompt: "Ungana kwenye Mitandao ya Kijamii (viungo vipo chini).",

            // About Page
            aboutTitle: "Kuhusu Mimi",
            aboutIntro: "Habari, mimi ni Julius Moshiro, mwana dijitali kutoka Tanzania. Kupitia Atana Ventures, najikita katika teknolojia, kushiriki maarifa na kutoa vidokezo kuhusu uzalishaji fedha kidijitali. Lengo langu ni kushiriki maarifa na rasilimali muhimu kusaidia wengine kujifunza na kukua.", // Example translation
            aboutSkillsTitle: "Ninachofanya",
            aboutSkillTech: "Ugunduzi kutumia Teknolojia zinazonizunguka",
            aboutSkillRunning: "Mbio na Utalii wa maeneo",
            aboutSkillStorytelling: "Usimulizi kwa Picha",
            aboutSkillDigital: "Mikakati ya Uchui Mtandaoni",
            aboutMission: "Ninaamini katika nguvu ya kushiriki maarifa na uzoefu. Iwe ni kupitia upigaji picha, miongozo ya vitendo, au ushauri wa kiteknolojia, nalenga kuwawezesha watu binafsi katika ulimwengu wa kidijitali. Atana Ventures ndiyo jukwaa la shughuli hizi.", // Example translation
        }
    };

    // --- Functions ---
    function setLanguage(lang) {
        if (!translations[lang]) return;

        // 1. Update text content of translatable elements
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key] !== undefined) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = translations[lang][key];
                } else {
                    // Use innerHTML IF the key is known to contain HTML (use with caution)
                    // For simple text replacement, textContent is safer.
                    // Example check (adjust if needed):
                    // const safeKeys = ['key1', 'key2']; // Keys allowed to contain HTML
                    // if (safeKeys.includes(key)) {
                    //     el.innerHTML = translations[lang][key];
                    // } else {
                         el.textContent = translations[lang][key];
                    // }
                }
            } else {
                // console.warn(`Translation key "${key}" not found for language "${lang}"`);
            }
        });

        // 2. Update active button style
        langButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === lang);
        });

        // 3. Update UZA Embed Locale (if the element exists on the page)
        const uzaProductsElement = document.querySelector('uza-products');
        if (uzaProductsElement) {
            uzaProductsElement.setAttribute('__locale-override', lang);
             console.log(`UZA locale override set to: ${lang}`); // For debugging
        }

        // 4. Store preference and update HTML lang attribute
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }

    // --- Event Listeners ---
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // --- Initial Setup ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage); // Call on load

}); // End DOMContentLoaded