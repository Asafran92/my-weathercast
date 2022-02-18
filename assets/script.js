var apiKey = "2e87b116b64f5074218c9d8fc477d9b1";

function citySearch() {
  //var cityName = document.getElementById("cityName").value;
  var cityName = "New York";
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=1&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data[0].lat, data[0].lon);
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  //console.log(response)
}

document.getElementById("search-btn").addEventListener("click", citySearch);
