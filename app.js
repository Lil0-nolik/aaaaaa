import { rab, vacansi, otkliki } from "./data.js";
import { strokaSotrudnika, strokaVakansii, strokaOtklika } from "./render.js";

/* ===== ЗАПОЛНЕНИЕ ТАБЛИЦ ===== */
function zapolnit(id, dannye, fn) {
  const tbody = document.getElementById(id);
  dannye.forEach(el => tbody.appendChild(fn(el)));
}
zapolnit("workers-body",   rab,     strokaSotrudnika);
zapolnit("vacancies-body", vacansi, strokaVakansii);
zapolnit("responses-body", otkliki, strokaOtklika);

/* ===== МОДАЛКА ===== */
const modal     = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function toggleModal(open, title, html) {
  if (open) {
    lastFocused = document.activeElement;
    document.getElementById("modal-title").textContent = title;
    modalBody.innerHTML = html;
    modal.querySelector(".modal__close").focus();
  } else if (lastFocused) {
    lastFocused.focus();
  }
  modal.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}
const openModal  = (t, h) => toggleModal(true, t, h);
const closeModal = ()  => toggleModal(false);

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest(".modal__close")) closeModal();
});

document.addEventListener("keydown", e => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") return closeModal();
  if (e.key !== "Tab") return;
  const f = modal.querySelectorAll("button, [href], input, select, textarea");
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ===== ЛОГИКА ПО КАЖДОЙ СЕКЦИИ (один проход) ===== */
document.querySelectorAll(".section").forEach(section => {
  const form  = section.querySelector(".filters");
  const table = section.querySelector(".table");
  const tbody = table.querySelector("tbody");
  const allRows = [...tbody.rows];

  /* --- фильтры --- */
  function apply() {
    const q        = form.q.value.trim().toLowerCase();
    const st       = form.status.value;
    const onlyOpen = form.onlyOpen.checked;
    const openStatus = form.status.dataset.open || "В поиске";

    allRows.forEach(tr => {
      const text   = tr.textContent.toLowerCase();
      const badge  = tr.querySelector(".status");
      const status = badge ? badge.textContent : "";
      const ok =
        (!q || text.includes(q)) &&
        (!st || status === st) &&
        (!onlyOpen || status === openStatus);
      tr.style.display = ok ? "" : "none";
    });
  }
  form.addEventListener("input", apply);
  form.addEventListener("reset", () => setTimeout(apply, 0));

  /* --- переключение таблица / карточки --- */
  section.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener("change", () =>
      table.classList.toggle("is-cards", r.value === "cards")
    );
  });

  /* --- клик по строке → модалка --- */
  tbody.addEventListener("click", e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const cells = [...tr.children].map(c => c.textContent.trim());
    openModal("Детали записи", cells.map(c => `<p>${c}</p>`).join(""));
  });

  /* --- сортировка по клику на th --- */
  table.querySelectorAll("th").forEach((th, i) => {
    th.dataset.sort = "";
    th.addEventListener("click", () => {
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
});

/* ===== АДАПТИВ: таблицы → карточки на узких экранах ===== */
const mq = matchMedia("(max-width: 768px)");
const syncCards = () => {
  document.querySelectorAll(".table").forEach(t =>
    t.classList.toggle("is-cards", mq.matches)
  );
};
mq.addEventListener("change", syncCards);
syncCards();