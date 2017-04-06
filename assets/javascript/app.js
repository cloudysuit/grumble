// $(document).ready(function(){

// // var googleMapsKey = "&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0";
// // var weatherKey = " 88fa17d19b77bfc5";

// // var origin = "origin=Disneyland&";
// // var destination ="destination=Universal+Studios+Hollywood4";
// // var queryURL = "https://maps.googleapis.com/maps/api/directions/json?&"  + origin + destination +  googleMapsKey;

//******************VARIABLES******************
var userZIP;
var mileRadius;
var userZiplatitude;
var userZiplongitude;




//function to store user input zipcode as lat/long variables
function getCoords() {

    var geocoder = new google.maps.Geocoder();
    var address = userZIP;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            userZiplatitude = results[0].geometry.location.lat();
            userZiplongitude = results[0].geometry.location.lng();
            console.log("Latitude: " + userZiplatitude + "\nLongitude: " + userZiplongitude);
        } else {
            alert("Request failed.")
        }
    });
};





// $.ajax({
// 	 url: 'https://maps.googleapis.com/maps/api/js/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0',
// 	// url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0&callback=initMap",
// 	method: "GET",
// 	dataType:"jsonp",
// 	crossOrigin:true
// }).done(function(response) {
// 	console.log(response);
// 	});


// });

// $(document).click(function(){
// 	$("#location").toggle("slide");
// });




//When page loads hides all content areas except the start screen
$(document).ready(function() {
    $("#location").hide();
    $("#cuisines").hide();
    $("#pricePoint").hide();
    $("#results").hide();
   

    // $("#slideshow").hide();
});

//This is what causes the background slideshow on page load could be merged into above function. 
$(document).ready(function() {
    $('#slideshow').cycle({
        fx: 'fade',
        pager: '#smallnav',
        pause: 5,
        speed: 2000,
        timeout: 3500
    });

    console.log("slideshow");
});


//When "Click to Start" button is clicked, this slides away the start button, slides in the location content

$("#start").on("click", function(event) {
    event.preventDefault();
    $("#startScreen").toggle("slide");
    $("#location").toggle("slide");
    $("#location").show();
    $("#slideshow").hide();

});

//when the user submits their location preferences this captures the zip code and radius as a variables to be used by the geocoder and map respectively. Runs geocoder function. Also hides location slide and brings forth the cuisines preferences content.

$("#distance-submit").on("click", function(event) {
    event.preventDefault();
    userZIP = $("#zip-input").val().trim();
    mileRadius = $("#distance-select").val();
    $("#location").toggle("slide");
    $("#cuisines").toggle("slide");
    $("#cuisines").show();

    getCoords();

    console.log(userZIP);
    console.log(mileRadius);

//Calls the Wunderground API to pull weather info as a json response for user's zipcode

// var queryWeather = "http://api.wunderground.com/api/88fa17d19b77bfc5/conditions/q/" + userZIP + ".json";

    // $.ajax({
    // 	url: queryWeather,
    // 	method: "GET",


    // }).done(function(weather) {
    // 	console.log(queryWeather);
    // 	console.log(weather);
    // 	});


});

//When user submits their cuisines preferences this removes and displays the respecitve content

$("#cuisines-submit").on("click", function(event) {
    event.preventDefault();
    $("#cuisines").toggle("slide");
    $("#pricePoint").toggle("slide");
    $("#pricePoint").show();
});


//Changes display from questions to results
$("#pricePoint-submit").on("click", function(event) {
    event.preventDefault();
    $("#pricePoint").toggle("slide");
    $("#results").toggle("slide");
    $("#results").show();
});



//this controls the "flip" animation of the results boxes. 

$(".flipper").flip({
	trigger: "click",
	background: "#f3ffe2"
});


