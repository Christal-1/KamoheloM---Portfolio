document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    MOBILE NAVIGATION
    ==========================================
    */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    menuToggle?.addEventListener("click", () => {

        if (!nav) return;

        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

    });


    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav?.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /*
    ==========================================
    CURSOR GLOW
    ==========================================
    */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    window.addEventListener("mousemove", event => {

        if (!cursorGlow) return;

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });


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
        Fallback for older browsers
        */

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /*
    ==========================================
    CONTACT FORM — GMAIL
    ==========================================
    */

    const contactForm =
        document.getElementById("contactForm");

    const formPopup =
        document.getElementById("formPopup");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                /*
                ------------------------------------------
                PREVENT NORMAL FORM SUBMISSION
                ------------------------------------------
                */

                event.preventDefault();


                /*
                ------------------------------------------
                GET FORM VALUES
                ------------------------------------------
                */

                const nameInput =
                    this.querySelector(
                        '[name="name"]'
                    );

                const emailInput =
                    this.querySelector(
                        '[name="email"]'
                    );

                const messageInput =
                    this.querySelector(
                        '[name="message"]'
                    );


                const name =
                    nameInput?.value.trim() || "";

                const email =
                    emailInput?.value.trim() || "";

                const message =
                    messageInput?.value.trim() || "";


                /*
                ------------------------------------------
                VALIDATION
                ------------------------------------------
                */

                if (!name || !email || !message) {

                    showFormPopup(
                        "Please complete all fields.",
                        true
                    );

                    return;

                }


                /*
                ------------------------------------------
                EMAIL VALIDATION
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
                PROFESSIONAL EMAIL SUBJECT
                ------------------------------------------
                */

                const subject =
                    `New Portfolio Enquiry — ${name}`;


                /*
                ------------------------------------------
                PROFESSIONAL EMAIL BODY
                ------------------------------------------
                */

                const body =
`Hello Kamohelo,

You have received a new message through your portfolio website.

CONTACT DETAILS
----------------
Name: ${name}
Email: ${email}

MESSAGE
----------------
${message}

Kind regards,
${name}

Sent via Kamohelo M.'s Portfolio Website`;


                /*
                ------------------------------------------
                GMAIL COMPOSE URL
                ------------------------------------------

                Opens Gmail directly in the browser
                instead of opening Outlook or another
                desktop email application.
                ------------------------------------------
                */

                const gmailUrl =
                    `https://mail.google.com/mail/?view=cm&fs=1` +
                    `&to=${encodeURIComponent(recipient)}` +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(body)}`;


                /*
                ------------------------------------------
                SHOW USER FEEDBACK
                ------------------------------------------
                */

                showFormPopup(
                    "Opening Gmail…"
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

                Gmail opens in a new browser tab with
                the recipient, subject and message already
                populated.
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
                open Gmail in the current tab instead.
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

                The form is cleared after Gmail opens.
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


        /*
        ------------------------------------------
        SET MESSAGE
        ------------------------------------------
        */

        formPopup.textContent =
            message;


        /*
        ------------------------------------------
        ERROR STATE
        ------------------------------------------
        */

        formPopup.classList.toggle(
            "error",
            isError
        );


        /*
        ------------------------------------------
        SHOW POPUP
        ------------------------------------------
        */

        formPopup.classList.add(
            "show"
        );


        /*
        Support existing CSS
        ------------------------------------------
        */

        formPopup.style.display =
            "block";

        formPopup.style.opacity =
            "1";


        /*
        ------------------------------------------
        CLEAR PREVIOUS TIMER
        ------------------------------------------
        */

        clearTimeout(
            formPopup.hideTimer
        );


        /*
        ------------------------------------------
        HIDE AFTER 4 SECONDS
        ------------------------------------------
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
