function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = String(text);
  if (cls) n.className = cls;
  return n;
}

function statusClass(s) {
  switch (s) {
    case "Приглашение":
    case "Принят":          return "status status--success";
    case "В поиске":        return "status status--warning";
    case "Отказ":
    case "Закрыта":         return "status status--danger";
    case "На рассмотрении": return "status status--info";
  }
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
  t.setAttribute("datetime", w.Data);
  tr.appendChild(tdEl(t, "Дата приёма"));
  tr.appendChild(td("Отдел", w.Otdel.name));
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
  t.setAttribute("datetime", v.Do);
  tr.appendChild(tdEl(t, "Актуальна до"));
  tr.appendChild(tdEl(el("span", v.Status, statusClass(v.Status)), "Статус"));
  return tr;
}

export function strokaOtklika(r) {
  const tr = document.createElement("tr");
  tr.dataset.id = r.id;
  tr.append(
    td("ID", r.id),
    td("Сотрудник", r.RabId),
    td("Вакансия", r.VacansiId)
  );
  const t = el("time", r.DataOtk);
  t.setAttribute("datetime", r.DataOtk);
  tr.appendChild(tdEl(t, "Дата"));
  tr.appendChild(tdEl(el("span", r.Status, statusClass(r.Status)), "Статус"));
  tr.append(
    td("Комментарий", r.Koment),
    td("Резюме", r.Rezyume),
    td("Оценка", r.Ocenka)
  );
  return tr;
}

export function sozdatPustoe(text = "Ничего не найдено") {
  const w = document.createElement("div");
  w.className = "empty";
  const icon = document.createElement("div");
  icon.className = "empty__icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "🔍";
  const p = document.createElement("p");
  p.textContent = text;
  w.append(icon, p);
  return w;
}

/* --- Модалка: детальная карточка --- */
export function detalSotrudnika(w) {
  const wrap = document.createElement("div");
  wrap.className = "detail";
  const rows = [
    ["ID", w.id],
    ["Имя", w.Name],
    ["Фамилия", w.Familia],
    ["Должность", w.Rabota],
    ["Языки", w.Iziki.join(", ")],
    ["Зарплата", fmtZp(w.Zp)],
    ["Почта", w.Posta],
    ["Дата приёма", w.Data],
    ["Отдел", w.Otdel.name]
  ];
  rows.forEach(([k, v]) => {
    const p = document.createElement("p");
    const b = document.createElement("strong");
    b.textContent = k + ": ";
    p.append(b, document.createTextNode(String(v)));
    wrap.appendChild(p);
  });
  return wrap;
}

export function detalVakansii(v) {
  const wrap = document.createElement("div");
  wrap.className = "detail";
  const rows = [
    ["ID", v.id],
    ["Должность", v.Dolznost],
    ["Мин. ЗП", fmtZp(v.MinZp)],
    ["Макс. ЗП", fmtZp(v.MaxZp)],
    ["Отдел", v.Otdel],
    ["Языки", v.Iziki.join(", ")],
    ["Актуальна до", v.Do],
    ["Статус", v.Status]
  ];
  rows.forEach(([k, val]) => {
    const p = document.createElement("p");
    const b = document.createElement("strong");
    b.textContent = k + ": ";
    p.append(b, document.createTextNode(String(val)));
    wrap.appendChild(p);
  });
  return wrap;
}

export function detalOtklika(r) {
  const wrap = document.createElement("div");
  wrap.className = "detail";
  const rows = [
    ["ID", r.id],
    ["Сотрудник (ID)", r.RabId],
    ["Вакансия (ID)", r.VacansiId],
    ["Дата", r.DataOtk],
    ["Статус", r.Status],
    ["Комментарий", r.Koment],
    ["Резюме", r.Rezyume],
    ["Оценка", r.Ocenka]
  ];
  rows.forEach(([k, v]) => {
    const p = document.createElement("p");
    const b = document.createElement("strong");
    b.textContent = k + ": ";
    p.append(b, document.createTextNode(String(v)));
    wrap.appendChild(p);
  });
  return wrap;
}

export { statusClass };