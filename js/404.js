
/* ==========================================
   STACKLY - 404 PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const backButton = document.getElementById("stacklyGoBack");

    if (!backButton) return;


    backButton.addEventListener("click", () => {

        if (window.history.length > 1) {

            window.history.back();

        } else {

            window.location.href = "index.html";

        }

    });


    // GSAP REVEAL

    if (typeof gsap !== "undefined") {

        const timeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


        timeline.from(".stackly-404-card", {
            opacity: 0,
            y: 30,
            scale: 0.97,
            duration: 0.85
        });


        timeline.from(
            [
                ".stackly-404-logo",
                ".stackly-404-graphic",
                ".stackly-404-label",
                ".stackly-404-card h1",
                ".stackly-404-description",
                ".stackly-404-actions",
                ".stackly-404-code"
            ],
            {
                opacity: 0,
                y: 20,
                duration: 0.65,
                stagger: 0.09
            },
            "-=0.5"
        );

    }

});
