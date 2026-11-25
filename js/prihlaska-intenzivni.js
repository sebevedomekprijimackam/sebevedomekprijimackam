/*
  PŘIHLÁŠKA DO INTENZIVNÍHO KURZU
  -------------------------------
  Od data zdražení přepne ceny ve formuláři, včetně toho, co přijde v přihlášce e-mailem.
*/
(function () {
  var ZDRAZENI_OD = new Date(2027, 0, 1); // 1. 1. 2027 (měsíce se počítají od nuly)
  var NOVE_CENY = {
    najednou: { cena: "15 300 Kč", hodnota: "Intenzivní kurz – najednou (15 300 Kč)" },
    splatky: { cena: "4× 3 825 Kč", hodnota: "Intenzivní kurz – na splátky (4× 3 825 Kč)" }
  };

  if (new Date() < ZDRAZENI_OD) return;

  Object.keys(NOVE_CENY).forEach(function (platba) {
    var volba = document.querySelector('input[data-platba="' + platba + '"]');
    volba.value = NOVE_CENY[platba].hodnota;
    volba.nextElementSibling.textContent = NOVE_CENY[platba].cena;
  });

  var poznamka = document.getElementById("cena-pred-zdrazenim");
  if (poznamka) poznamka.remove();
})();
