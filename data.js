export const rab = [
  { id: 1, Name: "Пётр", Familia: "Первый", Rabota: "Разработчик", Iziki: ["JS", "C++"], Zp: 120000, Posta: "petr@mail.ru", Data: "2023-09-23", Otdel: { id: 1, name: "ИТ" } },
  { id: 2, Name: "Иван", Familia: "Сидоров", Rabota: "Фронтенд-разработчик", Iziki: ["JS", "React", "CSS"], Zp: 135000, Posta: "ivan@mail.ru", Data: "2022-03-15", Otdel: { id: 1, name: "ИТ" } },
  { id: 3, Name: "Анна", Familia: "Кузнецова", Rabota: "Бэкенд-разработчик", Iziki: ["Python", "Django", "SQL"], Zp: 150000, Posta: "anna@mail.ru", Data: "2021-08-11", Otdel: { id: 1, name: "ИТ" } },
  { id: 4, Name: "Сергей", Familia: "Морозов", Rabota: "Инженер", Iziki: ["Docker", "Kubernetes", "Bash"], Zp: 170000, Posta: "sergey@mail.ru", Data: "2020-05-20", Otdel: { id: 1, name: "ИТ" } },
  { id: 5, Name: "Елена", Familia: "Волкова", Rabota: "Тестировщик", Iziki: ["Selenium", "Python"], Zp: 95000, Posta: "elena@mail.ru", Data: "2023-12-01", Otdel: { id: 1, name: "ИТ" } },
  { id: 6, Name: "Дмитрий", Familia: "Новиков", Rabota: "Аналитик", Iziki: ["SQL", "Excel", "Python"], Zp: 110000, Posta: "dmitry@mail.ru", Data: "2022-07-19", Otdel: { id: 2, name: "Аналитика" } },
  { id: 7, Name: "Ольга", Familia: "Фёдорова", Rabota: "Проектный менеджер", Iziki: ["Jira", "Scrum"], Zp: 160000, Posta: "olga@mail.ru", Data: "2019-04-30", Otdel: { id: 3, name: "Управление" } },
  { id: 8, Name: "Алексей", Familia: "Попов", Rabota: "Дизайнер", Iziki: ["Figma", "Photoshop"], Zp: 105000, Posta: "alexey@mail.ru", Data: "2023-06-01", Otdel: { id: 4, name: "Дизайн" } },
  { id: 9, Name: "Мария", Familia: "Соколова", Rabota: "HR-специалист", Iziki: ["Recruiting", "Excel"], Zp: 85000, Posta: "maria@mail.ru", Data: "2021-02-22", Otdel: { id: 5, name: "Кадры" } },
  { id: 10, Name: "Николай", Familia: "Лебедев", Rabota: "Системный администратор", Iziki: ["Linux", "Bash", "Windows"], Zp: 100000, Posta: "nikolay@mail.ru", Data: "2020-10-17", Otdel: { id: 1, name: "ИТ" } },
  { id: 11, Name: "Татьяна", Familia: "Орлова", Rabota: "Дата-сайентист", Iziki: ["Python", "ML", "TensorFlow"], Zp: 200000, Posta: "tatiana@mail.ru", Data: "2022-09-03", Otdel: { id: 2, name: "Аналитика" } },
  { id: 12, Name: "Андрей", Familia: "Козлов", Rabota: "Фулстек-разработчик", Iziki: ["JS", "Node.js", "React", "SQL"], Zp: 180000, Posta: "andrey@mail.ru", Data: "2018-11-25", Otdel: { id: 1, name: "ИТ" } },
  { id: 13, Name: "Светлана", Familia: "Павлова", Rabota: "Менеджер по продажам", Iziki: ["CRM", "Excel"], Zp: 90000, Posta: "svetlana@mail.ru", Data: "2023-08-07", Otdel: { id: 6, name: "Продажи" } },
  { id: 14, Name: "Владимир", Familia: "Степанов", Rabota: "Бухгалтер", Iziki: ["1C", "Excel"], Zp: 88000, Posta: "vladimir@mail.ru", Data: "2021-05-14", Otdel: { id: 7, name: "Финансы" } },
  { id: 15, Name: "Екатерина", Familia: "Николаева", Rabota: "Аналитик", Iziki: ["SQL", "BPMN", "Excel"], Zp: 125000, Posta: "ekaterina@mail.ru", Data: "2022-12-28", Otdel: { id: 2, name: "Аналитика" } }
];

