const formContainer = document.querySelector(".form--panel");
const formInput = document.querySelector(".form--input");
const weatherDisplayEl = document.querySelector(".weather--display");

async function getCityWeatherUpdate(city, WEATHER_API_KEY) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=006ad18c0ea865f6f9ae917dea6b2dec&units=metric`
  );

  const data = await response.json();

  return data;
}

function transformToUppercase(str) {
  const transformStr = str
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1, str.length));

  return transformStr.join(" ");
}

function generateWeatherIcon(icon) {
  return ` http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function removeDecimal(num) {
  return Math.floor(num);
}

function generateTemplate(data) {
  return ` 
        <div> 
            <div> 
               <div> 
                  <h1>${removeDecimal(data.main.temp)}</h1> 

                  <p>${removeDecimal(data.main.temp_max)}</p> 
                  <p>${removeDecimal(data.main.temp_min)}</p>
               </div>  

               <div> 
                 <p>${data.name}, ${data.sys.country}</p> 
                 <p>${transformToUppercase(data.weather[0].description)}</p> 
                 <img src="${generateWeatherIcon(data.weather[0].icon)}" />
               </div>
            </div>
        </div>
    `;
}

formContainer.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityWeatherData = await getCityWeatherUpdate(formInput.value);

  const html = generateTemplate(cityWeatherData);

  weatherDisplayEl.innerHTML = html;

  formInput.value = "";

  console.log(cityWeatherData);
});
