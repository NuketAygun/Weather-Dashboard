// API Key
var apiKey="a948707d6b348e7e2aa39c2f61ec2f20"

$("#search-button").on("click", function (event) {

    event.preventDefault();
    
    // Here we grab the text from the input box
    var userCity = $("#search-input").val().trim();

    console.log("User City:" , userCity);

    getWeatherData(userCity);
  
   addCityButton(userCity);

})   

function getWeatherData(userCity){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response)
        displayWeatherData(response);
    })

}

function displayWeatherData(data){


    $("#today").empty();
    $("#forecast").empty();

    var todayData= data.list[0];

    var todayContainer=$("<div class='today-container col-md-3'>");

    //Append the content in the today data

    todayContainer.append("<h2>"+data.city.name+"</h2>");
    todayContainer.append("<p>Date: ("+todayData.dt_txt.split(' ')[0]+")</p>");
    var iconURL= "https://openweathermap.org/img/w/"+ todayData.weather[0].icon+".png";
    todayContainer.append("<img src='"+iconURL+"' alt='today Icon'>");
    var tempCelsius = (todayData.main.temp - 273.15).toFixed(2);
    todayContainer.append("<p>Temperature: "+ tempCelsius+"°C</p>");
    todayContainer.append("<p> Humidity: "+todayData.main.humidity+"%</p>");
    todayContainer.append("<p>Wind Speed: "+todayData.wind.speed+"m/s</p>");

    $("#today").append(todayContainer);

  
    $(".5Day").text("5-Day Forecast:")

    var forecastRow = $("<div class='row' id='forecast-row'>");
 

    for(var i=0; i<5; i++){
        var forecast= data.list[i*8];
        var forecastDate= forecast.dt_txt.split(' ')[0];
        
        
        var forecastContainer=$("<div class ='col-md-2 col-sm-6' id='forecast-days'>");
        

        forecastContainer.append("<p><b>"+forecastDate+"</p>");
        var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
        forecastContainer.append("<img src='"+ forecastIconUrl+"' alt='eather Icon'>");
        var tempCelsius = (forecast.main.temp - 273.15).toFixed(2);
        forecastContainer.append("<p>Temp: "+tempCelsius+ " °C</p>");
        forecastContainer.append("<p>Humidity: "+forecast.main.humidity+"%</p>");
        forecastContainer.append("<p>Wind: "+forecast.wind.speed+"m/s</p>");

            //Append the content in the forecast container 

            forecastRow.append(forecastContainer);

    }

            $("#forecast").html(forecastRow);   

  }

       var cities = [];

        function setPage() {
            if(localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
            cities.forEach((c) => {
            addButton(c);
    })    
  }

         function addCityButton(userCity) {
    var button = $("<button>");
        button.text(userCity).attr("id",userCity);
        button.on("click", () => {
            getWeatherData(userCity);
        })
        $("#history").prepend(button);

  }


     $("#search-button").on("click", function() {

        var search = $("#search-input").val() || "london";

    if(localStorage.getItem("cities") !== null) {

        cities = JSON.parse(localStorage.getItem("cities"));
    }
    if(cities.indexOf(search) === -1) {
       cities.push(search);
       localStorage.setItem("cities",JSON.stringify(cities));
       getWeatherData(search);
       addCityButton(search);
    }
    $("#search-input").val("");
});
  
