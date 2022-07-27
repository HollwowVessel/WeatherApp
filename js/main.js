const searchBtn = document.querySelector(".btn")
const initialInput = document.querySelector(".search-bar")
const humidityInfo = document.querySelector(".humidity")
const windInfo = document.querySelector(".wind")
const tempInfo = document.querySelector(".temp")
const cityInfo = document.querySelector(".weather-name")
const weatherIcon = document.querySelector(".weather-icon")
const weatherDesc = document.querySelector(".weather")
const loadingDesc = document.querySelector(".load-desc")

function loading(){
    if(!initialInput.value) {
        alert("Ничего не введено в город!");
        return 0;
    }
    loadingDesc.style.visibility = "visible";
    weatherDesc.style.visibility = "hidden";
    return 1;
}

let weather = {
    apiKey: "621f423370a8a66c2773737f98d72ba6",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+this.apiKey+"&units=metric")
        .then((response)=>response.json())
        .then((data) => {weather.displayWeather(data)})
        .catch(err=>{
            alert("Этого города не существует!")
            loadingDesc.style.visibility = "hidden";
            initialInput.value = "";
        });
    },
    displayWeather: function(data){
        const {description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        loadingDesc.style.visibility = "hidden"; 
        cityInfo.innerText = `Погода в ${initialInput.value}`;
        initialInput.value = "";
        // descInfo.innerText = description[0].toUpperCase() + description.slice(1, description.length);
        tempInfo.innerText = temp + "°C";
        humidityInfo.innerText = "Влажность: " + humidity + " %";
        windInfo.innerText = "Скорость ветра: " + speed + " км/ч";
        weatherDesc.style.visibility = "visible";
    },
    search: function(){
        return this.fetchWeather(initialInput.value);
    }
}

searchBtn.addEventListener("click", function(){
    if(!loading()) return;
    let updateWeather = weather.search();
});

initialInput.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        if(!loading()) return;
        let updateWeather = weather.search();
    }
});