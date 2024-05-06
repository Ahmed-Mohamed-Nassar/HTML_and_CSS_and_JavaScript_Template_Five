fetch(`https://api.alquran.cloud/v1/quran/quran-uthmani`)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    let mainUlForFehress = document.querySelector(".mainUlForFehres");
    let allSewar = response.data.surahs;
    // defult
    let ataytexttdefult = document.querySelector(".ayatText");
    let rakam = 0;
    let elfat7a = response.data.surahs[0].ayahs;
    console.log(elfat7a);
    for (const aya of elfat7a) {
      rakam++;
      console.log(aya.text);
      let span = document.createElement("span");
      span.innerHTML = aya.text + ` <span class="rakam">${rakam}</span> `;
      ataytexttdefult.appendChild(span);
    }
    // defult
    let esmSoraAyatt = document.querySelector(".esmSoraAyat");
    esmSoraAyatt.innerHTML = response.data.surahs[0].name;
    let couuSora = 0;
    for (const sora of allSewar) {
      couuSora++;
      let li = document.createElement("li");
      li.innerHTML = `${couuSora}- <a href="#" Class="sora" >${sora.name}</a>`;
      mainUlForFehress.appendChild(li);
      let ayat = sora.ayahs;
      let rakam = 0;
    }
    // defult
    let defultActive = document.querySelectorAll(".sora");
    defultActive[0].classList.add("active");
    let aSora = document.querySelectorAll(".sora");
    document.addEventListener("click", function (e) {
      if (e.target.className == "sora") {
        let theCurr = e.target;
        defultActive.forEach(function (e) {
          e.classList.remove("active");
        });
        theCurr.classList.add("active");
        let last = response.data.surahs;
        for (const las of last) {
          if (theCurr.innerHTML == las.name) {
            let ayatt = las.ayahs;
            console.log(ayatt);
            let ataytextt = document.querySelector(".ayatText");
            ataytextt.innerHTML = "";
            let rakam = 0;
            esmSoraAyatt.innerHTML = las.name;
            for (const aya of ayatt) {
              rakam++;
              console.log(aya.text);
              let span = document.createElement("span");
              span.innerHTML =
                aya.text + ` <span class="rakam">${rakam}</span> `;
              ataytextt.appendChild(span);
            }
          }
        }
      }
    });
  })
  .catch(function (response) {
    console.log(response);
  });
