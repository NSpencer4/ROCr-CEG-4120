var prec = 4;
var listSize = 5000;
var xList = [];


//Make x values
var x = 0;
for (i = 0; i < listSize; i++) {
    x = Math.random();
    xList.push(x.toFixed(prec));
}
xList.sort()





////////GRAPH     //////////////
var canvas = document.getElementById('myChart');
// The data for our dataset
var data = {
    labels: [],
    datasets: [
        {
            label: "",
            fill: false,
            backgroundColor: '',
            borderColor: '',
            data: [],
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


    if (datapoints < myLineChart.data.datasets[0].data.length){

        removeExtraData(datapoints, simplified, xList);

    }

    

    


    var fXList = [];
    for (var i = 0; i < datapoints; i++) {
        fXList.push(simplified.eval({ x: parseFloat(xList[i]) }));
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

    

    
    myLineChart.data.labels = xList;
    myLineChart.data.datasets.push(newDataSet);    
    myLineChart.update();
    document.getElementById("test").innerHTML = myLineChart.datasets[0].data.length;
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
                beginAtZero: true,
                maxTicksLimit: 10,
                stepSize: .1
            }
        }]
    },

};

function removeExtraData(dp, s, xL) {
    //can likely be removed
    var toBeRemoved = myLineChart.data.datasets[0].data.length - dp;

    myLineChart.data.datasets.forEach(function (dataset) {
                
        for (var i = 0; i < toBeRemoved; i++) {
            dataset.data.pop();
        }
        dataset.data = dataset.data.map(function() {
            return s.eval({ x: parseFloat(xL[i]) });
        });
        
    })
    myLineChart.update();
}



var myLineChart = Chart.Line(canvas, {

    data: data,
    options: options
});

