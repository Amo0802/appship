/* ═══════════════════════════════════════════
   APPSHIPPING — Centralized Forms
   ═══════════════════════════════════════════
   Usage:
     1. Include this script AFTER shared.js:
        <script src="forms.js"></script>

     2. Add an empty popup container in your HTML:
        <div class="popup-overlay" id="popupOverlay">
          <div class="popup" id="popupContent"></div>
        </div>

     3. Call renderForm('seller') | renderForm('developer') | renderForm('career')
        This is already handled by the updated openPopup() below.

     4. On each page, set the form type before anything else:
        <script>
          var FORM_TYPE = 'seller';  // or 'developer' or 'career'
        </script>

     5. For careers.html, the openPopup(position) still works —
        it pre-selects the position dropdown after rendering.
═══════════════════════════════════════════ */

/* ── API Config ── */
var API_BASE = "https://api.moait.me/api";
var TURNSTILE_SITE_KEY = "0x4AAAAAACl2hHv_wCHp2CsB"; // ← Replace with your actual site key

/* ── Endpoint map ── */
var ENDPOINT_MAP = {
  seller: "/seller",
  developer: "/developer",
  career: "/careers",
};

/* ── Field length limits ── */
const FIELD_LIMITS = {
  full_name: 100,
  email: 150,
  phone: 30,
  company: 100,
  website: 300,
  portfolio_url: 300,
  message: 2000,
  app_description: 3000,
  cover_message: 3000,
};

/* ── Shared select options ── */
const SALES_EXPERIENCE_OPTIONS = [
  "Yes — I've sold products or services before",
  "Yes — I work in sales professionally",
  "Some — I've done freelance or side projects",
  "No — but I'm eager to learn",
];

const REFERRAL_OPTIONS = [
  "TikTok",
  "YouTube",
  "Instagram",
  "Facebook",
  "Twitter / X",
  "Google Search",
  "A friend or colleague",
  "Other",
];

const APPS_BUILT_OPTIONS = ["1–5 apps", "6–15 apps", "16–50 apps", "50+ apps"];

const POSITION_OPTIONS = [
  "Mobile Developer — Cross Platform",
  "Backend Developer — Go",
  "UI/UX Designer",
  "Project Manager",
  "QA / Tester",
  "General Application",
];

