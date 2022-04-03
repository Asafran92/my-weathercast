var apiKey = "2e87b116b64f5074218c9d8fc477d9b1";

function citySearch() {
  var cityName = document.getElementById("city-name").value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      console.log(data);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}&exclude=minutely,alerts`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          displayData(data);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  //console.log(response)
}

function displayData(data) {
  console.log(data);
  document.getElementById("current-temp").innerHTML = `${data.current.temp}`;
  document.getElementById(
    "current-wind"
  ).innerHTML = `${data.current.wind_speed}`;
  document.getElementById(
    "current-humidity"
  ).innerHTML = `${data.current.humidity}`;
  document.getElementById("current-uvi").innerHTML = `${data.current.uvi}`;
}

document.getElementById("search-btn").addEventListener("click", citySearch);
