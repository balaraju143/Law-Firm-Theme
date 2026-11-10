
/* ==========================================
   STACKLY LAW FIRM - LOGIN FUNCTIONALITY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("stacklyLoginForm");

    if (!form) return;


    // ELEMENTS

    const emailInput = document.getElementById(
        "stacklyLoginEmail"
    );

    const passwordInput = document.getElementById(
        "stacklyLoginPassword"
    );

    const passwordToggle = document.querySelector(
        ".stackly-password-toggle"
    );

    const roleButtons = document.querySelectorAll(
        ".stackly-role-btn"
    );

    const rememberCheckbox = document.getElementById(
        "stacklyRemember"
    );


    // DEFAULT ROLE

    let selectedRole = "client";

    let submittedOnce = false;

    const errorTimers = new Map();


    // DASHBOARD PATHS
    // Change these paths if your dashboard filenames are different.

    const dashboardPaths = {
        client: "client-dashboard.html",
        admin: "admin-dashboard.html"
    };


    /* ======================================
       ROLE SELECTION
    ====================================== */

    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedRole = button.dataset.role;

            roleButtons.forEach(roleButton => {

                const isSelected = roleButton === button;

                roleButton.classList.toggle(
                    "active",
                    isSelected
                );

                roleButton.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );

            });

        });

    });


    /* ======================================
       PASSWORD SHOW / HIDE
    ====================================== */

    passwordToggle.addEventListener("click", () => {

        const passwordVisible =
            passwordInput.type === "text";

        passwordInput.type = passwordVisible
            ? "password"
            : "text";


        // UPDATE ICON

        passwordToggle.innerHTML = passwordVisible
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';


        passwordToggle.setAttribute(
            "aria-label",
            passwordVisible ? "Show password" : "Hide password"
        );

        passwordToggle.setAttribute(
            "aria-pressed",
            String(!passwordVisible)
        );

    });


    /* ======================================
       CLEAR FIELD ERROR
    ====================================== */

    function clearError(field, errorElement) {

        const fieldName = field.name;

        clearTimeout(errorTimers.get(fieldName));

        errorTimers.delete(fieldName);

        errorElement.textContent = "";

        errorElement.classList.remove("show-error");

        field.classList.remove("has-error");

        field.removeAttribute("aria-invalid");

    }


    /* ======================================
       DISPLAY ERROR - 3 SECONDS
    ====================================== */

    function showError(field, errorElement, message) {

        clearTimeout(errorTimers.get(field.name));

        errorElement.textContent = message;

        errorElement.classList.add("show-error");

        field.classList.add("has-error");

        field.setAttribute("aria-invalid", "true");


        const timer = setTimeout(() => {

            errorElement.textContent = "";

            errorElement.classList.remove("show-error");

            field.classList.remove("has-error");

            field.removeAttribute("aria-invalid");

            errorTimers.delete(field.name);

        }, 3000);


        errorTimers.set(field.name, timer);

    }


    /* ======================================
       EMAIL VALIDATION
    ====================================== */

    function validateEmail() {

        const value = emailInput.value.trim();

        const error = document.getElementById(
            "stacklyEmailError"
        );

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        if (!value) {

            showError(
                emailInput,
                error,
                "Please enter your email address."
            );

            return false;

        }


        if (!emailPattern.test(value)) {

            showError(
                emailInput,
                error,
                "Please enter a valid email address."
            );

            return false;

        }


        clearError(emailInput, error);

        return true;

    }


    /* ======================================
       PASSWORD VALIDATION
    ====================================== */

    function validatePassword() {

        const value = passwordInput.value;

        const error = document.getElementById(
            "stacklyPasswordError"
        );


        if (!value) {

            showError(
                passwordInput,
                error,
                "Please enter your password."
            );

            return false;

        }


        if (value.length < 8) {

            showError(
                passwordInput,
                error,
                "Password must contain at least 8 characters."
            );

            return false;

        }


        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {

            showError(
                passwordInput,
                error,
                "Password must contain at least one letter and one number."
            );

            return false;

        }


        clearError(passwordInput, error);

        return true;

    }


    /* ======================================
       INPUT EVENTS
    ====================================== */

    emailInput.addEventListener("input", () => {

        clearError(
            emailInput,
            document.getElementById("stacklyEmailError")
        );

        if (submittedOnce && emailInput.value.trim()) {
            validateEmail();
        }

    });


    passwordInput.addEventListener("input", () => {

        clearError(
            passwordInput,
            document.getElementById("stacklyPasswordError")
        );

        if (submittedOnce && passwordInput.value) {
            validatePassword();
        }

    });


    /* ======================================
       FORM SUBMISSION
    ====================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        submittedOnce = true;


        const emailValid = validateEmail();

        const passwordValid = validatePassword();


        // STOP IF VALIDATION FAILS

        if (!emailValid || !passwordValid) {

            if (!emailValid) {

                emailInput.focus();

            } else if (!passwordValid) {

                passwordInput.focus();

            }

            return;

        }


        // CLEAR ERRORS

        clearError(
            emailInput,
            document.getElementById("stacklyEmailError")
        );

        clearError(
            passwordInput,
            document.getElementById("stacklyPasswordError")
        );


        // GET SELECTED DASHBOARD

        const destination = dashboardPaths[selectedRole];

          
sessionStorage.setItem(
    "stacklyUserEmail",
    emailInput.value.trim().toLowerCase()
);

sessionStorage.setItem(
    "stacklyUserRole",
    selectedRole
);

        // REMEMBER ME IS UI ONLY UNTIL CONNECTED TO AUTHENTICATION

        // FRONTEND DEMO REDIRECT
        window.location.assign(destination);

    });


    /* ======================================
       RESET FORM WHEN RETURNING TO PAGE
    ====================================== */

    function resetLoginForm() {

        form.reset();

        selectedRole = "client";

        submittedOnce = false;


        // RESET ROLE BUTTONS

        roleButtons.forEach(button => {

            const isClient = button.dataset.role === "client";

            button.classList.toggle("active", isClient);

            button.setAttribute(
                "aria-pressed",
                String(isClient)
            );

        });


        // RESET PASSWORD VISIBILITY

        passwordInput.type = "password";

        passwordToggle.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

        passwordToggle.setAttribute(
            "aria-label",
            "Show password"
        );

        passwordToggle.setAttribute(
            "aria-pressed",
            "false"
        );


        // CLEAR ERROR MESSAGES AND TIMERS

        errorTimers.forEach(timer => clearTimeout(timer));

        errorTimers.clear();


        document.querySelectorAll(".stackly-login-error").forEach(error => {

            error.textContent = "";

            error.classList.remove("show-error");

        });


        document.querySelectorAll(".stackly-login-input-wrap input").forEach(input => {

            input.classList.remove("has-error");

            input.removeAttribute("aria-invalid");

        });

    }


    // RESET WHEN BROWSER RETURNS TO LOGIN PAGE

    window.addEventListener("pageshow", resetLoginForm);

});



