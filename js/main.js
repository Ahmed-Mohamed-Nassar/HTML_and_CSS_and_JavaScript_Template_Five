const countries = [
  { name: "مصر", countryID: 1, countryISO: "ُEG" },
  { name: "السعودية", countryID: 2, countryISO: "SA" },
  { name: "الكويت", countryID: 3, countryISO: "KW" },
];
const citis = [
  { name: "الأسكندرية", cityID: 1, countryID: 1, cityNameEn: "Alexandria" },
  { name: "القاهرة", cityID: 2, countryID: 1, cityNameEn: "Cairo" },
  { name: "الدقهلية", cityID: 3, countryID: 1, cityNameEn: "Dakahlia" },
  { name: "البحيرة", cityID: 4, countryID: 1, cityNameEn: "Beheira" },
  { name: "الفيوم", cityID: 5, countryID: 1, cityNameEn: "Faiyum" },
  { name: "الأقصر", cityID: 6, countryID: 1, cityNameEn: "Luxor" },
  { name: "الرياض", cityID: 7, countryID: 2, cityNameEn: "Riyadh" },
  { name: "جدة", cityID: 8, countryID: 2, cityNameEn: "Jeddah" },
  {
    name: "مكة المكرمة",
    cityID: 9,
    countryID: 2,
    cityNameEn: "Makkah Al-Mukarramah",
  },
  { name: "جازان", cityID: 10, countryID: 2, cityNameEn: "Jazan" },
  { name: "القصيم", cityID: 11, countryID: 2, cityNameEn: "Qassim" },
  { name: "المدينة المنوّرة", cityID: 12, countryID: 2, cityNameEn: "Medina" },
  { name: "العاصمة", cityID: 13, countryID: 3, cityNameEn: "Capital" },
  { name: "حولي", cityID: 14, countryID: 3, cityNameEn: "Hawalli" },
  { name: "الأحمدي", cityID: 15, countryID: 3, cityNameEn: "Al Ahmadi" },
  { name: "الجهراء", cityID: 16, countryID: 3, cityNameEn: "Al Jahra" },
  { name: "الفروانية", cityID: 17, countryID: 3, cityNameEn: "Al Farwaniyah" },
  {
    name: "مبارك الكبير",
    cityID: 18,
    countryID: 3,
    cityNameEn: "Mubarak Al Kabeer",
  },
];
let countryFromHtml = document.querySelector(".countryForm");
let cityFromHtml = document.querySelector(".cityForm");
let fajr = document.querySelector(".fajr");
let sunrise = document.querySelector(".sunrise");
let zohr = document.querySelector(".zohr");
let asr = document.querySelector(".asr");
let sunset = document.querySelector(".sunset");
let ishaa = document.querySelector(".ishaa");
function getCountry(countries) {
  countryFromHtml.innerHTML = "";
  for (const country of countries) {
    countryFromHtml.innerHTML += ` <option value="${country.name}">${country.name}</option>`;
  }
}
getCountry(countries);
function finalcitis() {
  let countrySelectedName = countryFromHtml.value;
  let countrySelectedId = "";
  for (const country of countries) {
    if (country.name === countrySelectedName) {
      countrySelectedId = country.countryID;
    }
  }
  putcity();
  function putcity() {
    cityFromHtml.innerHTML = "";
    for (const city of citis) {
      if (countrySelectedId == city.countryID) {
        cityFromHtml.innerHTML += ` <option value="${city.name}">${city.name}</option>`;
      }
    }
  }
}
window.addEventListener("load", function () {
  finalcitis();
});
countryFromHtml.addEventListener("change", function () {
  finalcitis();
});
window.addEventListener("load", function () {
  putTimes();
});
countryFromHtml.addEventListener("change", function () {
  putTimes();
});
cityFromHtml.addEventListener("change", function () {
  putTimes();
});
function getCityNameEn(cityArabicName) {
  let cityNaEn = "";
  for (const city of citis) {
    if (city.name === cityArabicName) {
      cityNaEn = city.cityNameEn;
    }
  }
  return cityNaEn;
}
function getCountryIso(countryArabicName) {
  let countryIso = "";
  for (const coun of countries) {
    if (coun.name === countryArabicName) {
      countryIso = coun.countryISO;
    }
  }
  return countryIso;
}
function fi(count, ciit) {
  fetch(
    `https://api.aladhan.com/v1/timingsByCity/:date?city=${ciit}&country=${count}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.data);
      let mawa = response.data.timings;
      fajr.innerHTML = mawa.Fajr;
      sunrise.innerHTML = mawa.Sunrise;
      zohr.innerHTML = mawa.Dhuhr;
      asr.innerHTML = mawa.Asr;
      sunset.innerHTML = mawa.Sunset;
      ishaa.innerHTML = mawa.Isha;
      let weekday = response.data.date.hijri.weekday.ar;
      let month = response.data.date.hijri.month.ar;
      let day = response.data.date.hijri.day;
      let year = response.data.date.hijri.year;
      let dayName = document.querySelector(".dayName");
      dayName.innerHTML = weekday;
      let dayNum = document.querySelector(".dayNum");
      dayNum.innerHTML = day;
      let montht = document.querySelector(".month");
      montht.innerHTML = month;
      let yearr = document.querySelector(".year");
      yearr.innerHTML = year;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function putTimes() {
  let ciNaAr = cityFromHtml.value;
  let coNaAr = countryFromHtml.value;
  getCityNameEn(ciNaAr);
  getCountryIso(coNaAr);
  fi(getCountryIso(coNaAr), getCityNameEn(ciNaAr));
  let dawla = document.querySelector(".dawla");
  let elmohafza = document.querySelector(".elmohafza");
  dawla.innerHTML = coNaAr;
  elmohafza.innerHTML = ciNaAr;
}

// fetch(
//   `httpa://api.aladhan.com/v1/timingsByCity/:date?city=${ciit}&country=${count}`
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (res) {
//     console.log(res);
//   });
