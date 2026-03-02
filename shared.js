/* ═══════════════════════════════════════════
   APPSHIPPING — Shared JS
═══════════════════════════════════════════ */

/* ── Nav toggle ── */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const ham = document.querySelector(".hamburger");
  menu.classList.toggle("open");
  ham.classList.toggle("active");
  document.body.style.overflow = menu.classList.contains("open")
    ? "hidden"
    : "";
}
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    document.getElementById("mobileMenu")?.classList.remove("open");
    document.querySelector(".hamburger")?.classList.remove("active");
    document.body.style.overflow = "";
  }
});
document.querySelectorAll(".mobile-menu a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("open");
    document.querySelector(".hamburger").classList.remove("active");
    document.body.style.overflow = "";
  });
});

/* ── Popup ── */
function openPopup() {
  document.getElementById("popupOverlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closePopup() {
  document.getElementById("popupOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
  // Clear validation errors
  document.querySelectorAll(".field-error").forEach((e) => e.remove());
  document
    .querySelectorAll(".popup-field.error")
    .forEach((e) => e.classList.remove("error"));
}
document
  .getElementById("popupOverlay")
  ?.addEventListener("click", function (e) {
    if (e.target === this) closePopup();
  });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

/* ── Form validation ── */
function validateForm(formEl) {
  let valid = true;
  // Clear previous errors
  formEl.querySelectorAll(".field-error").forEach((e) => e.remove());
  formEl
    .querySelectorAll(".popup-field.error")
    .forEach((e) => e.classList.remove("error"));

  // Check all required inputs
  formEl.querySelectorAll("[required]").forEach((input) => {
    const field = input.closest(".popup-field");
    let isEmpty = false;

    if (input.type === "checkbox") {
      isEmpty = !input.checked;
    } else if (input.tagName === "SELECT") {
      isEmpty = !input.value || input.value === "";
    } else if (input.type === "file") {
      isEmpty = input.files.length === 0;
    } else {
      isEmpty = !input.value.trim();
    }

    // Email format check
    if (input.type === "email" && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        isEmpty = true;
      }
    }

    if (isEmpty) {
      valid = false;
      if (field) {
        field.classList.add("error");
        if (!field.querySelector(".field-error")) {
          const err = document.createElement("span");
          err.className = "field-error";
          err.textContent =
            input.type === "checkbox"
              ? "You must agree to continue"
              : input.type === "email" && input.value.trim()
                ? "Please enter a valid email"
                : input.type === "file"
                  ? "This file is required"
                  : "This field is required";
          field.appendChild(err);
        }
      }
    }
  });
  return valid;
}

function submitForm() {
  const form = document.querySelector("#popupOverlay .popup-form");
  if (!validateForm(form)) return;
  // TODO: Wire up to your VPS backend to send email
  alert("Thanks for applying! We'll be in touch within 72 hours.");
  closePopup();
}

function submitDevForm() {
  const form = document.querySelector("#popupOverlay .popup-form");
  if (!validateForm(form)) return;
  alert("Thanks! We'll review your app and get back to you within 72 hours.");
  closePopup();
}

/* ── FAQ toggle ── */
function toggleFaq(el) {
  el.classList.toggle("open");
}

/* ── Scroll animations ── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));

/* ── Country list (populate all selects with class .country-select) ── */
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".country-select").forEach((sel) => {
    COUNTRIES.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  });
});
