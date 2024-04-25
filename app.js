const weatherForm=document.querySelector('.forms');
const cityData=document.querySelector('.cityInput');
const getWeather=document.querySelector('.getWeather')
const weatherSet=document.querySelector('.weatherSet');                 
const apiKey='f10a07e4d02974aa7962774bdfa78468';

weatherForm.addEventListener('submit',async events =>{
    events.preventDefault();

    let city=cityData.value.trim();

    if(city){
        try{
            const datas=await getWeatherSets(city)
            // console.log(datas);
            displayWeatherInfo(datas);
        }
        catch(error){
            console.log(error);
            setError(error);
        }
       
    }
    else{
        setError("Enter The Correct City");
    }
})

async function getWeatherSets(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const urlResponse=await fetch(url);
    console.log(urlResponse);

    if(!urlResponse.ok){
        throw new Error("data not found");
    }
    return urlResponse.json();
}
function setError(message){

    //this part is create one new paragraph tag in html
    const displayError=document.createElement('p');
    displayError.textContent=message;
    displayError.classList.add('errorDisplay');
    weatherSet.textContent='';
    weatherSet.style.display='flex';
    weatherSet.appendChild(displayError);
}

function displayWeatherInfo(data){
    let temperature;
    const {name,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
        console.log(data);
    weatherSet.textContent='';
    weatherSet.style.display='flex';
    
    const displayCity=document.createElement('h1')
    const displayTemp=document.createElement('p')
    const displayHumidity=document.createElement('p')
    const displayDescription=document.createElement('p')
    const displayEomji=document.createElement('p')

   
    displayCity.textContent=name;
    displayTemp.textContent=`${((temp - 273.15)).toFixed(1)}°C`;
    displayHumidity.textContent=`humidity is:${humidity}%`;
    displayDescription.textContent=description; 
    displayEomji.textContent=getEmoji(id)

    displayCity.classList.add('cityName');
    displayTemp.classList.add('tempDisplay')
    displayHumidity.classList.add('humidity')
    displayDescription.classList.add('description')
    displayEomji.classList.add('weatherEmoji')

    weatherSet.appendChild(displayCity);
    weatherSet.appendChild(displayTemp);
    weatherSet.appendChild(displayHumidity);
    weatherSet.appendChild(displayDescription)
    weatherSet.appendChild(displayEomji)
}

function getEmoji(id){
    switch(true){
        case (id >=200 && id<300):
            return "⛈️";
        case (id >=300 && id < 400):
            return "🌧️";
        case (id >=500 && id < 600):
            return "🌦️";
        case (id >=600 && id < 700):
            return "❄️";
        case (id >=600 && id <=700):
            return "❄️";
        case (id >=701 && id <800):
            return "💨";
        case (id === 800):
            return "☀️";
        case (id >= 801 && id <810):
            return "🌤️";
        default:
            return "❔"
    }
}