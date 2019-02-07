var express = require('express');
var app = express();
var path = require("path");

//Setup public directory
app.use(express.static(path.join(__dirname,'public')));

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname+"/public/q3.html"));
});

app.get("/random/:minimum/:maximum",function(request,response) {
    var min = parseInt(request.params.minimum);
    var max = parseInt(request.params.maximum);

    if (isNaN(min) || isNaN(max)) {
        response.status(400);
        response.json({error: "Bad request."});
        return;
    }

    var responseResult = Math.round((Math.random() * (max-min)) +min);
    response.json({result: responseResult});
    console.log("First number:" + min + " Second number:" + max + " Generated Number: " + responseResult);
})

var port = 3000;
app.listen(port,function() {
    console.log("App started on port" + port)
});