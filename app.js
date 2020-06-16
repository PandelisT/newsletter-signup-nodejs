const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email; 

    const data = {
       members: [
           {
               email_address: email,
               status: "subscribed",
               merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName
               }
           }
       ] 
    }

const jsonData = JSON.stringify(data);
const url = "https://us19.api.mailchimp.com/3.0/lists/da0972827f";

const options = {
    method: "POST",
    auth: "Pandelis:9df973b9a01c91c94bf5f1d349033cda-us19"
}

const request = https.request(url, options, function(response){
    if (response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen (process.env.PORT || 3000, function() {
    console.log("Server is on Port 3000")
});

//9df973b9a01c91c94bf5f1d349033cda-us19 API

//da0972827f Audience List ID