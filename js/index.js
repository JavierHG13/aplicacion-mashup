  let map, service, infowindow, searchBox;

    async function initMap() {
      const initialPosition = { lat: 21.1251952, lng: -98.4127547 }; // Ubicación inicial
      const { Map } = await google.maps.importLibrary("maps");
      const { PlacesService } = await google.maps.importLibrary("places");

      // Crear el mapa
      map = new Map(document.getElementById("map"), {
        center: initialPosition,
        zoom: 5,
      });

      service = new PlacesService(map);
      infowindow = new google.maps.InfoWindow();

      const input = document.getElementById("search-box");
      searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        infowindow.close();
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
        const centerLocation = places[0].geometry.location;
        map.setZoom(12);

        const request = {
          location: centerLocation,
          radius: 100000,
          type: "restaurant",
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
              });

              marker.addListener("click", () => {
                infowindow.setContent(
                  `<strong>${place.name}</strong><br>${place.vicinity}`
                );
                infowindow.open(map, marker);
                getPlaceDetails(place.place_id, place.geometry.location);
              });
            });
          }
        });
      });
    }

    function getPlaceDetails(placeId, location) {
      const request = {
        placeId: placeId,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "website",
          "opening_hours",
          "photos",
        ],
      };

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          updateRestaurantDetails(place);
          getWeatherForecast(location);
        }
      });
    }

    function updateRestaurantDetails(place) {
      document.getElementById("restaurant-name").textContent = place.name || "No disponible";
      document.getElementById("restaurant-address").textContent =
        place.formatted_address || "No disponible";
      document.getElementById("restaurant-phone").textContent =
        place.formatted_phone_number || "No disponible";
      

      if (place.opening_hours) {
        document.getElementById("restaurant-hours").textContent =
          place.opening_hours.weekday_text.join(", ") || "No disponible";
      } else {
        document.getElementById("restaurant-hours").textContent = "No disponible";
      }

      const photoGallery = document.getElementById("photo-gallery");
      photoGallery.innerHTML = "";
      if (place.photos) {
        place.photos.forEach((photo) => {
          const img = document.createElement("img");
          img.src = photo.getUrl({ maxWidth: 100, maxHeight: 100 });
          img.alt = "Restaurant Photo";
          photoGallery.appendChild(img);
        });
      } else {
        photoGallery.innerHTML = "<p>No hay fotos disponibles</p>";
      }
    }

    async function getWeatherForecast(location) {
      const key = '9f72f94703c04d8c98364037242811'; 
      const lat = location.lat();
      const lng = location.lng();
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.style.display = "block"; // Mostrar pronóstico del clima

      const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lng}&days=7`; // 7 días de pronóstico



      try {
        const response = await fetch(url);
        const data = await response.json();

        // Depuración
        console.log(data);

        const forecastHTML = data.forecast.forecastday.map((day) => {
          const date = new Date(day.date); // Convertir el timestamp a fecha
          const dayName = date.toLocaleDateString("es-ES", { weekday: 'long' });
          const temp = day.day.avgtemp_c;
          const description = day.day.condition.text;
          const icon = day.day.condition.icon;

          return `
         <div class="tarjeta-pronostico">
           <h4>${dayName} - ${temp}°C</h4>
           <img src="https:${icon}" alt="${description}" />
           <p>${description}</p>
         </div>
       `;
        }).join("");

        forecastContainer.innerHTML = forecastHTML;
      } catch (error) {
        forecastContainer.innerHTML = "<p>No se pudo obtener el pronóstico del clima.</p>";
      }
    }

    // Inicializa el mapa
    initMap();