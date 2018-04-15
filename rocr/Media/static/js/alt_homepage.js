var prec = 4;
var listSize = 5000;
var xList = [];
var dataSetsSize = 0;

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
    function removeDataSet(fc) {
        var datasetindex = myLineChart.data.datasets.findIndex(checkDataSet, fc);

        myLineChart.data.datasets.splice(datasetindex, 1);
        dataSetsSize--;

        myLineChart.update();
    }

}


function processChecked() {
    //all of the equations entered
    var eqList = [];
    //only the equations
    var checkedList = [];

    eqList.forEach(function (eq) {
        if (eq.isChecked()) {
            checkedList.push(eq)
        }
    });
    //Given a specific interval
    //Do all possible AND/Or combos on checked equations and plot
    // the equation of the best curve

    process(checkedList);

}
function process(cL) {


    var bestCurve = "";

    return bestCurve;
}

function removeChecked() {

    //Take in all the elements of the ul list, id "funcList"
    var eqList = [];


    // Remove from the graph and anywhere else, any of the checked equations

}


function enterDataSet() {
    //Getting the equation string, parsing and making a set
    //Also creating a checkbox entry with the equation
    var dataSet = [];
    var funcName = document.getElementById("funcDef").value;
    var datapoints = document.getElementById("noPoints").value;
    var func = document.getElementById("funcDef").value;
    var backgroundColor = dynamicColors();
    var borderColor = dynamicColors();

    dataSet = addDataSet(datapoints, func, backgroundColor, borderColor);




    //Also creating a checkbox entry with the equation
    var lEntry = document.createElement("li");
    var funcCheck = document.createElement("INPUT");
    funcCheck.setAttribute("type", "checkbox");
    funcCheck.checked = true;
    funcCheck.id = func;

    funcCheck.val = dataSet;
    funcCheck.onchange = function () {
        if (funcCheck.checked == false) {
            let removalIndex = myLineChart.data.datasets.indexOf(funcCheck.val); //Locate index of ds1
            if (removalIndex >= 0) { //make sure this element exists in the array
                myLineChart.data.datasets.splice(removalIndex, 1);
            }
            myLineChart.update();




        }
        else {
            funcCheck.val = addDataSet(datapoints, funcCheck.id, backgroundColor, borderColor);



        }
    }
    lEntry.innerHTML = funcName;
    lEntry.appendChild(funcCheck);
    document.getElementById("funcList").appendChild(lEntry);




}
function addDataSet(datapoints, func, bckC, bordC) {

    var f = math.parse(func);
    var simplified = math.simplify(f);

    var xList = [];

    //Make x values
    var x = 0;
    for (var i = 0; i < datapoints; i++) {
        x = i / datapoints;
        //x = Math.random();
        xList.push(x.toFixed(prec));
    }
    xList.sort()
    // This Function is currently unused. Trying to be able to resize and replot the data
    //when a new size is chosen
    if (datapoints < myLineChart.data.datasets[0].data.length) {
        removeExtraData(datapoints, simplified, xList);
    }

    ///Get the function values using the parsed equation

    var fX = 0;
    var fXList = [];
    for (var i = 0; i < datapoints; i++) {
        //This keeps the dataset under '1'(aka in the unit square)
        if (simplified.eval({ x: parseFloat(xList[i]) }) <= 1) {
            fX = simplified.eval({ x: parseFloat(xList[i]) });
            fXList.push(fX.toFixed(prec));
        }
    }

    //Prepare our new dataset.
    var newDataSet = {
        label: func,
        fill: false,
        backgroundColor: bckC,
        borderColor: bordC,
        data: fXList
    }
    myLineChart.data.labels = xList;
    //Push it onto our canvas/chart object
    myLineChart.data.datasets.push(newDataSet);

    //refresh our chart to show new dataset
    myLineChart.update();


    dataSetsSize++;
    return newDataSet;


}
//This function is not used yet but is where i want to be able to replot
// a resized dataset onto the chart
function removeExtraData(dp, s, xL) {

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