export const vacansi = [
  { id: 1, Dolznost: "Дизайнер", MinZp: 80000, MaxZp: 120000, Otdel: "ИТ", Iziki: ["JS", "C#"], Do: "2030-01-01", Status: "В поиске" },
  { id: 2, Dolznost: "Фронтенд-разработчик", MinZp: 100000, MaxZp: 160000, Otdel: "ИТ", Iziki: ["JS", "React", "CSS"], Do: "2029-06-15", Status: "Отказ" },
  { id: 3, Dolznost: "Бэкенд-разработчик", MinZp: 120000, MaxZp: 200000, Otdel: "ИТ", Iziki: ["Python", "Django", "SQL"], Do: "2029-03-20", Status: "Отказ" },
  { id: 4, Dolznost: "Инженер", MinZp: 150000, MaxZp: 220000, Otdel: "ИТ", Iziki: ["Docker", "Kubernetes", "Bash"], Do: "2028-12-01", Status: "Закрыта" },
  { id: 5, Dolznost: "Тестировщик", MinZp: 70000, MaxZp: 110000, Otdel: "ИТ", Iziki: ["Selenium", "Python"], Do: "2029-09-10", Status: "В поиске" },
  { id: 6, Dolznost: "Аналитик", MinZp: 90000, MaxZp: 140000, Otdel: "Аналитика", Iziki: ["SQL", "Excel", "Python"], Do: "2030-02-28", Status: "Отказ" },
  { id: 7, Dolznost: "Проектный менеджер", MinZp: 130000, MaxZp: 190000, Otdel: "Управление", Iziki: ["Jira", "Scrum"], Do: "2028-11-05", Status: "Закрыта" },
  { id: 8, Dolznost: "Дизайнер", MinZp: 85000, MaxZp: 130000, Otdel: "Дизайн", Iziki: ["Figma", "Photoshop"], Do: "2029-07-22", Status: "В поиске" },
  { id: 9, Dolznost: "HR-специалист", MinZp: 60000, MaxZp: 95000, Otdel: "Кадры", Iziki: ["Recruiting", "Excel"], Do: "2030-04-01", Status: "Отказ" },
  { id: 10, Dolznost: "Системный администратор", MinZp: 80000, MaxZp: 120000, Otdel: "ИТ", Iziki: ["Linux", "Bash", "Windows"], Do: "2029-01-15", Status: "Закрыта" },
  { id: 11, Dolznost: "Дата-сайентист", MinZp: 160000, MaxZp: 250000, Otdel: "Аналитика", Iziki: ["Python", "ML", "TensorFlow"], Do: "2028-10-30", Status: "Отказ" },
  { id: 12, Dolznost: "Фулстек-разработчик", MinZp: 140000, MaxZp: 210000, Otdel: "ИТ", Iziki: ["JS", "Node.js", "React", "SQL"], Do: "2029-05-19", Status: "В поиске" },
  { id: 13, Dolznost: "Менеджер по продажам", MinZp: 70000, MaxZp: 150000, Otdel: "Продажи", Iziki: ["CRM", "Excel"], Do: "2030-03-10", Status: "Отказ" },
  { id: 14, Dolznost: "Технический писатель", MinZp: 65000, MaxZp: 100000, Otdel: "ИТ", Iziki: ["Markdown", "Confluence"], Do: "2029-08-25", Status: "Закрыта" },
  { id: 15, Dolznost: "Аналитик", MinZp: 100000, MaxZp: 150000, Otdel: "Аналитика", Iziki: ["SQL", "BPMN", "Excel"], Do: "2030-05-12", Status: "В поиске" }
];

