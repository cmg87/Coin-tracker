// console.log("Michael's script is connected.");

// SET THE CONFIGURATION FOR THE NEWS API
var url = "https://newsapi.org";
var endpoints = "/v2/everything";
var source = "crypto-coins-news";
var parameter = "Cryptocurrency Headlines";
var results = "100";
var key = "bf18e40c575f4dc095fa32544208a15f";
var newsURL = url +
  endpoints +
  "?sources=" + source +
  "&q=" + parameter +
  "&pageSize=" + results +
  "&apiKey=" + key;
// console.log(queryURL);

// UTILIZE THE TICKER NAMES TO POPULATE OPTIONS FOR SEARCH TERMS
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

// INITIALIZE THE AJAX CALL AND CALLBACK TO GENERATE NEWS ARTICLES
$.ajax({
  url: newsURL,
  method: "GET"
}).then(function (newsResponse) {
  // console.log(newsResponse);
  var results = newsResponse.articles;
  $("#newsfeed").html("<p class='resultCount'>This search returned " + results.length + " results.</p>");
  for (i = 0; i < results.length; i++) {
    // CREATE THE ARTICLE CONTAINER
    var article = $("<div id='article'>");
    article.addClass("article");
    // article.text(i + 1);
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
    headline.append(results[i].title);
    headline.append("<span class='glyphicon glyphicon-new-window' aria-hidden='true'></span>");
    headlineContainer.append(headline);
    article.append(headlineContainer);
    // APPENED THE CONTENT AND HORIZONTAL RULE
    $("#newsfeed").append(article);
    $("#newsfeed").append("<hr>");
  }
});

// RE-INITIALIZE THE AJAX CALL AND CALLBACK UPON TOPIC SELECTION
$('body').on("change", "#newsSelector", function(){
  // console.log("Current search parameter: " + parameter);
  // GRAB THE TEXT VALUE OF THE UI OPTION
  value = $(this).val();
  // console.log("You selected " + value);
  // STORE THE TEXT VALUE TO A VARIABLE TO CONCATENATE
  parameter = $(this).val();
  // console.log("The serach parameter will now be: " + parameter);
  // RE-ESTABLISH THE URL USED FOR THE API CALL
  var newsURL = url + 
      endpoints + 
      "?sources=" + source + 
      "&q=" + parameter + 
      "&pageSize=" + results + 
      "&apiKey=" + key;
  // BUSINESS AS USUAL HERE ...
  $.ajax({
    url: newsURL,
    method: "GET"
  }).then(function (newsResponse) {
    // console.log(newsResponse);
    var results = newsResponse.articles;
    $("#newsfeed").html("<p class='resultCount'>This search returned " + results.length + " results.</p>");
    for (i = 0; i < results.length; i++) {
      // CREATE THE ARTICLE CONTAINER
      var article = $("<div id='article'>");
      article.addClass("article");
      // article.text(i + 1);
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
      headline.append(results[i].title);
      headline.append("<span class='glyphicon glyphicon-new-window' aria-hidden='true'></span>");
      headlineContainer.append(headline);
      article.append(headlineContainer);
      // APPENED THE CONTENT AND HORIZONTAL RULE
      $("#newsfeed").append(article);
      $("#newsfeed").append("<hr>");
    }
  });
});