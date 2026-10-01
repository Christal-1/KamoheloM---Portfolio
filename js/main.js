document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================================
    KAMOHELO MAKHALEMELE PORTFOLIO
    MAIN JAVASCRIPT
    ==========================================================
    */


    /*
    ==========================================================
    MOBILE NAVIGATION
    ==========================================================
    */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    function closeMobileMenu() {

        if (!nav) return;

        nav.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    function openMobileMenu() {

        if (!nav) return;

        nav.classList.add("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle?.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    /*
    ----------------------------------------------------------
    OPEN / CLOSE MENU
    ----------------------------------------------------------
    */

    menuToggle?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                nav?.classList.contains("open");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /*
    ----------------------------------------------------------
    CLOSE WHEN NAVIGATION LINK IS CLICKED
    ----------------------------------------------------------
    */

    document
        .querySelectorAll(".nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });


    /*
    ----------------------------------------------------------
    CLOSE WHEN CLICKING OUTSIDE
    ----------------------------------------------------------
    */

    document.addEventListener(
        "click",
        event => {

            if (!nav || !menuToggle) {
                return;
            }


            if (!nav.classList.contains("open")) {
                return;
            }


            const clickedInsideNav =
                nav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /*
    ----------------------------------------------------------
    CLOSE WITH ESCAPE
    ----------------------------------------------------------
    */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (!nav?.classList.contains("open")) {
                return;
            }


            closeMobileMenu();

            menuToggle?.focus();

        }
    );


    /*
    ----------------------------------------------------------
    CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
    ----------------------------------------------------------
    */

    const desktopMediaQuery =
        window.matchMedia("(min-width: 861px)");


    function handleDesktopResize() {

        if (desktopMediaQuery.matches) {

            closeMobileMenu();

        }

    }


    desktopMediaQuery.addEventListener?.(
        "change",
        handleDesktopResize
    );


    /*
    ==========================================================
    CURSOR GLOW
    ==========================================================
    */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    const hasFinePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (
        cursorGlow &&
        hasFinePointer
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            },
            {
                passive: true
            }
        );


        function animateCursorGlow() {

            glowX +=
                (mouseX - glowX) * 0.12;

            glowY +=
                (mouseY - glowY) * 0.12;


            cursorGlow.style.transform =
                `translate3d(${glowX}px, ${glowY}px, 0)`;


            requestAnimationFrame(
                animateCursorGlow
            );

        }


        animateCursorGlow();

    }


    /*
    ==========================================================
    SCROLL REVEAL ANIMATIONS
    ==========================================================
    */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /*
    ==========================================================
    SMOOTH ANCHOR SCROLLING
    ==========================================================
    */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        20;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });


                    /*
                    Update URL without jumping.
                    */

                    history.pushState(
                        null,
                        "",
                        targetId
                    );

                }
            );

        });


    /*
    ==========================================================
    HEADER SCROLL STATE
    ==========================================================
    */

    const header =
        document.querySelector(
            ".site-header"
        );


    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /*
    ==========================================================
    CONTACT FORM
    ==========================================================
    */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formPopup =
        document.getElementById(
            "formPopup"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /*
                ------------------------------------------------
                GET FORM VALUES
                ------------------------------------------------
                */

                const nameInput =
                    contactForm.querySelector(
                        '[name="name"]'
                    );


                const emailInput =
                    contactForm.querySelector(
                        '[name="email"]'
                    );


                const name =
                    nameInput?.value.trim() || "";


                const email =
                    emailInput?.value.trim() || "";


                /*
                ------------------------------------------------
                VALIDATION
                ------------------------------------------------
                */

                if (!name) {

                    showFormPopup(
                        "Please enter your name.",
                        true
                    );


                    nameInput?.focus();

                    return;

                }


                if (!email) {

                    showFormPopup(
                        "Please enter your email address.",
                        true
                    );


                    emailInput?.focus();

                    return;

                }


                /*
                ------------------------------------------------
                EMAIL VALIDATION
                ------------------------------------------------
                */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    showFormPopup(
                        "Please enter a valid email address.",
                        true
                    );


                    emailInput?.focus();

                    return;

                }


                /*
                ------------------------------------------------
                RECEIVING EMAIL
                ------------------------------------------------
                */

                const recipient =
                    "kmakhalemele174@gmail.com";


                /*
                ------------------------------------------------
                SUBJECT
                ------------------------------------------------
                */

                const subject =
                    `Portfolio Enquiry — ${name}`;


                /*
                ------------------------------------------------
                EMAIL BODY
                ------------------------------------------------
                */

                const body =