export const otkliki = [
  { id: 1, RabId: 1, VacansiId: 3, DataOtk: "2024-01-15", Status: "На рассмотрении", Koment: "Отправил резюме", Rezyume: "petr_cv.pdf", Ocenka: 4 },
  { id: 2, RabId: 1, VacansiId: 12, DataOtk: "2024-02-03", Status: "Приглашение", Koment: "Назначено собеседование", Rezyume: "petr_cv_v2.pdf", Ocenka: 5 },
  { id: 3, RabId: 2, VacansiId: 2, DataOtk: "2024-01-20", Status: "Отказ", Koment: "Не подошёл", Rezyume: "ivan_cv.pdf", Ocenka: 2 },
  { id: 4, RabId: 3, VacansiId: 3, DataOtk: "2024-02-10", Status: "Приглашение", Koment: "Первый этап", Rezyume: "anna_cv.pdf", Ocenka: 5 },
  { id: 5, RabId: 4, VacansiId: 4, DataOtk: "2024-01-05", Status: "На рассмотрении", Koment: "Ждёт ответа", Rezyume: "sergey_cv.pdf", Ocenka: 4 },
  { id: 6, RabId: 5, VacansiId: 5, DataOtk: "2024-02-18", Status: "Приглашение", Koment: "Тестовое задание", Rezyume: "elena_cv.pdf", Ocenka: 4 },
  { id: 7, RabId: 6, VacansiId: 6, DataOtk: "2024-01-28", Status: "Отказ", Koment: "Вакансия закрыта", Rezyume: "dmitry_cv.pdf", Ocenka: 3 },
  { id: 8, RabId: 7, VacansiId: 7, DataOtk: "2024-02-01", Status: "На рассмотрении", Koment: "Ждём", Rezyume: "olga_cv.pdf", Ocenka: 5 },
  { id: 9, RabId: 8, VacansiId: 8, DataOtk: "2024-02-14", Status: "Приглашение", Koment: "Портфолио принято", Rezyume: "alexey_cv.pdf", Ocenka: 5 },
  { id: 10, RabId: 9, VacansiId: 9, DataOtk: "2024-01-12", Status: "Отказ", Koment: "Отказ", Rezyume: "maria_cv.pdf", Ocenka: 3 },
  { id: 11, RabId: 10, VacansiId: 10, DataOtk: "2024-02-07", Status: "На рассмотрении", Koment: "Проверка", Rezyume: "nikolay_cv.pdf", Ocenka: 4 },
  { id: 12, RabId: 11, VacansiId: 11, DataOtk: "2024-02-20", Status: "Приглашение", Koment: "—", Rezyume: "tatiana_cv.pdf", Ocenka: 5 },
  { id: 13, RabId: 12, VacansiId: 12, DataOtk: "2024-01-25", Status: "Приглашение", Koment: "Успех", Rezyume: "andrey_cv.pdf", Ocenka: 5 },
  { id: 14, RabId: 13, VacansiId: 13, DataOtk: "2024-02-11", Status: "Отказ", Koment: "Не подошёл", Rezyume: "sveta_cv.pdf", Ocenka: 2 },
  { id: 15, RabId: 14, VacansiId: 14, DataOtk: "2024-02-16", Status: "На рассмотрении", Koment: "Тест", Rezyume: "vladimir_cv.pdf", Ocenka: 3 },
  { id: 16, RabId: 15, VacansiId: 15, DataOtk: "2024-02-22", Status: "Приглашение", Koment: "Согласование", Rezyume: "ekaterina_cv.pdf", Ocenka: 5 },
  { id: 17, RabId: 3, VacansiId: 11, DataOtk: "2024-01-30", Status: "На рассмотрении", Koment: "Повторный отклик", Rezyume: "anna_cv_v2.pdf", Ocenka: 4 },
  { id: 18, RabId: 12, VacansiId: 3, DataOtk: "2024-02-05", Status: "Отказ", Koment: "Отказ", Rezyume: "andrey_cv_v2.pdf", Ocenka: 3 },
  { id: 19, RabId: 2, VacansiId: 12, DataOtk: "2024-02-19", Status: "Приглашение", Koment: "Рекомендован", Rezyume: "ivan_cv_v2.pdf", Ocenka: 5 },
  { id: 20, RabId: 11, VacansiId: 6, DataOtk: "2024-02-24", Status: "На рассмотрении", Koment: "Первый отклик", Rezyume: "tatiana_cv.pdf", Ocenka: 4 }
];