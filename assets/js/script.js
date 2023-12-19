var apiKey="9e51d281356b0ffe07e06f28dbb6b631"

var cities=[];
var latitude;
var longtitude;




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

$("#search-button").on("click", function (event) {

    event.preventDefault();
    
  
    // Here we grab the text from the input box
    var userCity = $("#search-input").val();

    

    
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+userCity+"&appid=" + apiKey;

    console.log(queryURL);

    fetch(queryURL)
     .then(function (response) {
    // Calling .json() to access the json data stored inside the returned promise
    return response.json();
  })
  // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {

    latitude=data[0].lat;
    longtitude=data[0].lon;
    
    console.log(latitude);
    console.log(longtitude);
    
    })
    
    sleep(2000).then(() => {var queryURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longtitude+"&appid="+apiKey;
    

    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        //console.log(data);

        var todayData = data.list[0];

        var tempC = ((todayData.main.temp - 273.15).toFixed(2));
        

        console.log(data);

        var cityDiv=$("<div class='cityHeader'>");

        var cityAndDate = $("<h2>").text(data.city.name + "  "+todayData.dt_txt.split(" ")[0]+"");
        
    $("#today").append(cityDiv).append(cityAndDate);
    
    var iconURL= "https://openweathermap.org/img/w/"+ todayData.weather[0].icon+".png";

    $("#today").append("<img src='" +iconURL +"' alt='Weather Icon' style='width: 20%; height: 20%;'>");
    $("#today").append("<p>Temperature: " +tempC +"°C</p>");
    $("#today").append("<p>Humidity : "+ todayData.main.humidity + "%</p>");
    $("#today").append("<p> Wind Speed :" + todayData.wind.speed + "KPH</p>");

    /* // Convert the temp to Celsius
     var tempC = todayData.main.temp - 273.15;

     // add temp content to html
     $(".temp").text("Temperature (K) " + todayData.main.temp);
     $(".tempC").text("Temperature (C) " + tempC.toFixed(2));
  */

        var forecast1= data.list[3];
        var forecastDate = forecast1.dt_txt;
        var tempC1 = ((forecast1.main.temp - 273.15).toFixed(2));
        var forecastIconURL1= "https://openweathermap.org/img/w/"+ forecast1.weather[0].icon+".png";
        var a = $("<button>");
       

        $(".5Day").text("5-Day Forecast");

        $("#date1").text("Date: "+forecastDate.split(" ")[0]+"");
        $("#icon1").attr("src",forecastIconURL1);
        $("#temp1").text("Temperature: " + tempC1+"°C");
        $("#wind1").text("Humidity : " + forecast1.main.humidity+"%");
        $("#humidity1").text("Wind Speed : " + forecast1.wind.speed+ "KPH");

        var forecast2= data.list[11];
        var forecastDate = forecast2.dt_txt;
        var tempC2 = ((forecast2.main.temp - 273.15).toFixed(2));
        var forecastIconURL2= "https://openweathermap.org/img/w/"+ forecast2.weather[0].icon+".png";
        
        
        $("#date2").text("Date: "+forecastDate.split(" ")[0]+"");
        $("#icon2").attr("src",forecastIconURL2);
        $("#temp2").text("Temperature: " + tempC2+"°C");
        $("#wind2").text("Humidity : " + forecast2.main.humidity+"%");
        $("#humidity2").text("Wind Speed : " + forecast2.wind.speed+ "KPH");


        var forecast3= data.list[19];
        var forecastDate = forecast3.dt_txt;
        var tempC3 = ((forecast3.main.temp - 273.15).toFixed(2));
        var forecastIconURL3= "https://openweathermap.org/img/w/"+ forecast3.weather[0].icon+".png";
        
        
        $("#date3").text("Date: "+forecastDate.split(" ")[0]+"");
        $("#icon3").attr("src",forecastIconURL3);
        $("#temp3").text("Temperature: " + tempC3+"°C");
        $("#wind3").text("Humidity : " + forecast3.main.humidity+"%");
        $("#humidity3").text("Wind Speed : " + forecast3.wind.speed+ "KPH");


        var forecast4= data.list[27];
        var forecastDate = forecast4.dt_txt;
        var tempC4 = ((forecast4.main.temp - 273.15).toFixed(2));
        var forecastIconURL4= "https://openweathermap.org/img/w/"+ forecast4.weather[0].icon+".png";
        
        
        $("#date4").text("Date: "+forecastDate.split(" ")[0]+"");
        $("#icon4").attr("src",forecastIconURL4);
        $("#temp4").text("Temperature: " + tempC4+"°C");
        $("#wind4").text("Humidity : " + forecast4.main.humidity+"%");
        $("#humidity4").text("Wind Speed : " + forecast4.wind.speed+ "KPH");


        var forecast5= data.list[35];
        var forecastDate = forecast5.dt_txt;
        var tempC5 = ((forecast5.main.temp - 273.15).toFixed(2));
        var forecastIconURL5= "https://openweathermap.org/img/w/"+ forecast5.weather[0].icon+".png";
        
        
        $("#date5").text("Date: "+forecastDate.split(" ")[0]+"");
        $("#icon5").attr("src",forecastIconURL5);
        $("#temp5").text("Temperature: " + tempC5+"°C");
        $("#wind5").text("Humidity : " + forecast5.main.humidity+"%");
        $("#humidity5").text("Wind Speed : " + forecast5.wind.speed+ "KPH");
  

    })

    })

    

    });   
    
