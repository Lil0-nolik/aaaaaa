import { rab, vacansi, otkliki } from "./data.js";
import {
  strokaSotrudnika,
  strokaSotrudnikaIt,
  strokaSotrudnikaHigh,
  strokaVakansii,
  strokaOtklika,
  sozdatPustoe,
  detalSotrudnika,
  detalVakansii,
  detalOtklika
} from "./render.js";

/* ==================== TOAST ==================== */
const toastsBox = document.getElementById("toasts");
function showToast(msg, type = "info", ms = 3500) {
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.setAttribute("role", type === "error" ? "alert" : "status");
  el.textContent = msg;
  toastsBox.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-hiding");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, ms);
}

/* ==================== РЕНДЕР ТАБЛИЦ ==================== */
function zapolnit(id, dannye, fn) {
  const tbody = document.getElementById(id);
  if (!tbody) return;
  tbody.replaceChildren();
  if (!dannye.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const ths = tbody.closest("table")?.querySelectorAll("thead th").length || 1;
    td.colSpan = ths;
    td.appendChild(sozdatPustoe());
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  const frag = document.createDocumentFragment();
  dannye.forEach(el => frag.appendChild(fn(el)));
  tbody.appendChild(frag);
}

zapolnit("workers-body", rab, strokaSotrudnika);
zapolnit("vacancies-body", vacansi, strokaVakansii);
zapolnit("responses-body", otkliki, strokaOtklika);
zapolnit("workers-it-body", rab.filter(w => w.Otdel.name === "ИТ"), strokaSotrudnikaIt);
zapolnit("workers-high-body", rab.filter(w => w.Zp > 150000), strokaSotrudnikaHigh);

/* ==================== БУРГЕР-МЕНЮ ==================== */
const burger  = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

function toggleMenu(open) {
  sidebar.classList.toggle("is-open", open);
  overlay.classList.toggle("is-open", open);
  overlay.hidden = !open;
  burger.classList.toggle("is-active", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("no-scroll", open);
}
burger.addEventListener("click", () =>
  toggleMenu(!sidebar.classList.contains("is-open")));
overlay.addEventListener("click", () => toggleMenu(false));
sidebar.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => toggleMenu(false)));

/* ==================== ТЕМА / АКЦЕНТ ==================== */
const themeSelect = document.getElementById("theme-select");
const accentInput = document.getElementById("accent-input");
const root = document.documentElement;

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

// начальные значения
themeSelect.value = root.getAttribute("data-theme") || "light";
const savedAccent = localStorage.getItem("hr-accent") || "#2563eb";
accentInput.value = savedAccent;
root.style.setProperty("--accent", savedAccent);
root.style.setProperty("--accent-rgb", hexToRgb(savedAccent));

themeSelect.addEventListener("change", () => {
  const t = themeSelect.value;
  root.setAttribute("data-theme", t);
  try { localStorage.setItem("hr-theme", t); } catch (e) {}
});

accentInput.addEventListener("input", () => {
  const a = accentInput.value;
  root.style.setProperty("--accent", a);
  root.style.setProperty("--accent-rgb", hexToRgb(a));
  try { localStorage.setItem("hr-accent", a); } catch (e) {}
});

/* ==================== МОДАЛКА ==================== */
const modal     = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function toggleModal(open, title, node) {
  if (open) {
    lastFocused = document.activeElement;
    document.getElementById("modal-title").textContent = title;
    modalBody.replaceChildren();
    if (node) modalBody.appendChild(node);
    const first = modalBody.querySelector("input, textarea, button, a[href]");
    (first || modal.querySelector(".modal__close")).focus();
  } else if (lastFocused) {
    lastFocused.focus();
  }
  modal.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}
const openModal  = (t, node) => toggleModal(true, t, node);
const closeModal = ()  => toggleModal(false);

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest(".modal__close")) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && sidebar.classList.contains("is-open")) {
    toggleMenu(false); burger.focus(); return;
  }
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") return closeModal();
  if (e.key !== "Tab") return;
  const f = modal.querySelectorAll('button, [href], input, select, textarea');
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ==================== ВАЛИДАЦИЯ ==================== */
function validateField(input) {
  const row = input.closest(".form-row");
  const err = row?.querySelector(".form-error");
  if (!row || !err) return true;
  let msg = "";
  const v = input.value.trim();
  if (input.required && !v) msg = "Поле обязательно";
  else if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
    msg = "Некорректный email";
  else if (input.minLength > 0 && v && v.length < input.minLength)
    msg = `Минимум ${input.minLength} символов`;
  else if (input.maxLength > 0 && v.length > input.maxLength)
    msg = `Максимум ${input.maxLength} символов`;
  row.classList.toggle("has-error", !!msg);
  input.setAttribute("aria-invalid", String(!!msg));
  err.textContent = msg;
  return !msg;
}

