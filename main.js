const btnMenu = document.getElementsByClassName('menuIcon');
const menu = document.querySelector('.menu');
const container = document.querySelector('.container');
const inputSearch = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const cityArray = document.getElementsByClassName('city');


// Ouvrir et Fermer le menu //
for (var i = 0; i < btnMenu.length; i++) {
  const btnClicked = btnMenu[i]
  btnClicked.addEventListener('click', ()=> {
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      container.style.filter = 'blur(5px)';
    } else {
      container.style.filter = 'none';
    }
  });
};


// Recherche Ville sur l'API //
for (var i = 0; i < cityArray.length; i++) {
  const city = cityArray[i];
  city.addEventListener('click', ()=> {
    searchLatLon(city.innerHTML);
  });
};

btnSearch.addEventListener('click', function() {
  const city = inputSearch.value;
  if (city !== '') {
    searchLatLon(city);
  }
});

inputSearch.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const city = inputSearch.value;
    if (city !== '') {
      searchLatLon(city);
    };
  };
});

function searchLatLon(city) {
  const apiKey = '8c58e7603a9d6defcdf272a660fa0c15';
  
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apiKey)
    .then(response => response.json())
    .then(data => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      searchCity(latitude, longitude);
    })
    .catch(error => {
      console.error('erreur = '+error);
    });
}

function searchCity(latitude, longitude) {
  const apiKey = '8c58e7603a9d6defcdf272a660fa0c15';

  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey+'&units=metric')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const ville = data.name;
    const temp = data.main.temp;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;
    console.log("ville = " + ville);
    console.log("temp = " + temp);
    console.log("tempMax = " + tempMax);
    console.log("tempMin = " + tempMin);
    if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      console.log("tonner");
    } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321 && data.weather[0].id >= 500 && data.weather[0].id <= 531) {
      console.log("pluie");
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      console.log("neige");
    } else if (data.weather[0].id >= 700 && data.weather[0].id <= 781) {
      console.log("brume");
    } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
      console.log("nuage");
    }  else if (data.weather[0].id == 800) {
      console.log("soleil");
    }
    console.log("sunrise = "+new Date(data.sys.sunrise*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));   
    console.log("sunset = "+new Date(data.sys.sunset*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));   
    console.log("wind = "+data.wind.speed*3.6);   
    console.log("humidity = "+data.main.humidity);   
  })
}