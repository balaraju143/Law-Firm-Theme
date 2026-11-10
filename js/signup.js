
/* ==========================================
   STACKLY SIGNUP - FORM FUNCTIONALITY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("stacklySignupForm");

    if (!form) return;


    // INPUT FIELDS

    const nameInput = document.getElementById("signupName");

    const emailInput = document.getElementById("signupEmail");

    const passwordInput = document.getElementById("signupPassword");

    const confirmInput = document.getElementById(
        "signupConfirmPassword"
    );


    const fields = {
        name: {
            input: nameInput,
            error: document.getElementById("signupNameError")
        },

        email: {
            input: emailInput,
            error: document.getElementById("signupEmailError")
        },

        password: {
            input: passwordInput,
            error: document.getElementById("signupPasswordError")
        },

        confirmPassword: {
            input: confirmInput,
            error: document.getElementById("signupConfirmError")
        }
    };


    // ROLE SELECTION

    const roleButtons = document.querySelectorAll(
        ".stackly-signup-role-btn"
    );

    let selectedRole = "client";

    let submittedOnce = false;

    const errorTimers = new Map();


    /* ======================================
       ROLE SELECTION
    ====================================== */

    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedRole = button.dataset.role;

            roleButtons.forEach(roleButton => {

                const selected = roleButton === button;

                roleButton.classList.toggle("active", selected);

                roleButton.setAttribute(
                    "aria-pressed",
                    String(selected)
                );

            });

        });

    });


    /* ======================================
       PASSWORD SHOW / HIDE
    ====================================== */

    document.querySelectorAll(
        ".stackly-signup-password-toggle"
    ).forEach(toggle => {

        toggle.addEventListener("click", () => {

            const targetId = toggle.dataset.target;

            const input = document.getElementById(targetId);

            const visible = input.type === "text";


            input.type = visible ? "password" : "text";


            toggle.innerHTML = visible
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';


            toggle.setAttribute(
                "aria-label",
                visible ? "Show password" : "Hide password"
            );

            toggle.setAttribute(
                "aria-pressed",
                String(!visible)
            );

        });

    });


    /* ======================================
       ERROR CLEAR
    ====================================== */

    function clearError(fieldName) {

        const fieldData = fields[fieldName];

        clearTimeout(errorTimers.get(fieldName));

        errorTimers.delete(fieldName);

        fieldData.error.textContent = "";

        fieldData.error.classList.remove("show-error");

        fieldData.input.classList.remove("has-error");

        fieldData.input.removeAttribute("aria-invalid");

    }


    /* ======================================
       DISPLAY ERROR FOR 3 SECONDS
    ====================================== */

    function showError(fieldName, message) {

        const fieldData = fields[fieldName];

        clearTimeout(errorTimers.get(fieldName));


        fieldData.error.textContent = message;

        fieldData.error.classList.add("show-error");

        fieldData.input.classList.add("has-error");

        fieldData.input.setAttribute("aria-invalid", "true");


        const timer = setTimeout(() => {

            fieldData.error.textContent = "";

            fieldData.error.classList.remove("show-error");

            fieldData.input.classList.remove("has-error");

            fieldData.input.removeAttribute("aria-invalid");

            errorTimers.delete(fieldName);

        }, 3000);


        errorTimers.set(fieldName, timer);

    }


    /* ======================================
       NAME VALIDATION
    ====================================== */

    function validateName() {

        const value = nameInput.value.trim();

        const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


        if (!value) {

            showError("name", "Please enter your full name.");

            return false;

        }


        if (value.length < 2 || value.length > 60) {

            showError(
                "name",
                "Name must contain 2 to 60 letters."
            );

            return false;

        }


        if (!namePattern.test(value)) {

            showError(
                "name",
                "Name must contain letters and spaces only."
            );

            return false;

        }


        clearError("name");

        return true;

    }


    /* ======================================
       EMAIL VALIDATION
    ====================================== */

    function validateEmail() {

        const value = emailInput.value.trim();

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        if (!value) {

            showError("email", "Please enter your email address.");

            return false;

        }


        if (!emailPattern.test(value)) {

            showError(
                "email",
                "Please enter a valid email address."
            );

            return false;

        }


        clearError("email");

        return true;

    }


    /* ======================================
       PASSWORD VALIDATION
    ====================================== */

    function validatePassword() {

        const value = passwordInput.value;


        if (!value) {

            showError("password", "Please create a password.");

            return false;

        }


        if (value.length < 8) {

            showError(
                "password",
                "Password must contain at least 8 characters."
            );

            return false;

        }


        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {

            showError(
                "password",
                "Password must include at least one letter and one number."
            );

            return false;

        }


        clearError("password");

        return true;

    }


    /* ======================================
       CONFIRM PASSWORD VALIDATION
    ====================================== */

    function validateConfirmPassword() {

        const value = confirmInput.value;


        if (!value) {

            showError(
                "confirmPassword",
                "Please confirm your password."
            );

            return false;

        }


        if (value !== passwordInput.value) {

            showError(
                "confirmPassword",
                "Passwords do not match."
            );

            return false;

        }


        clearError("confirmPassword");

        return true;

    }


    /* ======================================
       VALIDATE FIELD BY NAME
    ====================================== */

    function validateField(fieldName) {

        switch (fieldName) {

            case "name":
                return validateName();

            case "email":
                return validateEmail();

            case "password":
                return validatePassword();

            case "confirmPassword":
                return validateConfirmPassword();

            default:
                return true;

        }

    }


    /* ======================================
       NAME INPUT - LETTERS ONLY
    ====================================== */

    nameInput.addEventListener("input", () => {

        // Remove numbers and special characters immediately.
        const cleanedValue = nameInput.value.replace(
            /[^A-Za-z\s]/g,
            ""
        );

        if (nameInput.value !== cleanedValue) {
            nameInput.value = cleanedValue;
        }

        clearError("name");

        if (submittedOnce && nameInput.value.trim()) {
            validateName();
        }

    });


    /* ======================================
       OTHER INPUT EVENTS
    ====================================== */

    ["email", "password", "confirmPassword"].forEach(fieldName => {

        const input = fields[fieldName].input;

        input.addEventListener("input", () => {

            clearError(fieldName);

            if (submittedOnce && input.value) {
                validateField(fieldName);
            }

            // Recheck confirmation after password changes.
            if (
                fieldName === "password" &&
                submittedOnce &&
                confirmInput.value
            ) {
                validateConfirmPassword();
            }

        });

    });


    /* ======================================
       BLUR VALIDATION
    ====================================== */

    Object.keys(fields).forEach(fieldName => {

        fields[fieldName].input.addEventListener("blur", () => {

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


        const nameValid = validateName();

        const emailValid = validateEmail();

        const passwordValid = validatePassword();

        const confirmValid = validateConfirmPassword();


        // STOP IF ANY VALIDATION FAILS

        const allValid =
            nameValid &&
            emailValid &&
            passwordValid &&
            confirmValid;


        if (!allValid) {

            const firstInvalid = Object.keys(fields).find(
                key => fields[key].input.classList.contains("has-error")
            );

            if (firstInvalid) {
                fields[firstInvalid].input.focus();
            }

            return;

        }


        // VALID SIGNUP FORM

        Object.keys(fields).forEach(clearError);


        // REMEMBER SELECTED ROLE IF NEEDED IN NEXT FLOW
        // This is only a frontend demo; no credentials are stored.

        const destination = "login.html";


        // RESET FORM

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


        // RESET PASSWORD EYE ICONS

        document.querySelectorAll(
            ".stackly-signup-password-toggle"
        ).forEach(toggle => {

            const input = document.getElementById(toggle.dataset.target);

            input.type = "password";

            toggle.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

            toggle.setAttribute(
                "aria-pressed",
                "false"
            );

        });


        // GO TO LOGIN PAGE

        window.location.assign(destination);

    });


    /* ======================================
       RESET WHEN RETURNING TO SIGNUP PAGE
    ====================================== */

    window.addEventListener("pageshow", () => {

        form.reset();

        submittedOnce = false;

        selectedRole = "client";


        // CLEAR TIMERS

        errorTimers.forEach(timer => clearTimeout(timer));

        errorTimers.clear();


        // CLEAR ALL ERROR MESSAGES

        Object.keys(fields).forEach(clearError);


        // RESET PASSWORD VISIBILITY

        document.querySelectorAll(
            ".stackly-signup-password-toggle"
        ).forEach(toggle => {

            const input = document.getElementById(toggle.dataset.target);

            input.type = "password";

            toggle.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

            toggle.setAttribute(
                "aria-pressed",
                "false"
            );

        });


        // RESET ROLE

        roleButtons.forEach(button => {

            const isClient = button.dataset.role === "client";

            button.classList.toggle("active", isClient);

            button.setAttribute(
                "aria-pressed",
                String(isClient)
            );

        });

    });

});

