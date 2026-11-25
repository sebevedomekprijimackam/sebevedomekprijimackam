/*
  PŘIHLÁŠKA NA VÍKENDOVÝ KURZ
  ---------------------------
  Termíny se zaškrtávají přímo v tabulce Termíny a témata (políčka patří k formuláři přes atribut form).
  Skript spočítá cenu a vybrané termíny pošle v přihlášce jako jeden text.
*/
(function () {
  var CENA = { den: 3500, denVice: 3000, predmet: 1700, obaPredmety: 3000, seberozvoj: 1400 };
  var POCET_PRO_SLEVU = 3;

  var form = document.getElementById('signup-form');
  if (!form) return;
  var rows = document.querySelectorAll('tr[data-termin]');
  var boxes = document.querySelectorAll('tr[data-termin] input[type="checkbox"]');
  var totalEl = document.getElementById('vikend-celkem');
  var noteEl = document.getElementById('vikend-celkem-pozn');
  var listEl = document.getElementById('vikend-vyber');
  var fieldTerminy = form.querySelector('input[name="Vybrane terminy"]');
  var fieldCena = form.querySelector('input[name="Cena celkem"]');
  var prvniVolny = null;

  function kc(n) {
    return String(n).replace(/\B(?=(\d{3})+$)/g, ' ') + ' Kč';
  }

  function prepocitat() {
    var vybrano = [];
    var celeDny = 0;

    rows.forEach(function (row) {
      var den = row.querySelector('[data-cast="den"]');
      var casti = row.querySelectorAll('input[data-cast]:not([data-cast="den"])');
      var zaskrtnute = Array.prototype.filter.call(casti, function (c) { return c.checked; });

      // Všechny tři části dohromady jsou celý den, který vychází levněji.
      if (den && zaskrtnute.length === casti.length && !den.disabled) {
        den.checked = true;
      }
      if (den && den.checked) {
        casti.forEach(function (c) { c.checked = false; });
        zaskrtnute = [];
        celeDny++;
      }
      row.classList.toggle('term-row-selected', !!(den && den.checked));
      casti.forEach(function (c) { c.closest('td').classList.toggle('term-cell-selected', c.checked); });
      if ((den && den.checked) || zaskrtnute.length) {
        vybrano.push({ row: row, den: den && den.checked, casti: zaskrtnute });
      }
    });

    var cenaDne = celeDny >= POCET_PRO_SLEVU ? CENA.denVice : CENA.den;
    var celkem = 0;
    var text = [];
    listEl.innerHTML = '';

    vybrano.forEach(function (v) {
      var nazev = v.row.getAttribute('data-termin');
      var radek;
      if (v.den) {
        celkem += cenaDne;
        radek = nazev + ': celý den';
      } else {
        var mat = v.casti.some(function (c) { return c.getAttribute('data-cast') === 'matematika'; });
        var cj = v.casti.some(function (c) { return c.getAttribute('data-cast') === 'cestina'; });
        // Matematika a čeština v jeden den mají společnou cenu.
        if (mat && cj) celkem += CENA.obaPredmety - 2 * CENA.predmet;
        v.casti.forEach(function (c) {
          celkem += c.getAttribute('data-cast') === 'seberozvoj' ? CENA.seberozvoj : CENA.predmet;
        });
        radek = nazev + ': ' + v.casti.map(function (c) {
          return c.value + ' (' + c.getAttribute('data-tema') + ', ' + c.getAttribute('data-cas') + ')';
        }).join(', ');
      }
      text.push(radek);
      var li = document.createElement('li');
      li.textContent = radek;
      listEl.appendChild(li);
    });
    if (!vybrano.length) {
      var prazdne = document.createElement('li');
      prazdne.className = 'vikend-vyber-prazdne';
      prazdne.textContent = 'Zatím nic. Zaškrtněte termíny v tabulce výše.';
      listEl.appendChild(prazdne);
    }

    totalEl.textContent = kc(celkem);
    noteEl.textContent = celeDny >= POCET_PRO_SLEVU
      ? 'Celé dny počítáme po ' + kc(CENA.denVice) + ' za den.'
      : 'Při koupi ' + POCET_PRO_SLEVU + ' a více celých dnů vychází den na ' + kc(CENA.denVice) + '.';
    fieldTerminy.value = text.join('; ');
    fieldCena.value = kc(celkem);
    if (prvniVolny) prvniVolny.setCustomValidity(vybrano.length ? '' : 'Vyberte prosím alespoň jeden termín v tabulce.');
  }

  boxes.forEach(function (box) {
    box.addEventListener('change', function () {
      var row = box.closest('[data-termin]');
      var den = row.querySelector('[data-cast="den"]');
      if (box === den && !box.checked) {
        // Zrušení celého dne zruší i jeho části.
        row.querySelectorAll('input[data-cast]').forEach(function (c) { c.checked = false; });
      } else if (den && box !== den && box.checked) {
        den.checked = false;
      } else if (den && box !== den && !box.checked && den.checked) {
        // Odškrtnutí části celého dne: zbytek dne zůstane vybraný jednotlivě.
        den.checked = false;
        row.querySelectorAll('input[data-cast]:not([data-cast="den"])').forEach(function (c) { if (c !== box) c.checked = true; });
      }
      prepocitat();
    });
  });
  form.addEventListener('reset', function () {
    boxes.forEach(function (b) { b.checked = false; });
    setTimeout(prepocitat, 0);
  });
  prvniVolny = document.querySelector('tr[data-termin] input');
  prepocitat();
})();
