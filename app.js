const express = require("express");
const app = express();
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
app.set('view engine', 'ejs');
app.use(express.static("public"));

var sort = true;
var orderList = [
    {table: 8, menuName: "ผัดกระเพา", remark: ["หอมมะลิ", "หมูกรอบ", "ไข่ข้น"], status: "cooking", amount: 1}, 
    {table: 5, menuName: "ผัดผัก", remark: ["ไม่ใส่ผัก", "ใส่หมูเยอะๆ"], status: "queue", amount: 2},
    {table: 7, menuName: "ผัดไท", remark: ["ผัดไทเป็นคาร์โบมะ", "กุ้งเยอะ", "ขอถูกๆ"], status: "served", amount: 1},
    {table: 6, menuName: "ผัดอเวจี", remark: ["ส่งจากท่านยม", "กินชาตินี้อิ่มชาติหน้า"], status: "canceled", amount: 8},
    {table: 3, menuName: "ผัดขี้เมา", remark: ["ใส่แอลกอฮอล์"], status: "queue", amount: 3}
];


app.get("/", function(req,res){
    res.render("home",{sort: sort, orderList: orderList});
})

app.get("/resort", function(req,res){
    sort = !sort;
    res.redirect("/");
})

app.get("/cus", function(req,res){

})

app.listen(3000,function(){
    console.log("sever start port 3000");
})