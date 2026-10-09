function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = text;
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

export function strokaSotrudnika(w) {
  const tr = document.createElement("tr");
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Должность", w.Rabota),
    td("Языки", w.Iziki.join(", ")),
    td("Зарплата", w.Zp),
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
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Должность", w.Rabota),
    td("Зарплата", w.Zp)
  );
  return tr;
}

export function strokaSotrudnikaHigh(w) {
  const tr = document.createElement("tr");
  tr.append(
    td("ID", w.id),
    td("Имя", w.Name),
    td("Фамилия", w.Familia),
    td("Зарплата", w.Zp)
  );
  return tr;
}

export function strokaVakansii(v) {
  const tr = document.createElement("tr");
  tr.append(
    td("ID", v.id),
    td("Должность", v.Dolznost),
    td("Мин. ЗП", v.MinZp),
    td("Макс. ЗП", v.MaxZp),
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
  w.innerHTML = `<div class="empty__icon" aria-hidden="true">🔍</div><p>${text}</p>`;
  return w;
}