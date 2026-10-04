const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const icon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  themeToggle.classList.add('rotating');

  setTimeout(() => {
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
    themeToggle.classList.remove('rotating');
  }, 200);
});

function updateIcon(theme) {
	if (theme === "dark") {
		icon.classList.remove("bi-moon-stars");
		icon.classList.add("bi-sun");
	} else {
		icon.classList.remove("bi-sun");
		icon.classList.add("bi-moon-stars");
	}
}
