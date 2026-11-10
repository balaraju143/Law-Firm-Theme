
/* ==========================================
   STACKLY CONTACT HERO - GSAP ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".law-contact-hero");

    if (!hero) return;

    const title = hero.querySelector(
        ".law-contact-hero-title"
    );

    const breadcrumb = hero.querySelector(
        ".law-contact-breadcrumb"
    );


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


    // ANIMATION TIMELINE

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // CONTACT HEADING REVEAL

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
   STACKLY CONTACT FORM VALIDATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("stacklyContactForm");

    if (!form) return;

    const fields = {
        name: document.getElementById("contactName"),
        email: document.getElementById("contactEmail"),
        phone: document.getElementById("contactPhone"),
        message: document.getElementById("contactMessage")
    };

    const errorTimers = new Map();

    let submittedOnce = false;


    /* ======================================
       CLEAR FIELD ERROR
    ====================================== */

    function clearFieldError(fieldName) {

        const field = fields[fieldName];

        const error = form.querySelector(
            `[data-error-for="${fieldName}"]`
        );

        if (!field || !error) return;

        clearTimeout(errorTimers.get(fieldName));

        errorTimers.delete(fieldName);

        error.textContent = "";

        error.classList.remove("show-error");

        field.classList.remove("has-error");

        field.removeAttribute("aria-invalid");

    }


    /* ======================================
       SHOW ERROR FOR 3 SECONDS
    ====================================== */

    function showFieldError(fieldName, message) {

        const field = fields[fieldName];

        const error = form.querySelector(
            `[data-error-for="${fieldName}"]`
        );

        if (!field || !error) return;

        clearTimeout(errorTimers.get(fieldName));

        error.textContent = message;

        error.classList.add("show-error");

        field.classList.add("has-error");

        field.setAttribute("aria-invalid", "true");

        const timer = setTimeout(() => {

            error.textContent = "";

            error.classList.remove("show-error");

            field.classList.remove("has-error");

            field.removeAttribute("aria-invalid");

            errorTimers.delete(fieldName);

        }, 3000);

        errorTimers.set(fieldName, timer);

    }


    /* ======================================
       VALIDATE EACH FIELD
    ====================================== */

    function validateField(fieldName) {

        const field = fields[fieldName];

        const value = field.value.trim();

        let errorMessage = "";


        // NAME VALIDATION
        if (fieldName === "name") {

            const namePattern =
                /^[A-Za-z][A-Za-z\s.'-]{1,59}$/;

            if (!value) {

                errorMessage = "Please enter your full name.";

            } else if (!namePattern.test(value)) {

                errorMessage =
                    "Name must contain letters only.";

            }

        }


        // EMAIL VALIDATION
        if (fieldName === "email") {

            const emailPattern =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!value) {

                errorMessage = "Please enter your email address.";

            } else if (!emailPattern.test(value)) {

                errorMessage =
                    "Please enter a valid email address.";

            }

        }


        // PHONE VALIDATION
        if (fieldName === "phone") {

            const cleanPhone = value.replace(/[\s()-]/g, "");

            const phonePattern = /^\+?[0-9]{7,15}$/;

            if (!value) {

                errorMessage = "Please enter your phone number.";

            } else if (!phonePattern.test(cleanPhone)) {

                errorMessage =
                    "Please enter a valid phone number.";

            }

        }


        // MESSAGE VALIDATION
        if (fieldName === "message") {

            if (!value) {

                errorMessage = "Please enter your message.";

            } else if (value.length < 10) {

                errorMessage =
                    "Please enter at least 10 characters.";

            }

        }


        // DISPLAY ERROR
        if (errorMessage) {

            showFieldError(fieldName, errorMessage);

            return false;

        }


        clearFieldError(fieldName);

        return true;

    }


    /* ======================================
       INPUT EVENTS
    ====================================== */

    Object.keys(fields).forEach(fieldName => {

        const field = fields[fieldName];

        // CLEAR ERROR WHILE USER TYPES
        field.addEventListener("input", () => {

            clearFieldError(fieldName);

            // Revalidate after the first submission attempt
            if (submittedOnce && field.value.trim()) {
                validateField(fieldName);
            }

        });


        // RECHECK WHEN USER LEAVES FIELD
        field.addEventListener("blur", () => {

            if (submittedOnce) {
                validateField(fieldName);
            }

        });

    });


    /* ======================================
       FORM SUBMISSION
    ====================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        submittedOnce = true;

        let isFormValid = true;

        let firstInvalidField = null;


        // VALIDATE ALL FIELDS
        Object.keys(fields).forEach(fieldName => {

            const valid = validateField(fieldName);

            if (!valid) {

                isFormValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = fields[fieldName];
                }

            }

        });


        // INVALID FORM
        if (!isFormValid) {

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;

        }


        // VALID FORM
        // Clear timers and error messages
        Object.keys(fields).forEach(clearFieldError);


        // RESET FORM BEFORE NAVIGATION
        form.reset();

        submittedOnce = false;


        // REDIRECT TO 404 PAGE
        window.location.href = "404.html";

    });


    /* ======================================
       RESET WHEN RETURNING TO CONTACT PAGE
    ====================================== */

    window.addEventListener("pageshow", () => {

        form.reset();

        submittedOnce = false;

        Object.keys(fields).forEach(clearFieldError);

    });

});



