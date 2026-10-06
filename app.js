import { rab, vacansi, otkliki } from "./data.js";
import { strokaSotrudnika, strokaVakansii, strokaOtklika } from "./render.js";

// Zapolnit <tbody> strokami
function zapolnit(idTbody, dannye, funkciyaStroki) {
  const tbody = document.getElementById(idTbody);
  dannye.forEach(el => tbody.appendChild(funkciyaStroki(el)));
}

zapolnit("workers-body",   rab,     strokaSotrudnika);
zapolnit("vacancies-body", vacansi, strokaVakansii);
zapolnit("responses-body", otkliki, strokaOtklika);

// ===== МОДАЛКА =====
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function openModal(title, html) {
  lastFocused = document.activeElement;
  document.getElementById("modal-title").textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add("is-open");
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  if (lastFocused) lastFocused.focus();
}

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest(".modal__close")) closeModal();
});

document.addEventListener("keydown", e => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") trapFocus(e);
});

function trapFocus(e) {
  const f = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

// ===== КЛИК ПО СТРОКЕ → МОДАЛКА =====
document.querySelectorAll(".table tbody").forEach(tbody => {
  tbody.addEventListener("click", e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const cells = [...tr.children].map(td => td.textContent.trim());
    openModal("Детали записи", cells.map(c => `<p>${c}</p>`).join(""));
  });
});

// ===== СОРТИРОВКА =====
document.querySelectorAll(".table th").forEach((th, i) => {
  th.dataset.sort = "";
  th.addEventListener("click", () => {
    const tbody = th.closest("table").querySelector("tbody");
    const dir = th.dataset.sort === "asc" ? "desc" : "asc";
    th.closest("tr").querySelectorAll("th").forEach(x => x.dataset.sort = "");
    th.dataset.sort = dir;
    [...tbody.rows]
      .sort((a, b) => {
        const A = a.cells[i].textContent.trim();
        const B = b.cells[i].textContent.trim();
        const n = parseFloat(A) - parseFloat(B);
        const cmp = !isNaN(n) ? n : A.localeCompare(B, "ru");
        return dir === "asc" ? cmp : -cmp;
      })
      .forEach(r => tbody.appendChild(r));
  });
});

// ===== ФИЛЬТРЫ В КАЖДОЙ СЕКЦИИ =====
document.querySelectorAll(".section").forEach(section => {
  const form = section.querySelector(".filters");
  const tbody = section.querySelector("tbody");
  if (!form || !tbody) return;

  const allRows = [...tbody.rows];

  function apply() {
    const q = form.q.value.trim().toLowerCase();
    const st = form.status.value;
    const onlyOpen = form.onlyOpen?.checked;

    allRows.forEach(tr => {
      const text = tr.textContent.toLowerCase();
      const badge = tr.querySelector(".status");
      const status = badge ? badge.textContent : "";

      const ok =
        (!q || text.includes(q)) &&
        (!st || status === st) &&
        (!onlyOpen || status === "В поиске");

      tr.style.display = ok ? "" : "none";
    });
  }

  form.addEventListener("input", apply);
  form.addEventListener("reset", () => setTimeout(apply, 0));
});

// ===== ПЕРЕКЛЮЧЕНИЕ ВИДА: Таблица / Карточки =====
document.querySelectorAll('input[name="view"]').forEach(r => {
  r.addEventListener("change", () => {
    const table = r.closest(".section").querySelector(".table");
    table.classList.toggle("is-cards", r.value === "cards");
  });
});