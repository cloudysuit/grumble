// $(document).ready(function(){

// // var googleMapsKey = "&key=AIzaSyBfQu6oJU6bPRuUyHqpk8HStkK76-cHBN0";
// // var yelpToken = "";
// // var weatherKey = " 88fa17d19b77bfc5";
	
// // var origin = "origin=Disneyland&";
// // var destination ="destination=Universal+Studios+Hollywood4";
// // var queryURL = "https://maps.googleapis.com/maps/api/directions/json?&"  + origin + destination +  googleMapsKey;
var userZIP;
var mileRadius;





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

$(document).ready(function(){
	$("#location").hide();
	$("#cuisines").hide();
	$("#pricePoint").hide();
});

$("#start").on("click", function(event){
	event.preventDefault();
	$("#startScreen").toggle("slide");
	$("#location").toggle("slide");
	$("#location").show();

});





$("#distance-submit").on("click", function(event){
	event.preventDefault();
	userZIP = $("#zip-input").val().trim();
	mileRadius = $("#distance-select").val();
	$("#location").toggle("slide");
	$("#cuisines").toggle("slide");
	$("#cuisines").show();

	// $("#location").toggle("slide");


	console.log(userZIP);
	console.log(mileRadius);

var cuisineOptions = ["Italian", "American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich","Mexican"];
$( document ).ready(function() {
            var eliminated= new Array();
            $('.type').click(function() {
                 eliminated.push($(this).html());
                  console.log("eliminated contents = "+ eliminated)
            
 $( document ).ready(function(){
var cuisineNotEliminated = $(cuisineOptions).not(eliminated).get();
console.log("items not eliminated = " + cuisineNotEliminated );

            });


});
       });



var queryWeather = "http://api.wunderground.com/api/88fa17d19b77bfc5/conditions/q/" + userZIP + ".json";

$.ajax({
	url: queryWeather,
	method: "GET",
	

}).done(function(weather) {
	console.log(queryWeather);
	console.log(weather);
	});


});








// });