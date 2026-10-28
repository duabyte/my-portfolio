const form = document.getElementById("connect-fast");
const button = document.getElementById("submit-btn");
const buttonLabel = button.querySelector(".button-label");
const toast = document.getElementById("toast");
const toastSymbol = document.getElementById("toast-symbol");
const toastTitle = document.getElementById("toast-title");
const toastMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");

let toastTimer;

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// This page reads the same theme value as the dashboard.
applySavedTheme();

// If the theme is changed in another tab, update this page too.
window.addEventListener("storage", (event) => {
  if (event.key === "theme") applySavedTheme();
});

function showToast({ success, title, message }) {
  clearTimeout(toastTimer);
  toast.classList.toggle("is-error", !success);
  toastSymbol.textContent = success ? "✓" : "!";
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.hidden = false;
}

function hideToast() {
  toast.hidden = true;
  clearTimeout(toastTimer);
}

toastClose.addEventListener("click", hideToast);

function resetButton() {
  button.disabled = false;
  button.classList.remove("is-loading", "is-success");
  buttonLabel.textContent = "Send message";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  hideToast();
  button.disabled = true;
  button.classList.remove("is-success");
  button.classList.add("is-loading");
  buttonLabel.textContent = "Sending...";

  try {
    const response = await fetch("https://formspree.io/f/xppprayr", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = Array.isArray(data.errors)
        ? data.errors.map((error) => error.message).filter(Boolean).join(", ")
        : data.error;
      throw new Error(errorMessage || "Something went wrong. Please try again.");
    }

    // Show the spinner first, then turn the button into a check mark.
    button.classList.remove("is-loading");
    button.classList.add("is-success");
    buttonLabel.textContent = "Sent!";

    showToast({
      success: true,
      title: "Message sent!",
      message: "Thanks for reaching out. Your message was sent successfully."
    });

    // Keep the success state visible briefly, then reset the form and button.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    form.reset();
    hideToast();
    resetButton();
  } catch (error) {
    button.classList.remove("is-loading", "is-success");
    buttonLabel.textContent = "Try again";
    showToast({
      success: false,
      title: "Couldn't send your message",
      message: error.message || "Check your connection and try again."
    });
    button.disabled = false;
  }
});
