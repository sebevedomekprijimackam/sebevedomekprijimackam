/*
  VIZUÁLNÍ KALENDÁŘ ROZVRHU
  -------------------------
  Tady jsou zapsaná všechna data lekcí (matematika, český jazyk, seberozvoj).
  Kalendář se sám vykreslí pro měsíce září 2026 – duben 2027, dá se překlikávat šipkami.
  Kliknutím na den s lekcí se dole zobrazí, o jakou lekci jde a v kolik.
*/
(function () {
  var MONTH_NAMES = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
  var WEEKDAY_LABELS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

  // Rozsah měsíců, které se dají v kalendáři zobrazit.
  var MONTHS = [
    { y: 2026, m: 9 }, { y: 2026, m: 10 }, { y: 2026, m: 11 }, { y: 2026, m: 12 },
    { y: 2027, m: 1 }, { y: 2027, m: 2 }, { y: 2027, m: 3 }, { y: 2027, m: 4 }
  ];

  // Každý řádek = jedna pravidelná lekce (předmět + čas) a seznam dat, kdy proběhne.
  var RANGES = [
    { subject: "mat", label: "Matematika · pondělí 14:30–15:30", dates: ["14.9.2026", "21.9.2026", "5.10.2026", "12.10.2026", "19.10.2026", "2.11.2026", "9.11.2026", "16.11.2026", "23.11.2026", "30.11.2026"] },
    { subject: "mat", label: "Matematika · úterý 14:30–15:30 nebo 16:50–17:50", dates: ["15.9.2026", "22.9.2026", "29.9.2026", "6.10.2026", "13.10.2026", "20.10.2026", "3.11.2026", "10.11.2026", "24.11.2026", "1.12.2026"] },
    { subject: "cesky", label: "Český jazyk · úterý 15:40–16:40", dates: ["15.9.2026", "22.9.2026", "29.9.2026", "6.10.2026", "13.10.2026", "20.10.2026", "3.11.2026", "10.11.2026", "24.11.2026", "1.12.2026"] },
    { subject: "cesky", label: "Český jazyk · čtvrtek 14:30–15:30 nebo 15:40–16:40", dates: ["17.9.2026", "24.9.2026", "1.10.2026", "8.10.2026", "15.10.2026", "22.10.2026", "5.11.2026", "12.11.2026", "19.11.2026", "26.11.2026"] },
    { subject: "sebe", label: "Seberozvoj: Silné stránky – 1. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["18.9.2026"] },
    { subject: "sebe", label: "Seberozvoj: Silné stránky – 1. část · sobota 10:00–12:00", dates: ["19.9.2026"] },
    { subject: "sebe", label: "Seberozvoj: Silné stránky – 2. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["9.10.2026"] },
    { subject: "sebe", label: "Seberozvoj: Silné stránky – 2. část · sobota 10:00–12:00", dates: ["10.10.2026"] },
    { subject: "sebe", label: "Seberozvoj: Vize a kariérní přesvědčení – 1. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["6.11.2026"] },
    { subject: "sebe", label: "Seberozvoj: Vize a kariérní přesvědčení – 1. část · sobota 10:00–12:00", dates: ["7.11.2026"] },
    { subject: "sebe", label: "Seberozvoj: Vize a kariérní přesvědčení – 2. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["27.11.2026"] },
    { subject: "sebe", label: "Seberozvoj: Vize a kariérní přesvědčení – 2. část · sobota 10:00–12:00", dates: ["28.11.2026"] },

    { subject: "mat", label: "Matematika · pondělí 14:30–15:30", dates: ["11.1.2027", "18.1.2027", "1.2.2027", "8.2.2027", "22.2.2027", "1.3.2027", "8.3.2027", "15.3.2027", "29.3.2027"] },
    { subject: "mat", label: "Matematika · pondělí — bez společné lekce, cvičný test v Classroomu", dates: ["5.4.2027"] },
    { subject: "mat", label: "Matematika · úterý 14:30–15:30 nebo 16:50–17:50", dates: ["12.1.2027", "19.1.2027", "2.2.2027", "9.2.2027", "23.2.2027", "2.3.2027", "9.3.2027", "16.3.2027", "30.3.2027"] },
    { subject: "mat", label: "Matematika · úterý — bez společné lekce, cvičný test v Classroomu", dates: ["6.4.2027"] },
    { subject: "cesky", label: "Český jazyk · úterý 15:40–16:40", dates: ["12.1.2027", "19.1.2027", "2.2.2027", "9.2.2027", "23.2.2027", "2.3.2027", "9.3.2027", "16.3.2027", "30.3.2027"] },
    { subject: "cesky", label: "Český jazyk · úterý — bez společné lekce, cvičný test v Classroomu", dates: ["6.4.2027"] },
    { subject: "cesky", label: "Český jazyk · čtvrtek 14:30–15:30 nebo 15:40–16:40", dates: ["14.1.2027", "21.1.2027", "4.2.2027", "11.2.2027", "25.2.2027", "4.3.2027", "11.3.2027", "18.3.2027", "1.4.2027"] },
    { subject: "cesky", label: "Český jazyk · čtvrtek — bez společné lekce, cvičný test v Classroomu", dates: ["8.4.2027"] },
    { subject: "sebe", label: "Seberozvoj: Emoce – 1. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["8.1.2027"] },
    { subject: "sebe", label: "Seberozvoj: Emoce – 1. část · sobota 10:00–12:00", dates: ["9.1.2027"] },
    { subject: "sebe", label: "Seberozvoj: Emoce – 2. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["5.2.2027"] },
    { subject: "sebe", label: "Seberozvoj: Emoce – 2. část · sobota 10:00–12:00", dates: ["6.2.2027"] },
    { subject: "sebe", label: "Seberozvoj: Vnitřní přesvědčení – 1. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["5.3.2027"] },
    { subject: "sebe", label: "Seberozvoj: Vnitřní přesvědčení – 1. část · sobota 10:00–12:00", dates: ["6.3.2027"] },
    { subject: "sebe", label: "Seberozvoj: Vnitřní přesvědčení – 2. část · pátek 14:30–16:30 nebo 16:45–18:45", dates: ["2.4.2027"] },
    { subject: "sebe", label: "Seberozvoj: Vnitřní přesvědčení – 2. část · sobota 10:00–12:00", dates: ["3.4.2027"] }
  ];

  function dateKey(d, m, y) {
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  }

  var lessonsByDate = {};
  RANGES.forEach(function (range) {
    range.dates.forEach(function (dateStr) {
      var parts = dateStr.split(".");
      var key = dateKey(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
      if (!lessonsByDate[key]) lessonsByDate[key] = [];
      lessonsByDate[key].push({ subject: range.subject, label: range.label });
    });
  });

  function init() {
    var root = document.getElementById("month-calendar");
    if (!root) return;

    var labelEl = document.getElementById("mc-label");
    var gridEl = document.getElementById("mc-grid");
    var detailEl = document.getElementById("mc-detail");
    var prevBtn = document.getElementById("mc-prev");
    var nextBtn = document.getElementById("mc-next");
    var idx = 0;

    function formatDateHuman(key) {
      var parts = key.split("-");
      return parseInt(parts[2], 10) + ". " + parseInt(parts[1], 10) + ". " + parts[0];
    }

    function showDetail(key, lessons) {
      var html = '<p class="month-calendar-detail-date">' + formatDateHuman(key) + "</p>";
      lessons.forEach(function (l) {
        html += '<p class="month-calendar-detail-item"><i class="dot dot-' + l.subject + '"></i>' + l.label + "</p>";
      });
      detailEl.innerHTML = html;
      detailEl.hidden = false;
    }

    function render() {
      var month = MONTHS[idx];
      var monthName = MONTH_NAMES[month.m - 1];
      labelEl.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + month.y;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === MONTHS.length - 1;

      detailEl.hidden = true;
      detailEl.innerHTML = "";

      var firstDay = new Date(month.y, month.m - 1, 1).getDay();
      var startOffset = (firstDay + 6) % 7; // pondělí = 0
      var daysInMonth = new Date(month.y, month.m, 0).getDate();

      var html = "";
      for (var i = 0; i < startOffset; i++) {
        html += '<div class="month-calendar-day month-calendar-day-empty"></div>';
      }
      for (var day = 1; day <= daysInMonth; day++) {
        var key = dateKey(day, month.m, month.y);
        var lessons = lessonsByDate[key];
        if (lessons) {
          var dots = lessons.map(function (l) { return '<i class="dot dot-' + l.subject + '"></i>'; }).join("");
          html += '<button type="button" class="month-calendar-day has-lessons" data-key="' + key + '">' +
            '<span class="month-calendar-daynum">' + day + "</span>" +
            '<span class="month-calendar-dots">' + dots + "</span>" +
            "</button>";
        } else {
          html += '<div class="month-calendar-day"><span class="month-calendar-daynum">' + day + "</span></div>";
        }
      }
      gridEl.innerHTML = html;

      gridEl.querySelectorAll(".has-lessons").forEach(function (cell) {
        cell.addEventListener("click", function () {
          showDetail(cell.dataset.key, lessonsByDate[cell.dataset.key]);
        });
      });
    }

    prevBtn.addEventListener("click", function () {
      if (idx > 0) { idx--; render(); }
    });
    nextBtn.addEventListener("click", function () {
      if (idx < MONTHS.length - 1) { idx++; render(); }
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