/* ── Form definitions ── */
const FORM_DEFS = {
  seller: {
    badge: "Join Appshipping",
    badgeClass: "",
    heading: "Start selling apps",
    subtitle: "Fill in your details and we'll get back to you within 72 hours.",
    submitLabel: "Apply Now",
    submitClass: "btn-accent",
    footnote: "No commitment · We'll reply within 72h",
    fields: [
      {
        row: [
          {
            name: "full_name",
            label: "Full name",
            type: "text",
            placeholder: "John Smith",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@email.com",
            required: true,
          },
        ],
      },
      {
        row: [
          {
            name: "phone",
            label: "Phone",
            type: "tel",
            placeholder: "+1 234 567 890",
            required: false,
            optionalTag: true,
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            options: "__countries__",
            required: true,
          },
        ],
      },
      {
        name: "sales_experience",
        label: "Do you have sales experience?",
        type: "select",
        options: SALES_EXPERIENCE_OPTIONS,
        required: true,
      },
      {
        name: "referral_source",
        label: "How did you hear about Appshipping?",
        type: "select",
        options: REFERRAL_OPTIONS,
        required: true,
      },
      {
        name: "message",
        label: "Tell us about yourself",
        type: "textarea",
        placeholder:
          "What industries would you target? Why do you want to join Appshipping?",
        rows: 3,
        required: true,
      },
      { name: "terms_accepted", type: "terms" },
    ],
  },

  developer: {
    badge: "For Developers",
    badgeClass: "badge-purple",
    heading: "List your app",
    subtitle: "Tell us about your app and we'll review it within 72 hours.",
    submitLabel: "Submit for Review",
    submitClass: "btn-purple",
    footnote: "We'll review and reply within 72h",
    fields: [
      {
        row: [
          {
            name: "full_name",
            label: "Full name",
            type: "text",
            placeholder: "John Smith",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@email.com",
            required: true,
          },
        ],
      },
      {
        row: [
          {
            name: "company",
            label: "Company / Agency",
            type: "text",
            placeholder: "Your company name",
            required: false,
            optionalTag: true,
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            options: "__countries__",
            required: true,
          },
        ],
      },
      {
        name: "website",
        label: "Your website or portfolio",
        type: "url",
        placeholder: "https://...",
        required: false,
        optionalTag: true,
      },
      {
        name: "app_description",
        label: "Tell us about your app",
        type: "textarea",
        placeholder:
          "What does it do? Who is it for? Key features? What floor price do you have in mind?",
        rows: 4,
        required: true,
      },
      {
        name: "apps_built",
        label: "How many apps have you built before?",
        type: "select",
        options: APPS_BUILT_OPTIONS,
        required: true,
      },
      { name: "terms_accepted", type: "terms" },
    ],
  },

  career: {
    badge: "Apply",
    badgeClass: "",
    heading: "Join the Appshipping team",
    subtitle: "Send us your details and CV. All fields marked * are required.",
    submitLabel: "Submit Application",
    submitClass: "btn-accent",
    footnote: "We'll review and respond within 72 hours",
    fields: [
      {
        row: [
          {
            name: "full_name",
            label: "Full name",
            type: "text",
            placeholder: "John Smith",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john@email.com",
            required: true,
          },
        ],
      },
      {
        row: [
          {
            name: "phone",
            label: "Phone",
            type: "tel",
            placeholder: "+1 234 567 890",
            required: false,
            optionalTag: true,
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            options: "__countries__",
            required: true,
          },
        ],
      },
      {
        name: "position",
        label: "Position",
        type: "select",
        options: POSITION_OPTIONS,
        required: true,
        id: "positionSelect",
      },
      {
        name: "portfolio_url",
        label: "Portfolio / LinkedIn / GitHub",
        type: "url",
        placeholder: "https://...",
        required: false,
        optionalTag: true,
      },
      {
        name: "resume",
        label: "Resume / CV",
        type: "file",
        accept: ".pdf,.doc,.docx",
        required: true,
        hint: "PDF, DOC, or DOCX — max 5 MB",
      },
      {
        name: "cover_message",
        label: "Cover message",
        type: "textarea",
        placeholder:
          "Relevant experience, what excites you about this role, anything you'd like us to know...",
        rows: 3,
        required: true,
      },
    ],
  },
};

/* ══════════════════════════════════════
   RENDERING
══════════════════════════════════════ */

