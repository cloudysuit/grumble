$(document).ready(function(){
var zheader,version,url;
var u = "https://developers.zomato.com/api/"//starter URL
// var cuisines = cuisineOptions.toString(); //type of foods to search for
var cuisineNotEliminated;

//user price assigned to an array
var priceSelected = new Array();
  $('.price').click(function() {
     priceSelected.push($(this).val());

  $(this).toggleClass("unpicked");
  $(this).toggleClass("picked");
})

//create a function that takes in an array
function extractString(array){
  //set the initial value to a empty string
    var finalString ="";
    //loop through the given array 
    array.forEach(function(prop){
    //for each item in the array, add to finalString
      finalString+= "," + prop;
    });
    //return finalString
    return finalString;
  }
//list of food options to select from
var cuisineOptions = ["Italian", "American", "BBQ", "Burger", "Asian", "Seafood", "Pizza", "Breakfast", "Sandwich","Mexican"];
var eliminated = new Array();
//when food button is clicked
$('.type').click(function() {
  //push the food type to a new array
  eliminated.push($(this).text());
  //create a new array with the food options that are left
  cuisineNotEliminated = $(cuisineOptions).not(eliminated).get();
  $(this).toggleClass("picked");
  $(this).toggleClass("unpicked");
});

//zomato api call
var Zomato = {
  init:function (key) {
    if (key!=null) {
      zheader = {
        Accept : "text/plain; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Zomato-API-Key":key
      }
    } else {
      console.error("Enter the key");
    };
    version = key.version||"v2.1";
    url = u + version
  },
  geocode:function (coords,scb,ecb) {
    if (coords.latitude&&coords.longitude==null) {
      console.error("Enter the coordinates correctly");
    } else {
      $.ajax({
        url:url+"/geocode",
        headers:zheader,
        data:{
          lat:coords.latitude,
          lon:coords.longitude
        },
        success:function (response) {
          scb(response);
        },
        error:function (res) {
          ecb(res)
        }
      })
    }
  },
  //main search parameters
  search: function(coords, cuisines, count, radius, scb, ecb){
    if (coords.latitude&&coords.longitude==null) {
      console.error("Enter the coordinates correctly");
    } else {
      $.ajax({
        url:url+"/search",
        headers:zheader,
        data:{
          lat:coords.latitude,
          lon:coords.longitude,
          count: count,
          q: extractString(cuisineNotEliminated),
          radius: radius,
          sort: "rating"
        },
        success:function (response) {
            for (var i = 0; i < count; i++) {
              if (response.restaurants[i].restaurant.price_range <= priceSelected){
                
                if(i === 0) {

                  $("#result1").append("<img class='restaurant-image' src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result1").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result1").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result1").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")

                  

                  // $("#result1").append("<img src='" + response.restaurants[i].restaurant.featured_image + "'alt= photo of " + response.restaurants[i].restaurant.name + "/>");

                }
                if (i === 1){

                  $("#result2").append("<img class='restaurant-image'  src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result2").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result2").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result2").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")

              

                  // $("#result2").append("<img src='" + response.restaurants[i].restaurant.featured_image + "'alt= photo of " + response.restaurants[i].restaurant.name + "/>");

                }
                if (i === 2) {

                  $("#result3").append("<img class='restaurant-image'  src='" + response.restaurants[i].restaurant.featured_image + "'/>");

                  $("#result3").append("<h1 class='restaurant-title'>" + response.restaurants[i].restaurant.name + "</h1>");
                  $("#result3").append("<h3 class='restaurant-price'>Price for Two: $" + response.restaurants[i].restaurant.average_cost_for_two + "</h3>");
                  $("#result3").append("<p class='restaurant-rating'>Rating: " + response.restaurants[i].restaurant.user_rating.aggregate_rating + "</p>")

               

                  // $("#result3").append("<img src='" + response.restaurants[i].restaurant.featured_image + "'alt= photo of " + response.restaurants[i].restaurant.name + "/>");

                }
                
              }
            }

            for (var i = 0; i < 3; i++) {
              if (response.restaurants[i].restaurant.price_range <= priceSelected){
                
                console.log(response.restaurants[i].restaurant.name);
                console.log(response.restaurants[i].restaurant.average_cost_for_two);
                console.log(response.restaurants[i].restaurant.user_rating.aggregate_rating)
                console.log(response.restaurants[i].restaurant.featured_image);
              }
            }


         //  //first restaurant to be returned
        	// var restaurantNameOne = response.restaurants[0].restaurant.name;
        	// var restaurantPriceOne = response.restaurants[0].restaurant.price_range;
        	// var restaurantRatingOne = response.restaurants[0].restaurant.user_rating.aggregate_rating;
        	// var restaurantLocationOne = response.restaurants[0].restaurant.location.address;
         //  var restaurantPhotoOne = response.restaurants[0].restaurant.featured_image;


         //  //first returned restaurant
         //  var restaurantNameTwo = response.restaurants[1].restaurant.name;
         //  var restaurantPriceTwo = response.restaurants[1].restaurant.price_range;
         //  var restaurantRatingTwo = response.restaurants[1].restaurant.user_rating.aggregate_rating;
         //  var restaurantLocationTwo = response.restaurants[1].restaurant.location.address;
         //  var restaurantPhotoTwo = response.restaurants[1].restaurant.featured_image;


         //  //second returned restaurant
         //  var restaurantNameThree = response.restaurants[2].restaurant.name;
         //  var restaurantPriceThree = response.restaurants[2].restaurant.price_range;
         //  var restaurantRatingThree = response.restaurants[2].restaurant.user_rating.aggregate_rating;
         //  var restaurantLocationThree = response.restaurants[2].restaurant.location.address;
         //  var restaurantPhotoThree = response.restaurants[2].restaurant.featured_image;

        	
         //  //third returned restaurant
         //  var restaurantNameFour = response.restaurants[3].restaurant.name;
         //  var restaurantPriceFour = response.restaurants[3].restaurant.price_range;
         //  var restaurantRatingFour = response.restaurants[3].restaurant.user_rating.aggregate_rating;
         //  var restaurantLocationFour = response.restaurants[3].restaurant.location.address;
         //  var restaurantPhotoFour = response.restaurants[3].restaurant.featured_image;


          //log each restaurant to the console with name, price, rating, and location
        	// console.log(restaurantNameOne + " " + restaurantPriceOne + " " + restaurantRatingOne + " " + restaurantLocationOne);
        	// console.log(restaurantNameTwo + " " + restaurantPriceTwo + " " + restaurantRatingTwo + " " + restaurantLocationTwo);
        	// console.log(restaurantNameThree + " " + restaurantPriceThree + " " + restaurantRatingThree + " " + restaurantLocationThree);
        	// console.log(restaurantNameFour + " " + restaurantPriceFour + " " + restaurantRatingFour + " " + restaurantLocationFour);
        	// console.log(response)
          scb(response);
        },
        error:function (res) {
          ecb(res)
        }
      })
    }
  }
}


//coordinates of location
var coords = {
	latitude: "30.232300",
	longitude: "-97.739868"
}

var radius = 16093.44;
//max results to return
var count = 15;
//API key
Zomato.init("0ed57fbb51db1686778d3291c5a24632");
//call search options with location, cuisine, and count limit

  $("#pricePoint-submit").on("click", function(){
    console.log(cuisineNotEliminated);
    //extractString(cuisineNotEliminated);
    Zomato.search(coords, cuisines, count, radius, scb);
    
}) 



function scb(response) {
}

function ecb(){
  console.log("there was an error in zomato.js");
}

})
