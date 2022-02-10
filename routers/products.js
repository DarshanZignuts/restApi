const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const Order = require('../models/order');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



/**
 * @param {*} req
 * @param {*} res
 * @description getProducts for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.get("/", async function (req, res) {
    try {
        const product = await Product.find();
        const response = {
            count: product.length,
            products: product.map(data => {
                return {
                    name: data.name,
                    price: data.price,
                    _id: data._id
                }
            })
        }
        if (response.count >= 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({
                msg: `there is no one data found in your collection to show`
            })
        }

    } catch (err) {
        if (err) throw err;
    }
});


/**
 * @param {*} req
 * @param {*} res
 * @description postProducts for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.post("/", upload.single("productImage"), async function (req, res) {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
        const add = await Product.insertMany(product);
        if (add) {
            console.log("data added");
            res.status(200).json({
                msg: `it is in post products api...!`,
                createdProduct: product
            })
        } else {
            console.log('ther is no data which can added to record..!');
        }
    } catch (err) {
        if (err) throw err;
    }
});

/**
 * @param {*} req
 * @param {*} res
 * @description getProducts by id for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.get("/:productID", async function (req, res) {
    try {
        const id = req.params.productID;
        const product = await Product.findById({ _id: id });
        if (product) {
            res.status(200).json({
                name: product.name,
                price: product.price
            })
        } else {
            res.status(405).json({
                msg: `this id ${id} data not found`
            })
        }
    } catch (err) {
        if (err) throw err;
    }
});

/**
 * @param {*} req
 * @param {*} res
 * @description patchProducts for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.patch("/:productID", async function (req, res) {
    try {
        const id = req.params.productID;
        const update = {};
        // await Product.findById({ _id : id})
        for (const key in req.body) {
            update[key] = req.body[key];
        }
        if (Product) {
            await Product.findOneAndUpdate({ _id: id }, { $set: update })
            // await Order.findByIdAndUpdate({ productId: id }, { $set: update })
            console.log("data updated Successfully");
            res.status(200).json({
                msg: "data to be updated"
            })
        } else {
            res.status(404).json({
                msg: `this id ${id} data not found to update`
            })
        }

    } catch (err) {
        if (err) throw err;
    }
});

/**
 * @param {*} req
 * @param {*} res
 * @description deleteProducts for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.delete("/:productID", async function (req, res) {
    try {
        const id = req.params.productID;
        let product = await Product.findOne({ _id: id });
        if (product) {
            await Product.deleteOne({ _id: id })
            await Order.deleteOne({ productId: id })
            console.log("data deleted Successfully");
            res.status(200).json({
                msg: "data to be deleted"
            })
        } else {
            res.status(405).json({
                msg: `this id ${id} data not found`
            })
        }
    } catch (err) {
        if (err) throw err;
    }
});

module.exports = router;