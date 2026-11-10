
/* ==========================================
   STACKLY LAW FIRM - HERO GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // HERO ELEMENTS
    const heroContent = document.querySelector(".law-hero-content");
    const reviewCard = document.querySelector(".law-review-card");

    // CHECK GSAP
    if (typeof gsap === "undefined") {
        heroContent.style.opacity = "1";
        reviewCard.style.opacity = "1";
        return;
    }

    // MASTER TIMELINE
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    // LEFT CONTENT REVEAL
    heroTimeline.fromTo(
        heroContent,
        {
            x: -100,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.3
        }
    );

    // RIGHT REVIEW CARD REVEAL
    heroTimeline.fromTo(
        reviewCard,
        {
            x: -80,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.2
        },
        "-=0.65"
    );

});



/* ==========================================
   STACKLY ABOUT SECTION - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const aboutVisual = document.querySelector(".law-about-visual");
    const aboutContent = document.querySelector(".law-about-content");

    if (!aboutVisual || !aboutContent) return;

    if (typeof gsap === "undefined") return;

    // IMAGE REVEAL FROM LEFT
    gsap.fromTo(
        aboutVisual,
        {
            x: -120,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".law-about-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );

    // CONTENT REVEAL FROM RIGHT
    gsap.fromTo(
        aboutContent,
        {
            x: 120,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".law-about-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );

});

/* ==========================================
   STACKLY SERVICES - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const serviceCards = gsap.utils.toArray(".law-service-card");

    if (typeof gsap === "undefined" || !serviceCards.length) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // CARDS REVEAL FROM LEFT AND RIGHT

    serviceCards.forEach((card, index) => {

        const direction = index % 2 === 0 ? -100 : 100;

        gsap.fromTo(
            card,
            {
                x: direction,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );

    });

});

/* ==========================================
   STACKLY CASE STUDIES - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // HEADING REVEAL
    const caseHeading = document.querySelector(".law-cases-heading");

    if (caseHeading) {

        gsap.fromTo(
            caseHeading,
            {
                y: 45,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: caseHeading,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );

    }


    // CASE CARD REVEAL
    const caseCards = gsap.utils.toArray(".law-case-card");

    caseCards.forEach((card, index) => {

        const direction = index % 2 === 0 ? -90 : 90;

        gsap.fromTo(
            card,
            {
                x: direction,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.15,
                delay: index * 0.08,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );

    });

});

/* ==========================================
   STACKLY TESTIMONIAL SLIDER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".law-testimonial-slider");
    const box = document.querySelector(".law-testimonial-box");

    if (!slider || !box) return;

    const slides = Array.from(
        slider.querySelectorAll(".law-testimonial-slide")
    );

    const prevBtn = document.querySelector(".law-testimonial-prev");
    const nextBtn = document.querySelector(".law-testimonial-next");

    let currentIndex = 0;
    let autoplay;

    function showTestimonial(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add("active");

    }

    function nextTestimonial() {
        showTestimonial(currentIndex + 1);
    }

    function previousTestimonial() {
        showTestimonial(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();

        autoplay = setInterval(() => {
            nextTestimonial();
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextTestimonial();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            previousTestimonial();
            startAutoplay();
        });
    }

    box.addEventListener("mouseenter", stopAutoplay);
    box.addEventListener("mouseleave", startAutoplay);

    // INITIALIZE
    showTestimonial(0);
    startAutoplay();


    /* ======================================
       GSAP REVEAL ANIMATIONS
    ====================================== */

    if (typeof gsap !== "undefined") {

        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        // LEFT IMAGE REVEAL
        gsap.fromTo(
            ".law-testimonial-visual",
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
                    trigger: ".law-testimonials-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

        // RIGHT CONTENT REVEAL
        gsap.fromTo(
            ".law-testimonials-content",
            {
                x: 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.3,
                delay: 0.15,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".law-testimonials-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

    }

});



/* ==========================================
   STACKLY WHY CHOOSE US - GSAP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // LEFT CONTENT REVEAL
    gsap.fromTo(
        ".law-why-content",
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
                trigger: ".law-why-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        }
    );


    // IMAGE REVEAL FROM BOTTOM TO TOP
    const lawyerImage = document.querySelector(".law-why-main-image");

    if (lawyerImage) {

        gsap.fromTo(
            lawyerImage,
            {
                y: 100,
                scale: 1.12,
                clipPath: "inset(100% 0 0 0)"
            },
            {
                y: 0,
                scale: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 1.6,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".law-why-image-frame",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

    }


    // CIRCLE CARDS REVEAL ONE BY ONE
    gsap.fromTo(
        ".law-why-stat",
        {
            y: 70,
            scale: 0.7,
            opacity: 0
        },
        {
            y: 0,
            scale: 1,
            opacity: 1,

            duration: 0.9,
            stagger: 0.22,
            ease: "back.out(1.5)",

            scrollTrigger: {
                trigger: ".law-why-stats",
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
