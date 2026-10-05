const EMAIL = "hello.ujjwaldesign@gmail.com";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_DojMfm146KfkPdMMzLZZNHTJSiw8tuPOP4HwOD5NqR5l22EBDjn0eS5Pyuqn82rb/exec";

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
  observer.observe(el);
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});


// ========================================
// CONTACT FORM → GOOGLE SHEETS + GMAIL
// ========================================

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formElement = e.currentTarget;
  const form = new FormData(formElement);

  const submitButton = formElement.querySelector(".submit-btn");
  const originalText = submitButton.textContent;

  const data = {
    name: form.get("name"),
    email: form.get("email"),
    subject: form.get("subject"),
    message: form.get("message")
  };

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    formElement.reset();

    submitButton.textContent = "Message Sent ✓";

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 3000);

  } catch (error) {
    console.error("Form submission error:", error);

    submitButton.textContent = "Try Again";
    submitButton.disabled = false;

    alert("Something went wrong. Please try again.");
  }
});
