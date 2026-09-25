/* =========================================================
   DENTOVA — PREMIUM INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("hide");
            }
        }, 900);
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbarHeight = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(3, 16, 21, 0.82)";

            navbar.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.18)";

        } else {

            navbar.style.background =
                "rgba(3, 16, 21, 0.48)";

            navbar.style.boxShadow = "none";
        }

    });


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.counter);

                    let current = 0;

                    const duration = 1600;

                    const startTime = performance.now();

                    function updateCounter(currentTime) {

                        const progress =
                            Math.min(
                                (currentTime - startTime) /
                                duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                target * eased
                            );

                        counter.textContent = current;

                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;
                        }
                    }

                    requestAnimationFrame(
                        updateCounter
                    );

                    observer.unobserve(counter);
                });

            },
            {
                threshold: 0.6
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       HERO 3D MOUSE PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroTooth =
        document.querySelector(".hero-tooth");

    if (
        heroVisual &&
        heroTooth &&
        window.innerWidth > 800
    ) {

        heroVisual.addEventListener(
            "mousemove",
            e => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 10;

                const rotateX =
                    ((centerY - y) /
                        centerY) * 8;

                heroTooth.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY - 10}deg)
                     translateY(-5px)`;
            }
        );

        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroTooth.style.transform =
                    "perspective(900px) rotateX(8deg) rotateY(-12deg)";
            }
        );
    }


    /* =====================================================
       ANATOMY 3D INTERACTION
    ===================================================== */

    const anatomyVisual =
        document.querySelector(".anatomy-visual");

    const anatomyTooth =
        document.querySelector(".anatomy-tooth");

    if (
        anatomyVisual &&
        anatomyTooth &&
        window.innerWidth > 800
    ) {

        anatomyVisual.addEventListener(
            "mousemove",
            e => {

                const rect =
                    anatomyVisual.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                        rect.width) * 25;

                const rotateX =
                    ((rect.height / 2 - y) /
                        rect.height) * 15;

                anatomyTooth.style.animation =
                    "none";

                anatomyTooth.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
            }
        );

        anatomyVisual.addEventListener(
            "mouseleave",
            () => {

                anatomyTooth.style.animation =
                    "anatomyRotate 15s linear infinite";

                anatomyTooth.style.transform = "";
            }
        );
    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".primary-btn, .outline-btn, .nav-cta"
        );

    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            e => {

                if (window.innerWidth <= 800)
                    return;

                const rect =
                    button.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.15}px,
                               ${y * 0.15}px)`;
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";
            }
        );

    });


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");

    if (
        cursorDot &&
        cursorRing &&
        window.innerWidth > 800
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener(
            "mousemove",
            e => {

                mouseX = e.clientX;
                mouseY = e.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;
            }
        );

        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.14;

            ringY +=
                (mouseY - ringY) * 0.14;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );
        }

        animateCursor();


        document
            .querySelectorAll("a, button")
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorRing.style.width =
                            "45px";

                        cursorRing.style.height =
                            "45px";
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorRing.style.width =
                            "30px";

                        cursorRing.style.height =
                            "30px";
                    }
                );

            });

    }


    /* =====================================================
       TREATMENT HOVER
    ===================================================== */

    const treatmentItems =
        document.querySelectorAll(
            ".treatment-item"
        );

    treatmentItems.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                treatmentItems.forEach(other => {

                    if (other !== item) {
                        other.style.opacity =
                            "0.42";
                    }

                });
            }
        );

        item.addEventListener(
            "mouseleave",
            () => {

                treatmentItems.forEach(other => {

                    other.style.opacity =
                        "1";
                });
            }
        );

    });


    /* =====================================================
       CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".technology-card, .mini-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                if (window.innerWidth <= 800)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                        rect.width) * 5;

                const rotateX =
                    ((rect.height / 2 - y) /
                        rect.height) * 5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );

    });


    /* =====================================================
       APPOINTMENT FORM
    ===================================================== */

    const appointmentForm =
        document.querySelector(
            ".appointment-form"
        );

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const submitButton =
                    appointmentForm.querySelector(
                        ".form-submit"
                    );

                if (!submitButton) return;

                const originalText =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    "✓ Request Received";

                submitButton.style.background =
                    "linear-gradient(100deg,#72efc5,#62dcff)";

                submitButton.disabled = true;

                setTimeout(() => {

                    appointmentForm.reset();

                    submitButton.innerHTML =
                        originalText;

                    submitButton.disabled =
                        false;

                }, 3000);

            }
        );
    }


    /* =====================================================
       PARALLAX BACKGROUND
    ===================================================== */

    const heroGrid =
        document.querySelector(".hero-grid");

    window.addEventListener(
        "scroll",
        () => {

            if (!heroGrid) return;

            const scrollY =
                window.scrollY;

            heroGrid.style.transform =
                `translateY(${scrollY * 0.12}px)`;
        },
        {
            passive: true
        }
    );


    /* =====================================================
       MARQUEE PAUSE
    ===================================================== */

    const marquee =
        document.querySelector(".marquee-track");

    if (marquee) {

        marquee.addEventListener(
            "mouseenter",
            () => {
                marquee.style.animationPlayState =
                    "paused";
            }
        );

        marquee.addEventListener(
            "mouseleave",
            () => {
                marquee.style.animationPlayState =
                    "running";
            }
        );
    }


    /* =====================================================
       DATE MINIMUM FOR APPOINTMENT
    ===================================================== */

    const dateInput =
        document.querySelector(
            'input[type="date"]'
        );

    if (dateInput) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;
    }


    /* =====================================================
       REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reduceMotion.matches) {

        document
            .querySelectorAll("*")
            .forEach(element => {

                element.style.animationDuration =
                    "0.01ms";

                element.style.animationIterationCount =
                    "1";

                element.style.scrollBehavior =
                    "auto";
            });
    }


    /* =====================================================
       CONSOLE BRAND
    ===================================================== */

    console.log(
        "%c DENTOVA ",
        "background:#62dcff;color:#031015;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c Premium Dental Experience Loaded",
        "color:#72efc5;font-size:12px;"
    );

});
