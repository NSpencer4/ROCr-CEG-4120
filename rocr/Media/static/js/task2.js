var prec = 4;
var listSize = 100;
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
            },
            {
                label: "f(x) AND g(x) ",
                fill: false,
                backgroundColor: 'rgb(165, 9, 9)',
                borderColor: 'rgb(165, 9, 9)',
                data: andList,
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
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'True positive'
                }
            }]
        }
    }

});

