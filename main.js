/* ==========================================================================
    ESWAR ACHARI RAMOJU - INTERACTIVE PORTFOLIO CONTROLLER
        ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initTypewriter();
    initSkillsObserver();
    initProjectsModal();
    initContactForm();
    initBackToTop();
});
/* --- Theme Toggle Manager --- */
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "dark";

    // Set initial theme
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}
/* --- Navigation & Header Scrolling --- */
function initNavbar() {
    const header = document.querySelector("header");
    const hamburger = document.getElementById("hamburger");
    const navLinksList = document.getElementById("nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    // Add visual state to header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Scrollspy highlight active menu link
        let currentActiveSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
                link.classList.add("active");
            }
        });
    });
    // Mobile Hamburger Toggle
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinksList.classList.toggle("active");
    });
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinksList.classList.remove("active");
        });
    });
}
/* --- Typewriter / Typing Animation --- */
function initTypewriter() {
    const typedTarget = document.getElementById("typed-text");
    const roles = [
        "AI/ML Engineer",
        "Flutter Developer",
        "Data Analyst",
        "Project Coordinator"
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    function type() {
        const currentRole = roles[currentRoleIdx];

        if (isDeleting) {
            typedTarget.textContent = currentRole.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 50; // Delete faster
        } else {
            typedTarget.textContent = currentRole.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 120; // Natural typing speed
        }
        // Typing finished
        if (!isDeleting && currentCharIdx === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full string
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 500; // Small pause before typing next
        }
        // Add visual blinking cursor wrapper
        const cursorSpan = document.createElement("span");
        cursorSpan.className = "typed-cursor";
        cursorSpan.textContent = "|";
        typedTarget.appendChild(cursorSpan);
        setTimeout(type, typingSpeed);
    }
    // Trigger typing loop
    setTimeout(type, 1000);
}
/* --- Skills Progress Bars Animation --- */
function initSkillsObserver() {
    const skillBars = document.querySelectorAll(".skill-bar-progress");
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    const observerOptions = {
        root: null,
        threshold: 0.15
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Populate progress widths
                skillBars.forEach(bar => {
                    const skillValue = bar.getAttribute("data-skill-value");
                    bar.style.width = `${skillValue}%`;
                });
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    observer.observe(skillsSection);
}
/* --- Dynamic Project Modal Controller --- */
const PROJECTS_DATA = {
    "project-aquaculture": {
        title: "Smart Aquaculture: Real-Time Fish Disease Detection System",
        category: "Artificial Intelligence & Computer Vision",
        tags: ["YOLOv8", "OpenCV", "Python", "Raspberry Pi", "IoT", "Roboflow"],
        timeline: "Academic Capstone Project",
        github: "https://github.com/e-ramoju27",
        bullets: [
            "Developed an automated real-time fish disease classification system using the state-of-the-art YOLOv8 object detection framework coupled with OpenCV.",
            "Gathered, filtered, and preprocessed a specialized dataset consisting of 12,000+ fish images sourced from Roboflow platform to ensure high model generalization.",
            "Trained, validated, and optimized the YOLOv8 model for small-to-medium object segments, achieving excellent classification scores on test datasets.",
            "Designed and implemented an end-to-end IoT deployment pipeline on a Raspberry Pi microprocessor.",
            "Integrated physical hardware accessories: an dynamic LCD display, piezo buzzer alert, and active alert systems.",
            "Engineered automated instant alerting systems including active Telegram API webhook bots to notify farm operators immediately when disease states are identified."
        ]
    },
    "project-leaf": {
        title: "Plant Leaf Disease Detection & Remedy Recommendation System",
        category: "AI & Mobile Development Integration",
        tags: ["EfficientNetB0", "TensorFlow Lite", "Flutter", "Dart", "Data Engineering"],
        timeline: "Data Analytics & ML Project",
        github: "https://github.com/e-ramoju27",
        bullets: [
            "Engineered an intelligent agricultural solution targeting early plant pathogen tracking.",
            "Managed, labeled, and augmented a high-density, multi-class plant disease dataset consisting of 27,000+ structured images spanning 8 common plant species and 20 distinct disease tags.",
            "Fine-tuned the efficient convolutional neural network architecture (EfficientNetB0) utilizing custom pre-trained ImageNet weights.",
            "Achieved a remarkable 99.23% classification accuracy on the validation subset, proving high efficacy and minimizing false prediction rates.",
            "Quantized and converted the high-accuracy TensorFlow model into a lightweight 7.5MB TFLite model.",
            "Developed a cross-platform Flutter mobile client that takes camera frames/gallery images and performs real-time offline prediction on the edge with zero latency, recommending specific organic and chemical remedies instantly."
        ]
    },
    "project-expense": {
        title: "Sleek Expense Tracker Mobile Application",
        category: "Mobile App Development",
        tags: ["Flutter", "Dart", "Local DB", "Data Analytics", "Financial Reporting", "Excel"],
        timeline: "Digitalex Solutions Internship Project",
        github: "https://github.com/e-ramoju27",
        bullets: [
            "Architected and deployed a highly responsive, modern Expense Tracker mobile client targeting iOS and Android platforms.",
            "Built dynamic interactive UI dashboards for expense categorization, instant budget boundaries, and intuitive monthly cash-flow reporting using Dart and Flutter.",
            "Designed persistent local database models to store offline logs, enabling offline transactional tracking.",
            "Integrated high-fidelity charts and graphs using custom canvas plotting for clear financial summaries.",
            "Implemented an Excel-compatible CSV and XLSX report exporter module, optimizing financial reporting workflows.",
            "Collaborated directly with UI testers and lead developers, implementing comprehensive widget unit testing to polish overall app responsiveness and reduce bug occurrences by 25%."
        ]
    }
};
function initProjectsModal() {
    const modalOverlay = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const viewDetailsButtons = document.querySelectorAll(".view-project-details");
    const modalTitle = modalOverlay.querySelector(".modal-title");
    const modalCategory = modalOverlay.querySelector(".project-tag");
    const modalTagsContainer = modalOverlay.querySelector(".modal-tags");
    const modalTimeline = modalOverlay.querySelector(".modal-meta-item span");
    const modalBulletsContainer = modalOverlay.querySelector(".modal-bullets-list");
    const modalGithubBtn = modalOverlay.querySelector(".modal-github-link");
    // Open Modal Function
    function openModal(projectId) {
        const data = PROJECTS_DATA[projectId];
        if (!data) return;
        // Set text content
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalTimeline.textContent = data.timeline;
        modalGithubBtn.setAttribute("href", data.github);
        // Populate tech tags
        modalTagsContainer.innerHTML = "";
        data.tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "chip";
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> ${tag}`;
            modalTagsContainer.appendChild(span);
        });
        // Populate bullet points
        modalBulletsContainer.innerHTML = "";
        data.bullets.forEach(bullet => {
            const li = document.createElement("li");
            li.textContent = bullet;
            modalBulletsContainer.appendChild(li);
        });
        // Show Modal overlay
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scroll behind modal
    }
    // Close Modal Function
    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scroll
    }
    // Add event listeners to all card buttons
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute("data-project-id");
            openModal(projectId);
        });
    });
    // Close on button click
    modalCloseBtn.addEventListener("click", closeModal);
    // Close on clicking backdrop overlay
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    // Close on ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });
}
/* --- Contact Form Logic & Validation --- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusBox = document.getElementById("form-status");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const submitBtn = form.querySelector("button[type='submit']");
        // Basic Client-Side Validation
        if (!name || !email || !message) {
            alert("Please fill in all input fields.");
            return;
        }
        // Set Loading State
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.setAttribute("disabled", "true");
        submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><polyline points="4.93 4.93 7.76 7.76"/><polyline points="16.24 16.24 19.07 19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><polyline points="4.93 19.07 7.76 16.24"/><polyline points="16.24 7.76 19.07 4.93"/></svg> Sending Message...`;
        // Simulate HTTP POST Request sending
        setTimeout(() => {
            // Restore button state
            submitBtn.removeAttribute("disabled");
            submitBtn.innerHTML = originalBtnText;
            // Show Custom Success box
            statusBox.className = "form-status success";
            statusBox.innerHTML = "Thank you! Your message has been sent successfully. Eswar will get back to you shortly.";

            // Clear inputs
            form.reset();
            // Clear success box after 6s
            setTimeout(() => {
                statusBox.style.display = "none";
            }, 6000);
        }, 1500);
    });
}
/* --- Floating Back To Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}