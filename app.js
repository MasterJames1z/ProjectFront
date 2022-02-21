const express = require("express");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));

var sortStatus = true;

app.get("/", function(req,res){
    res.render("home",{sortStatus: sortStatus});
})


app.listen(3000,function(){
    console.log("sever start port 3000");
})