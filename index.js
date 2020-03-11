/*EJS = Embedded JavaScript
npm install --save ejs
1. NodeJS looks for ejs files in "views" folder
2. EJS files end with .ejs
3. Have to let the Nodejs know that we are using ejs
*/

var express = require("express");
var bodyParser = require("body-parser")
var app = express();
app.use(express.static("css"));
app.use(bodyParser.urlencoded({extemded: true}));
app.set("view engine", "ejs");

app.get('/', function(req, res){
   //res.send("Hello World"); 
   res.render("home");
});

var friendList = ["Alice", "Clark", "Bellemy", "Octavia"];
app.get("/friends", function(req, res){
    res.render("friends", {friends: friendList});    
});

app.post("/addfriend", function(req, res){
    var newfriend = req.body.newfriend;
    friendList.push(newfriend);
    res.redirect("/friends");
});

app.post("/removefriend", function(req, res){
    for(var i = 0; i < friendList.length; i++){
        if(friendList[i] == req.body.oldfriend){
            friendList.splice(i, 1);
        }
    }
    res.redirect("/friends");
});


app.get('*', function(req, res){
    //res.send("404 PAGE NOT FOUND");
    res.render("error");
});

app.listen(process.env.PORT, function(){
    console.log("Server is up and running");
});