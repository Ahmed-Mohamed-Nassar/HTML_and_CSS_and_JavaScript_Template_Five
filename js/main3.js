let mainArea = document.querySelector(".azkarText");
let esmAzkar = document.querySelector(".esmAzkar");

fetch(
  `https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    //
    console.log(response);
    let elazkarToPut = response[`أذكار الصباح`];
    esmAzkar.innerHTML = "أذكار الصباح";
    //
    for (const zekToPut of elazkarToPut) {
      if (!Array.isArray(zekToPut) && zekToPut.content != "stop") {
        let div = document.createElement("div");
        div.className = "mainZikrTextBody";
        div.innerHTML = `<span class="zekrTD">${
          zekToPut.content
        }</span> <span class="addElTekrar">عدد التكرار ${+zekToPut.count}</span>`;
        mainArea.appendChild(div);
      }
    }
    //
    function getAzkar(ppp) {
      return response[`${ppp}`];
    }

    let azkarMainName = [
      "أذكار الصباح",
      "أذكار المساء",
      "أذكار الاستيقاظ",
      "أذكار النوم",
      "أذكار بعد السلام من الصلاة المفروضة",
      "تسابيح",
    ];

    let couzkr = 0;
    let azkarElmassa = getAzkar("أذكار المساء");
    let askarMainUlForFehress = document.querySelector(".askarMainUlForFehres");

    for (const zekrName of azkarMainName) {
      couzkr++;
      let li = document.createElement("li");
      li.innerHTML = `${couzkr}- <a href="#" Class="zekr" >${zekrName}</a>`;
      askarMainUlForFehress.appendChild(li);
    }
    let allzekrName = document.querySelectorAll(".zekr");
    allzekrName[0].className += " active";
    window.addEventListener("click", function (e) {
      if (e.target.classList.contains("zekr")) {
        let theCurr = e.target;
        allzekrName.forEach(function (e) {
          e.classList.remove("active");
        });
        theCurr.classList.add("active");
        let theCurrSeleZekrName = theCurr.innerHTML;
        putZekrContent(theCurrSeleZekrName);
        esmAzkar.innerHTML = theCurrSeleZekrName;
      }
      function putZekrContent(para) {
        mainArea.innerHTML = "";
        let elazkarToPut = response[`${para}`];
        for (const zekToPut of elazkarToPut) {
          if (!Array.isArray(zekToPut) && zekToPut.content != "stop") {
            let div = document.createElement("div");
            div.className = "mainZikrTextBody";
            div.innerHTML = `<span class="zekrTD">${
              zekToPut.content
            }</span> <span class="addElTekrar">عدد التكرار ${+zekToPut.count}</span>`;
            mainArea.appendChild(div);
          }
        }
      }
      // addElTekrar
    });
  })
  .catch(function (response) {
    console.log(response);
  });

//
