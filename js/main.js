/* ==========================================================
   LLIFFTON LIVING LAB - PAGE SWITCHING + CONTACT FORM
   Content lives in index.html. This file only handles:
   1. Showing the right section(s) for the URL hash (#about, #team ...)
   2. The mobile menu
   3. The contact form
   ========================================================== */

const EMAIL = "info@llifftonlivinglab.com";
const nav = document.getElementById("nav");
const sections = document.querySelectorAll("[data-page]");

/* 1. Show sections for the current page.
   #home (or no hash) shows every section in one long page;
   any other hash shows only sections tagged with that data-page. */
function showPage() {
  const known = [...nav.querySelectorAll("a")].map(a => a.dataset.k);
  let page = location.hash.slice(1) || "home";
  if (!known.includes(page) && page !== "partner-with-us") page = "home";

  sections.forEach(el => {
    el.hidden = !(page === "home" || el.dataset.page === page);
  });
  nav.querySelectorAll("a").forEach(a => {
    a.classList.toggle("on", a.dataset.k === page);
  });
  nav.classList.remove("open");
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);
showPage();

/* 2. Mobile menu button */
document.getElementById("menu").addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* 3. Contact form: opens the visitor's email app with the message filled in */
document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const body =
    "Name: " + document.getElementById("f-name").value + "\n" +
    "Organisation: " + document.getElementById("f-org").value + "\n" +
    "Email: " + document.getElementById("f-email").value + "\n\n" +
    document.getElementById("f-msg").value;
  location.href = "mailto:" + EMAIL +
    "?subject=" + encodeURIComponent("Partnership enquiry") +
    "&body=" + encodeURIComponent(body);
});
