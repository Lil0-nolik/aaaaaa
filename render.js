// Sozdat element s tekstom i (neobyazatelno) klassom
function sozdat(tag, tekst, klass) {
  const node = document.createElement(tag);
  if (tekst !== undefined && tekst !== null) node.textContent = tekst;
  if (klass) node.className = klass;
  return node;
}

function klassStatusa(status) {
  switch (status) {
    case "Приглашение":
    case "Принят":
      return "status status--success";
    case "В поиске":
      return "status status--warning";
    case "Отказ":
    case "Закрыта":
      return "status status--danger";
    case "На рассмотрении":
      return "status status--info";
  }
}

// Universal: sozdat td s data-label
function td(label, value) {
  const cell = sozdat("td", value);
  cell.dataset.label = label;
  return cell;
}

// Stroka tablicy: sotrudnik
export function strokaSotrudnika(w) {
  const tr = document.createElement("tr");

  tr.appendChild(td("ID", w.id));
  tr.appendChild(td("Имя", w.Name));
  tr.appendChild(td("Фамилия", w.Familia));
  tr.appendChild(td("Должность", w.Rabota));
  tr.appendChild(td("Языки", w.Iziki.join(", ")));
  tr.appendChild(td("Зарплата", w.Zp));
  tr.appendChild(td("Почта", w.Posta));

  const vremya = sozdat("time", w.Data);
  vremya.setAttribute("datetime", w.Data);
  const tdData = td("Дата приёма", "");
  tdData.textContent = "";
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  tr.appendChild(td("Отдел", w.Otdel.name));

  return tr;
}

// Stroka tablicy: vakansiya
export function strokaVakansii(v) {
  const tr = document.createElement("tr");

  tr.appendChild(td("ID", v.id));
  tr.appendChild(td("Должность", v.Dolznost));
  tr.appendChild(td("Мин. ЗП", v.MinZp));
  tr.appendChild(td("Макс. ЗП", v.MaxZp));
  tr.appendChild(td("Отдел", v.Otdel));
  tr.appendChild(td("Языки", v.Iziki.join(", ")));

  const vremya = sozdat("time", v.Do);
  vremya.setAttribute("datetime", v.Do);
  const tdData = td("Актуальна до", "");
  tdData.textContent = "";
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  const tdStatus = td("Статус", "");
  tdStatus.textContent = "";
  tdStatus.appendChild(sozdat("span", v.Status, klassStatusa(v.Status)));
  tr.appendChild(tdStatus);

  return tr;
}

// Stroka tablicy: otklik
export function strokaOtklika(r) {
  const tr = document.createElement("tr");

  tr.appendChild(td("ID", r.id));
  tr.appendChild(td("Сотрудник (ID)", r.RabId));
  tr.appendChild(td("Вакансия (ID)", r.VacansiId));

  const vremya = sozdat("time", r.DataOtk);
  vremya.setAttribute("datetime", r.DataOtk);
  const tdData = td("Дата отклика", "");
  tdData.textContent = "";
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  const tdStatus = td("Статус", "");
  tdStatus.textContent = "";
  tdStatus.appendChild(sozdat("span", r.Status, klassStatusa(r.Status)));
  tr.appendChild(tdStatus);

  tr.appendChild(td("Комментарий", r.Koment));
  tr.appendChild(td("Резюме", r.Rezyume));
  tr.appendChild(td("Оценка", r.Ocenka));

  return tr;
}