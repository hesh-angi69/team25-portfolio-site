// MEMBER 3: all JavaScript interactivity


/* 1. Typing Effect */
const typingText = document.getElementById("typing-text");

if (typingText) {
  const words = ["websites.", "applications.", "solutions."];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    typingText.textContent = currentWord.substring(0, charIndex);

    if (!deleting) {
      charIndex++;

      if (charIndex > currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);
        return;
      }
    } else {
      charIndex--;

      if (charIndex < 0) {
        charIndex = 0;
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
  }

  typeEffect();
}

/* 2. Mobile Menu */
const nav = document.querySelector(".site-header nav");
const navLinks = document.querySelector(".nav-links");

if (nav && navLinks) {
  const menuButton = document.createElement("button");

  menuButton.type = "button";
  menuButton.textContent = "☰";
  menuButton.className = "mobile-menu-btn";
  menuButton.setAttribute("aria-label", "Toggle navigation");
  menuButton.setAttribute("aria-expanded", "false");

  nav.parentNode.insertBefore(menuButton, nav);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.style.display = isOpen ? "none" : "flex";
    navLinks.style.flexDirection = "column";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  function resetMenu() {
    if (window.innerWidth > 768) {
      navLinks.style.display = "";
      navLinks.style.flexDirection = "";
      menuButton.setAttribute("aria-expanded", "false");
    } else if (menuButton.getAttribute("aria-expanded") !== "true") {
      navLinks.style.display = "none";
    }
  }

  window.addEventListener("resize", resetMenu);
  resetMenu();
}

/* 3. Dark Mode Toggle */
const darkModeButton = document.getElementById("dark-mode-btn");

if (darkModeButton) {
  darkModeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    darkModeButton.setAttribute("aria-pressed", String(isDark));
    darkModeButton.innerHTML = isDark ? "☀" : "&#x263E;";
  });

  
/* 4. Active Navigation Link Highlight */
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

/* 5. Contact Form Validation */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      return;
    }

    formStatus.textContent =
      "Your form is valid! This demo does not send messages to a server.";

    contactForm.reset();
  });
}

}

