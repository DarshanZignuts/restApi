const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const url = "mongodb://localhost:27017/Hellow";
const morgon = require("morgan");
const productRouter = require("./routers/products");
const orderRouter = require("./routers/orders");
const userRouter = require("./routers/users");

const mongoose = require("mongoose");

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected successfully...");
}).catch(err => {
    console.log("Err in database connection :: ", err);
});

app.set("view engine", "ejs");


app.use('/', express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header",
        "Origin,X-Requsted_With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, PUT ,POST, PATCH, DELETE");
        res.status(200).json({})
    }
    next();
})

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/user", userRouter);


// eroor handler;
app.use((req, res, next) => {
    const error = new Error("notFound");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


app.listen(port, function () {
    console.log(`server started ${port}`);
})
