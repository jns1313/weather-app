var APIKEY = config.APIKEY;

const APIURL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
const HOURLYAPIURL = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`;

const form = document.querySelector('.form');
const search = document.querySelector('.search');
const cityTitle = document.querySelector('.city');
const temp = document.querySelector('.temp');
const weatherIcon = document.querySelector('.icon');
const humidity = document.querySelector('.hum');
const windspeed = document.querySelector('.windspeed');
const rain = document.querySelector('.rainprecent');
const time = document.querySelector('.time');

const forecastTitle = document.querySelectorAll('.day-title');
const forecastTemp = document.querySelectorAll('.day-temp');
const forecastIcon = document.querySelectorAll('.forecast-icon');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

getCurrentWeather('helsinki');
GetForecastWeather('helsinki');

async function getCurrentWeather(city) {
    const resp = await fetch(APIURL(city));
    const respData = await resp.json();

    console.log(respData);
    showCurrentWeather(respData);
}

async function GetForecastWeather(city) {
    const resp = await fetch(HOURLYAPIURL(city));
    const respData = await resp.json();

    console.log(respData);
    showForecastWeather(respData);
}

function showCurrentWeather(data) {
    cityTitle.innerText = data.name;
    temp.innerText = Math.floor(data.main.temp) + '°C';
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    humidity.innerText = data.main.humidity + '%';
    windspeed.innerText = data.wind.speed.toFixed(1) + 'Km/h';
    rain.innerText = data.weather[0].main;
    time.textContent = new Date().toUTCString();
}

function showForecastWeather(data) {
    forecastTitle.forEach(title => {
        const index = (parseInt(title.dataset.src, 10) * 8) -1;
        const d = new Date(data.list[index].dt * 1000);
        const dayName = days[d.getDay()];
        title.innerText = dayName.slice(0, 3);
    });

    forecastTemp.forEach(temp => {
        const index = (parseInt(temp.dataset.src, 10) * 8) -1;
        const dayTemp = Math.floor(data.list[index].main.temp) + '°C';
        temp.innerText = dayTemp;
    });

    forecastIcon.forEach(icon => {
        const index = (parseInt(icon.dataset.src, 10) * 8) -1;
        icon.src = `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}.png`;
    });
}

// function showForecastWeather(data) {
//     forecastTitle.forEach((title) => {
        
//         if (title.dataset.src === '1') {
//             const d = new Date(data.list[7].dt * 1000);
//             const dayName = days[d.getDay()];
//             title.innerText = dayName.slice(0,3);
//         };
//         if (title.dataset.src === '2') {
//             const d = new Date(data.list[15].dt * 1000);
//             const dayName = days[d.getDay()];
//             title.innerText = dayName.slice(0, 3)
//         };
//         if (title.dataset.src === '3') {
//             const d = new Date(data.list[23].dt * 1000);
//             const dayName = days[d.getDay()];
//             title.innerText = dayName.slice(0, 3)
//         };
//         if (title.dataset.src === '4') {
//             const d = new Date(data.list[31].dt * 1000);
//             const dayName = days[d.getDay()];
//             title.innerText = dayName.slice(0, 3)
//         };
//         if (title.dataset.src === '5') {
//             const d = new Date(data.list[39].dt * 1000);
//             const dayName = days[d.getDay()];
//             title.innerText = dayName.slice(0, 3)
//         };

//     });

//     forecastTemp.forEach((temp) => {

//         if (temp.dataset.src === '1') {
//             temp.innerText = Math.floor(data.list[7].main.temp) + '°C';
//             // console.log(temp.currentTarget.dataset.src);
//         };
//         if (temp.dataset.src === '2') {
//             temp.innerText = Math.floor(data.list[15].main.temp) + '°C';
//         };
//         if (temp.dataset.src === '3') {
//             temp.innerText = Math.floor(data.list[23].main.temp) + '°C';
//         };
//         if (temp.dataset.src === '4') {
//             temp.innerText = Math.floor(data.list[31].main.temp) + '°C';
//         };
//         if (temp.dataset.src === '5') {
//             temp.innerText = Math.floor(data.list[39].main.temp) + '°C';
//         };
//         // find out how you can make this a function or write this smarter way
//     });

//     forecastIcon.forEach((icon) => {

//         if (icon.dataset.src === '1') {
//             icon.src = `http://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png`;
//         };
//         if (icon.dataset.src === '2') {
//             icon.src = `http://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png`;
//         };
//         if (icon.dataset.src === '3') {
//             icon.src = `http://openweathermap.org/img/wn/${data.list[23].weather[0].icon}.png`;
//         };
//         if (icon.dataset.src === '4') {
//             icon.src = `http://openweathermap.org/img/wn/${data.list[31].weather[0].icon}.png`;
//         };
//         if (icon.dataset.src === '5') {
//             icon.src = `http://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png`;
//         }; 
//     });
// }


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();
    time.textContent = date.toUTCString();
    const searchTerm = search.value;
    getCurrentWeather(searchTerm);
    GetForecastWeather(searchTerm);

    search.value = '';
});