/* ==========================================
   STACKLY CONTACT SECTION - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-contact-form-section"
    );

    if (!section || typeof gsap === "undefined") return;


    // USE SCROLL TRIGGER WHEN AVAILABLE
    const scrollConfig =
        typeof ScrollTrigger !== "undefined"
            ? {
                trigger: section,
                start: "top 78%",
                once: true
            }
            : null;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // MAIN TIMELINE

    const timeline = gsap.timeline({
        ...(scrollConfig ? { scrollTrigger: scrollConfig } : {}),
        defaults: {
            ease: "power3.out"
        }
    });


    // 01. LEFT HEADING REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-top-title"),
        {
            opacity: 0,
            x: -65
        },
        {
            opacity: 1,
            x: 0,
            duration: 1
        }
    );


    // 02. TOP DESCRIPTION REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-top-description"),
        {
            opacity: 0,
            x: 65
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.9
        },
        "-=0.65"
    );


    // 03. LEFT IMAGE REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-visual"),
        {
            opacity: 0,
            x: -100,
            clipPath: "inset(0 100% 0 0)"
        },
        {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.3
        },
        "-=0.45"
    );


    // 04. FLOATING TRUST CARD

    timeline.fromTo(
        section.querySelector(".stackly-contact-trust-card"),
        {
            opacity: 0,
            y: -20,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8
        },
        "-=0.55"
    );


    // 05. RIGHT FORM REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-form-card"),
        {
            opacity: 0,
            x: 100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.2
        },
        "-=0.75"
    );


    // 06. FORM HEADING REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-form-heading"),
        {
            opacity: 0,
            y: 22
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7
        },
        "-=0.6"
    );


    // 07. FORM FIELDS REVEAL

    timeline.fromTo(
        section.querySelectorAll(".stackly-form-group"),
        {
            opacity: 0,
            y: 24
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1
        },
        "-=0.35"
    );


    // 08. SUBMIT BUTTON REVEAL

    timeline.fromTo(
        section.querySelector(".stackly-contact-submit"),
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7
        },
        "-=0.25"
    );

});




/* ==========================================
   STACKLY CONTACT INFORMATION - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-contact-info-section"
    );

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // ANIMATION TRIGGER

    const animationSettings = {
        trigger: section,
        start: "top 80%",
        once: true
    };


    // 01. LABEL REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-contact-info-label"),
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: animationSettings
        }
    );


    // 02. HEADING REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-contact-info-heading h2"),
        {
            opacity: 0,
            y: 45
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.1,
            ease: "power3.out",

            scrollTrigger: animationSettings
        }
    );


    // 03. DESCRIPTION REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-contact-info-heading > p"),
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.25,
            ease: "power3.out",

            scrollTrigger: animationSettings
        }
    );


    // 04. FOUR CONTACT CARDS

    const cards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-contact-info-card")
    );


    cards.forEach((card, index) => {

        const direction = index % 2 === 0 ? -85 : 85;

        gsap.fromTo(
            card,
            {
                opacity: 0,
                x: direction,
                y: 20
            },
            {
                opacity: 1,
                x: 0,
                y: 0,

                duration: 1.05,

                delay: index * 0.12,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true
                }
            }
        );


        // ICON REVEAL

        const icon = card.querySelector(
            ".stackly-contact-info-icon"
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

                duration: 0.7,

                delay: 0.25 + index * 0.12,

                ease: "back.out(1.7)",

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
   STACKLY LEGAL FAQ - ACCORDION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-legal-faq-feature"
    );

    if (!section) return;

    const items = section.querySelectorAll(
        ".stackly-legal-faq-item"
    );


    items.forEach(item => {

        const button = item.querySelector(
            ".stackly-legal-faq-question"
        );

        const icon = button.querySelector(
            ".material-symbols-outlined"
        );


        button.addEventListener("click", () => {

            const alreadyOpen = item.classList.contains("is-open");


            // CLOSE ALL
            items.forEach(other => {

                other.classList.remove("is-open");

                const otherButton = other.querySelector(
                    ".stackly-legal-faq-question"
                );

                const otherIcon = otherButton.querySelector(
                    ".material-symbols-outlined"
                );

                otherButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherIcon.textContent = "add";

            });


            // OPEN SELECTED QUESTION
            if (!alreadyOpen) {

                item.classList.add("is-open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                icon.textContent = "remove";

            }

        });

    });

});


/* ==========================================
   STACKLY LEGAL FAQ - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".stackly-legal-faq-feature"
    );

    if (!section || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // 01. LEFT CONTENT REVEAL

    const leftContent = [
        section.querySelector(".stackly-legal-faq-label"),
        section.querySelector(".stackly-legal-faq-content h2"),
        section.querySelector(".stackly-legal-faq-description"),
        section.querySelector(".stackly-legal-faq-list"),
        section.querySelector(".stackly-legal-faq-button")
    ];


    gsap.fromTo(
        leftContent,
        {
            opacity: 0,
            x: -75
        },
        {
            opacity: 1,
            x: 0,

            duration: 0.95,

            stagger: 0.14,

            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true
            }
        }
    );


    // 02. FAQ ITEM STAGGER

    gsap.fromTo(
        section.querySelectorAll(".stackly-legal-faq-item"),
        {
            opacity: 0,
            y: 18
        },
        {
            opacity: 1,
            y: 0,

            duration: 0.55,

            stagger: 0.12,

            ease: "power2.out",

            scrollTrigger: {
                trigger: section.querySelector(".stackly-legal-faq-list"),
                start: "top 85%",
                once: true
            }
        }
    );


    // 03. RIGHT IMAGE - LEFT TO RIGHT REVEAL

    const image = section.querySelector(
        ".stackly-legal-faq-image-wrap"
    );

    gsap.fromTo(
        image,
        {
            opacity: 0,
            x: 65,
            clipPath: "inset(0 100% 0 0)"
        },
        {
            opacity: 1,
            x: 0,

            clipPath: "inset(0 0% 0 0)",

            duration: 1.45,

            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // 04. IMAGE CAPTION REVEAL

    gsap.fromTo(
        section.querySelector(".stackly-legal-faq-image-caption"),
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,

            duration: 0.8,

            delay: 0.6,

            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );

});
