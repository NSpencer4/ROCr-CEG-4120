var prec = 4;
var listSize = 10000;
var xList = [];
var fXList = [];
var gXList = [];
var andList = [];
var orList = [];

//Make x values
var x = 0;
for (i = 0; i < listSize; i++) {
    x = Math.random();
    xList.push(x.toFixed(prec));
}
xList.sort()

//Make fX
var fX = 0;
for (var i = 0; i < listSize; i++) {

    fX = Math.tanh(2 * parseFloat(xList[i]));
    if (fX <= 1) {
        fXList.push(fX.toFixed(prec));
    }

}

//Make gX
var gX = 0;
for (var i = 0; i < listSize; i++) {

    gX = (12 / 11) * (Math.pow(Math.asin(parseFloat(xList[i])), (1 / 4)));
    if (gX <= 1) {
        gXList.push(gX.toFixed(prec));
    }

}
//Make fX AND gX
var andVal = 0;
for (var i = 0; i < listSize; i++) {

    andVal = parseFloat(fXList[i]) * parseFloat(gXList[i]);
    if (andVal <= 1) {
        andList.push(andVal.toFixed(prec));
    }

}


//Make fX OR gX

var orVal = 0;

for (var i = 0; i < listSize; i++) {
    orVal = parseFloat(fXList[i])
        + parseFloat(gXList[i]) -
        parseFloat(fXList[i]) * parseFloat(gXList[i]);
    if (orVal <= 1) {
        orList.push(orVal.toFixed(prec));
    }

}



////////GRAPH     //////////////

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: xList,
        datasets: [
            {
                label: "f(x) curve",
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: fXList,
            },
            {
                label: "g(x) curve",
                fill: false,
                backgroundColor: 'rgb(66, 134, 244)',
                borderColor: 'rgb(66, 134, 244)',
                data: gXList,
            }

        ]
    },

    // Configuration options go here
    options: {}

});


