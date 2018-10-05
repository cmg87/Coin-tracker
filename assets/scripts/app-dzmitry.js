// console.log("Dzmitry's script is connected.");

$("#newsTab").on('click', function () {
    $("#content").addClass('selected');
    $("#newsfeedTab").removeClass('selected');
});
$("#favoritesTab").on('click', function () {
    $("#content").removeClass('selected');
    $("#newsfeedTab").addClass('selected');
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.target; // newly activated tab
    e.relatedTarget; // previous active tab
});

var iconsArray = [
    "agi", "bat", "btg", "dash", "dat", "edo", "elf", "eos", "etc", "etp", "fun", "gnt", "lrc", "mana", "omg", "qtum", "rdn", "req", "rlc", "san", "snt", "tnb", "trx", "wax", "xmr", "yoyow", "zec", "zrx"
];
for (var x = 0; x < iconsArray.length; x++) {
    var newImg = $('<img>');
    var scrimg = 'assets/images/color/' + iconsArray[x] + '.png';
    newImg.attr("data-currency", iconsArray[x]);
    newImg.attr("title", iconsArray[x]);
    newImg.addClass("logo");
    newImg.attr("src", scrimg);
    $("#icons").append(newImg);
}
// $("#icons").slick({
//     infinite: false,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     adaptiveHeight: false

// });

$(document).on('click', '.logo', function () {
    var x = $(this);
    symbollowercase = $(this).data('currency');
    symbol = symbollowercase.toUpperCase();
    // arrayOfcurrency.push(symbol);
    var iconSelected = $(this).addClass('animated zoomOutDown');
    // $('#iconsyouselected').append(this);
    $('#choosen').removeClass('selected');
    setTimeout(function () {
        $('#iconsyouselected').append(x);
        x.attr("src", "assets/images/color/" + symbollowercase + ".png");
        x.removeClass('animated zoomOutDown');
        x.addClass('selectedIcons');
    }, 1000);
    // console.log(arrayOfcurrency)
});

$(document).on('click', "#choosen img", function () {
    var iconMoveBack = $(this);
    var grabdata = iconMoveBack.data('currency');
    grabdata = grabdata.toUpperCase();
    iconMoveBack.addClass('animated zoomOutUp');
    if (grabdata === 'LTC' || grabdata === 'BTC' || grabdata === 'XRP' || grabdata === 'ETH' || grabdata === 'BCH' || grabdata === 'NEO') {
        setTimeout(function () {
            iconMoveBack.addClass('logo');
            $('#top6').append(iconMoveBack);
            iconMoveBack.attr("src", "assets/images/color/" + symbollowercase + ".png");
            iconMoveBack.removeClass('animated zoomOutUp selectedIcons');
        }, 1000);
    } else {
        setTimeout(function () {
            iconMoveBack.addClass('logo');
            $('#icons').append(iconMoveBack);
            iconMoveBack.attr("src", "assets/images/color/" + symbollowercase + ".png");
            iconMoveBack.removeClass('animated zoomOutUp selectedIcons');
        }, 1000);
    }
});

$("#submit").on("click", function (event) {
    event.preventDefault();
    var countIcons = document.getElementsByClassName('selectedIcons ');
    console.log(countIcons.length);
    console.log(countIcons);
    var arrayOfcurrency = [];
    for (var b = 0; b < countIcons.length; b++) {
        var indexData = countIcons[b].dataset.currency;
        indexData = indexData.toUpperCase();
        // console.log(indexData);
        arrayOfcurrency.push(indexData);
    }
    console.log(arrayOfcurrency);
    var timestart = new Date($('#datestart').val());
    var timeend = new Date($('#dateend').val());
    // console.log(timestart + " / " +timeend);
    timestart = moment(timestart).toISOString();
    timeend = moment(timeend).toISOString();
    timestart = moment(timestart).format('YYYY-MM-DDT00:00:00');
    timeend = moment(timeend).format('YYYY-MM-DDT00:00:00');
    console.log(timestart);
    console.log(timeend);
    var apikey = "6906E287-FE23-4015-B8A8-33BE41F6A603"; //A0322A0A-6E01-43C6-B71F-A09EECA6AA95 44F0B895-991E-4928-B670-06CB7457F8D5   2C9CBCA4-6437-47E9-AA90-4BB66B7953C7
    console.log(arrayOfcurrency.length);
    if (arrayOfcurrency.length == 0) {
        alert('Please select something');
    }
    var bgColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    var borderColor = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    var tarray = [];
    var prarray = {};
    var ctx = document.getElementById("myChart").getContext('2d');

    for (var x = 0; x < arrayOfcurrency.length; x++) {
        var queryURL = "https://rest.coinapi.io/v1/ohlcv/BITFINEX_SPOT_" + arrayOfcurrency[x] + "_USD/history?period_id=1DAY&time_start=" + timestart + "&time_end=" + timeend + "&apikey=" + apikey;

        var name = arrayOfcurrency[x];
        // for(var a = 0; a <arrayOfcurrency.length; a++){
        var counter = 0;
        var datasets = [];

        console.log(prarray);

        (function f(name) {
            $.ajax({
                type: 'GET',
                url: queryURL,
            }).then(function (ajaxresponse) {
                console.log(ajaxresponse);
                var pricearray = [];
                var timearray = [];

                // console.log(prarray);
                // console.log(pricearray) 

                for (var i = 0; i < ajaxresponse.length; i++) {
                    var price_close = ajaxresponse[i].price_close;
                    // console.log('price: ' + price_close );
                    var time_close = ajaxresponse[i].time_close;
                    time_close = moment(time_close).format('YYYY-MM-DD');
                    // console.log('date: '+ time_close);
                    timearray.push(time_close);
                    pricearray.push(price_close);
                    // prarray["Object"+a] = new Object(pricearray); 
                    // pricearray["Object"+i] = new Object(price_close);     
                    // console.log("Object with arrays : " + prarray);   
                }

                var randomColor = Math.floor((Math.random() * bgColor.length) + 1);

                var newBorderColor = borderColor[randomColor];
                var newColor = bgColor[randomColor];
                datasets.push({
                    label: name + ' to USD',
                    data: pricearray,
                    backgroundColor: newColor,
                    borderColor: newBorderColor,
                    borderWidth: 1
                });
                // console.log(prarray);   

                console.log('name = ' + name);
                // console.log('array od dates' + timearray);
                // console.log('array of price' + pricearray);
                counter++;

                if (counter == arrayOfcurrency.length) {
                    console.log(datasets.length);
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: timearray,
                            datasets: datasets
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                }

            });
        })(name);



        // console.log('Price array in Ajax: ' + pricearray)
        // console.log('Date array in Ajax: ' + timearray)
        // console.log('name in ajax function is ' + name)


    }
});