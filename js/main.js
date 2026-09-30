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

            element.classList.add("visible");

        });

    }


    /*
    ==========================================
    CONTACT FORM — GMAIL
    ==========================================

    No EmailJS.
    No Outlook.
    No mailto.

    The form opens Gmail directly in the
    browser with the message already prepared.
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

                const messageInput =
                    contactForm.querySelector(
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
                YOUR RECEIVING EMAIL
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
                    `Portfolio Contact - Message from ${name}`;


                /*
                ------------------------------------------
                GMAIL MESSAGE BODY
                ------------------------------------------
                */

                const body =
`Hello Kamohelo,

My name is ${name}.

Email: ${email}

Message:
${message}

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
                    "Gmail is opening with your message ready to send."
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
        Support the existing CSS as well.
        */

        formPopup.style.display =
            "block";

        formPopup.style.opacity =
            "1";


        clearTimeout(
            formPopup.hideTimer
        );


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
