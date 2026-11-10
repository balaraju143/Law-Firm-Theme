
/* ==========================================
   STACKLY LAW FIRM - CLIENT DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENTS
    ====================================== */

    const sidebar = document.getElementById("sdSidebar");

    const menuToggle = document.getElementById("sdMenuToggle");

    const sidebarOverlay = document.getElementById(
        "sdSidebarOverlay"
    );

    const headerTitle = document.getElementById("sdHeaderTitle");

    const headerSubtitle = document.getElementById(
        "sdHeaderSubtitle"
    );

    const navLinks = document.querySelectorAll(".sd-nav-link");

    const views = document.querySelectorAll(".sd-view");


    /* ======================================
       01. DYNAMIC USER EMAIL
    ====================================== */

    const storedEmail =
        sessionStorage.getItem("stacklyUserEmail") ||
        "client@example.com";

    const userEmail = storedEmail.trim().toLowerCase();

    const emailName = userEmail.split("@")[0] || "client";


    // Format email username for greeting

    const displayName = emailName
        .replace(/[._-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b[a-z]/g, letter => letter.toUpperCase());


    // First letter of email

    const firstLetter = userEmail.charAt(0).toUpperCase() || "C";


    // Update all email locations

    document.querySelectorAll("[data-user-email]").forEach(element => {

        element.textContent = userEmail;

        element.setAttribute("title", userEmail);

    });


    // Update user name locations

    document.querySelectorAll("[data-user-name]").forEach(element => {

        element.textContent = displayName;

    });


    // Update avatar initial

    document.querySelectorAll("[data-user-initial]").forEach(element => {

        element.textContent = firstLetter;

    });



    /* ======================================
       02. MOBILE SIDEBAR
    ====================================== */

    function openSidebar() {

        sidebar.classList.add("mobile-open");

        sidebarOverlay.classList.add("active");

        document.body.classList.add("sd-menu-open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.innerHTML =
            '<span class="material-symbols-outlined">close</span>';

    }


    function closeSidebar() {

        sidebar.classList.remove("mobile-open");

        sidebarOverlay.classList.remove("active");

        document.body.classList.remove("sd-menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML =
            '<span class="material-symbols-outlined">menu</span>';

    }


    menuToggle.addEventListener("click", () => {

        const isOpen = sidebar.classList.contains("mobile-open");

        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }

    });


    // CLOSE SIDEBAR WHEN OVERLAY IS CLICKED

    sidebarOverlay.addEventListener("click", closeSidebar);


    // CLOSE USING ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });



    /* ======================================
       03. HASH BASED PAGE NAVIGATION
    ====================================== */

    function activateDashboardPage(pageId) {

        const selectedView = document.getElementById(pageId);


        // INVALID DASHBOARD PAGE

        if (!selectedView || !selectedView.classList.contains("sd-view")) {

            if (window.location.hash) {
                history.replaceState(null, "", "#overview");
            }

            pageId = "overview";

        }


        const activeView = document.getElementById(pageId);

        if (!activeView) return;


        // HIDE ALL PAGES

        views.forEach(view => {

            view.classList.remove("active");

            view.setAttribute("aria-hidden", "true");

        });


        // SHOW SELECTED PAGE

        activeView.classList.add("active");

        activeView.setAttribute("aria-hidden", "false");


        // UPDATE SIDEBAR ACTIVE LINK

        navLinks.forEach(link => {

            const isActive = link.dataset.page === pageId;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });


        // UPDATE HEADER CONTENT

        headerTitle.textContent =
            activeView.dataset.title || "Client Dashboard";

        headerSubtitle.textContent =
            activeView.dataset.subtitle || "";


        // CLOSE MOBILE MENU

        closeSidebar();


        // SCROLL MAIN PAGE TO TOP

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        // ANIMATE CURRENT CONTENT

        animateDashboardContent(activeView);

    }


    /* ======================================
       04. HANDLE ALL INTERNAL HASH LINKS
    ====================================== */

    document.addEventListener("click", event => {

        const link = event.target.closest('a[href^="#"]');

        if (!link) return;

        const hash = link.getAttribute("href");

        if (!hash || hash === "#") return;

        const pageId = hash.slice(1);

        const destination = document.getElementById(pageId);

        // Allow normal behavior for hashes that aren't dashboard views.
        if (!destination || !destination.classList.contains("sd-view")) {
            return;
        }

        event.preventDefault();

        if (window.location.hash !== hash) {

            history.pushState(
                { page: pageId },
                "",
                hash
            );

        }

        activateDashboardPage(pageId);

    });


    // BROWSER BACK / FORWARD

    window.addEventListener("popstate", () => {

        const pageId =
            window.location.hash.replace("#", "") || "overview";

        activateDashboardPage(pageId);

    });


    // INITIAL PAGE

    const initialPage =
        window.location.hash.replace("#", "") || "overview";

    activateDashboardPage(initialPage);



    /* ======================================
       05. GSAP PAGE REVEAL
    ====================================== */

    function animateDashboardContent(activeView) {

        const revealElements = activeView.querySelectorAll(
            "[data-reveal]"
        );

        if (!revealElements.length) return;


        // FALLBACK WITHOUT GSAP

        if (typeof gsap === "undefined") {

            revealElements.forEach(element => {

                element.style.opacity = "1";

                element.style.transform = "none";

            });

            return;

        }


        gsap.killTweensOf(revealElements);

        gsap.fromTo(
            revealElements,
            {
                opacity: 0,
                y: 22
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.09,
                ease: "power3.out",
                clearProps: "transform"
            }
        );

    }


    /* ======================================
       06. CLOSE MOBILE MENU ON RESIZE
    ====================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {
            closeSidebar();
        }

    });


});