/* ==========================================
   STACKLY SIGNUP - GSAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".stackly-signup-card");

    if (!card || typeof gsap === "undefined") return;


    const leftPanel = card.querySelector(
        ".stackly-signup-visual"
    );

    const rightPanel = card.querySelector(
        ".stackly-signup-form-panel"
    );


    // MAIN TIMELINE

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
            ".stackly-signup-brand, .stackly-signup-visual-content h1, .stackly-signup-visual-content > p, .stackly-signup-highlights > div, .stackly-signup-stats > div"
        ),
        {
            opacity: 0,
            y: 23
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1
        },
        "-=0.6"
    );


    // 04. FORM HEADING

    timeline.fromTo(
        card.querySelector(".stackly-signup-heading"),
        {
            opacity: 0,
            y: 22
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.65
        },
        "-=0.55"
    );


    // 05. ROLE BUTTONS

    timeline.fromTo(
        card.querySelectorAll(".stackly-signup-role-btn"),
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1
        },
        "-=0.3"
    );


    // 06. FORM FIELDS

    timeline.fromTo(
        card.querySelectorAll(".stackly-signup-field"),
        {
            opacity: 0,
            y: 18
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.09
        },
        "-=0.25"
    );


    // 07. BUTTON AND SOCIAL ICONS

    timeline.fromTo(
        card.querySelectorAll(
            ".stackly-signup-submit, .stackly-signup-divider, .stackly-signup-social a, .stackly-signup-login-link"
        ),
        {
            opacity: 0,
            y: 16
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07
        },
        "-=0.2"
    );

});
