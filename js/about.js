
/* ==========================================
   STACKLY ABOUT HERO GSAP ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    const aboutHero = document.querySelector(".law-about-hero");

    if (!aboutHero) return;

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // HEADING REVEAL
    timeline.fromTo(
        ".law-about-hero-title",
        {
            y: 65,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.1
        }
    );

    // BREADCRUMB REVEAL
    timeline.fromTo(
        ".law-about-breadcrumb",
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8
        },
        "-=0.55"
    );

});



/* ==========================================
   STACKLY ABOUT INTRO GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    const section = document.querySelector(".stackly-about-intro");

    if (!section) return;

    const smallImage = section.querySelector(
        ".stackly-about-img-one"
    );

    const experience = section.querySelector(
        ".stackly-about-experience"
    );

    const largeImage = section.querySelector(
        ".stackly-about-large-image"
    );

    const content = section.querySelector(
        ".stackly-about-content"
    );

    // SMALL IMAGE REVEAL FROM LEFT
    gsap.fromTo(
        smallImage,
        {
            x: -90,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // EXPERIENCE CARD REVEAL
    gsap.fromTo(
        experience,
        {
            x: -70,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.15,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // LARGE IMAGE REVEAL BOTTOM TO TOP
    gsap.fromTo(
        largeImage,
        {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0
        },
        {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // RIGHT CONTENT REVEAL
    gsap.fromTo(
        content,
        {
            x: 100,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.3,
            delay: 0.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );

});



/* ==========================================
   STACKLY APPROACH GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined") {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(
        ".stackly-approach-section"
    );

    if (!section) return;


    // LEFT CONTENT REVEAL

    gsap.fromTo(
        section.querySelectorAll(".approach-reveal"),
        {
            opacity: 0,
            x: -80
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );


    // TOP IMAGE - REVEAL TOP TO BOTTOM

    const topImage = section.querySelector(
        ".top-approach-image"
    );

    gsap.fromTo(
        topImage,
        {
            clipPath: "inset(0 0 100% 0)",
            opacity: 0
        },
        {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true
            }
        }
    );


    // BOTTOM IMAGE - REVEAL BOTTOM TO TOP

    const bottomImage = section.querySelector(
        ".bottom-approach-image"
    );

    gsap.fromTo(
        bottomImage,
        {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0
        },
        {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.5,
            delay: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true
            }
        }
    );


    // GOLD BADGE REVEAL

    gsap.fromTo(
        ".stackly-approach-round-badge",
        {
            opacity: 0,
            scale: 0.5
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            delay: 0.5,
            ease: "back.out(1.7)",

            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true
            }
        }
    );


    // SMALL GOLD ICON REVEAL

    gsap.fromTo(
        ".stackly-approach-icon-circle",
        {
            opacity: 0,
            scale: 0
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(2)",

            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true
            }
        }
    );

});



/* ==========================================
   STACKLY WHO WE ARE - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined") {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(
        ".stackly-who-section"
    );

    if (!section) return;


    // HEADING REVEAL

    gsap.fromTo(
        ".who-heading-reveal",
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


    // FIRST CARD - LEFT TO RIGHT

    gsap.fromTo(
        ".who-card-left",
        {
            opacity: 0,
            x: -100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".stackly-who-grid",
                start: "top 80%",
                once: true
            }
        }
    );


    // SECOND CARD - BOTTOM TO TOP

    gsap.fromTo(
        ".who-card-middle",
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: 0.15,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".stackly-who-grid",
                start: "top 80%",
                once: true
            }
        }
    );


    // THIRD CARD - RIGHT TO LEFT

    gsap.fromTo(
        ".who-card-right",
        {
            opacity: 0,
            x: 100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.1,
            delay: 0.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".stackly-who-grid",
                start: "top 80%",
                once: true
            }
        }
    );

});



/* ==========================================
   STACKLY OUR IMPACT - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined") {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(
        ".stackly-impact-section"
    );

    if (!section) return;


    // LEFT CARD REVEAL

    gsap.fromTo(
        ".stackly-impact-left",
        {
            opacity: 0,
            x: -120
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


    // RIGHT CONTENT REVEAL

    const rightTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".stackly-impact-right",
            start: "top 80%",
            once: true
        }
    });

    rightTimeline.fromTo(
        ".impact-section-label",
        {
            opacity: 0,
            x: 70
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.7
        }
    );

    rightTimeline.fromTo(
        ".stackly-impact-right h2",
        {
            opacity: 0,
            x: 80
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.9
        },
        "-=0.35"
    );

    rightTimeline.fromTo(
        ".impact-description",
        {
            opacity: 0,
            x: 80
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8
        },
        "-=0.4"
    );


    // STATISTIC CARDS REVEAL

    gsap.fromTo(
        ".impact-stat-item",
        {
            opacity: 0,
            x: 80
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".impact-statistics",
                start: "top 85%",
                once: true
            }
        }
    );


    // COUNTER ANIMATION

    document.querySelectorAll(".impact-counter").forEach(counter => {

        const target = Number(counter.dataset.target);

        gsap.fromTo(
            counter,
            {
                innerText: 0
            },
            {
                innerText: target,
                duration: 2,
                ease: "power2.out",

                snap: {
                    innerText: 1
                },

                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%",
                    once: true
                }
            }
        );

    });


    // LEFT IMAGE REVEAL

    gsap.fromTo(
        ".impact-profile-image",
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true
            }
        }
    );

});




/* ==========================================
   STACKLY CONTACT - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // LEFT CONTENT REVEAL
    gsap.fromTo(
        ".law-contact-content",
        {
            x: -100,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".law-contact-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // RIGHT IMAGE REVEAL
    gsap.fromTo(
        ".law-contact-image",
        {
            x: 100,
            opacity: 0,
            clipPath: "inset(0 0 0 100%)"
        },
        {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.5,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".law-contact-visual",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

});





/* ==========================================
   STACKLY CONTACT EMAIL VALIDATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("lawContactForm");
    const emailInput = document.getElementById("lawContactEmail");
    const errorMessage = document.getElementById("lawEmailError");
    const inputWrap = document.querySelector(".law-contact-input-wrap");

    if (!form || !emailInput || !errorMessage || !inputWrap) return;

    let errorTimer;

    // SHOW ERROR
    function showError(message) {

        clearTimeout(errorTimer);

        errorMessage.textContent = message;

        inputWrap.classList.add("has-error");

        emailInput.setAttribute("aria-invalid", "true");

        errorTimer = setTimeout(() => {
            clearError();
        }, 3000);
    }

    // CLEAR ERROR
    function clearError() {

        errorMessage.textContent = "";

        inputWrap.classList.remove("has-error");

        emailInput.removeAttribute("aria-invalid");

        clearTimeout(errorTimer);
    }

    // CLEAR ERROR WHILE TYPING
    emailInput.addEventListener("input", () => {
        clearError();
    });


    // FORM SUBMISSION
    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();

        // EMPTY VALIDATION
        if (!email) {

            showError("Please enter your email address.");

            emailInput.focus();

            return;
        }

        // EMAIL FORMAT VALIDATION
        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email) || !emailInput.validity.valid) {

            showError("Please enter a valid email address.");

            emailInput.focus();

            return;
        }

        // VALID EMAIL
        clearError();

        // RESET EMAIL BEFORE NAVIGATION
        form.reset();

        // REDIRECT TO 404 PAGE
        window.location.href = "404.html";

    });


    // RESET WHEN RETURNING TO THIS PAGE
    window.addEventListener("pageshow", () => {

        form.reset();

        clearError();

    });

});


/* ==========================================
   STACKLY CONTACT - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    // LEFT CONTENT REVEAL
    gsap.fromTo(
        ".law-contact-content",
        {
            x: -100,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".law-contact-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // RIGHT IMAGE REVEAL
    gsap.fromTo(
        ".law-contact-image",
        {
            x: 100,
            opacity: 0,
            clipPath: "inset(0 0 0 100%)"
        },
        {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.5,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".law-contact-visual",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

});
