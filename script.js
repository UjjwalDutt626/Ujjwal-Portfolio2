const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby_DojMfm146KfkPdMMzLZZNHTJSiw8tuPOP4HwOD5NqR5l22EBDjn0eS5Pyuqn82rb/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    const formData = {
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      subject: form.elements["subject"].value.trim(),
      message: form.elements["message"].value.trim()
    };

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill all fields.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(formData)
      });

      form.reset();

      submitBtn.textContent = "Message Sent ✓";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);

    } catch (error) {
      console.error(error);

      submitBtn.textContent = "Try Again";
      submitBtn.disabled = false;

      alert("Something went wrong. Please try again.");
    }
  });

  // Current year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
