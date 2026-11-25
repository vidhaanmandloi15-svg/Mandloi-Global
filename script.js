
(() => {
  // Footer mein current year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      toggle.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
        toggle.textContent = "☰";
      });
    });
  }

  // Product enquiry links
  document.querySelectorAll("[data-product]").forEach((link) => {
    link.addEventListener("click", () => {
      const product = document.getElementById("product");

      if (product) {
        product.value = link.dataset.product;
      }
    });
  });

  // Trade enquiry form
  const form = document.getElementById("enquiry-form");
  const result = document.getElementById("form-result");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      const fields = [
        ["Name", data.get("name")],
        ["Company", data.get("company") || "Not provided"],
        ["Email", data.get("email")],
        ["Destination country", data.get("country")],
        ["Product", data.get("product")],
        ["Approximate quantity", data.get("quantity") || "Not provided"],
        ["Requirement details", data.get("details") || "Not provided"]
      ];

      const subject =
        `Mandloi Global trade enquiry — ${data.get("product")}`;

      const body = fields
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");

      const mailto =
        "mailto:mandloiglobaltrade@gmail.com" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      if (result) {
        result.textContent =
          "Your email app will open with the enquiry prepared. " +
          "Please review and send the email.";
      }

      window.location.href = mailto;
    });
  }
})();
