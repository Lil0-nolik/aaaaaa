import { rab, vacansi, otkliki } from "./data.js";
import {
  strokaSotrudnika, strokaSotrudnikaIt, strokaSotrudnikaHigh,
  strokaVakansii, strokaOtklika, sozdatPustoe,
  detalSotrudnika, detalVakansii, detalOtklika
} from "./render.js";

const rabMap = new Map(rab.map(w => [w.id, `${w.Name} ${w.Familia}`]));
const vacMap = new Map(vacansi.map(v => [v.id, v.Dolznost]));

const toastsBox = document.getElementById("toasts");

function showToast(msg, type = "info", ms = 3000) {
  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  toastsBox.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-hiding");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, ms);
}

function zapolnit(id, data, fn) {
  const tbody = document.getElementById(id);
  if (!tbody) return;
  tbody.replaceChildren();
  if (!data.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = tbody.closest("table")?.querySelectorAll("thead th").length || 1;
    td.appendChild(sozdatPustoe());
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  const frag = document.createDocumentFragment();
  data.forEach(item => frag.appendChild(fn(item)));
  tbody.appendChild(frag);
}

zapolnit("workers-body", rab, strokaSotrudnika);
zapolnit("workers-it-body", rab.filter(w => w.Otdel.name === "ИТ"), strokaSotrudnikaIt);
zapolnit("workers-high-body", rab.filter(w => w.Zp > 150000), strokaSotrudnikaHigh);
zapolnit("vacancies-body", vacansi, strokaVakansii);
zapolnit("responses-body", otkliki, r => strokaOtklika(r, rabMap, vacMap));

/* Burger */
const burger = document.querySelector(".burger");
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

burger.addEventListener("click", () => toggleMenu(!sidebar.classList.contains("is-open")));
overlay.addEventListener("click", () => toggleMenu(false));
sidebar.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

/* Theme */
const root = document.documentElement;
const themeSelect = document.getElementById("theme-select");
const accentInput = document.getElementById("accent-input");

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

themeSelect.value = root.getAttribute("data-theme") || "light";
const savedAccent = localStorage.getItem("hr-accent") || "#2563eb";
accentInput.value = savedAccent;
root.style.setProperty("--accent", savedAccent);
root.style.setProperty("--accent-rgb", hexToRgb(savedAccent));

themeSelect.addEventListener("change", () => {
  const t = themeSelect.value;
  root.setAttribute("data-theme", t);
  localStorage.setItem("hr-theme", t);
});

accentInput.addEventListener("input", () => {
  const a = accentInput.value;
  root.style.setProperty("--accent", a);
  root.style.setProperty("--accent-rgb", hexToRgb(a));
  localStorage.setItem("hr-accent", a);
});

// System theme change
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  if (!localStorage.getItem("hr-theme")) {
    root.setAttribute("data-theme", e.matches ? "dark" : "light");
    themeSelect.value = root.getAttribute("data-theme");
  }
});

/* Modal */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function toggleModal(open, title, node) {
  if (open) {
    lastFocused = document.activeElement;
    document.getElementById("modal-title").textContent = title;
    modalBody.replaceChildren();
    if (node) modalBody.appendChild(node);
    const first = modalBody.querySelector("input, button, a") || modal.querySelector(".modal__close");
    first?.focus();
  } else if (lastFocused) {
    lastFocused.focus();
  }
  modal.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
}

const openModal = (t, node) => toggleModal(true, t, node);
const closeModal = () => toggleModal(false);

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest(".modal__close")) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (sidebar.classList.contains("is-open")) {
      toggleMenu(false);
      burger.focus();
    } else if (modal.classList.contains("is-open")) {
      closeModal();
    }
  }
  if (!modal.classList.contains("is-open") || e.key !== "Tab") return;
  const focusable = [...modal.querySelectorAll("button, [href], input, select, textarea")];
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* Form validation */
function validateField(input) {
  const row = input.closest(".form-row");
  const err = row?.querySelector(".form-error");
  if (!row || !err) return true;
  let msg = "";
  const v = input.value.trim();
  if (input.required && !v) msg = "Поле обязательно";
  else if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Некорректный email";
  else if (input.minLength > 0 && v && v.length < input.minLength) msg = `Минимум ${input.minLength} символов`;
  row.classList.toggle("has-error", !!msg);
  input.setAttribute("aria-invalid", String(!!msg));
  err.textContent = msg;
  return !msg;
}

modalBody.addEventListener("input", e => {
  if (e.target.matches("input")) validateField(e.target);
});
modalBody.addEventListener("blur", e => {
  if (e.target.matches("input")) validateField(e.target);
}, true);

modalBody.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const ok = [...form.querySelectorAll("input")].every(validateField);
  if (!ok) {
    showToast("Проверьте поля формы", "error");
    return;
  }
  showToast("Сохранено", "success");
  closeModal();
});

/* Add worker */
document.getElementById("btn-add-worker").addEventListener("click", () => {
  const form = document.createElement("form");
  form.noValidate = true;

  [
    { id: "f-name", label: "Имя *", name: "name", required: true, minlength: 2 },
    { id: "f-email", label: "Email *", name: "email", required: true, type: "email" },
    { id: "f-job", label: "Должность *", name: "job", required: true, minlength: 3 }
  ].forEach(f => {
    const row = el("div", null, "form-row");
    const label = el("label", f.label);
    label.htmlFor = f.id;
    const input = document.createElement("input");
    input.id = f.id;
    input.name = f.name;
    input.type = f.type || "text";
    if (f.required) input.required = true;
    if (f.minlength) input.minLength = f.minlength;
    const err = el("p", "", "form-error");
    err.setAttribute("aria-live", "polite");
    row.append(label, input, err);
    form.appendChild(row);
  });

  const submit = el("button", "Сохранить", "btn btn--primary");
  submit.type = "submit";
  form.appendChild(submit);
  openModal("Новый сотрудник", form);
});

function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = String(text);
  if (cls) n.className = cls;
  return n;
}

/* Tabs */
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

/* Accordion */
document.querySelectorAll(".accordion__trigger").forEach(btn => {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (panel) panel.hidden = open;
  });
});

/* Filters + view toggle + row click */
document.querySelectorAll(".section").forEach(section => {