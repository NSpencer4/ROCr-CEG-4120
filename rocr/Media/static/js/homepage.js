var prec = 4;
var listSize = 5000;
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
var canvas = document.getElementById('myChart');
// The data for our dataset
var data = {
    labels: xList,
    datasets: [
        {
            label: "x",
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: xList,
        },



    ]
};
var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function addDataSet() {
    var funcName = document.getElementById("funcName").value;
    var datapoints = document.getElementById("noPoints").value;
    var func = document.getElementById("funcDef").value;
    var f = math.parse(func);
    var simplified = math.simplify(f);

    var xList = [];
    //Make x values
    var x = 0;
    for (var i = 0; i < datapoints; i++) {
        x = Math.random();
        xList.push(x.toFixed(prec));
    }
    xList.sort()


    var fXList = [];
    for(var i = 0; i < datapoints; i++ ){
        fXList.push(simplified.eval({x: parseFloat(xList[i])}));
    }


    var newDataSet = {
        label: funcName,
        fill: false,
        backgroundColor: dynamicColors(),
        borderColor: dynamicColors(),
        data: fXList

    }
    var newXList = {
        label: "x",
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: xList,

    }
    
    
    
    myLineChart.data.datasets.push(newDataSet);
    myLineChart.update();
}


// Configuration options go here
var options = {


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
    },

};


var myLineChart = Chart.Line(canvas, {
    data: data,
    options: options
});

