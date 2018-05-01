console.log("Michael's script is connected.");

// SET THE CONFIGURATION FOR THE NEWS API
var url = "https://newsapi.org";
var endpoints = "/v2/everything";
var source = "crypto-coins-news";
var parameter = "Cryptocurrency Headlines";
var results = "20";
var key = "bf18e40c575f4dc095fa32544208a15f";
var newsURL = url + 
              endpoints + 
              "?sources=" + source + 
              "&q=" + parameter + 
              "&pageSize=" + results + 
              "&apiKey=" + key;
// console.log(queryURL);

// INITIALIZE THE AJAX CALL AND CALLBACK
$.ajax({
  url: newsURL,
  method: "GET"
}).then(function (newsResponse) {
  // console.log(newsResponse);
  var results = newsResponse.articles;
  for (i = 0; i < results.length; i++) {
    // CREATE THE ARTICLE CONTAINER
    var article = $("<div>");
    article.addClass("article");
    // CREATE THE PHOTO CONTAINER AND CONTENT
    var photoContainer = $("<div>");
    photoContainer.addClass("resultPhoto");
    var photo = $("<img>");
    photo.attr("src", results[i].urlToImage);
    photoContainer.append(photo);
    article.append(photoContainer);
    // CREATE THE HEADLINE CONTAINER AND CONTENT
    var headlineContainer = $("<div>");
    headlineContainer.addClass("resultHeadline");
    var headline = $("<a>");
    headline.attr("href", results[i].url);
    headline.attr("target", "_blank");
    headline.text(results[i].title);
    headlineContainer.append(headline);
    article.append(headlineContainer);
    // APPENED THE CONTENT AND HORIZONTAL RULE
    $("#newsfeed").append(article);
    // $("#newsfeed").append("<hr>");
  }
});

var coinURL = "https://api.coinmarketcap.com/v1/ticker/?limit=50";
var newsTop50 = [];
$.ajax({
  url: coinURL,
  method: "GET"
}).then(function (tickerResponse) {
  for (var x in tickerResponse) {
    newsTop50.push(tickerResponse[x].name);
  }
  // APPEND TOP 50 RESULTS AS NEWS TOPIC OPTIONS
  for (i = 0; i < newsTop50.length; i++) {
    var option = $("<option>");
    option.addClass(newsTop50[i]);
    option.text(newsTop50[i]);
    $("#newsSelector").append(option);
  }
});

$('#newsSelector').change(function(){
  console.log("Current search parameter: " + parameter);
  var value = $(this).val();
  console.log("You selected " + value);
  parameter = value;
  console.log("The serach parameter will now be: " + parameter);
});