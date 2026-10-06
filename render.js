// Sozdat element s tekstom i (neobyazatelno) klassom
function sozdat(tag, tekst, klass) {
  const node = document.createElement(tag);
  if (tekst !== undefined && tekst !== null) node.textContent = tekst;
  if (klass) node.className = klass;
  return node;
}

// Klass dlya statusa
function klassStatusa(status) {
  if (status === "Приглашен" || status === "Отказ")       return "status status--success";
  if (status === "На рассмотрении" || status === "В проекте") return "status status--warning";
  if (status === "Отказ" || status === "Закрыта")          return "status status--danger";
  return "status status--info";
}

// Stroka tablicy: sotrudnik
export function strokaSotrudnika(w) {
  const tr = document.createElement("tr");

  tr.appendChild(sozdat("td", w.id));
  tr.appendChild(sozdat("td", w.Name));
  tr.appendChild(sozdat("td", w.Familia));
  tr.appendChild(sozdat("td", w.Rabota));
  tr.appendChild(sozdat("td", w.Iziki.join(", ")));
  tr.appendChild(sozdat("td", w.Zp));
  tr.appendChild(sozdat("td", w.Posta));

  const vremya = sozdat("time", w.Data);
  vremya.setAttribute("datetime", w.Data);
  const tdData = document.createElement("td");
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  tr.appendChild(sozdat("td", w.Otdel.name));

  return tr;
}

// Stroka tablicy: vakansiya
export function strokaVakansii(v) {
  const tr = document.createElement("tr");

  tr.appendChild(sozdat("td", v.id));
  tr.appendChild(sozdat("td", v.Dolznost));
  tr.appendChild(sozdat("td", v.MinZp));
  tr.appendChild(sozdat("td", v.MaxZp));
  tr.appendChild(sozdat("td", v.Otdel));
  tr.appendChild(sozdat("td", v.Iziki.join(", ")));

  const vremya = sozdat("time", v.Do);
  vremya.setAttribute("datetime", v.Do);
  const tdData = document.createElement("td");
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  const tdStatus = document.createElement("td");
  tdStatus.appendChild(sozdat("span", v.Status, klassStatusa(v.Status)));
  tr.appendChild(tdStatus);

  return tr;
}

// Stroka tablicy: otklik
export function strokaOtklika(r) {
  const tr = document.createElement("tr");

  tr.appendChild(sozdat("td", r.id));
  tr.appendChild(sozdat("td", r.RabId));
  tr.appendChild(sozdat("td", r.VacansiId));

  const vremya = sozdat("time", r.DataOtk);
  vremya.setAttribute("datetime", r.DataOtk);
  const tdData = document.createElement("td");
  tdData.appendChild(vremya);
  tr.appendChild(tdData);

  const tdStatus = document.createElement("td");
  tdStatus.appendChild(sozdat("span", r.Status, klassStatusa(r.Status)));
  tr.appendChild(tdStatus);

  tr.appendChild(sozdat("td", r.Koment));
  tr.appendChild(sozdat("td", r.Rezyume));
  tr.appendChild(sozdat("td", r.Ocenka));

  return tr;
}