`Hi Kamohelo,

I hope you're doing well.

My name is ${name}, and I came across your portfolio. I'd like to connect with you and learn more about your work and opportunities to collaborate.

My email address is:
${email}

I look forward to hearing from you.

Kind regards,
${name}`;


                /*
                ------------------------------------------------
                GMAIL COMPOSE URL
                ------------------------------------------------
                */

                const gmailUrl =
                    "https://mail.google.com/mail/?view=cm&fs=1" +
                    `&to=${encodeURIComponent(recipient)}` +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(body)}`;


                /*
                ------------------------------------------------
                SUCCESS MESSAGE
                ------------------------------------------------
                */

                showFormPopup(
                    "Gmail is opening with your enquiry ready to send."
                );


                /*
                ------------------------------------------------
                CONFETTI
                ------------------------------------------------
                */

                if (
                    typeof confetti === "function"
                ) {

                    confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: {
                            y: 0.7
                        }
                    });

                }


                /*
                ------------------------------------------------
                OPEN GMAIL
                ------------------------------------------------
                */

                const gmailWindow =
                    window.open(
                        gmailUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );


                /*
                ------------------------------------------------
                FALLBACK
                ------------------------------------------------
                */

                if (!gmailWindow) {

                    window.location.href =
                        gmailUrl;

                    return;

                }


                /*
                ------------------------------------------------
                RESET FORM
                ------------------------------------------------
                */

                setTimeout(
                    () => {

                        contactForm.reset();

                    },
                    1000
                );

            }
        );

    }


    /*
    ==========================================================
    FORM POPUP
    ==========================================================
    */

    function showFormPopup(
        message,
        isError = false
    ) {

        if (!formPopup) {
            return;
        }


        formPopup.textContent =
            message;


        formPopup.classList.toggle(
            "error",
            isError
        );


        formPopup.classList.add(
            "show"
        );


        formPopup.style.display =
            "block";


        formPopup.style.opacity =
            "1";


        /*
        Clear previous timer.
        */

        clearTimeout(
            formPopup.hideTimer
        );


        /*
        Hide after four seconds.
        */

        formPopup.hideTimer =
            setTimeout(
                () => {

                    formPopup.classList.remove(
                        "show"
                    );


                    formPopup.style.opacity =
                        "0";


                    setTimeout(
                        () => {

                            formPopup.style.display =
                                "none";

                        },
                        300
                    );

                },
                4000
            );

    }


    /*
    ==========================================================
    REDUCE MOTION SUPPORT
    ==========================================================
    */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /*
    ==========================================================
    KEYBOARD ACCESSIBILITY
    ==========================================================
    */

    document.addEventListener(
        "keydown",
        event => {

            /*
            Close menu if user presses Tab
            while focus moves outside it.
            */

            if (
                event.key === "Tab" &&
                nav?.classList.contains("open")
            ) {

                const focusableElements =
                    nav.querySelectorAll(
                        "a, button, input, [tabindex]:not([tabindex='-1'])"
                    );


                if (!focusableElements.length) {
                    return;
                }

            }

        }
    );


    /*
    ==========================================================
    PROGRESSIVE WEB APP
    ==========================================================
    */

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "./service-worker.js"
                    )
                    .then(
                        registration => {

                            console.log(
                                "Kamohelo Portfolio app is ready.",
                                registration.scope
                            );


                            /*
                            Check for updates.
                            */

                            registration.update();

                        }
                    )
                    .catch(
                        error => {

                            console.error(
                                "Portfolio app service worker registration failed:",
                                error
                            );

                        }
                    );

            }
        );

    }


    /*
    ==========================================================
    PAGE READY
    ==========================================================
    */

    document.body.classList.add(
        "page-ready"
    );

});
