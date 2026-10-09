function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = String(text);
  if (cls) n.className = cls;
  return n;
}

function statusClass(s) {
  if (s === "Приглашение") return "status status--success";
  if (s === "В поиске") return "status status--warning";
  if (s === "Отказ" || s === "Закрыта") return "status status--danger";
  if (s === "На рассмотрении") return "status status--info";
  return "status";
}

function td(label, value) {
  const c = el("td", value);
  c.dataset.label = label;
  return c;
}

function tdEl(node, label) {
  const c = document.createElement("td");
  c.dataset.label = label;
  c.appendChild(node);
  return c;
}

function fmtZp(n) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function strokaSotrudnika(w) {
  const tr = document.createElement("tr");
  tr.dataset.id = w.id;
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Должность", w.Rabota),
    td("Языки", w.Iziki.join(", ")),
    td("Зарплата", fmtZp(w.Zp)),
    td("Почта", w.Posta)
  );
  const t = el("time", w.Data);
  t.dateTime = w.Data;
  tr.append(tdEl(t, "Дата"), td("Отдел", w.Otdel.name));
  return tr;
}

export function strokaSotrudnikaIt(w) {
  const tr = document.createElement("tr");
  tr.dataset.id = w.id;
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Должность", w.Rabota),
    td("Зарплата", fmtZp(w.Zp))
  );
  return tr;
}

export function strokaSotrudnikaHigh(w) {
  const tr = document.createElement("tr");
  tr.dataset.id = w.id;
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Зарплата", fmtZp(w.Zp))
  );
  return tr;
}

export function strokaVakansii(v) {
  const tr = document.createElement("tr");
  tr.dataset.id = v.id;
  tr.append(
    td("ID", v.id),
    td("Должность", v.Dolznost),
    td("Мин. ЗП", fmtZp(v.MinZp)),
    td("Макс. ЗП", fmtZp(v.MaxZp)),
    td("Отдел", v.Otdel),
    td("Языки", v.Iziki.join(", "))
  );
  const t = el("time", v.Do);
  t.dateTime = v.Do;
  tr.append(tdEl(t, "До"), tdEl(el("span", v.Status, statusClass(v.Status)), "Статус"));
  return tr;
}

export function strokaOtklika(r, rabMap, vacMap) {
  const tr = document.createElement("tr");
  tr.dataset.id = r.id;
  const name = rabMap.get(r.RabId) || `#${r.RabId}`;
  const job = vacMap.get(r.VacansiId) || `#${r.VacansiId}`;
  tr.append(
    td("ID", r.id),
    td("Сотрудник", name),
    td("Вакансия", job)
  );
  const t = el("time", r.DataOtk);
  t.dateTime = r.DataOtk;
  tr.append(
    tdEl(t, "Дата"),
    tdEl(el("span", r.Status, statusClass(r.Status)), "Статус"),
    td("Комментарий", r.Koment),
    td("Резюме", r.Rezyume),
    td("Оценка", r.Ocenka)
  );
  return tr;
}

export function sozdatPustoe(text = "Ничего не найдено") {
  const w = document.createElement("div");
  w.className = "empty";
  const icon = el("div", "🔍", "empty__icon");
  icon.setAttribute("aria-hidden", "true");
  w.append(icon, el("p", text));
  return w;
}

export function detalSotrudnika(w) {
  const wrap = el("div", null, "detail");
  [
    ["ID", w.id], ["Имя", w.Name], ["Фамилия", w.Familia],
    ["Должность", w.Rabota], ["Языки", w.Iziki.join(", ")],
    ["Зарплата", fmtZp(w.Zp)], ["Почта", w.Posta],
    ["Дата приёма", w.Data], ["Отдел", w.Otdel.name]
  ].forEach(([k, v]) => {
    const p = document.createElement("p");
    p.append(el("strong", k + ": "), document.createTextNode(String(v)));
    wrap.appendChild(p);
  });
  return wrap;
}

export function detalVakansii(v) {
  const wrap = el("div", null, "detail");
  [
    ["ID", v.id], ["Должность", v.Dolznost],
    ["Мин. ЗП", fmtZp(v.MinZp)], ["Макс. ЗП", fmtZp(v.MaxZp)],
    ["Отдел", v.Otdel], ["Языки", v.Iziki.join(", ")],
    ["Актуальна до", v.Do], ["Статус", v.Status]
  ].forEach(([k, v]) => {
    const p = document.createElement("p");
    p.append(el("strong", k + ": "), document.createTextNode(String(v)));
    wrap.appendChild(p);
  });
  return wrap;
}

export function detalOtklika(r, rabMap, vacMap) {
  const wrap = el("div", null, "detail");
  [
    ["ID", r.id],
    ["Сотрудник", rabMap.get(r.RabId) || r.RabId],
    ["Вакансия", vacMap.get(r.VacansiId) || r.VacansiId],
    ["Дата", r.DataOtk], ["Статус", r.Status],
    ["Комментарий", r.Koment], ["Резюме", r.Rezyume], ["Оценка", r.Ocenka]
  ].forEach(([k, v]) => {
    const p = document.createElement("p");
    p.append(el("strong", k + ": "), document.createTextNode(String(v)));
    wrap.appendChild(p);
  });
  return wrap;
}