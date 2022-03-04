const express = require("express");
const app = express();
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
app.set('view engine', 'ejs');
app.use(express.static("public"));
//kitchen test
var sort = true;
var orderList = [ 
    {table: 8, menuName: "ผัดกระเพา", imgSource: "foodPic.jpeg", remark: ["หอมมะลิ", "หมูกรอบ", "ไข่ข้น"], status: "cooking", price: "50฿"}, 
    {table: 5, menuName: "ผัดผัก", imgSource: "foodPic.jpeg", remark: ["ไม่ใส่ผัก", "ใส่หมูเยอะๆ"], status: "queue", price: "25฿"},
    {table: 7, menuName: "ผัดไท", imgSource: "foodPic.jpeg", remark: ["ผัดไทเป็นคาร์โบมะ", "กุ้งเยอะ", "ขอถูกๆ"], status: "served", price: "80฿"},
    {table: 6, menuName: "ผัดอเวจี", imgSource: "foodPic.jpeg", remark: ["ส่งจากท่านยม", "กินชาตินี้อิ่มชาติหน้า"], status: "canceled", price: "666฿"},
    {table: 3, menuName: "ผัดขี้เมา", imgSource: "foodPic.jpeg", remark: ["ใส่แอลกอฮอล์"], status: "queue", price: "50฿"}
];
//customer test
var menu = [
    {category:"Combo set", menuList:[
        {menuName: "ชุดผัดกระเพา", imgSource: "foodPic.jpeg", price: "50฿"},
        {menuName: "ชุดผัดผัก", imgSource: "foodPic.jpeg", price: "25฿"},
        {menuName: "ชุดผัดไท", imgSource: "foodPic.jpeg", price: "80฿"},
        {menuName: "ชุดผัดอเวจี", imgSource: "foodPic.jpeg", price: "666฿"},
        {menuName: "ชุดผัดขี้เมา", imgSource: "foodPic.jpeg", price: "50฿"}
    ]},
    {category:"ผัดนรก", menuList:[
        {menuName: "ผัดกระเพา", imgSource: "foodPic.jpeg", price: "50฿"},
        {menuName: "ผัดผัก", imgSource: "foodPic.jpeg", price: "25฿"},
        {menuName: "ผัดไท", imgSource: "foodPic.jpeg", price: "80฿"},
        {menuName: "ผัดอเวจี", imgSource: "foodPic.jpeg", price: "666฿"},
        {menuName: "ผัดขี้เมา", imgSource: "foodPic.jpeg", price: "50฿"}
    ]},
    {category:"ผัดไม่รู้ๆๆ", menuList:[
        {menuName: "ผัดฟิชสตอป", imgSource: "foodPic.jpeg", price: "ไม่ขายนะจ๊ะ"},
        {menuName: "ผัดป้อมปราการ", imgSource: "foodPic.jpeg", price: "???฿"},
    ]}
];

app.get("/", function(req,res){
    res.render("home",{menu: menu});
})

app.get("/resort", function(req,res){
    sort = !sort;
    res.redirect("/");
})
app.get("/kitchen", function(req,res){
    res.render("kitchen", {orderList: orderList, sort: sort});
})
app.get("/order%20status", function(req, res){
    res.render("status", {orderList: orderList, menu: menu});
})
app.get("/check%20out", function(req,res){
    res.render("checkOut", {orderList: orderList, menu: menu})
})
app.get("/:category", function(req,res){
    res.render("category", {category: req.params.category, menu: menu})
})
app.get("/:category/:menuName",function(req,res){
    var send = {menuName: '"' + req.params.menuName + '" does not exist', imgSource: "no image", price: "--฿", menu: menu, category: req.params.category}
    for(var i = 0; i < menu.length; i++){
        if(menu[i].category == req.params.category){
            for(var j = 0; j < menu[i].menuList.length; j++){
                if(menu[i].menuList[j].menuName == req.params.menuName){
                    send.menuName = menu[i].menuList[j].menuName;
                    send.imgSource = menu[i].menuList[j].imgSource;
                    send.price = menu[i].menuList[j].price;
                }
            } 
        }
    }
    res.render("menuInfo", send);
})



app.listen(3000,function(){
    console.log("sever start port 3000");
})