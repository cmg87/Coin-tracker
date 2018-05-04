// console.log("Chris's script is connected.");
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
var returnArr = ["void"];

// USER LOGIC
username.on("value", function (snapshot) {
    console.log(snapshot.val());



    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();


        returnArr.push(item);
    });
    console.log(returnArr);

});

// SIGNUP LOGIC
$("#signup").on("submit", function () {
    event.preventDefault();
    var newuser = $("#username").val().trim();
    var newpassword = $("#password").val().trim();
    console.log(newuser);
    console.log(newpassword);
    for (var x in returnArr) {
        if (newuser == returnArr[x].username) {
            $('#signup').modal('hide');
            $('#usertaken').modal('show');
        }
        else {

            username.push({
                username: newuser,
                password: newpassword
            });
        }
    }


});

// LOGIN LOGIC
$("#login").on("submit", function () {
    event.preventDefault();
    var checkuser = $("#username1").val().trim();
    var checkpassword = $("#password2").val().trim();
    console.log(checkuser);
    console.log(checkpassword);
    for (var x in returnArr) {
        if (checkuser == returnArr[x].username && checkpassword == returnArr[x].password) {
            window.location.href = "user-tabs.html";
            localStorage.setItem("userarea", checkuser);
            
            // window.open("/home/chris/bootcamp/Project-1/user-tabs.html");
        }
        else {
            console.log("worked")
            $('#login').modal('hide');
            $('#wrong').modal('show');
        }
    }
  
});
$(window).on("load", function(){
    $("#userarea").append(localStorage.getItem("userarea"));
    // document.getElementById("userarea").text = localStorage.getItem("name");
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
  // console.log(response);
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
  // console.log("symbolArr:" + symbolArr);
  // console.log("priceArr:" + priceArr);
  // console.log("percentARR:" + percentArr);
  // console.log("top50:" + top50);

  // SCROLLING TICKER
  for (var i = 0; i < top50.length; i++) {
   
   var newCoinName = $("<span class= coin-name>")
   var newCoinInfo = $("<span>")
   var newCoinPrice = $("<span class = coin-price>")
   


    newCoinName.html(top50[i] + "-- ");

    newCoinInfo.html( "-- " + "ticker: " + symbolArr[i] + "-- " + "% change 24hr: " + percentArr[i] + " | ");
    newCoinPrice.html( "current price (USD$): " + priceArr[i]);
    

        $("#ticker").append(newCoinName)
        $("#ticker").append(newCoinPrice)
        $("#ticker").append(newCoinInfo)
        
    

  }

  // CRYPTO RANKINGS TILES AND MODALS
  for (i = 0; i < top50.length; i++) {
    modalid = symbolArr[i];
    // console.log("working");
    var tile = $("<div>");
    tile.addClass("col-xs-4 coins");
    tile.addClass("panel-body");
    tile.attr("class", "public-tile");
    tile.html(
      "<a class='tile-content' href='#' data-toggle='modal' data-target='#" + modalid + "'>" +
      "<img class='tile-image' src='assets/images/color32/" + symbolArr[i].toLowerCase() + ".png'>" + 
      "<p class='tile-text'>" + "#" + rankArr[i] + " " + top50[i] + "</p>" + 
      "</a>"
    );
    $("#top50").append(tile);
    $("span:contains('-')").addClass('red');
    $("span:contains('-')").addClass('red');
    $("#cryptomodal").append(
      "<div class='modal fade' id='" + symbolArr[i] + "' tabindex='-1' role='dialog'>" +
      "<div class='modal-dialog' role='document'>" +
      "<div class='modal-content'>" +
      "<div class='modal-header'>" +
      "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
      "<span aria-hidden='true'>&times;</span></button>" +
      "<h4 class='modal-title'>" +
      "<img src='assets/images/color32/" + symbolArr[i].toLowerCase() + ".png' class='modalIcon'>" + "#" + rankArr[i] + " - " + top50[i] + "<span class='modal-symbol'>" + symbolArr[i] + "</span></h4>" +
      "</div>" +
      "<div class='modal-body'>" +
      "<h1 class='modal-price'><span>Price:</span><span> " + priceArr[i] + " <span class='modal-currency'>USD</span></span></h1>" +
      "<table class='table market-table'>" +
      "<tr>" +
      "<th>Change: Last Hour</th>" +
      "<th>Change: 24 Hours</th>" +
      "<th>Change: 7 Days</th>" +
      "</tr>" +
      "<tr>" +
      "<td>" + "<span class='modal-change-value'>" + chng1h[i] + "</span>" + "</td>" +
      "<td>" + "<span class='modal-change-value'>" + chng7d[i] + "</span>" + "</td>" +
      "<td>" + "<span class='modal-change-value'>" + chng24h[i] + "</span>" + "</td>" +
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

// USER AREA TABS
$('#myTabs a').on("click", function (i) {
  i.preventDefault();
  $(this).tab('show');
});