modalBody.addEventListener("input", e => {
  if (e.target.matches("input, textarea")) validateField(e.target);
});
modalBody.addEventListener("blur", e => {
  if (e.target.matches("input, textarea")) validateField(e.target);
}, true);
modalBody.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const fields = [...form.querySelectorAll("input, textarea")];
  const ok = fields.every(validateField);
  if (!ok) { showToast("Проверьте поля формы", "error"); return; }
  showToast("Сохранено", "success");
  closeModal();
});

/* ==================== ФОРМА ДОБАВЛЕНИЯ ==================== */
document.getElementById("btn-add-worker").addEventListener("click", () => {
  const form = document.createElement("form");
  form.noValidate = true;

  const fields = [
    { id: "f-name",  label: "Имя *",        name: "name",  required: true,  minlength: 2, maxlength: 40, type: "text" },
    { id: "f-email", label: "Email *",      name: "email", required: true,  type: "email" },
    { id: "f-job",   label: "Должность *",  name: "job",   required: true,  minlength: 3, maxlength: 60, type: "text" }
  ];

  fields.forEach(f => {
    const row = document.createElement("div");
    row.className = "form-row";
    const label = document.createElement("label");
    label.setAttribute("for", f.id);
    label.textContent = f.label;
    const input = document.createElement("input");
    input.id = f.id;
    input.name = f.name;
    input.type = f.type;
    if (f.required) input.required = true;
    if (f.minlength) input.minLength = f.minlength;
    if (f.maxlength) input.maxLength = f.maxlength;
    const err = document.createElement("p");
    err.className = "form-error";
    err.setAttribute("aria-live", "polite");
    row.append(label, input, err);
    form.appendChild(row);
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "btn btn--primary";
  submit.textContent = "Сохранить";
  form.appendChild(submit);

  openModal("Новый сотрудник", form);
});

/* ==================== ТАБЫ ==================== */
document.querySelectorAll(".tabs").forEach(tabs => {
  const list = tabs.querySelector('[role="tablist"]');
  if (!list) return;
  const btns = [...list.querySelectorAll('[role="tab"]')];
  const panels = btns.map(b => document.getElementById(b.getAttribute("aria-controls")));

  function select(i, focus = true) {
    btns.forEach((b, k) => {
      const on = k === i;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (panels[k]) {
        panels[k].hidden = !on;
        panels[k].classList.toggle("is-active", on);
      }
    });
    if (focus) btns[i].focus();
  }

  btns.forEach((b, i) => {
    b.addEventListener("click", () => select(i, false));
    b.addEventListener("keydown", e => {
      let n = i;
      if (e.key === "ArrowRight") n = (i + 1) % btns.length;
      else if (e.key === "ArrowLeft") n = (i - 1 + btns.length) % btns.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = btns.length - 1;
      else return;
      e.preventDefault();
      select(n);
    });
  });
});

/* ==================== АККОРДЕОН ==================== */
document.querySelectorAll(".accordion__trigger").forEach(btn => {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) panel.hidden = open;
  });
});

/* ==================== СОРТИРОВКА ТАБЛИЦ ==================== */
function setupSort(table) {
  const thead = table.tHead;
  if (!thead) return;
  const ths = [...thead.rows[0].cells];
  ths.forEach((th, idx) => {
    th.tabIndex = 0;
    th.setAttribute("role", "button");
    th.addEventListener("click", () => sortBy(table, idx, th));
    th.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sortBy(table, idx, th); }
    });
  });
}

function sortBy(table, idx, th) {
  const tbody = table.tBodies[0];
  const rows = [...tbody.rows].filter(r => r.cells.length > 1 || !r.querySelector(".empty"));
  if (!rows.length) return;

  const cur = th.dataset.sort;
  const next = cur === "asc" ? "desc" : "asc";
  table.querySelectorAll("th[data-sort]").forEach(x => x.removeAttribute("data-sort"));
  th.dataset.sort = next;

  const dir = next === "asc" ? 1 : -1;

  function key(r) {
    const cell = r.cells[idx];
    if (!cell) return "";
    const t = cell.textContent.trim();
    const num = parseFloat(t.replace(/[^\d.,-]/g, "").replace(",", "."));
    if (!isNaN(num) && /[\d]/.test(t)) return num;
    return t.toLowerCase();
  }

  rows.sort((a, b) => {
    const ka = key(a), kb = key(b);
    if (typeof ka === "number" && typeof kb === "number") return (ka - kb) * dir;
    return String(ka).localeCompare(String(kb), "ru") * dir;
  });

  const frag = document.createDocumentFragment();
  rows.forEach(r => frag.appendChild(r));
  tbody.appendChild(frag);
}

