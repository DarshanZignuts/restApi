const Product = require("../models/product");
const Order = require('../models/order');


/**
 * @param {*} req
 * @param {*} res
 * @description getProducts form products by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function getProducts(req, res) {
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
}

/**
 * @param {*} req
 * @param {*} res
 * @description addProducts form products by using Post 
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function addProduct(req, res) {
    try {
        console.log('file:::', req.file.path);
        const product = new Product({
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
}

/**
 * @param {*} req
 * @param {*} res
 * @description getProduct by id form products by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function oneProduct(req, res) {
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
}

/**
 * @param {*} req
 * @param {*} res
 * @description updateProduct by id form products by using patch
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function updateProduct(req, res) {
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
}

/**
 * @param {*} req
 * @param {*} res
 * @description deleteProduct by id for products by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function deleteProduct(req, res) {
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
}


module.exports = { getProducts, addProduct, oneProduct, updateProduct, deleteProduct};