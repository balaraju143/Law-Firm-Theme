
/* ==========================================
   STACKLY SERVICES HERO - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".law-services-hero");

    if (!hero) return;

    const title = hero.querySelector(".law-services-hero-title");
    const breadcrumb = hero.querySelector(".law-services-breadcrumb");

    // FALLBACK
    if (typeof gsap === "undefined") {
        title.style.opacity = "1";
        breadcrumb.style.opacity = "1";
        return;
    }

    // HERO REVEAL TIMELINE
    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // HEADING REVEAL
    timeline.fromTo(
        title,
        {
            y: 65,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2
        }
    );

    // BREADCRUMB REVEAL
    timeline.fromTo(
        breadcrumb,
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.85
        },
        "-=0.55"
    );

});



/* ==========================================
   STACKLY SERVICES PAGE - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".services-page-section");

    if (!section) return;

    // FALLBACK IF GSAP IS NOT AVAILABLE
    if (typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined") {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    // HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".services-page-heading"),
        {
            y: 55,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        }
    );


    // THREE CARDS REVEAL

    const cards = gsap.utils.toArray(
        section.querySelectorAll(".services-page-card")
    );

    cards.forEach((card, index) => {

        const direction = index === 0 ? -100 :
                          index === 1 ? 0 : 100;

        const initialY = index === 1 ? 65 : 0;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true
            }
        });

        // CARD REVEAL
        timeline.fromTo(
            card,
            {
                x: direction,
                y: initialY,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out"
            }
        );

        // CARD CONTENT REVEAL
        timeline.fromTo(
            card.querySelector(".services-page-card-content"),
            {
                y: 35,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            },
            "-=0.55"
        );

        // IMAGE REVEAL
        timeline.fromTo(
            card.querySelector(".services-page-image"),
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            },
            "-=0.45"
        );

    });

});



/* ==========================================
   STACKLY CASE STUDIES - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-case-gallery-section"
    );

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // HEADING REVEAL
    const heading = section.querySelector(
        ".stackly-case-gallery-title"
    );

    gsap.fromTo(
        heading,
        {
            opacity: 0,
            y: -45
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        }
    );


    // DISCOVER BUTTON REVEAL
    const discoverButton = section.querySelector(
        ".stackly-case-discover-btn"
    );

    gsap.fromTo(
        discoverButton,
        {
            opacity: 0,
            x: 70
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        }
    );


    // FOUR CARDS FALL FROM TOP
    const cards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-case-gallery-card")
    );

    gsap.fromTo(
        cards,
        {
            opacity: 0,
            y: -130,
            scale: 0.94
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 1.2,
            stagger: 0.18,

            ease: "bounce.out",

            scrollTrigger: {
                trigger: ".stackly-case-gallery-grid",
                start: "top 85%",
                once: true
            }
        }
    );


    // IMAGE REVEAL
    cards.forEach((card, index) => {

        const image = card.querySelector(
            ".stackly-case-gallery-image"
        );

        gsap.fromTo(
            image,
            {
                scale: 1.15,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1.3,
                delay: 0.15 + index * 0.12,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true
                }
            }
        );

    });

});



/* ==========================================
   STACKLY CORE FEATURES - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-core-section");

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 01. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-core-heading"),
        {
            opacity: 0,
            y: 55
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        }
    );


    // 02. LEFT SIDE CARDS REVEAL

    const leftCards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-core-left-grid > .stackly-core-card")
    );

    gsap.fromTo(
        leftCards,
        {
            opacity: 0,
            x: -90
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".stackly-core-left-grid",
                start: "top 82%",
                once: true
            }
        }
    );


    // 03. WIDE CARD CONTENT REVEAL

    const wideContent = section.querySelector(
        ".stackly-core-wide-content"
    );

    gsap.fromTo(
        wideContent.children,
        {
            opacity: 0,
            x: -35
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",

            scrollTrigger: {
                trigger: ".stackly-core-wide",
                start: "top 80%",
                once: true
            }
        }
    );


    // 04. LEFT CARD IMAGES

    gsap.fromTo(
        section.querySelectorAll(
            ".stackly-core-wide-image, .stackly-core-bottom-image"
        ),
        {
            opacity: 0,
            x: -40
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".stackly-core-left-grid",
                start: "top 75%",
                once: true
            }
        }
    );


    // 05. RIGHT TALL CARD - BOTTOM TO TOP

    const tallCard = section.querySelector(".stackly-core-tall");

    gsap.fromTo(
        tallCard,
        {
            opacity: 0,
            y: 100,
            clipPath: "inset(100% 0 0 0)"
        },
        {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power3.out",

            scrollTrigger: {
                trigger: tallCard,
                start: "top 85%",
                once: true
            }
        }
    );


    // 06. RIGHT CONTENT REVEAL

    gsap.fromTo(
        tallCard.querySelectorAll(
            ".stackly-core-tall-content > *"
        ),
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.35,
            ease: "power3.out",

            scrollTrigger: {
                trigger: tallCard,
                start: "top 80%",
                once: true
            }
        }
    );


    // 07. RIGHT ATTORNEY IMAGE REVEAL

    gsap.fromTo(
        tallCard.querySelector(".stackly-core-tall-image"),
        {
            opacity: 0,
            y: 80
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out",

            scrollTrigger: {
                trigger: tallCard,
                start: "top 80%",
                once: true
            }
        }
    );

});



/* ==========================================
   STACKLY FAQ - ACCORDION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-faq-section");

    if (!section) return;

    const faqItems = section.querySelectorAll(".stackly-faq-item");

    faqItems.forEach((item) => {

        const button = item.querySelector(".stackly-faq-question");
        const icon = item.querySelector(".faq-toggle-icon");

        button.addEventListener("click", () => {

            const isAlreadyOpen = item.classList.contains("is-open");

            // CLOSE ALL FAQ ITEMS
            faqItems.forEach((faq) => {

                faq.classList.remove("is-open");

                const faqButton = faq.querySelector(
                    ".stackly-faq-question"
                );

                const faqIcon = faq.querySelector(
                    ".faq-toggle-icon"
                );

                faqButton.setAttribute("aria-expanded", "false");
                faqIcon.textContent = "add";

            });

            // OPEN SELECTED ITEM
            if (!isAlreadyOpen) {

                item.classList.add("is-open");

                button.setAttribute("aria-expanded", "true");

                icon.textContent = "remove";

            }

        });

    });

});


/* ==========================================
   STACKLY FAQ - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-faq-section");

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 01. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-faq-heading"),
        {
            opacity: 0,
            y: -55
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        }
    );


    // 02. LEFT IMAGE REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-faq-visual"),
        {
            opacity: 0,
            x: -110
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 03. GOLD REVIEW CARD REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-faq-review-card"),
        {
            opacity: 0,
            x: 50,
            y: 35
        },
        {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "back.out(1.5)",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 04. RIGHT FAQ CARDS REVEAL

    const faqItems = gsap.utils.toArray(
        section.querySelectorAll(".stackly-faq-item")
    );

    gsap.fromTo(
        faqItems,
        {
            opacity: 0,
            x: 90
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section.querySelector(".stackly-faq-content"),
                start: "top 80%",
                once: true
            }
        }
    );

});