document.querySelectorAll(".table").forEach(setupSort);

/* ==================== ФИЛЬТРЫ / КЛИК ПО СТРОКЕ ==================== */
document.querySelectorAll(".section").forEach(section => {
  const form  = section.querySelector(".filters");
  const table = section.querySelector(".table");
  const tbody = table?.querySelector("tbody");
  if (!tbody) return;

  if (form) {
    function apply() {
      const q = form.q?.value.trim().toLowerCase() || "";
      const st = form.status?.value || "";
      const onlyOpen = form.onlyOpen?.checked || false;
      const openStatus = form.status?.dataset.open || "";
      [...tbody.rows].forEach(tr => {
        if (tr.querySelector(".empty")) { tr.style.display = ""; return; }
        const text = tr.textContent.toLowerCase();
        const badge = tr.querySelector(".status");
        const status = badge ? badge.textContent : "";
        const ok = (!q || text.includes(q)) &&
                   (!st || status === st) &&
                   (!onlyOpen || status === openStatus);
        tr.style.display = ok ? "" : "none";
      });
    }
    form.addEventListener("input", apply);
    form.addEventListener("change", apply);
    form.addEventListener("reset", () => setTimeout(apply, 0));
  }

  section.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener("change", () => {
      if (r.checked) table.classList.toggle("is-cards", r.value === "cards");
    });
  });

  /* --- Делегирование клика по строкам --- */
  tbody.addEventListener("click", e => {
    const tr = e.target.closest("tr");
    if (!tr || tr.querySelector(".empty")) return;
    const id = Number(tr.dataset.id);
    if (!id) return;

    if (table.closest("#workers") || section.id === "workers") {
      const w = rab.find(x => x.id === id);
      if (w) openModal(`Сотрудник #${w.id}`, detalSotrudnika(w));
    } else if (section.id === "vacancies") {
      const v = vacansi.find(x => x.id === id);
      if (v) openModal(`Вакансия #${v.id}`, detalVakansii(v));
    } else if (section.id === "responses") {
      const r = otkliki.find(x => x.id === id);
      if (r) openModal(`Отклик #${r.id}`, detalOtklika(r));
    }
  });
});

/* ==================== ПАГИНАЦИЯ ОТКЛИКОВ ==================== */
(function setupPagination() {
  const nav = document.getElementById("responses-pagination");
  const tbody = document.getElementById("responses-body");
  if (!nav || !tbody) return;

  const PER_PAGE = 5;
  let page = 1;

  function render() {
    const all = [...tbody.rows].filter(r => !r.querySelector(".empty"));
    const total = Math.max(1, Math.ceil(all.length / PER_PAGE));
    if (page > total) page = total;

    all.forEach((r, i) => {
      const show = i >= (page - 1) * PER_PAGE && i < page * PER_PAGE;
      r.style.display = show ? "" : "none";
    });

    nav.replaceChildren();
    if (total <= 1) return;

    function btn(label, p, opts = {}) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (opts.current) b.setAttribute("aria-current", "page");
      if (opts.disabled) b.disabled = true;
      b.addEventListener("click", () => { page = p; render(); });
      return b;
    }

    nav.appendChild(btn("←", page - 1, { disabled: page === 1 }));
    for (let i = 1; i <= total; i++) {
      nav.appendChild(btn(String(i), i, { current: i === page }));
    }
    nav.appendChild(btn("→", page + 1, { disabled: page === total }));
  }

  // пересобираем пагинацию при фильтрации
  const form = document.querySelector("#responses .filters");
  if (form) {
    form.addEventListener("input", () => { page = 1; render(); });
    form.addEventListener("change", () => { page = 1; render(); });
    form.addEventListener("reset", () => { page = 1; setTimeout(render, 0); });
  }
  render();
})();

/* ==================== СОРТИРОВКА ВНУТРИ ПАГИНАЦИИ ==================== */
// при сортировке откликов сбрасываем страницу
document.querySelectorAll("#responses th").forEach(th => {
  th.addEventListener("click", () => {
    const nav = document.getElementById("responses-pagination");
    if (nav) {
      const first = nav.querySelector('button[aria-current="page"]');
      if (first) first.click();
    }
  });
});