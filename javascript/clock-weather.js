const h1 = document.getElementById('h1'),
  h2 = document.getElementById('h2'),
  m1 = document.getElementById('m1'),
  m2 = document.getElementById('m2'),
  s1 = document.getElementById('s1'),
  s2 = document.getElementById('s2');
const weatherImgComp = document.querySelector(
  '.weather-info__main-weather img'
);
const tempComp = document.querySelector('.weather-info__city-info__temp');
const cityComp = document.querySelector('.weather-info__city-info__city');
const weatherImg = [
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '09.png',
  '10.png',
  '11.png',
  '13.png',
  '50.png',
  'default.png',
];

const clock = {
  getClock: function () {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, 0);
    const minutes = String(now.getMinutes()).padStart(2, 0);
    const seconds = String(now.getSeconds()).padStart(2, 0);

    h1.innerText = hours.substring(0, 1);
    h2.innerText = hours.substring(1, 2);
    m1.innerText = minutes.substring(0, 1);
    m2.innerText = minutes.substring(1, 2);
    s1.innerText = seconds.substring(0, 1);
    s2.innerText = seconds.substring(1, 2);
  },
};

clock.getClock();
setInterval(() => {
  clock.getClock();
}, 1000);

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const units = 'metric';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=${units}&appid=${APIKEY}&lang=kr`;

  fetch(api)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const source = weatherImg.filter(
        (i) => i.substring(0, 2) === json.weather[0].icon.substring(0, 2)
      );
      weatherImgComp.src = `img/weather/${source}`;
      tempComp.innerText = Math.round(json.main.temp) + '°C';
      cityComp.innerText = json.name;
    });
}

function onGeoError() {
  alert('위치정보를 찾을 수 없습니다.');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
