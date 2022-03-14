const express = require("express");
const app = express();
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
app.set('view engine', 'ejs');
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//kitchen test
var sort = true;
var table;
var orderList = [
    // {table: 8, menuName: "ข้าวกะเพรา", imgSource: "kaPao.jpeg", remark: ["หอมมะลิ", "หมูกรอบ", "ไข่ข้น"], status: "cooking", price: 50}, 
    // {table: 5, menuName: "ข้าวผงกะหรี่", imgSource: "curRy.jpg", remark: ["ไม่ใส่ผัก", "ใส่หมูเยอะๆ"], status: "queue", price: 25},
    // {table: 7, menuName: "ข้าวไข่เจียว", imgSource: "Jiew.jpg", remark: ["ผัดไทเป็นคาร์โบมะ", "กุ้งเยอะ", "ขอถูกๆ"], status: "served", price: 80},
    // {table: 6, menuName: "ข้าวหมูกะเทียม", imgSource: "Teim.jpg", remark: ["ส่งจากท่านยม", "กินชาตินี้อิ่มชาติหน้า"], status: "canceled", price: 666},
    // {table: 3, menuName: "ข้าวผัด", imgSource: "pad.jpg", remark: ["ใส่แอลกอฮอล์"], status: "queue", price: 50}
];
//customer test
var menu = [
    {
        category: "เมนูข้าว", menuList: [
            { menuName: "ข้าวกะเพรา", imgSource: "kaPao.jpeg", price: 50 },
            { menuName: "ข้าวผงกะหรี่", imgSource: "curRy.jpg", price: 50 },
            { menuName: "ข้าวไข่เจียว", imgSource: "Jiew.jpg", price: 40 },
            { menuName: "ข้าวหมูกะเทียม", imgSource: "Teim.jpg", price: 45 },
            { menuName: "ข้าวผัด", imgSource: "pad.jpg", price: 45 }
        ]
    },
    {
        category: "ก๋วยเตี๋ยว", menuList: [
            { menuName: "ก๋วยเตี๋ยวหมูเด้ง", imgSource: "Mode.jpg", price: 50 },
            { menuName: "ก๋วยเตี๋ยวเนื้อ", imgSource: "Nei.jpg", price: 55 },
            { menuName: "ก๋วยเตี๋ยวหมูน้ำใส", imgSource: "Tewmo.jpg", price: 45 },
            { menuName: "หมูลวก", imgSource: "MoTe.jpg", price: 35 },
            { menuName: "ก๋วยเตี๋ยวต้มย้ำ", imgSource: "Tomy.jpg", price: 50 }
        ]
    },
    {
        category: "ของกินเล่น", menuList: [
            { menuName: "ปอเปี๊ยะ", imgSource: "Po.jpg", price: 60 },
            { menuName: "หมูสเต๊ะ", imgSource: "Mo.jpg", price: 80 },
        ]
    }
];

app.get("/", function (req, res) {
    res.render("table");
})
app.get("/login", function (req, res) {
    res.render("login");
})


app.get("/menu", function (req, res) {
    res.render("home", { menu: menu, table: table });
})

app.get("/order", function (req, res) {
    res.render("status", { orderList: orderList, sort: sort });
})
app.get("/kitchen/resort", function (req, res) {
    sort = !sort;
    res.redirect("/kitchen");
})
app.get("/kitchen", function (req, res) {
    res.render("kitchen", { orderList: orderList, sort: sort });
})

app.get("/menu/order%20status", function (req, res) {
    res.render("status", { orderList: orderList, menu: menu });
})
app.get("/menu/check%20out", function (req, res) {
    res.render("checkOut", { orderList: orderList, menu: menu, table: table })
})
app.get("/menu/:category", function (req, res) {
    res.render("category", { category: req.params.category, menu: menu, table: table })
})
app.get("/menu/:category/:menuName", function (req, res) {
    var send = { menuName: '"' + req.params.menuName + '" does not exist', imgSource: "no image", price: "--฿", menu: menu, category: req.params.category, table: table }
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].category == req.params.category) {
            for (var j = 0; j < menu[i].menuList.length; j++) {
                if (menu[i].menuList[j].menuName == req.params.menuName) {
                    send.menuName = menu[i].menuList[j].menuName;
                    send.imgSource = menu[i].menuList[j].imgSource;
                    send.price = menu[i].menuList[j].price;
                }
            }
        }
    }
    res.render("menuInfo", send);
})


app.post("/", function (req, res) {
    return res.redirect('/menu');
})

app.post("/kitchen/change", function (req, res) {
    console.log(req.body);
    var check = JSON.parse(req.body.change)
    console.log(check);
    for (var i = 0; i < 8; i++) {
        if (i + 1 == check.table) {
            for (var j = 0; j < orderList.length; j++) {
                if (orderList[j].menuName == check.menuName) {
                    if (orderList[j].status == check.status) {
                        if (check.status == "queue" && check.status != "served") {
                            return orderList[j].status = "cooking";
                        } else if (check.status == "cooking" && check.status != "served") {
                            return orderList[j].status = "served";
                        }
                    }

                }
            }

        }
    }
    res.redirect("/kitchen");
})

app.post("/menuInfo", function (req, res) {
    var orderCon = req.body.confirm;
    orderCon = JSON.parse(orderCon);
    orderCon.price = Number(orderCon.price);
    orderList.push(orderCon);
    console.log(orderCon);
    return res.redirect('/menu/order%20status');
})


app.post("/login", function (req, res) {
    if (req.body.username == "Admin1" && req.body.password == "password") {
        return res.redirect('/kitchen');
    } else {
        res.redirect('/login');
    }
})

app.post("/cancel", function (req, res) {
    var deleteOrder = req.body.cancel;
    deleteOrder = JSON.parse(deleteOrder);
    orderList.shift(deleteOrder);
    console.log(deleteOrder);
    return res.redirect("/menu/order%20status")
})

app.post("/checkout", function (req, res) {
    orderList = [];
    for (var i = 0; orderList.length; i++) {
        if (orderList = []) {
            remark = ["no result"];
        } else {
            return remark.orderList;
        }
    }

    console.log(orderList);
    return res.redirect('/');
})

app.post("/table", function (req, res) {
    table = req.body.table
    console.log(req.body)
    res.redirect("/menu")
})

app.listen(3000, function () {
    console.log("sever start port 3000");
})