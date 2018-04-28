// console.log("Vince's script is connected.");



// var queryURL = "https://api.coinmarketcap.com/v1/ticker/?limit=50";

var top50 = [];
var priceArr = [];
var symbolArr =[];
var percentArr = [];
// Performing our AJAX GET request
$.ajax({
url: queryURL,
method: "GET"
}).then(function(response){
console.log(response);
    for(var x in response){
        top50.push(response[x].name);
        priceArr.push(response[x].price_usd);
        percentArr.push(response[x].percent_change_24h);
        symbolArr.push(response[x].symbol);

    }
    console.log(symbolArr);
    console.log(priceArr);
    console.log(percentArr);

});
