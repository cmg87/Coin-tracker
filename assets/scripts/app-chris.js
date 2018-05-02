console.log("Chris's script is connected.");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCOObVG1ZdAPYgvbtel5Um3YjhxWEHt4vw",
  authDomain: "crypto-login-95231.firebaseapp.com",
  databaseURL: "https://crypto-login-95231.firebaseio.com",
  projectId: "crypto-login-95231",
  storageBucket: "crypto-login-95231.appspot.com",
  messagingSenderId: "71045864413"
};
firebase.initializeApp(config);

var username = firebase.database().ref('user');
var password = firebase.database().ref('password');
var returnArr = [];

username.on("value", function (snapshot) {
  console.log(snapshot.val());



  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();


    returnArr.push(item);
  });
  console.log(returnArr);

});

$("#signup").on("submit", function () {
  event.preventDefault();
  var newuser = $("#username").val().trim();
  var newpassword = $("#password").val().trim();
  console.log(newuser);
  console.log(newpassword);
  username.push({
    username: newuser,
    password: newpassword
  });

});

$("#signin").on("submit", function () {
  event.preventDefault();
  var checkuser = $("#username1").val().trim();
  var checkpassword = $("#password2").val().trim();
  console.log(checkuser);
  console.log(checkpassword);

});



var queryURL = "https://api.coinmarketcap.com/v1/ticker/?limit=50";
var modalid = '';
var top50 = [];
var priceArr = [];
var symbolArr = [];
var percentArr = [];
var rankArr = [];
var chng1h = [];
var chng7d = [];
var chng24h = [];
// Performing our AJAX GET request
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  for (var x in response) {
    top50.push(response[x].name);
    priceArr.push(response[x].price_usd);
    percentArr.push(response[x].percent_change_24h);
    symbolArr.push(response[x].symbol);
    rankArr.push(response[x].rank);
    chng1h.push(response[x].percent_change_1h);
    chng7d.push(response[x].percent_change_7d);
    chng24h.push(response[x].percent_change_24h);

  }
  console.log("symbolArr:" + symbolArr);
  console.log("priceArr:" + priceArr);
  console.log("percentARR:" + percentArr);
  console.log("top50:" + top50);

  for (var i = 0; i < top50.length; i++) {
    $("#ticker").append(top50[i] + "-- " + "ticker: " + symbolArr[i] + "-- " + "current price (USD$): " + priceArr[i] + "-- " + "% change 24hr: " + percentArr[i] + " | ");

  }
  for (i = 0; i < top50.length; i++) {
    modalid = symbolArr[i];
    console.log("working");
    var tile = $("<div>");
    tile.addClass("col-xs-4 coins");
    tile.addClass("panel-body");
    tile.attr("class", "public-tile");
    tile.html("<a href='#' data-toggle='modal' data-target='#" + modalid + "'><img src='assets/images/color32/" + symbolArr[i].toLowerCase() + ".png'>" + "<p></p><p>" + top50[i] + "</p></a>");
    $("#top50").append(tile);
    $("#cryptomodal").append(
      "<div class='modal fade' id='" + symbolArr[i] + "' tabindex='-1' role='dialog'>" +
      "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
          "<div class='modal-header'>" +
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
            "<span aria-hidden='true'>&times;</span></button>" +
            "<h4 class='modal-title'>" + 
            "<img src='assets/images/color32/" + symbolArr[i].toLowerCase() + ".png' class='modalIcon'>" + "#" + rankArr[i] + " - " + top50[i] + " (" + symbolArr[i] + ") </h4>" +
          "</div>" +
          "<div class='modal-body'>" +
            "<h1 class='text-center'><span>Price:</span><span> " + "$" + priceArr[i] + " (USD)</span></h1>" +
            "<table class='table'>" +
              "<tr>" +
                "<th>Change: Last Hour</th>" +
                "<th>Change: 24 Hours</th>" +
                "<th>Change: 7 Days</th>" +
              "</tr>" +
              "<tr>" +
                "<td>" + chng1h[i] + "</td>" +
                "<td>" + chng7d[i] + "</td>" +
                "<td>" + chng24h[i] + "</td>" +
              "</tr>" +
            "</table>" +
          "</div>" +
          "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"  
    );
  }
});


$('#myTabs a').on("click", function (i) {
  i.preventDefault();
  $(this).tab('show');
});


