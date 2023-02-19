const formContainer = document.querySelector(".form--panel");
const formInput = document.querySelector(".form--input");
const weatherDisplayEl = document.querySelector(".weather--display");

//Make request to open weather api
async function getCityWeatherUpdate(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=006ad18c0ea865f6f9ae917dea6b2dec&units=metric`
  );

  const data = await response.json();

  return data;
}

//Change the first letter to uppercase
function transformToUppercase(str) {
  const transformStr = str
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1, str.length));

  return transformStr.join(" ");
}

//Generate img src url
function generateWeatherIcon(icon) {
  return ` http://openweathermap.org/img/wn/${icon}@2x.png`;
}

//Remove decimal number
function removeDecimal(num) {
  return Math.floor(num);
}

//Generate template
function generateTemplate(data) {
  return ` 
        <div class="weather--card">
            <div class="weather--card__content"> 
               <div class="weather--card__num"> 
                  <div class="weather--main__temp">  
                    <i class="fa-solid fa-temperature-arrow-up"></i> 
                    <h1>${removeDecimal(data.main.temp)}</h1> 
                  </div>

                  <div class="weather--sub__data"> 
                    <div class="weather--main__max">  
                      <i class="fa-solid fa-plus"></i>
                      <h4>${removeDecimal(data.main.temp_max)}</h4> 
                    </div> 

                    <div class="weather--main__min">  
                      <i class="fa-solid fa-minus"></i>
                      <h4>${removeDecimal(data.main.temp_min)}</h4>
                    </div>
                  </div>
               </div>  

               <div class="weather--card__city--data"> 
                  <p class="weather--city__name">${data.name}, ${
    data.sys.country
  }</p> 
                  <p class="weather--city__status">${transformToUppercase(
                    data.weather[0].description
                  )}</p>  


                <div class="weather--status__img__container"> 
                  <img class="weather--img__logo" src="${generateWeatherIcon(
                    data.weather[0].icon
                  )}" />
                </div>
               </div>
            </div>
        </div>
    `;
}

//Listen for submit event
formContainer.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Make a call to open weather
  const cityWeatherData = await getCityWeatherUpdate(formInput.value);

  //Generate template with date received from the open weather
  const html = generateTemplate(cityWeatherData);

  //Insert html to weather display container
  weatherDisplayEl.innerHTML = html;

  //Reset form input
  formInput.value = "";

  //Hide form
  formContainer.classList.add("hide--form");
});
