document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    MOBILE NAVIGATION
    ==========================================
    */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    menuToggle?.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

    });


    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

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

    const cursorGlow = document.querySelector(".cursor-glow");

    window.addEventListener("mousemove", event => {

        if (!cursorGlow) return;

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });


    /*
    ==========================================
    SCROLL REVEAL ANIMATIONS
    ==========================================
    */

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    document
        .querySelectorAll(".reveal")
        .forEach(element => {

            revealObserver.observe(element);

        });


    /*
    ==========================================
    CONTACT FORM
    ==========================================

    This version does NOT use EmailJS.

    When the visitor submits the form, their
    default email application opens with the
    recipient, subject and message already
    populated.
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

                event.preventDefault();


                /*
                Get form values
                */

                const name =
                    contactForm
                        .querySelector('[name="name"]')
                        .value
                        .trim();

                const email =
                    contactForm
                        .querySelector('[name="email"]')
                        .value
                        .trim();

                const message =
                    contactForm
                        .querySelector('[name="message"]')
                        .value
                        .trim();


                /*
                Validate fields
                */

                if (!name || !email || !message) {

                    alert(
                        "Please complete all fields before sending your message."
                    );

                    return;

                }


                /*
                Your receiving email address
                */

                const recipient =
                    "kmakhalemele174@gmail.com";


                /*
                Create email subject
                */

                const subject =
                    encodeURIComponent(
                        `Portfolio Contact - Message from ${name}`
                    );


                /*
                Create email body
                */

                const body =
                    encodeURIComponent(
`Hello Kamohelo,

My name is ${name}.

Email: ${email}

Message:
${message}

Kind regards,
${name}`
                    );


                /*
                Build mailto link
                */

                const mailtoLink =
                    `mailto:${recipient}?subject=${subject}&body=${body}`;


                /*
                Show confirmation
                */

                if (formPopup) {

                    formPopup.textContent =
                        "Your email app is opening...";

                    formPopup.style.display =
                        "block";

                    formPopup.style.opacity =
                        "1";

                }


                /*
                Confetti effect
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
                Open email application
                */

                window.location.href =
                    mailtoLink;


                /*
                Hide notification after a few seconds
                */

                if (formPopup) {

                    setTimeout(() => {

                        formPopup.style.transition =
                            "opacity 0.5s ease";

                        formPopup.style.opacity =
                            "0";


                        setTimeout(() => {

                            formPopup.style.display =
                                "none";

                        }, 500);

                    }, 3000);

                }

            }
        );

    }

});