function renderForm(formType) {
  var def = FORM_DEFS[formType];
  if (!def) return;

  var popup = document.getElementById("popupContent");
  if (!popup) return;

  var html = "";
  html +=
    '<button class="popup-close" onclick="closePopup()">&#10005;</button>';
  html +=
    '<span class="badge ' +
    (def.badgeClass || "") +
    '">' +
    def.badge +
    "</span>";
  html += "<h2>" + def.heading + "</h2>";
  html += "<p>" + def.subtitle + "</p>";
  html +=
    '<div class="popup-form" id="activeForm" data-form-type="' +
    formType +
    '">';

  def.fields.forEach(function (field) {
    if (field.row) {
      html += '<div class="popup-row">';
      field.row.forEach(function (f) {
        html += buildField(f);
      });
      html += "</div>";
    } else if (field.type === "terms") {
      html += buildTermsField();
    } else {
      html += buildField(field);
    }
  });

  // ── Honeypot field (hidden from real users, traps bots) ──
  html +=
    '<div style="position:absolute;left:-9999px;top:-9999px;opacity:0;height:0;overflow:hidden;" aria-hidden="true">' +
    '<input type="text" name="website_url" tabindex="-1" autocomplete="off" />' +
    "</div>";

  // ── Turnstile widget ──
  html +=
    '<div class="cf-turnstile" data-sitekey="' +
    TURNSTILE_SITE_KEY +
    '" data-theme="dark" data-callback="onTurnstileSuccess" data-expired-callback="onTurnstileExpired" style="margin-top:8px;"></div>';

  // ── Submit button ──
  html +=
    '<button class="btn ' +
    def.submitClass +
    ' btn-large popup-submit" id="formSubmitBtn" onclick="handleSubmit()">' +
    def.submitLabel +
    "</button>";

  // ── Status message area ──
  html += '<div id="formStatus" class="form-status"></div>';

  html += '<p class="popup-note">' + def.footnote + "</p>";
  html += "</div>";

  popup.innerHTML = html;

  // Populate country dropdowns
  popup.querySelectorAll(".country-select").forEach(function (sel) {
    COUNTRIES.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  });

  // Attach maxlength enforcement on textareas
  popup.querySelectorAll("textarea[maxlength]").forEach(function (ta) {
    ta.addEventListener("input", function () {
      var max = parseInt(this.getAttribute("maxlength"));
      if (this.value.length > max) this.value = this.value.substring(0, max);
    });
  });

  // Render Turnstile widget if the script is loaded
  if (window.turnstile) {
    window.turnstile.render(".cf-turnstile");
  }
}

/* ── Turnstile callbacks ── */
var turnstileToken = "";

function onTurnstileSuccess(token) {
  turnstileToken = token;
}

function onTurnstileExpired() {
  turnstileToken = "";
}

/* ── Build a single field's HTML ── */

function buildField(f) {
  var req = f.required ? " *" : "";
  var optTag = f.optionalTag ? " <span>(optional)</span>" : "";
  var limit = FIELD_LIMITS[f.name] || null;
  var reqAttr = f.required ? " required" : "";
  var html = '<div class="popup-field">';

  // Label (except file — handled separately)
  if (f.type !== "file") {
    html += "<label>" + f.label + req + optTag + "</label>";
  }

  switch (f.type) {
    case "text":
    case "email":
    case "tel":
    case "url":
      html += '<input type="' + f.type + '" name="' + f.name + '"';
      if (f.placeholder) html += ' placeholder="' + f.placeholder + '"';
      if (limit) html += ' maxlength="' + limit + '"';
      html += reqAttr + " />";
      break;

    case "select":
      var idAttr = f.id ? ' id="' + f.id + '"' : "";
      var cls = f.options === "__countries__" ? ' class="country-select"' : "";
      html += '<select name="' + f.name + '"' + idAttr + cls + reqAttr + ">";
      html += '<option value="">Select one</option>';
      if (f.options !== "__countries__") {
        f.options.forEach(function (opt) {
          html += '<option value="' + opt + '">' + opt + "</option>";
        });
      }
      html += "</select>";
      break;

    case "textarea":
      var maxAttr = limit ? ' maxlength="' + limit + '"' : "";
      html += '<textarea name="' + f.name + '"';
      if (f.placeholder) html += ' placeholder="' + f.placeholder + '"';
      html +=
        ' rows="' + (f.rows || 3) + '"' + maxAttr + reqAttr + "></textarea>";
      break;

    case "file":
      var hint = f.hint ? " <span>(" + f.hint + ")</span>" : "";
      html += "<label>" + f.label + req + hint + "</label>";
      html += '<div class="file-input-wrap">';
      html += '<input type="file" name="' + f.name + '"';
      if (f.accept) html += ' accept="' + f.accept + '"';
      html += reqAttr + " />";
      html += "</div>";
      break;
  }

  html += "</div>";
  return html;
}

