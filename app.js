var express = require("express");

var bodyParser = require('body-parser');

var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.post('/', (req,res) => {
    var type = req.body.type;
    var reply = {
        message: ""
    };

    switch(type) {
        case 1: {
            reply.message = "Server received message sent from timer..";

            // server will wait for 3 seconds before sending the reply
            setTimeout(() => {
                res.send(reply)
            }, 3000);
            break;

        }
        case 2: {
            reply.message = "Server received message emit from user..";
            
            // no delay, server sends back the reply immediately
            res.send(reply);
            break;
        }
        default: {
            reply.message = "No such type~~~";
            res.status(400).send(reply);
        }
    }
})


app.listen(3000, ()=> {
    console.log("Server started...");
})
