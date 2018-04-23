const mongoose = require('mongoose');
const ml = require('machine_learning');

module.exports.checkConditions = function (req, res) {

    let coughing = req.body.coughing;
    console.log(req.body);

    let highFever = req.body.highFever;
    let sniffling = req.body.sniffling;
    let aching = req.body.aching;
    let days = req.body.days;

    let data = [
        ['no','no','no','no',5],
        ['no','no','no','yes', 10],
        ['no','no','yes', 'no', 15],
        ['no','no','yes', 'yes', 20],
        ['no','yes','no','no',25],
        ['no','yes','no','yes', 6],
        ['no','yes','yes','no', 7],
        ['no','yes','yes','yes', 8],
        ['yes','no','no','no',9],
        ['yes','no','no','yes',10], // 10
        ['yes','no','yes','no',3],
        ['yes','no','yes','yes',12],
        ['yes','yes','no','no',13],
        ['yes','yes','no','yes',23],
        ['yes','yes','yes','no',15],
        ['yes','yes','yes','yes',16]
    ];
    
    let result = ['none', 'none', 'none', 'C', 'none', 'none', 'B', 'B', 'none', 'C', 'B', 'A', 'B', 'B', 'A', 'A'];

    let dt = new ml.DecisionTree({
        data: data,
        result: result
    });
    dt.build();

    console.log("---------------------");
    console.log(dt.classify([coughing, highFever, sniffling, aching]));
    var classificationResult = dt.classify([coughing, highFever, sniffling, aching, days]);


    var tree = dt.getTree();

    dt.prune(1.0);
    return res.status(200).json(JSON.stringify(classificationResult));
}

