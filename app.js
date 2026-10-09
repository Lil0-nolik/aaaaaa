import { rab, vacansi, otkliki } from "./data.js";
import {
  strokaSotrudnika,
  strokaSotrudnikaIt,
  strokaSotrudnikaHigh,
  strokaVakansii,
  strokaOtklika,
  sozdatPustoe
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

/* ==================== ЗАПОЛНЕНИЕ ==================== */
function zapolnit(id, dannye, fn) {
  const tbody = document.getElementById(id);
  if (!tbody) return;
  tbody.replaceChildren();
  if (!dannye.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = tbody.closest("table").querySelectorAll("thead th").length || 1;
    td.appendChild(sozdatPustoe());
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  const frag = document.createDocumentFragment();
  dannye.forEach(el => frag.appendChild(fn(el)));
  tbody.appendChild(frag);
}

/* Заполняем всё сразу (без skeleton — для надёжности) */
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

themeSelect.value = root.getAttribute("data-theme") || "light";
accentInput.value = localStorage.getItem("hr-accent") || "#2563eb";

themeSelect.addEventListener("change", () => {
  const t = themeSelect.value;
  root.setAttribute("data-theme", t);
  try { localStorage.setItem("hr-theme", t); } catch(e){}
});
accentInput.addEventListener("input", () => {
  const a = accentInput.value;
  const h = a.replace("#","");
  const n = parseInt(h, 16);
  const rgb = `${(n>>16)&255},${(n>>8)&255},${n&255}`;
  root.style.setProperty("--accent", a);
  root.style.setProperty("--accent-rgb", rgb);
  try { localStorage.setItem("hr-accent", a); } catch(e){}
});

/* ==================== МОДАЛКА ==================== */
const modal     = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function toggleModal(open, title, html) {
  if (open) {
    lastFocused = document.activeElement;
    document.getElementById("modal-title").textContent = title;
    modalBody.innerHTML = html;
    const first = modalBody.querySelector("input, textarea, button");
    (first || modal.querySelector(".modal__close")).focus();
  } else if (lastFocused) lastFocused.focus();
  modal.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}
const openModal  = (t, h) => toggleModal(true, t, h);
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
  openModal("Новый сотрудник", `
    <form novalidate>
      <div class="form-row">
        <label for="f-name">Имя *</label>
        <input id="f-name" name="name" required minlength="2" maxlength="40">
        <p class="form-error" aria-live="polite"></p>
      </div>
      <div class="form-row">
        <label for="f-email">Email *</label>
        <input id="f-email" name="email" type="email" required>
        <p class="form-error" aria-live="polite"></p>
      </div>
      <div class="form-row">
        <label for="f-job">Должность *</label>
        <input id="f-job" name="job" required minlength="3" maxlength="60">
        <p class="form-error" aria-live="polite"></p>
      </div>
      <button type="submit" class="btn btn--primary">Сохранить</button>
    </form>
  `);
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

/* ==================== ФИЛЬТРЫ / СОРТИРОВКА / КЛИК ==================== */
document.querySelectorAll(".section").forEach(section => {
  const form  = section.querySelector(".filters");
  const table = section.querySelector(".table");
  const tbody = table?.querySelector("tbody");
  if (!tbody) return;
  const allRows = [...tbody.rows];

  if (form) {
    function apply() {
      const q = form.q?.value.trim().toLowerCase() || "";
      const st = form.status?.value || "";
      const onlyOpen = form.onlyOpen?.checked || false;
      const openStatus = form.status?.dataset.open || "";
      allRows.forEach(tr => {
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
    form.addEventListener("reset", () => setTimeout(apply, 0));
  }

  section.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener("change", () => {
      if (r.checked) table.classList.toggle("is-cards", r.value === "cards");
    });
  });

  tbody.addEventListener("click", e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const cells =