function buildTermsField() {
  return (
    "" +
    '<div class="popup-field">' +
    '<div class="terms-check">' +
    '<input type="checkbox" name="terms_accepted" id="termsCheck" required />' +
    '<label for="termsCheck">I have read and agree to the <a href="terms.html" target="_blank">Terms &amp; Conditions</a></label>' +
    "</div>" +
    '<p class="terms-note">Please read the terms before applying.</p>' +
    "</div>"
  );
}

/* ══════════════════════════════════════
   VALIDATION
══════════════════════════════════════ */

function validateFormFields(formEl) {
  var valid = true;

  // Clear old errors
  formEl.querySelectorAll(".field-error").forEach(function (e) {
    e.remove();
  });
  formEl.querySelectorAll(".popup-field.error").forEach(function (e) {
    e.classList.remove("error");
  });

  formEl.querySelectorAll("[required]").forEach(function (input) {
    var field = input.closest(".popup-field");
    var isEmpty = false;
    var errorMsg = "This field is required";

    if (input.type === "checkbox") {
      isEmpty = !input.checked;
      errorMsg = "You must agree to continue";
    } else if (input.tagName === "SELECT") {
      isEmpty = !input.value;
    } else if (input.type === "file") {
      isEmpty = input.files.length === 0;
      errorMsg = "This file is required";
      // Check size limit (5 MB)
      if (!isEmpty && input.files[0].size > 5 * 1024 * 1024) {
        isEmpty = true;
        errorMsg = "File must be under 5 MB";
      }
    } else {
      isEmpty = !input.value.trim();
    }

    // Email format
    if (input.type === "email" && input.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        isEmpty = true;
        errorMsg = "Please enter a valid email";
      }
    }

    // URL format (only if filled)
    if (input.type === "url" && input.value.trim()) {
      try {
        new URL(input.value.trim());
      } catch (_) {
        isEmpty = true;
        errorMsg = "Please enter a valid URL";
      }
    }

    if (isEmpty) {
      valid = false;
      if (field) {
        field.classList.add("error");
        if (!field.querySelector(".field-error")) {
          var err = document.createElement("span");
          err.className = "field-error";
          err.textContent = errorMsg;
          field.appendChild(err);
        }
      }
    }
  });

  return valid;
}

/* ══════════════════════════════════════
   STATUS HELPERS
══════════════════════════════════════ */

function showStatus(type, msg) {
  var el = document.getElementById("formStatus");
  if (!el) return;
  el.className = "form-status " + type;
  el.textContent = msg;
  el.style.display = "block";
}

function hideStatus() {
  var el = document.getElementById("formStatus");
  if (el) {
    el.style.display = "none";
    el.textContent = "";
    el.className = "form-status";
  }
}

function setSubmitLoading(loading) {
  var btn = document.getElementById("formSubmitBtn");
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.textContent = "Sending…";
    btn.style.opacity = "0.6";
    btn.style.pointerEvents = "none";
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || "Submit";
    btn.style.opacity = "";
    btn.style.pointerEvents = "";
  }
}

/* ══════════════════════════════════════
   HTML SANITIZATION
══════════════════════════════════════ */

