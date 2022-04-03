var apiKey = "2e87b116b64f5074218c9d8fc477d9b1";
var searchedName;
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
      searchedName = data[0].name;
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
  document.getElementById("currentCity").innerText = searchedName;
  document.getElementById(
    "current-temp"
  ).innerText = `Temp: ${data.current.temp}`;
  document.getElementById(
    "current-wind"
  ).innerText = `Wind: ${data.current.wind_speed}`;
  document.getElementById(
    "current-humidity"
  ).innerText = `Humidity: ${data.current.humidity}`;
  document.getElementById(
    "current-uvi"
  ).innerText = `UVI Index: ${data.current.uvi}`;
  document.getElementById("forecast").innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4>Date</h4>
    <img src="https://via.placeholder.com/35x35" />
    <p>
        Temp: ${data.daily[i].temp.day}
    </p>
    <p>
        Wind: ${data.daily[i].wind_speed}
    </p>
    <p>
        Humidity: ${data.daily[i].humidity}
    </p>`;
    document.getElementById("forecast").append(card);
  }
}

document.getElementById("search-btn").addEventListener("click", citySearch);
