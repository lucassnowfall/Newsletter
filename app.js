// jshint esversion: 6;
const express = require('express'); // Express
const bodyParser = require('body-parser'); //HTML conversor
const request = require('request'); // Make simple https calls


const app = express(); // App now is Express

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); //active the bodyparser


app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
    var firstName = (req.body.fname);
    var lastname= (req.body.lname);
    var email = (req.body.email);


    console.log(firstName, lastname, email);

    var data = {
        members:[{
        email_address: email,
        status:"subscribed",
        merge_fields: {
             FNAME: firstName,
             LNAME: lastname,
         }
        }]
    };

    var jsondata = JSON.stringify(data);


    var option = {
        url: "https://us20.api.mailchimp.com/3.0/lists/07faaf5163",
        method: "POST",
        headers: {"Authorization": "lucas1 63abddbc3f90d78145056ec966423956-us20"},
        body: jsondata
    };

    request(option, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/sucess.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        }

    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT, function () {
    console.log("Listening to port 3000");

});



// 63abddbc3f90d78145056ec966423956-us20
// list id 07faaf5163