
/* =====================================
   STACKLY MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// OPEN AND CLOSE MENU

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// CLOSE MENU AFTER CLICKING A PAGE

document.querySelectorAll(".nav-link, .mobile-login").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", (event) => {

    if (
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
    ) {

        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    }

});


// CLOSE MENU WHEN RESIZING TO DESKTOP

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    }

});





/* ==========================================
   STACKLY FOOTER NEWSLETTER VALIDATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("lawFooterForm");
    const emailInput = document.getElementById("lawFooterEmail");
    const error = document.getElementById("lawFooterError");
    const inputWrap = document.querySelector(
        ".law-footer-newsletter-input"
    );

    if (!form || !emailInput || !error || !inputWrap) return;

    let errorTimer;

    function clearError() {
        clearTimeout(errorTimer);

        error.textContent = "";

        inputWrap.classList.remove("has-error");

        emailInput.removeAttribute("aria-invalid");
    }

    function showError(message) {
        clearTimeout(errorTimer);

        error.textContent = message;

        inputWrap.classList.add("has-error");

        emailInput.setAttribute("aria-invalid", "true");

        errorTimer = setTimeout(() => {
            clearError();
        }, 3000);
    }

    // CLEAR ERROR WHEN TYPING
    emailInput.addEventListener("input", clearError);

    // SUBMIT FORM
    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            showError("Please enter your email address.");
            emailInput.focus();
            return;
        }

        if (!emailPattern.test(email) || !emailInput.validity.valid) {
            showError("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // VALID EMAIL
        clearError();

        // RESET BEFORE REDIRECT
        form.reset();

        // GO TO 404
        window.location.href = "404.html";

    });

    // RESET WHEN RETURNING TO FOOTER PAGE
    window.addEventListener("pageshow", () => {

        form.reset();

        clearError();

    });

});


/* ==========================================
   STACKLY FOOTER GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // BRAND REVEAL
    gsap.from(".law-footer-brand", {
        x: -70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".law-footer",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // FOOTER COLUMNS REVEAL
    gsap.from(".law-footer-column", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".law-footer-top",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // CONTACT BOX REVEAL
    gsap.from(".law-footer-contact-box", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".law-footer-contact-box",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // COPYRIGHT REVEAL
    gsap.from(".law-footer-bottom", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",

        scrollTrigger: {
            trigger: ".law-footer-bottom",
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });

});




/* ==========================================
   STACKLY PREMIUM LOADER FUNCTIONALITY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById(
        "stacklyPremiumLoader"
    );

    if (!loader) return;


    // PREVENT BACKGROUND SCROLL

    document.body.classList.add(
        "stackly-loader-active"
    );


    // LOADER SETTINGS

    const MINIMUM_DISPLAY = 650;

    const MAXIMUM_DISPLAY = 2100;


    let pageLoaded = document.readyState === "complete";

    let minimumFinished = false;

    let loaderHidden = false;


    /* ======================================
       HIDE LOADER
    ====================================== */

    function hideLoader() {

        if (loaderHidden) return;

        loaderHidden = true;

        clearTimeout(minimumTimer);

        clearTimeout(maximumTimer);


        loader.classList.add("is-hidden");

        document.body.classList.remove(
            "stackly-loader-active"
        );


        // REMOVE LOADER AFTER TRANSITION

        setTimeout(() => {

            loader.remove();

        }, 850);

    }


    /* ======================================
       CHECK LOADING STATUS
    ====================================== */

    function checkLoader() {

        if (pageLoaded && minimumFinished) {

            hideLoader();

        }

    }


    /* ======================================
       MINIMUM DISPLAY TIME
    ====================================== */

    const minimumTimer = setTimeout(() => {

        minimumFinished = true;

        checkLoader();

    }, MINIMUM_DISPLAY);


    /* ======================================
       PAGE LOAD COMPLETED
    ====================================== */

    function handlePageLoad() {

        pageLoaded = true;

        checkLoader();

    }


    // HANDLE ALREADY LOADED PAGES

    if (pageLoaded) {

        checkLoader();

    } else {

        window.addEventListener(
            "load",
            handlePageLoad,
            { once: true }
        );

    }


    /* ======================================
       STRICT MAXIMUM DISPLAY TIME
    ====================================== */

    const maximumTimer = setTimeout(() => {

        pageLoaded = true;

        minimumFinished = true;

        hideLoader();

    }, MAXIMUM_DISPLAY);


});
