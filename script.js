/* =========================================================
   DENTOVA — ADVANCED 3D JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 900);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");

        });

    }


    /* =====================================================
       THREE.JS — 3D PARTICLE WORLD
    ===================================================== */

    const canvas = document.getElementById("three-canvas");

    if (canvas && typeof THREE !== "undefined") {

        const scene = new THREE.Scene();

        /* Camera */

        const camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        camera.position.z = 8;


        /* Renderer */

        const renderer = new THREE.WebGLRenderer({
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


        /* =================================================
           LIGHTING
        ================================================= */

        const ambientLight = new THREE.AmbientLight(
            0x8fdfff,
            0.35
        );

        scene.add(ambientLight);


        const pointLight = new THREE.PointLight(
            0x3dc8ff,
            2.5,
            40
        );

        pointLight.position.set(
            3,
            2,
            5
        );

        scene.add(pointLight);


        const blueLight = new THREE.PointLight(
            0x1978ff,
            2,
            30
        );

        blueLight.position.set(
            -4,
            -2,
            2
        );

        scene.add(blueLight);


        /* =================================================
           PARTICLE SYSTEM
        ================================================= */

        const particleCount = 1200;

        const particleGeometry =
            new THREE.BufferGeometry();

        const particlePositions =
            new Float32Array(
                particleCount * 3
            );

        const particleSizes =
            new Float32Array(
                particleCount
            );


        for (let i = 0; i < particleCount; i++) {

            const i3 = i * 3;

            particlePositions[i3] =
                (Math.random() - 0.5) * 24;

            particlePositions[i3 + 1] =
                (Math.random() - 0.5) * 16;

            particlePositions[i3 + 2] =
                (Math.random() - 0.5) * 15;

            particleSizes[i] =
                Math.random() * 2 + 0.5;

        }


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                particlePositions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0x6bdcff,

                size: 0.025,

                transparent: true,

                opacity: 0.65,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false

            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );

        scene.add(particles);


        /* =================================================
           3D ORBIT RINGS
        ================================================= */

        const ringGroup =
            new THREE.Group();

        scene.add(ringGroup);


        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x37c8ff,

                transparent: true,

                opacity: 0.18,

                wireframe: true

            });


        for (let i = 0; i < 4; i++) {

            const geometry =
                new THREE.TorusGeometry(
                    2.2 + i * 0.45,
                    0.008,
                    12,
                    160
                );

            const ring =
                new THREE.Mesh(
                    geometry,
                    ringMaterial
                );

            ring.rotation.x =
                Math.random() * Math.PI;

            ring.rotation.y =
                Math.random() * Math.PI;

            ring.rotation.z =
                Math.random() * Math.PI;

            ringGroup.add(ring);

        }


        /* =================================================
           FLOATING 3D SPHERES
        ================================================= */

        const sphereGroup =
            new THREE.Group();

        scene.add(sphereGroup);


        const sphereGeometry =
            new THREE.SphereGeometry(
                0.055,
                20,
                20
            );


        const sphereMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x7fe5ff,

                transparent: true,

                opacity: 0.85

            });


        for (let i = 0; i < 40; i++) {

            const sphere =
                new THREE.Mesh(
                    sphereGeometry,
                    sphereMaterial
                );

            sphere.position.set(

                (Math.random() - 0.5) * 12,

                (Math.random() - 0.5) * 8,

                (Math.random() - 0.5) * 7

            );

            sphere.userData.speed =
                0.002 + Math.random() * 0.006;

            sphereGroup.add(sphere);

        }


        /* =================================================
           MOUSE INTERACTION
        ================================================= */

        let mouseX = 0;
        let mouseY = 0;

        let targetX = 0;
        let targetY = 0;


        window.addEventListener(
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


        /* =================================================
           TOUCH INTERACTION
        ================================================= */

        window.addEventListener(
            "touchmove",
            (event) => {

                if (!event.touches.length)
                    return;

                mouseX =
                    (event.touches[0].clientX /
                        window.innerWidth) *
                    2 - 1;

                mouseY =
                    (event.touches[0].clientY /
                        window.innerHeight) *
                    2 - 1;

            },
            { passive: true }
        );


        /* =================================================
           ANIMATION LOOP
        ================================================= */

        const clock =
            new THREE.Clock();


        function animate() {

            requestAnimationFrame(
                animate
            );


            const elapsed =
                clock.getElapsedTime();


            /* Smooth mouse */

            targetX +=
                (mouseX - targetX) *
                0.025;

            targetY +=
                (mouseY - targetY) *
                0.025;


            /* Particle movement */

            particles.rotation.y =
                elapsed * 0.015;

            particles.rotation.x =
                Math.sin(elapsed * 0.15) *
                0.03;


            /* Ring movement */

            ringGroup.rotation.y =
                elapsed * 0.12;

            ringGroup.rotation.x =
                Math.sin(elapsed * 0.3) *
                0.2;


            /* Mouse influence */

            ringGroup.rotation.x +=
                targetY * 0.15;

            ringGroup.rotation.y +=
                targetX * 0.15;


            /* Floating spheres */

            sphereGroup.rotation.y =
                elapsed * 0.04;

            sphereGroup.children.forEach(
                (sphere, index) => {

                    sphere.position.y +=
                        Math.sin(
                            elapsed +
                            index
                        ) * 0.0007;

                }
            );


            /* Camera movement */

            camera.position.x +=
                (targetX * 0.7 -
                    camera.position.x) *
                0.025;

            camera.position.y +=
                (-targetY * 0.5 -
                    camera.position.y) *
                0.025;

            camera.lookAt(
                0,
                0,
                0
            );


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /* =================================================
           RESIZE
        ================================================= */

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

            }
        );


        /* =================================================
           SCROLL — 3D CAMERA EFFECT
        ================================================= */

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                const maxScroll =
                    document.body.scrollHeight -
                    window.innerHeight;

                const progress =
                    maxScroll > 0
                        ? scroll / maxScroll
                        : 0;


                camera.position.z =
                    8 -
                    progress * 2.5;


                ringGroup.rotation.z =
                    progress * Math.PI * 2;


                particles.rotation.z =
                    progress * 0.4;

            }
        );

    }


    /* =====================================================
       GSAP
    ===================================================== */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        /* =================================================
           HERO ANIMATION
        ================================================= */

        gsap.from(
            ".hero-content > *",
            {

                y: 45,

                opacity: 0,

                duration: 1,

                stagger: 0.12,

                ease: "power3.out",

                delay: 1

            }
        );


        gsap.from(
            ".hero-visual",
            {

                scale: 0.75,

                opacity: 0,

                duration: 1.5,

                ease: "power4.out",

                delay: 0.7

            }
        );


        /* =================================================
           TREATMENT CARDS
        ================================================= */

        gsap.utils.toArray(
            ".treatment-card"
        ).forEach(
            (card, index) => {

                gsap.to(
                    card,
                    {

                        opacity: 1,

                        y: 0,

                        duration: 0.8,

                        delay: index * 0.08,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: card,

                            start: "top 85%",

                            toggleActions:
                                "play none none reverse"

                        }

                    }
                );

            }
        );


        /* =================================================
           FEATURES
        ================================================= */

        gsap.utils.toArray(
            ".feature"
        ).forEach(
            (feature, index) => {

                gsap.to(
                    feature,
                    {

                        opacity: 1,

                        y: 0,

                        duration: 0.7,

                        delay: index * 0.1,

                        scrollTrigger: {

                            trigger: feature,

                            start: "top 88%"

                        }

                    }
                );

            }
        );


        /* =================================================
           SECTION HEADINGS
        ================================================= */

        gsap.utils.toArray(
            ".section-heading, .why-content, .technology-content, .appointment-content"
        ).forEach(
            (element) => {

                gsap.to(
                    element,
                    {

                        opacity: 1,

                        y: 0,

                        duration: 1,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 85%"

                        }

                    }
                );

            }
        );


        /* =================================================
           APPOINTMENT FORM
        ================================================= */

        gsap.to(
            ".appointment-form",
            {

                opacity: 1,

                y: 0,

                duration: 1,

                scrollTrigger: {

                    trigger: ".appointment-form",

                    start: "top 85%"

                }

            }
        );


        /* =================================================
           HERO PARALLAX
        ================================================= */

        gsap.to(
            ".hero-visual",
            {

                y: 120,

                rotation: 2,

                scrollTrigger: {

                    trigger: ".hero",

                    start: "top top",

                    end: "bottom top",

                    scrub: true

                }

            }
        );


        /* =================================================
           TOOTH SECTION PARALLAX
        ================================================= */

        gsap.to(
            ".anatomy-tooth",
            {

                rotationY: 360,

                scrollTrigger: {

                    trigger: ".tooth-section",

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1.5

                }

            }
        );


        /* =================================================
           TECHNOLOGY ANIMATION
        ================================================= */

        gsap.from(
            ".tech-list div",
            {

                x: 50,

                opacity: 0,

                duration: 0.7,

                stagger: 0.12,

                scrollTrigger: {

                    trigger: ".tech-list",

                    start: "top 85%"

                }

            }
        );

    }


    /* =====================================================
       3D CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".treatment-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -5;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    5;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                    `;
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
       TOOTH INTERACTION
    ===================================================== */

    const tooth =
        document.querySelector(
            ".anatomy-tooth"
        );

    const rotateButton =
        document.getElementById(
            "rotateTooth"
        );


    if (rotateButton && tooth) {

        rotateButton.addEventListener(
            "click",
            () => {

                tooth.style.animation =
                    "none";

                tooth.style.transform =
                    "rotateY(360deg) rotateX(8deg)";

                setTimeout(
                    () => {

                        tooth.style.animation =
                            "anatomyRotate 12s linear infinite";

                    },
                    1100
                );

            }
        );

    }


    /* =====================================================
       APPOINTMENT FORM
    ===================================================== */

    const form =
        document.getElementById(
            "appointmentForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const button =
                    form.querySelector(
                        ".submit-btn"
                    );


                const originalText =
                    button.innerHTML;


                button.innerHTML =
                    "Appointment Request Sent ✓";


                button.style.background =
                    "linear-gradient(90deg,#6fffc2,#39d99b)";


                setTimeout(
                    () => {

                        button.innerHTML =
                            originalText;

                        button.style.background =
                            "";

                        form.reset();

                    },
                    3000
                );

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#" ||
                        !targetId
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );

});
