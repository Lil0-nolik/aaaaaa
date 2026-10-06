function sozdat(tag, tekst, klass) {
  const node = document.createElement(tag);
  if (tekst !== undefined && tekst !== null) node.textContent = tekst;
  if (klass) node.className = klass;
  return node;
}

function klassStatusa(status) {
  switch (status) {
    case "Приглашение":
    case "Принят":          return "status status--success";
    case "В поиске":        return "status status--warning";
    case "Отказ":
    case "Закрыта":         return "status status--danger";
    case "На рассмотрении": return "status status--info";
  }
}

function td(label, value) {
  const cell = sozdat("td", value);
  cell.dataset.label = label;
  return cell;
}

function tdUz(el, label) {
  const cell = document.createElement("td");
  cell.dataset.label = label;
  cell.appendChild(el);
  return cell;
}

export function strokaSotrudnika(w) {
  const tr = document.createElement("tr");
  tr.appendChild(td("ID", w.id));
  tr.appendChild(td("Имя", w.Name));
  tr.appendChild(td("Фамилия", w.Familia));
  tr.appendChild(td("Должность", w.Rabota));
  tr.appendChild(td("Языки", w.Iziki.join(", ")));
  tr.appendChild(td("Зарплата", w.Zp));
  tr.appendChild(td("Почта", w.Posta));

  const t = sozdat("time", w.Data);
  t.setAttribute("datetime", w.Data);
  tr.appendChild(tdUz(t, "Дата приёма"));

  tr.appendChild(td("Отдел", w.Otdel.name));
  return tr;
}

export function strokaVakansii(v) {
  const tr = document.createElement("tr");
  tr.appendChild(td("ID", v.id));
  tr.appendChild(td("Должность", v.Dolznost));
  tr.appendChild(td("Мин. ЗП", v.MinZp));
  tr.appendChild(td("Макс. ЗП", v.MaxZp));
  tr.appendChild(td("Отдел", v.Otdel));
  tr.appendChild(td("Языки", v.Iziki.join(", ")));

  const t = sozdat("time", v.Do);
  t.setAttribute("datetime", v.Do);
  tr.appendChild(tdUz(t, "Актуальна до"));

  tr.appendChild(tdUz(sozdat("span", v.Status, klassStatusa(v.Status)), "Статус"));
  return tr;
}

export function strokaOtklika(r) {
  const tr = document.createElement("tr");
  tr.appendChild(td("ID", r.id));
  tr.appendChild(td("Сотрудник (ID)", r.RabId));
  tr.appendChild(td("Вакансия (ID)", r.VacansiId));

  const t = sozdat("time", r.DataOtk);
  t.setAttribute("datetime", r.DataOtk);
  tr.appendChild(tdUz(t, "Дата отклика"));

  tr.appendChild(tdUz(sozdat("span", r.Status, klassStatusa(r.Status)), "Статус"));
  tr.appendChild(td("Комментарий", r.Koment));
  tr.appendChild(td("Резюме", r.Rezyume));
  tr.appendChild(td("Оценка", r.Ocenka));
  return tr;
}