/* =========================================================
   DENTOVA — ADVANCED INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) loader.classList.add("hide");
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
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });
        });
    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot && cursorRing && window.innerWidth > 650) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {

            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (e) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.style.background =
                "rgba(3, 13, 19, 0.82)";

            navbar.style.borderBottomColor =
                "rgba(88, 217, 255, 0.10)";

        } else {

            navbar.style.background =
                "rgba(3, 13, 19, 0.45)";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,0.05)";
        }

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.transition =
                                "opacity 0.9s ease, transform 0.9s cubic-bezier(.2,.7,.2,1)";

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

    } else {

        revealElements.forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        });

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    const animateCounter = (element) => {

        const target =
            parseInt(element.dataset.counter, 10);

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(time) {

            const progress =
                Math.min((time - startTime) / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(target * eased);

            element.textContent =
                current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent =
                    target.toLocaleString();
            }

        }

        requestAnimationFrame(updateCounter);
    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.7
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {
            animateCounter(counter);
        });

    }


    /* =====================================================
       TREATMENT HOVER EFFECT
    ===================================================== */

    const treatmentItems =
        document.querySelectorAll(".treatment-item");

    treatmentItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.paddingLeft = "18px";

        });

        item.addEventListener("mouseleave", () => {

            item.style.paddingLeft = "0";

        });

    });


    /* =====================================================
       3D CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".technology-card, .mini-card, .doctor-card, .appointment-form"
        );

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            if (window.innerWidth < 800) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".primary-btn, .outline-btn, .form-submit"
        );

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", (e) => {

            if (window.innerWidth < 800) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0,0)";

        });

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        document.addEventListener("mousemove", (e) => {

            if (window.innerWidth < 800) return;

            const x =
                (e.clientX / window.innerWidth - 0.5);

            const y =
                (e.clientY / window.innerHeight - 0.5);

            heroVisual.style.transform =
                `translate3d(${x * 12}px, ${y * 12}px, 0)`;

        });

    }


    /* =====================================================
       ANATOMY INTERACTION
    ===================================================== */

    const anatomyVisual =
        document.querySelector(".anatomy-visual");

    const anatomyTooth =
        document.querySelector(".anatomy-tooth");

    if (anatomyVisual && anatomyTooth) {

        anatomyVisual.addEventListener("mousemove", (e) => {

            if (window.innerWidth < 800) return;

            const rect =
                anatomyVisual.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) / rect.width;

            const y =
                (e.clientY - rect.top) / rect.height;

            const rotateY =
                (x - 0.5) * 30;

            const rotateX =
                (y - 0.5) * -20;

            anatomyTooth.style.animation =
                "none";

            anatomyTooth.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        anatomyVisual.addEventListener("mouseleave", () => {

            anatomyTooth.style.animation =
                "anatomyRotate 15s linear infinite";

        });

    }


    /* =====================================================
       APPOINTMENT FORM
    ===================================================== */

    const appointmentForm =
        document.querySelector(".appointment-form");

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const submitButton =
                appointmentForm.querySelector(".form-submit");

            if (!submitButton) return;

            const originalHTML =
                submitButton.innerHTML;

            submitButton.innerHTML =
                "✓ REQUEST RECEIVED";

            submitButton.style.background =
                "linear-gradient(100deg,#73f4c5,#49cda5)";

            submitButton.style.color =
                "#001610";

            setTimeout(() => {

                submitButton.innerHTML =
                    originalHTML;

                submitButton.style.background =
                    "";

                submitButton.style.color =
                    "";

            }, 3000);

            appointmentForm.reset();

        });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.createElement("div");

    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "2px";
    progressBar.style.width = "0%";
    progressBar.style.background =
        "linear-gradient(90deg,#58d9ff,#73f4c5)";
    progressBar.style.zIndex = "10001";
    progressBar.style.pointerEvents = "none";

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width =
            `${percentage}%`;

    });


    /* =====================================================
       3D PARTICLE SYSTEM — THREE.JS
    ===================================================== */

    const canvas =
        document.querySelector("#three-canvas");

    if (canvas && typeof THREE !== "undefined") {

        const scene = new THREE.Scene();

        const camera =
            new THREE.PerspectiveCamera(
                60,
                window.innerWidth / window.innerHeight,
                0.1,
                100
            );

        camera.position.z = 8;

        const renderer =
            new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        /* ---------------------------------------------
           PARTICLES
        --------------------------------------------- */

        const particleCount = 650;

        const positions =
            new Float32Array(
                particleCount * 3
            );

        for (let i = 0; i < particleCount; i++) {

            const radius =
                5 + Math.random() * 8;

            const angle =
                Math.random() * Math.PI * 2;

            const height =
                (Math.random() - 0.5) * 8;

            positions[i * 3] =
                Math.cos(angle) * radius;

            positions[i * 3 + 1] =
                height;

            positions[i * 3 + 2] =
                Math.sin(angle) * radius;

        }

        const particleGeometry =
            new THREE.BufferGeometry();

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({
                color: 0x58d9ff,
                size: 0.025,
                transparent: true,
                opacity: 0.55,
                depthWrite: false
            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );

        scene.add(particles);


        /* ---------------------------------------------
           CENTRAL DNA / MEDICAL RING
        --------------------------------------------- */

        const ringGeometry =
            new THREE.TorusGeometry(
                2.2,
                0.006,
                16,
                120
            );

        const ringMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x58d9ff,
                transparent: true,
                opacity: 0.18
            });

        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );

        ring.rotation.x =
            Math.PI / 2;

        scene.add(ring);


        /* ---------------------------------------------
           SECOND RING
        --------------------------------------------- */

        const ringGeometry2 =
            new THREE.TorusGeometry(
                3.1,
                0.004,
                16,
                120
            );

        const ring2 =
            new THREE.Mesh(
                ringGeometry2,
                ringMaterial.clone()
            );

        ring2.rotation.x =
            Math.PI / 3;

        ring2.rotation.y =
            Math.PI / 5;

        scene.add(ring2);


        /* ---------------------------------------------
           MOUSE MOVEMENT
        --------------------------------------------- */

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    (event.clientX /
                        window.innerWidth) *
                        2 - 1;

                mouseY =
                    (event.clientY /
                        window.innerHeight) *
                        2 - 1;

            }
        );


        /* ---------------------------------------------
           ANIMATION LOOP
        --------------------------------------------- */

        const clock =
            new THREE.Clock();

        function animate() {

            requestAnimationFrame(animate);

            const elapsed =
                clock.getElapsedTime();

            particles.rotation.y =
                elapsed * 0.025;

            particles.rotation.x =
                Math.sin(elapsed * 0.15) * 0.05;

            ring.rotation.z =
                elapsed * 0.08;

            ring2.rotation.z =
                -elapsed * 0.055;

            camera.position.x +=
                (mouseX * 0.25 -
                    camera.position.x) * 0.02;

            camera.position.y +=
                (-mouseY * 0.18 -
                    camera.position.y) * 0.02;

            camera.lookAt(0, 0, 0);

            renderer.render(
                scene,
                camera
            );

        }

        animate();


        /* ---------------------------------------------
           RESIZE
        --------------------------------------------- */

        window.addEventListener(
            "resize",
            () => {

                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;

                camera.updateProjectionMatrix();

                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );

                renderer.setPixelRatio(
                    Math.min(
                        window.devicePixelRatio,
                        2
                    )
                );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document.querySelectorAll(
        "[data-year]"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       CONSOLE BRAND
    ===================================================== */

    console.log(
        "%c DENTOVA ",
        "color:#58d9ff;font-size:24px;font-weight:bold;"
    );

    console.log(
        "%c Advanced Dental Experience",
        "color:#91a9b5;font-size:12px;"
    );

});
