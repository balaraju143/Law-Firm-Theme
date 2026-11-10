
/* ==========================================
   STACKLY BLOG HERO - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".law-blog-hero");

    if (!hero) return;

    const title = hero.querySelector(".law-blog-hero-title");
    const breadcrumb = hero.querySelector(".law-blog-breadcrumb");

    // FALLBACK IF GSAP IS NOT LOADED
    if (typeof gsap === "undefined") {
        title.style.opacity = "1";
        breadcrumb.style.opacity = "1";
        return;
    }

    // INITIAL STATES
    gsap.set(title, {
        opacity: 0,
        y: 65
    });

    gsap.set(breadcrumb, {
        opacity: 0,
        y: 30
    });


    // HERO ANIMATION TIMELINE
    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // BLOG TITLE REVEAL
    timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2
    });


    // BREADCRUMB REVEAL
    timeline.to(breadcrumb, {
        opacity: 1,
        y: 0,
        duration: 0.85
    }, "-=0.5");

});



/* ==========================================
   STACKLY BLOG INTRO - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-blog-intro"
    );

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // 01. LEFT CONTENT REVEAL

    const leftElements = [
        section.querySelector(".stackly-blog-intro-label"),
        section.querySelector(".stackly-blog-intro-content h2"),
        section.querySelector(".stackly-blog-intro-description"),
        section.querySelector(".stackly-blog-intro-features"),
        section.querySelector(".stackly-blog-progress-box"),
        section.querySelector(".stackly-blog-intro-button")
    ];

    gsap.fromTo(
        leftElements,
        {
            opacity: 0,
            x: -75
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.13,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 02. TOP IMAGE - RIGHT TO LEFT REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-blog-image-top"),
        {
            opacity: 0,
            x: 100,
            clipPath: "inset(0 0 0 100%)"
        },
        {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.35,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 03. BOTTOM IMAGE - RIGHT TO LEFT REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-blog-image-bottom"),
        {
            opacity: 0,
            x: 120,
            clipPath: "inset(0 0 0 100%)"
        },
        {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.45,
            delay: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 04. CIRCULAR ICON REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-blog-round-icon"),
        {
            scale: 0,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            delay: 0.4,
            ease: "back.out(1.7)",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 05. EXPERIENCE BADGE REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-blog-experience-card"),
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.35,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 06. PROGRESS BAR ANIMATION

    gsap.fromTo(
        section.querySelectorAll(".stackly-blog-progress-track span"),
        {
            scaleX: 0
        },
        {
            scaleX: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section.querySelector(".stackly-blog-progress-box"),
                start: "top 85%",
                once: true
            }
        }
    );

});



/* ==========================================
   STACKLY BLOG TIMELINE - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-blog-timeline-section"
    );

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // 01. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-blog-timeline-heading"),
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


    // 02. CENTRAL TIMELINE LINE REVEAL

    const timeline = section.querySelector(
        ".stackly-blog-timeline"
    );

    const line = document.createElement("div");

    line.className = "stackly-blog-timeline-progress";

    timeline.appendChild(line);

    gsap.set(line, {
        scaleY: 0,
        transformOrigin: "top center"
    });

    gsap.to(line, {
        scaleY: 1,
        duration: 2.5,
        ease: "power2.out",

        scrollTrigger: {
            trigger: timeline,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.8
        }
    });


    // 03. TIMELINE CARD REVEAL

    const items = section.querySelectorAll(
        ".stackly-timeline-item"
    );

    items.forEach((item, index) => {

        const card = item.querySelector(
            ".stackly-timeline-card"
        );

        const marker = item.querySelector(
            ".stackly-timeline-marker"
        );

        const direction = index % 2 === 0 ? -90 : 90;

        const cardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true
            }
        });


        // CARD ENTERS FROM LEFT OR RIGHT

        cardTimeline.fromTo(
            card,
            {
                opacity: 0,
                x: direction,
                y: 25
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }
        );


        // TIMELINE MARKER REVEAL

        cardTimeline.fromTo(
            marker,
            {
                opacity: 0,
                scale: 0.3
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "back.out(1.8)"
            },
            "-=0.65"
        );

    });

});



/* ==========================================
   STACKLY TEAM - IMAGE TAP INTERACTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const teamCards = document.querySelectorAll(
        ".stackly-team-card"
    );

    if (!teamCards.length) return;

    teamCards.forEach(card => {

        const trigger = card.querySelector(
            ".team-card-image-trigger"
        );

        if (!trigger) return;

        trigger.addEventListener("click", () => {

            const isActive = card.classList.contains("is-active");

            // CLOSE OTHER CARDS
            teamCards.forEach(otherCard => {

                otherCard.classList.remove("is-active");

                const otherButton = otherCard.querySelector(
                    ".team-card-image-trigger"
                );

                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                    otherButton.querySelector("span").textContent = "View";
                }

            });

            // TOGGLE CURRENT CARD
            if (!isActive) {

                card.classList.add("is-active");

                trigger.setAttribute("aria-expanded", "true");

                trigger.querySelector("span").textContent = "Close";

            }

        });

    });

});


/* ==========================================
   STACKLY TEAM - GSAP REVEAL ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-team-section");

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // 01. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-team-heading"),
        {
            opacity: 0,
            y: 50
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


    // 02. ATTORNEY CARDS FROM ALTERNATING SIDES

    const cards = section.querySelectorAll(
        ".stackly-team-card"
    );

    cards.forEach((card, index) => {

        const direction = index % 2 === 0 ? -90 : 90;

        gsap.fromTo(
            card,
            {
                opacity: 0,
                x: direction,
                y: 25
            },
            {
                opacity: 1,
                x: 0,
                y: 0,

                duration: 1.1,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true
                }
            }
        );


        // 03. ATTORNEY IMAGE REVEAL

        const image = card.querySelector(
            ".stackly-team-card-image > img"
        );

        gsap.fromTo(
            image,
            {
                scale: 1.12,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                delay: 0.15,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true
                }
            }
        );

    });

});




/* ==========================================
   STACKLY FLIP CARDS - INTERACTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-flip-section");

    if (!section) return;

    const cards = section.querySelectorAll(".stackly-flip-card");


    // CLOSE A CARD
    function closeCard(card) {

        card.classList.remove("is-flipped");

        const trigger = card.querySelector(
            ".stackly-flip-trigger"
        );

        if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
        }

    }


    // OPEN A CARD
    function openCard(card) {

        // Close other cards first
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                closeCard(otherCard);
            }
        });

        card.classList.add("is-flipped");

        const trigger = card.querySelector(
            ".stackly-flip-trigger"
        );

        if (trigger) {
            trigger.setAttribute("aria-expanded", "true");
        }

    }


    cards.forEach(card => {

        const frontButton = card.querySelector(
            ".stackly-flip-trigger"
        );

        const backButton = card.querySelector(
            ".stackly-flip-back-trigger"
        );


        // FRONT VIEW DETAILS BUTTON
        frontButton.addEventListener("click", () => {

            if (card.classList.contains("is-flipped")) {
                closeCard(card);
            } else {
                openCard(card);
            }

        });


        // BACK BUTTON
        backButton.addEventListener("click", () => {

            closeCard(card);

        });

    });


    // CLOSE WHEN CLICKING OUTSIDE THE FLIP SECTION
    document.addEventListener("click", (event) => {

        if (!section.contains(event.target)) {

            cards.forEach(closeCard);

        }

    });


    // RESET ON RESIZE TO DESKTOP
    window.addEventListener("resize", () => {

        if (window.innerWidth > 600) {
            cards.forEach(closeCard);
        }

    });

});


/* ==========================================
   STACKLY FLIP SECTION - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-flip-section");

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // 01. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-flip-heading"),
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


    // 02. FOUR CARDS FROM ALTERNATING SIDES

    const cards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-flip-card")
    );

    cards.forEach((card, index) => {

        const direction = index % 2 === 0 ? -85 : 85;

        gsap.fromTo(
            card,
            {
                opacity: 0,
                x: direction,
                y: 30
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true
                }
            }
        );


        // 03. FRONT ICON REVEAL

        const icon = card.querySelector(
            ".stackly-flip-icon"
        );

        gsap.fromTo(
            icon,
            {
                opacity: 0,
                scale: 0.65
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "back.out(1.7)",

                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true
                }
            }
        );

    });


    // 04. BOTTOM CTA REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-flip-bottom"),
        {
            opacity: 0,
            y: 35
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section.querySelector(".stackly-flip-bottom"),
                start: "top 90%",
                once: true
            }
        }
    );

});
