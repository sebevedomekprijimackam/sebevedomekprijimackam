/*
  VOLNÁ MÍSTA VE SKUPINÁCH
  ------------------------
  Tady se mění, kolik je kde volných míst. Uprav jen číslo "volno".
  MAX je horní hranice skupiny (max. počet dětí).
  Když se někdo přihlásí, sniž "volno" o 1. Když je 0, ukáže se "obsazeno".
*/
(function () {
  var MAX = 10;

  var DATA = [
    {
      predmet: "Český jazyk",
      den: "čtvrtky",
      skupiny: [
        { label: "14:30–15:30", volno: 10 },
        { label: "15:40–16:40", volno: 10 },
        { label: "16:50–17:50", volno: 10 }
      ]
    },
    {
      predmet: "Matematika",
      den: "úterky",
      skupiny: [
        { label: "14:30–15:30", volno: 10 },
        { label: "15:40–16:40", volno: 10 },
        { label: "16:50–17:50", volno: 10 }
      ]
    },
    {
      predmet: "Seberozvoj",
      den: "pátky · 16:00–18:00",
      skupiny: [
        { label: "Skupina 1", volno: 10 },
        { label: "Skupina 2", volno: 10 },
        { label: "Skupina 3", volno: 10 }
      ]
    }
  ];

  function statusFor(volno) {
    var v = Math.max(0, Math.min(MAX, volno));
    if (v <= 0) return { cls: "full", text: "obsazeno" };
    if (v <= 2) return { cls: "last", text: v === 1 ? "poslední místo" : "poslední " + v + " místa" };
    return { cls: "free", text: "volných " + v + " z " + MAX };
  }

  function slotHTML(s) {
    var st = statusFor(s.volno);
    var v = Math.max(0, Math.min(MAX, s.volno));
    var filled = Math.round(((MAX - v) / MAX) * 100);
    return (
      '<div class="capacity-slot">' +
        '<div class="capacity-slot-head">' +
          '<span class="capacity-slot-label">' + s.label + '</span>' +
          '<span class="capacity-slot-status is-' + st.cls + '">' + st.text + '</span>' +
        '</div>' +
        '<div class="capacity-bar is-' + st.cls + '">' +
          '<div class="capacity-bar-fill is-' + st.cls + '" style="width:' + filled + '%"></div>' +
        '</div>' +
      '</div>'
    );
  }

  function cardHTML(p) {
    return (
      '<div class="capacity-card">' +
        '<div class="capacity-card-title">' + p.predmet + '</div>' +
        '<div class="capacity-card-day">' + p.den + '</div>' +
        p.skupiny.map(slotHTML).join("") +
      '</div>'
    );
  }

  function render() {
    var containers = document.querySelectorAll("[data-kapacita]");
    if (!containers.length) return;
    var grid = '<div class="capacity-grid">' + DATA.map(cardHTML).join("") + '</div>';
    containers.forEach(function (el) { el.innerHTML = grid; });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
