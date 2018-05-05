// console.log('Vince's script is connected.');

$.ajax({ //get the basic global data from coinmarketcap such as total cap in usd, volume, active markets and active cryptos
    url: 'https://api.coinmarketcap.com/v2/global/',
    method: "GET"
}).then(function (response) {
    console.log(response);
    // store values from json response in to variables
    var totalvolume = response.data.quotes.USD.total_market_cap;
    var totalmarketcap = response.data.quotes.USD.total_market_cap;
    var activemarkets = response.data.active_markets;
    var active_cryptocurrencies = response.data.active_cryptocurrencies;
    // append data to jumbotron div #marketcapbox
    marketcapbox = $("#marketcapbox");
    marketcapbox.append("<ul><li>Total Market Cap: "+totalmarketcap+"</li><li>Total Marktet Volume: "+totalvolume+"</li><li>Markets Active: "+activemarkets+"</li><li>Active CryptoCurrencies: "+active_cryptocurrencies+"</li></ul>");
});