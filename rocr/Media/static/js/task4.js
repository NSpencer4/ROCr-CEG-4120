


var prec = 3;
var listSize = 50;
var xList = [];
var yList = [];
var fXList = [];
var gXList = [];
var hXList = [];
var fAndGList = [];
var forGList = [];
var fAgOhList = [];
var fOgAhList = [];

//Make x values
var x = 0;
for (i = 0; i < listSize; i++) {
    x = i/listSize;
    xList.push(x.toFixed(prec));
}
xList.sort()

var y = 0;
for (i = 0; i < listSize; i++) {
    y = parseFloat(xList[i]);
    yList.push(y.toFixed(prec));
}
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

var hX = 0;
for (var i = 0; i < listSize; i++) {
    hX = Math.pow(parseFloat(xList[i]), (1 / 2));
    if (hX <= 1) {
        hXList.push(hX.toFixed(prec));
    }
}

//Make fX AND gX
var andVal = 0;
for (var i = 0; i < listSize; i++) {

    andVal = parseFloat(fXList[i]) * parseFloat(gXList[i]);
    if (andVal <= 1) {
        fAndGList.push(andVal.toFixed(prec));
    }

}


//Make fX OR gX

var orVal = 0;

for (var i = 0; i < listSize; i++) {
    orVal = parseFloat(fXList[i])
        + parseFloat(gXList[i]) -
        parseFloat(fXList[i]) * parseFloat(gXList[i]);
    if (orVal <= 1) {
        forGList.push(orVal.toFixed(prec));
    }

}

var fAgOh = 0;
for (var i = 0; i < listSize; i++) {
    fAgOh = parseFloat(fAndGList[i])
        + parseFloat(hXList[i]) -
        parseFloat(fAndGList[i]) * parseFloat(hXList[i]);
    if (fAgOh <= 1) {
        fAgOhList.push(fAgOh.toFixed(prec));
    }

}


var fOgAh = 0;
for (var i = 0; i < listSize; i++) {

    fOgAh = parseFloat(forGList[i]) * parseFloat(hXList[i]);
    if (fOgAh <= 1) {
        fOgAhList.push(fOgAh.toFixed(prec));
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
                label: "(f(x) AND g(x)) OR h(x) ",
                fill: false,
                backgroundColor: 'rgb(165, 9, 9)',
                borderColor: 'rgb(165, 9, 9)',
                data: fAgOhList,
            },
            {
                label: "(f(x) OR g(x)) AND h(x) ",
                fill: false,
                backgroundColor: 'rgb(42, 84, 24)',
                borderColor: 'rgb(42, 84, 24)',
                data: fOgAhList,
            },
            {
                label: " h(x) ",
                fill: false,
                backgroundColor: 'rgb(24, 48, 42)',
                borderColor: 'rgb(24, 48, 42)',
                data: hXList,
            },
            {
                label: " x=y ",
                fill: false,
                backgroundColor: 'rgb(60, 48, 120)',
                borderColor: 'rgb(60, 48, 120)',
                data: yList
            }

        ]
    },

    // Configuration options go here
    options: {


        responsive: true,
        title: {
            display: true,
            text: 'ROC curves'
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{


                display: true,

                scaleLabel: {
                    display: true,
                    labelString: 'False Positive'
                },
                ticks: {
                    maxTicksLimit: 10,
                    stepSize: .1
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'True Positive'
                },
                ticks: {
                    maxTicksLimit: 10,
                    stepSize: .1
                }
            }]
        }

    }

});

