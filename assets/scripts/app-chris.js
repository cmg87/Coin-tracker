console.log("Chris's script is connected.");
// {/* <a class="btn btn-primary" data-toggle="modal" href='#modal-id'>Trigger modal</a>
// <div class="modal fade" id="modal-id">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
//                 <h4 class="modal-title">Modal title</h4>
//             </div>
//             <div class="modal-body">

//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//                 <button type="button" class="btn btn-primary">Save changes</button>
//             </div>
//         </div>
//     </div>
// </div> */}



var queryURL = "https://api.coinmarketcap.com/v1/ticker/?limit=50";

var top50 = [];
var priceArr = [];
var symbolArr = [];
var percentArr = [];
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

    }
    console.log(symbolArr);
    console.log(priceArr);
    console.log(percentArr);

    for (var i = 0; i < top50.length; i++) {
        // $("#ticker").append(top50[i])
        $("#ticker").append(top50[i] + "-- " + "ticker: " + symbolArr[i] + "-- " + "current price (USD$): " + priceArr[i] + "-- " + "% change 24hr: " + percentArr[i] + " | ")

    }

    for (var i = 0; i < top50.length; i++) {

        console.log("working")
        var tile = $("<div>")
        tile.addClass("panel-body")
        tile.attr("class", "public-tile")



        tile.html("<img src= 'https://dummyimage.com/60x60/000/fff&text=image     '>")

        $("#top50").append(tile)



    }



});

function modal() {

    var $modalDiv = $("<div>");
}