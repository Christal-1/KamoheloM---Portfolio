document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    menuToggle?.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen.toString());
    });

    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });

    const cursorGlow = document.querySelector(".cursor-glow");

    window.addEventListener("mousemove", event => {
        if (!cursorGlow) return;
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });

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

    document.querySelectorAll(".reveal").forEach(element => {
        revealObserver.observe(element);
    });

    emailjs.init("YOUR_PUBLIC_KEY");

    const contactForm = document.getElementById("contactForm");
    const formPopup = document.getElementById("formPopup");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
                .then((response) => {
                    console.log("SUCCESS!", response.status, response.text);

                    formPopup.style.display = "block";
                    formPopup.style.opacity = 1;

                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });

                    setTimeout(() => {
                        formPopup.style.transition = "opacity 0.5s";
                        formPopup.style.opacity = 0;
                        setTimeout(() => {
                            formPopup.style.display = "none";
                        }, 500);
                    }, 4000);

                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("FAILED...", error);
                    alert("Oops! Something went wrong. Please try again.");
                });
        });
    }

});
