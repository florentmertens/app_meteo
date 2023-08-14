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
  console.log('ville = '+city);
  const apiKey = '8c58e7603a9d6defcdf272a660fa0c15';
  
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apiKey)
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      console.log('lat : '+latitude);
      console.log('lon : '+longitude);
    })
    .catch(error => {
      console.error('erreur = '+error);
    });
}