function sanitize(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ══════════════════════════════════════
   SUBMISSION
══════════════════════════════════════ */

function handleSubmit() {
  var form = document.getElementById("activeForm");
  if (!form) return;
  if (!validateFormFields(form)) return;

  // Check honeypot
  var honeypot = form.querySelector('input[name="website_url"]');
  if (honeypot && honeypot.value) {
    // Bot detected — fake success
    showStatus("success", "Thanks! We'll be in touch within 72 hours.");
    return;
  }

  // Check Turnstile token
  if (!turnstileToken) {
    showStatus("error", "Please complete the CAPTCHA verification.");
    return;
  }

  var formType = form.getAttribute("data-form-type");
  var endpoint = API_BASE + (ENDPOINT_MAP[formType] || "/contact");
  var isMultipart = formType === "career";

  hideStatus();
  setSubmitLoading(true);

  if (isMultipart) {
    // Career form — multipart/form-data (for file upload)
    var fd = new FormData();
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (!el.name || el.name === "website_url") return;
      if (el.type === "checkbox") {
        fd.append(el.name, el.checked ? "true" : "false");
      } else if (el.type === "file") {
        if (el.files[0]) fd.append(el.name, el.files[0]);
      } else {
        fd.append(el.name, sanitize(el.value.trim()));
      }
    });
    fd.append("turnstile_token", turnstileToken);

    fetch(endpoint, { method: "POST", body: fd })
      .then(handleResponse)
      .then(function (res) {
        onSuccess(formType);
      })
      .catch(function (err) {
        onError(err);
      });
  } else {
    // Seller / Developer — JSON
    var data = {};
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      if (!el.name || el.name === "website_url") return;
      if (el.type === "checkbox") {
        data[el.name] = el.checked;
      } else if (el.type === "file") {
        // skip
      } else {
        data[el.name] = sanitize(el.value.trim());
      }
    });
    data.turnstile_token = turnstileToken;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .then(function (res) {
        onSuccess(formType);
      })
      .catch(function (err) {
        onError(err);
      });
  }
}

function handleResponse(resp) {
  if (!resp.ok) {
    return resp.json().then(function (body) {
      throw new Error(body.error || "Something went wrong. Please try again.");
    });
  }
  return resp.json();
}

function onSuccess(formType) {
  setSubmitLoading(false);
  var messages = {
    seller: "Thanks for applying! We'll be in touch within 72 hours.",
    developer:
      "Thanks! We'll review your app and get back to you within 72 hours.",
    career:
      "Thanks for applying! We'll review your application and get back to you within 72 hours.",
  };
  showStatus("success", messages[formType] || "Submitted!");

  // Reset Turnstile
  turnstileToken = "";
  if (window.turnstile) {
    var widget = document.querySelector(".cf-turnstile");
    if (widget) window.turnstile.reset(widget);
  }

  // Close popup after a short delay
  setTimeout(function () {
    closePopup();
    hideStatus();
  }, 3000);
}

function onError(err) {
  setSubmitLoading(false);
  showStatus("error", err.message || "Something went wrong. Please try again.");

  // Reset Turnstile on error too
  turnstileToken = "";
  if (window.turnstile) {
    var widget = document.querySelector(".cf-turnstile");
    if (widget) window.turnstile.reset(widget);
  }
}

function collectFormData(formEl) {
  var data = {};
  formEl.querySelectorAll("input, select, textarea").forEach(function (el) {
    if (!el.name) return;
    if (el.type === "checkbox") {
      data[el.name] = el.checked;
    } else if (el.type === "file") {
      data[el.name] = el.files[0] ? el.files[0].name : "";
    } else {
      data[el.name] = el.value.trim();
    }
  });
  return data;
}

/* ══════════════════════════════════════
   OVERRIDE openPopup / closePopup
   (replaces the versions in shared.js)
══════════════════════════════════════ */

function openPopup(positionOrType) {
  // Reset turnstile token
  turnstileToken = "";

  // Determine which form to render based on page-level FORM_TYPE
  var type = typeof FORM_TYPE !== "undefined" ? FORM_TYPE : "seller";
  renderForm(type);

  document.getElementById("popupOverlay").classList.add("open");
  document.body.style.overflow = "hidden";

  // Career page: pre-select position if passed
  if (type === "career" && positionOrType) {
    var sel = document.getElementById("positionSelect");
    if (sel) {
      for (var i = 0; i < sel.options.length; i++) {
        if (
          sel.options[i].text.includes(positionOrType) ||
          sel.options[i].text === positionOrType
        ) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
  }
}

function closePopup() {
  var overlay = document.getElementById("popupOverlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on overlay click or Escape
document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === this) closePopup();
    });
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closePopup();
});
