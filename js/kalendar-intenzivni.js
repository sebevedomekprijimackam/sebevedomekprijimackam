/*
  TERMÍNY PRO KALENDÁŘ INTENZIVNÍHO KURZU
  ---------------------------------------
  Kalendář samotný je v kalendar.js, tady jsou jen data lekcí tohoto kurzu.
*/
(function () {
  var PONDELKY = ["11.1.2027", "18.1.2027", "25.1.2027", "1.2.2027", "8.2.2027", "22.2.2027", "1.3.2027", "8.3.2027", "15.3.2027", "22.3.2027", "5.4.2027"];
  var CTVRTKY = ["14.1.2027", "21.1.2027", "28.1.2027", "4.2.2027", "11.2.2027", "25.2.2027", "4.3.2027", "11.3.2027", "18.3.2027", "1.4.2027", "8.4.2027"];
  var PATKY = ["15.1.2027", "12.2.2027", "12.3.2027", "2.4.2027"];
  var SOBOTY = ["16.1.2027", "13.2.2027", "13.3.2027", "3.4.2027"];

  window.KALENDAR_MONTHS = [
    { y: 2027, m: 1 }, { y: 2027, m: 2 }, { y: 2027, m: 3 }, { y: 2027, m: 4 }
  ];

  window.KALENDAR_RANGES = [
    { subject: "mat", short: "16:50–17:50", label: "Matematika · pondělí 16:50–17:50", dates: PONDELKY },
    { subject: "cesky", short: "18:00–19:00", label: "Český jazyk · pondělí 18:00–19:00", dates: PONDELKY },
    { subject: "mat", short: "14:30–15:30", label: "Matematika · čtvrtek 14:30–15:30", dates: CTVRTKY },
    { subject: "cesky", short: "15:40–16:40", label: "Český jazyk · čtvrtek 15:40–16:40", dates: CTVRTKY },
    { subject: "sebe", short: "14:45–16:45", label: "Seberozvoj · pátek 14:45–16:45", dates: PATKY },
    { subject: "sebe", short: "10:00–12:00", label: "Seberozvoj · sobota 10:00–12:00", dates: SOBOTY },
    { subject: "webinar", short: "17:00–17:30", label: "<span class='workshop-title-line'><span class='detail-label-webinar'>Webinář</span>: <strong>Jak funguje algoritmus pro přijímací zkoušky</strong></span> · 17:00–17:30, online, pro děti i rodiče. Je dobré vědět, podle jakého klíče rozděluje CERMAT žáky na jednotlivé školy. Pak se můžete dobře rozhodnout při výběru školy a zejména zvolit jejich správné pořadí.", dates: ["13.1.2027"] },
    { subject: "webinar", short: "18:00–18:30", label: "<span class='workshop-title-line'><span class='detail-label-webinar'>Webinář</span>: <strong>Kolik potřebuju bodů</strong></span> · 18:00–18:30, online, pro děti i rodiče. Na stránkách CERMATu je k dispozici velmi obsáhlá tabulka, ze které lze zjistit kapacity, počty přihlášek a výsledky z minulých školních let na jednotlivých školách. Dále lze zjistit, kolik bodů z matematiky a českého jazyka získali v průměru žáci přijatí na dané školy. Na webináři si ukážeme, kde tabulku najdete a jak s ní pracovat a vyhledat potřebné informace.", dates: ["13.1.2027"] },
    { subject: "workshop", short: "17:00–18:30", label: "<span class='workshop-title-line'><span class='detail-label-workshop'>Workshop pro rodiče</span>: <strong>Osobní rozvoj dětí</strong></span> · 17:00–18:30, Vzdělávací a seberozvojové centrum ANTALA, Ostrava-Poruba. Workshopem vás provede Kateřina Kučová, lektorka a talentová konzultantka. Odpovíme si na otázku, proč je nyní tak náročné připravit děti na budoucnost – na co se zaměřit, čeho si všímat a co v dětech rozvíjet, aby se v dnešním turbulentním světě neztratily a vyrostly v sebevědomé mladé lidi, kteří si vždy vědí rady, ale zároveň v sobě mají vypěstovaný zdravý respekt a úctu k ostatním. A jako rodiče jistě najdete přínosy této akce i sami pro sebe, pro uvědomění si svých talentů a své vlastní jedinečnosti.", dates: ["25.1.2027"] },
    { subject: "workshop", short: "17:00–18:30", label: "<span class='workshop-title-line'><span class='detail-label-workshop'>Workshop pro rodiče</span>: <strong>Síla vnitřních přesvědčení</strong></span> · 17:00–18:30, Vzdělávací a seberozvojové centrum ANTALA, Ostrava-Poruba. Workshop s podtitulem „Proč jednáme jako naši rodiče, i když vlastně nechceme“ povede Kateřina Kučová, lektorka a talentová konzultantka. Zavede nás do poznatků moderní neurovědy o tom, jak funguje lidské podvědomí, které z 95 % řídí to, jak se chováme, jednáme v různých situacích a jak se rozhodujeme. Ukážeme si na konkrétních příkladech z života, jak nám vnitřní přesvědčení na jednu stranu pomáhají, ale v mnoha situacích nás také velmi limitují – a jak to ovlivňuje i naše děti a jejich reakce na zátěž, stres, strach nebo nové situace. A jak se s tím vším dá v dnešní době pracovat.", dates: ["22.2.2027"] }
  ];
})();
