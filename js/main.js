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


    menuToggle?.addEventListener("click", () => {

        if (!nav) return;

        const isOpen =
            nav.classList.toggle("open");

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

            element.classList.add(
                "visible"
            );

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
                GET NAME + EMAIL
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


                const name =
                    nameInput?.value.trim() || "";

                const email =
                    emailInput?.value.trim() || "";


                /*
                ------------------------------------------
                REQUIRED FIELD VALIDATION
                ------------------------------------------
                */

                if (!name || !email) {

                    showFormPopup(
                        "Please enter your name and email.",
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
                SUBJECT
                ------------------------------------------
                */

                const subject =
                    `Portfolio Enquiry — ${name}`;


                /*
                ------------------------------------------
                EMAIL TEMPLATE
                ------------------------------------------

                This is the message that will already
                be prepared when Gmail opens.

                The visitor can edit it before sending.
                ------------------------------------------
                */

                const body =
`Hello Kamohelo,

I hope you're doing well.

My name is ${name}, and I’m reaching out through your portfolio website.

I’d love to connect with you and learn more about your work and services.

Please feel free to get back to me at this email address.

Kind regards,
${name}
${email}`;


                /*
                ------------------------------------------
                CREATE GMAIL COMPOSE URL
                ------------------------------------------

                Gmail opens directly in the browser.

                It does NOT automatically send the email.
                The visitor reviews it and clicks Send.
                ------------------------------------------
                */

                const gmailUrl =
                    `https://mail.google.com/mail/?view=cm&fs=1` +
                    `&to=${encodeURIComponent(recipient)}` +
                    `&su=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(body)}`;


                /*
                ------------------------------------------
                USER FEEDBACK
                ------------------------------------------
                */

                showFormPopup(
                    "Opening Gmail..."
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
                open Gmail in the current tab.
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

                Give Gmail a moment to open before
                clearing the website form.
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
