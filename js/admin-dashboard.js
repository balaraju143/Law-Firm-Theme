
/* ==========================================
   STACKLY LAW FIRM - ADMIN DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ======================================
       01. SELECT ELEMENTS
    ====================================== */

    const sidebar = document.getElementById("adSidebar");

    const menuToggle = document.getElementById("adMenuToggle");

    const overlay = document.getElementById("adSidebarOverlay");

    const headerTitle = document.getElementById("adHeaderTitle");

    const headerSubtitle = document.getElementById("adHeaderSubtitle");

    const navLinks = document.querySelectorAll(".ad-nav-link");

    const views = document.querySelectorAll(".ad-view");


    if (!sidebar || !menuToggle || !headerTitle || !headerSubtitle) {
        return;
    }


    /* ======================================
       02. DYNAMIC ADMIN EMAIL AND PROFILE
    ====================================== */

    const storedEmail = sessionStorage.getItem("stacklyUserEmail");

    const userEmail = storedEmail && storedEmail.trim()
        ? storedEmail.trim().toLowerCase()
        : "admin@example.com";


    // GET NAME FROM EMAIL USERNAME

    const emailUsername = userEmail.split("@")[0] || "admin";

    const adminName = emailUsername
        .replace(/[._-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b[a-z]/g, letter => letter.toUpperCase());


    // FIRST LETTER OF EMAIL

    const adminInitial = userEmail.charAt(0).toUpperCase() || "A";


    // UPDATE EMAIL EVERYWHERE

    document.querySelectorAll("[data-admin-email]").forEach(element => {

        element.textContent = userEmail;

        element.setAttribute("title", userEmail);

    });


    // UPDATE ADMIN NAME

    document.querySelectorAll("[data-admin-name]").forEach(element => {

        element.textContent = adminName;

    });


    // UPDATE ALL PROFILE INITIALS

    document.querySelectorAll("[data-admin-initial]").forEach(element => {

        element.textContent = adminInitial;

    });



    /* ======================================
       03. MOBILE SIDEBAR
    ====================================== */

    function openSidebar() {

        sidebar.classList.add("mobile-open");

        overlay.classList.add("active");

        document.body.classList.add("ad-menu-open");

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

        overlay.classList.remove("active");

        document.body.classList.remove("ad-menu-open");

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


    // CLICK OUTSIDE SIDEBAR

    overlay.addEventListener("click", closeSidebar);


    // ESCAPE KEY

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });



    /* ======================================
       04. GSAP PAGE ANIMATION
    ====================================== */

    function animateAdminView(activeView) {

        const elements = activeView.querySelectorAll("[data-reveal]");

        if (!elements.length) return;


        // FALLBACK IF GSAP NOT LOADED

        if (typeof gsap === "undefined") {

            elements.forEach(element => {

                element.style.opacity = "1";

                element.style.transform = "none";

            });

            return;

        }


        gsap.killTweensOf(elements);

        gsap.fromTo(
            elements,
            {
                opacity: 0,
                y: 24
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


        // ANIMATE CHART BARS WHEN OVERVIEW OR REPORTS OPENS

        const bars = activeView.querySelectorAll(
            ".ad-chart-column .ad-bar, .ad-revenue-bars span"
        );

        if (bars.length) {

            gsap.fromTo(
                bars,
                {
                    scaleY: 0,
                    transformOrigin: "bottom"
                },
                {
                    scaleY: 1,
                    duration: 0.85,
                    stagger: 0.08,
                    ease: "power3.out"
                }
            );

        }

    }



    /* ======================================
       05. HASH BASED ADMIN NAVIGATION
    ====================================== */

    function activateAdminPage(pageId) {

        let activeView = document.getElementById(pageId);


        // INVALID PAGE - RETURN TO OVERVIEW

        if (!activeView || !activeView.classList.contains("ad-view")) {

            pageId = "overview";

            activeView = document.getElementById("overview");

            history.replaceState(null, "", "#overview");

        }


        if (!activeView) return;


        // HIDE ALL OTHER VIEWS

        views.forEach(view => {

            view.classList.remove("active");

            view.setAttribute("aria-hidden", "true");

        });


        // SHOW SELECTED VIEW

        activeView.classList.add("active");

        activeView.setAttribute("aria-hidden", "false");


        // UPDATE SIDEBAR

        navLinks.forEach(link => {

            const isActive = link.dataset.page === pageId;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });


        // UPDATE HEADER TITLE

        headerTitle.textContent =
            activeView.dataset.title || "Admin Dashboard";


        headerSubtitle.textContent =
            activeView.dataset.subtitle || "";


        // CLOSE MOBILE MENU

        closeSidebar();


        // RETURN TO TOP

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        // PAGE CONTENT ANIMATION

        animateAdminView(activeView);

    }



    /* ======================================
       06. HANDLE SIDEBAR AND INTERNAL LINKS
    ====================================== */

    document.addEventListener("click", event => {

        const link = event.target.closest('a[href^="#"]');

        if (!link) return;


        const hash = link.getAttribute("href");

        if (!hash || hash === "#") return;


        const pageId = hash.substring(1);

        const destination = document.getElementById(pageId);


        // ALLOW NORMAL BEHAVIOR FOR NON-VIEW LINKS

        if (!destination || !destination.classList.contains("ad-view")) {
            return;
        }


        event.preventDefault();


        // UPDATE BROWSER HASH

        if (window.location.hash !== hash) {

            history.pushState(
                { page: pageId },
                "",
                hash
            );

        }


        activateAdminPage(pageId);

    });



    /* ======================================
       07. BROWSER BACK AND FORWARD
    ====================================== */

    function handleBrowserNavigation() {

        const pageId =
            window.location.hash.substring(1) || "overview";

        activateAdminPage(pageId);

    }


    window.addEventListener("popstate", handleBrowserNavigation);

    window.addEventListener("hashchange", handleBrowserNavigation);



    /* ======================================
       08. INITIAL PAGE LOAD
    ====================================== */

    const initialPage =
        window.location.hash.substring(1) || "overview";

    activateAdminPage(initialPage);



    /* ======================================
       09. CLOSE SIDEBAR ON DESKTOP RESIZE
    ====================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {

            closeSidebar();

        }

    });


});
