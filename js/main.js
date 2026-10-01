document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    MOBILE NAVIGATION
    ==========================================
    */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    /*
    ------------------------------------------
    OPEN / CLOSE MOBILE MENU
    ------------------------------------------
    */

    menuToggle?.addEventListener("click", () => {

        if (!nav) return;

        const isOpen =
            nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        /*
        Prevent background scrolling while
        the mobile menu is open.
        */

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /*
    ------------------------------------------
    CLOSE MENU WHEN NAV LINK IS CLICKED
    ------------------------------------------
    */

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav?.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });


    /*
    ------------------------------------------
    CLOSE MENU WHEN CLICKING OUTSIDE
    ------------------------------------------
    */

    document.addEventListener("click", event => {

        if (!nav || !menuToggle) return;

        const clickedInsideNav =
            nav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            nav.classList.contains("open") &&
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            nav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });


    /*
    ------------------------------------------
    CLOSE MENU WITH ESCAPE
    ------------------------------------------
    */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!nav?.classList.contains("open")) {
            return;
        }

        nav.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

        menuToggle?.focus();

    });


    /*
    ==========================================
    CURSOR GLOW
    ==========================================
    */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    /*
    Only run cursor effect on devices
    that actually have a mouse pointer.
    This prevents unnecessary processing
    on phones and tablets.
    */

    const hasFinePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (cursorGlow && hasFinePointer) {

        window.addEventListener("mousemove", event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        });

    }


    /*
    ==========================================
    SCROLL REVEAL ANIMATIONS
    ==========================================
    */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
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
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /*
        ------------------------------------------
        FALLBACK FOR OLDER BROWSERS
        ------------------------------------------
        */

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /*
    ==========================================
    CONTACT FORM — GMAIL
    ==========================================

    The form collects:
    - Name
    - Email

    Visitors can enter an email address from
    any provider, including:

    - Gmail
    - Outlook
    - iCloud
    - Yahoo
    - Company email

    The submitted enquiry is prepared inside
    Gmail and the visitor can review it before
    manually clicking Send.

    No EmailJS.
    No mailto.
    ==========================================
    */

    const contactForm =
        document.getElementById("contactForm");

    const formPopup =
        document.getElementById("formPopup");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /*
                ------------------------------------------
                GET FORM VALUES
                ------------------------------------------
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
                ------------------------------------------
                VALIDATION
                ------------------------------------------
                */

                if (!name || !email) {

                    showFormPopup(
                        "Please enter your name and email address.",
                        true
                    );


                    if (!name) {

                        nameInput?.focus();

                    } else {

                        emailInput?.focus();

                    }

                    return;

                }


                /*
                ------------------------------------------
                BASIC EMAIL VALIDATION
                ------------------------------------------
                */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showFormPopup(
                        "Please enter a valid email address.",
                        true
                    );

                    emailInput?.focus();

                    return;

                }


                /*
                ------------------------------------------
                RECEIVING EMAIL
                ------------------------------------------
                */

                const recipient =
                    "kmakhalemele174@gmail.com";


                /*
                ------------------------------------------
                GMAIL SUBJECT
                ------------------------------------------
                */

                const subject =
                    `Portfolio Enquiry — ${name}`;


                /*
                ------------------------------------------
                PROFESSIONAL EMAIL BODY
                ------------------------------------------
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
                ------------------------------------------
                CREATE GMAIL COMPOSE URL
                ------------------------------------------
                */

                const gmailUrl =
                    `https://mail.google.com/mail/?view=cm&fs=1` +
                    `&to=${encodeURIComponent(recipient)}` +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(body)}`;


                /*
                ------------------------------------------
                SHOW SUCCESS MESSAGE
                ------------------------------------------
                */

                showFormPopup(
                    "Gmail is opening with your enquiry ready to send."
                );


                /*
                ------------------------------------------
                CONFETTI
                ------------------------------------------
                */

                if (typeof confetti === "function") {

                    confetti({
                        particleCount: 80,
                        spread: 60,
                        origin: {
                            y: 0.7
                        }
                    });

                }


                /*
                ------------------------------------------
                OPEN GMAIL
                ------------------------------------------
                */

                const gmailWindow =
                    window.open(
                        gmailUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );


                /*
                ------------------------------------------
                FALLBACK
                ------------------------------------------

                If the browser blocks the new tab,
                navigate the current page to Gmail.
                ------------------------------------------
                */

                if (!gmailWindow) {

                    window.location.href =
                        gmailUrl;

                    return;

                }


                /*
                ------------------------------------------
                RESET FORM
                ------------------------------------------
                */

                setTimeout(() => {

                    contactForm.reset();

                }, 1000);

            }
        );

    }


    /*
    ==========================================
    FORM POPUP
    ==========================================
    */

    function showFormPopup(
        message,
        isError = false
    ) {

        if (!formPopup) return;


        formPopup.textContent =
            message;


        formPopup.classList.toggle(
            "error",
            isError
        );


        formPopup.classList.add(
            "show"
        );


        /*
        Support the existing CSS.
        */

        formPopup.style.display =
            "block";

        formPopup.style.opacity =
            "1";


        /*
        Clear an existing hide timer.
        */

        clearTimeout(
            formPopup.hideTimer
        );


        /*
        Hide the notification after 4 seconds.
        */

        formPopup.hideTimer =
            setTimeout(() => {

                formPopup.classList.remove(
                    "show"
                );

                formPopup.style.opacity =
                    "0";


                setTimeout(() => {

                    formPopup.style.display =
                        "none";

                }, 300);

            }, 4000);

    }

});


/*
==========================================
PROGRESSIVE WEB APP
==========================================

Registers the service worker that allows
the portfolio to behave like an app when
installed on a phone.

This does NOT change the website design.

==========================================
*/

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(registration => {

                console.log(
                    "Kamohelo Portfolio app is ready.",
                    registration.scope
                );


                /*
                Check for a newer version of
                the service worker.
                */

                registration.update();

            })
            .catch(error => {

                console.error(
                    "Portfolio app service worker registration failed:",
                    error
                );

            });

    });

}
