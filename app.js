const express = require("express");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));

var sort = true;
var orderList = [{menuName: "ผัดกระเพา", remark: ["หอมมะลิ"], status: "cooking"}, {menuName: "ผัดผัก", remark: ["AAA", "BBB"], status: "queue"}];

app.get("/", function(req,res){
    res.render("home",{sort: sort, orderList: orderList});
})

app.get("/cus", function(req,res){

})

app.listen(3000,function(){
    console.log("sever start port 3000");
})