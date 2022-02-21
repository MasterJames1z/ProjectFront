const express = require("express");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home");
})


app.listen(3000,function(){
    console.log("sever staart port 3000");
})