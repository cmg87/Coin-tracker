// SET THE CONFIGURATION FOR THE NEWS API
var url = "https://newsapi.org";
var endpoints = "/v2/everything";
var parameters = "?sources=crypto-coins-news&pageSize=10";
var key = "&apiKey=bf18e40c575f4dc095fa32544208a15f";
var newsURL = url + endpoints + parameters + key;
// console.log(queryURL);

// INITIALIZE THE AJAX CALL AND CALLBACK
$.ajax({
  url: newsURL,
  method: "GET"
}).then(function(newsResponse) {
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
    $("#newsfeed").append("<hr>");
  }
});