import { rab, vacansi, otkliki } from "./data.js";
import { strokaSotrudnika, strokaVakansii, strokaOtklika } from "./render.js";

// Zapolnit <tbody> strokami
function zapolnit(idTbody, dannye, funkciyaStroki) {
  const tbody = document.getElementById(idTbody);
  dannye.forEach(element => tbody.appendChild(funkciyaStroki(element)));
}

zapolnit("workers-body",   rab,     strokaSotrudnika);
zapolnit("vacancies-body", vacansi, strokaVakansii);
zapolnit("responses-body", otkliki, strokaOtklika);