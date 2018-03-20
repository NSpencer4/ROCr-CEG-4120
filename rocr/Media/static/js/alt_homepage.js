var prec = 4;
var listSize = 5000;
var xList = [];
var removeCounter = 0;

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
function addRemoveButtons() {

    document.getElementById("whichOne").innerHTML = "Which function would you like to remove?";
    for (var i = 1; i < myLineChart.data.datasets.length; i++) {
        var div = document.createElement("div");
        div.id = "div" + i;
        document.getElementById("toRemove").appendChild(div);
        var btn = document.createElement("BUTTON");
        btn.val = myLineChart.data.datasets[i];
        var t = document.createTextNode(myLineChart.data.datasets[i].label);
        btn.appendChild(t);
        div.appendChild(btn);
        btn.onclick = removeDataSet;
        

    }

    function checkDataSet(dataset) {
        return dataset == this.val;
    }
    function removeDataSet() {
        var datasetindex = myLineChart.data.datasets.findIndex(checkDataSet, this);

        myLineChart.data.datasets.splice(datasetindex, 1);
        this.parentNode.parentNode.removeChild(this.parentNode);
        myLineChart.update();
    }

}



function addDataSet() {
    var funcName = document.getElementById("funcDef").value;
    var datapoints = document.getElementById("noPoints").value;
    var func = document.getElementById("funcDef").value;
    var f = math.parse(func);
    var simplified = math.simplify(f);
    document.getElementById("test").innerHTML = func.toString();
    var xList = [];

    //Make x values
    var x = 0;
    for (var i = 0; i < datapoints; i++) {
        x = i / datapoints;
        //x = Math.random();
        xList.push(x.toFixed(prec));
    }
    xList.sort()

    if (datapoints < myLineChart.data.datasets[0].data.length) {
        removeExtraData(datapoints, simplified, xList);
    }

    ///Get the function values
    var fX = 0;
    var fXList = [];
    for (var i = 0; i < datapoints; i++) {
        if (simplified.eval({ x: parseFloat(xList[i]) }) <= 1) {
            fX = simplified.eval({ x: parseFloat(xList[i]) });
            fXList.push(fX.toFixed(prec));
        }
    }

    var newDataSet = {
        label: funcName,
        fill: false,
        backgroundColor: dynamicColors(),
        borderColor: dynamicColors(),
        data: fXList
    }
    myLineChart.data.labels = xList;
    myLineChart.data.datasets.push(newDataSet);
    myLineChart.update();
    removeCounter++;
    
}

function removeExtraData(dp, s, xL) {
    //can likely be removed
    var toBeRemoved = myLineChart.data.datasets[0].data.length - dp;

    myLineChart.data.datasets.forEach(function (dataset) {

        for (var i = 0; i < toBeRemoved; i++) {
            dataset.data.pop();
        }
        dataset.data = dataset.data.map(function () {
            return s.eval({ x: parseFloat(xL[i]) });
        });
    })
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
                beginAtZero: true,
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