/* ==========================================
   STACKLY LOGIN - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".stackly-login-card");

    if (!card || typeof gsap === "undefined") return;


    const leftPanel = card.querySelector(
        ".stackly-login-visual"
    );

    const rightPanel = card.querySelector(
        ".stackly-login-form-panel"
    );


    // INITIAL CARD REVEAL

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // 01. LEFT PANEL

    timeline.fromTo(
        leftPanel,
        {
            opacity: 0,
            x: -75
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.1
        }
    );


    // 02. RIGHT PANEL

    timeline.fromTo(
        rightPanel,
        {
            opacity: 0,
            x: 75
        },
        {
            opacity: 1,
            x: 0,
            duration: 1.1
        },
        "-=0.75"
    );


    // 03. LEFT CONTENT

    timeline.fromTo(
        leftPanel.querySelectorAll(
            ".stackly-login-brand, .stackly-login-visual-content h1, .stackly-login-visual-content > p, .stackly-login-highlights > div, .stackly-login-stats > div"
        ),
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.11
        },
        "-=0.6"
    );


    // 04. RIGHT FORM HEADING

    timeline.fromTo(
        card.querySelector(".stackly-login-heading"),
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7
        },
        "-=0.6"
    );


    // 05. ROLE SELECTION

    timeline.fromTo(
        card.querySelector(".stackly-login-role-section"),
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6
        },
        "-=0.4"
    );


    // 06. FORM FIELDS

    timeline.fromTo(
        card.querySelectorAll(".stackly-login-field"),
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12
        },
        "-=0.35"
    );


    // 07. LOGIN BUTTON AND SOCIAL LINKS

    timeline.fromTo(
        card.querySelectorAll(
            ".stackly-login-options, .stackly-login-submit, .stackly-login-divider, .stackly-login-social a, .stackly-login-register"
        ),
        {
            opacity: 0,
            y: 18
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08
        },
        "-=0.35"
    );

});
