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
      predmet: "Matematika",
      den: "pondělky nebo úterky",
      skupiny: [
        { label: "pondělky 14:30–15:30", volno: 10 },
        { label: "úterky 14:30–15:30", volno: 10 },
        { label: "úterky 16:50–17:50", volno: 10 }
      ]
    },
    {
      predmet: "Český jazyk",
      den: "úterky nebo čtvrtky",
      skupiny: [
        { label: "úterky 15:40–16:40", volno: 10 },
        { label: "čtvrtky 14:30–15:30", volno: 10 },
        { label: "čtvrtky 15:40–16:40", volno: 10 }
      ]
    },
    {
      predmet: "Seberozvoj",
      den: "pátky nebo soboty",
      skupiny: [
        { label: "pátky 14:30–16:30", volno: 10 },
        { label: "pátky 16:45–18:45", volno: 10 },
        { label: "soboty 10:00–12:00", volno: 10 }
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
