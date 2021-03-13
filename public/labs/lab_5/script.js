function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmlzYXB1dHJpIiwiYSI6ImNrbTI5dWlqcDE0b2oycHBmcXZxbHpqbHYifQ.3TeYM6g9qA1-GOkgi0NaJg'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('.searchBar');
  const search = document.querySelector('.search');
  const suggestions = document.querySelector('.listOfRestaurants');
  
  const request = await fetch('/api');
  const location = await request.json();

  form.addEventListener('submit', async (event) => {
    suggestions.innerText= '';
    event.preventDefault();

    const places_filtered = location.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const firstFive = places_filtered.slice(0,5);

    if (firstFive.length < 1) {
      suggestions.classList.add('box');
      suggestions.innerText = "There are no matches found with this zipcode! Try Again!";
    };

    const firstLong = firstFive[0].geocoded_column_1.coordinates[0];
    const firstLat = firstFive[0].geocoded_column_1.coordinates[1];
    mapObjectFromFunction.setView(new L.LatLng(firstLat, firstLong), 8);
    mapObjectFromFunction.setZoom(15);

    suggestions.innerHTML = ''; 

    firstFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const combinedElement = document.createElement('li');
      combinedElement.classList.add('block');
      combinedElement.classList.add('list-item');
      combinedElement.classList.add('box');
      combinedElement.classList.add('has-background-primary-dark');
      combinedElement.classList.add('has-text-light');
      combinedElement.classList.add('mt-10');
      combinedElement.innerHTML = `<div class="list-header is-size-5 has-text-weight-bold">${item.name}</div> <address class="is-size-6"> ${item.address_line_1} </address>`;
      suggestions.append(combinedElement);
    });
    
    search.addEventListener('input', (event) => {
      if (search.value.length === 0) {
        suggestions.innerText = '';
        suggestions.classList.remove('box');
      }
    })

    search.addEventListener('input', (event) => {
      if(search.value.length === 0) {
        suggestions.innerText= '';
        suggestions.classList.remove('box');
      }
    })
  }); 
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions; 