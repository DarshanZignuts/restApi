const Order = require('../models/order');
const Product = require("../models/product");

/**
 * @param {*} req
 * @param {*} res
 * @description getOrders form Orders by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function getOrders(req, res) {
    try {
        const order = await Order.find().populate('product');
        const response = {
            count: order.length,
            orders: order.map(data => {
                return {
                    product: data.product,
                    quantity: data.quantity,
                    _id: data._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/orders/${data._id}`
                    }
                }
            })
        };
        if (response) {
            res.status(200).json(response);
        } else (
            res.status(405).json({ msg: "your fucntion could not be empty..!" })
        )
    } catch (err) {
        if (err) throw err;
    }
}


/**
 * @param {*} req
 * @param {*} res
 * @description addOrders form Orders by using post
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function addOrders(req, res) {
    try {
        let product = await Product.findById(req.body.productId)
        if (product) {
            const order = Order({
                quantity: req.body.quantity,
                product: req.body.productId
            });
            const add = await Order.insertMany(order);
            if (add) {
                console.log("data added");
                res.status(200).json({
                    msg: `it is in post products api...!`,
                    createOrder: order
                })
            } else {
                res.status(200).json({
                    msg: 'there are no data to be add..!'
                })
            }
        } else {
            res.status(404).json({
                msg: 'there are no data match with any product..!'
            })
        }
    } catch (err) {
        if (err) throw err;
    }
}



/**
 * @param {*} req
 * @param {*} res
 * @description getOrder by id form Orders by using get
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function oneOrder(req, res) {
    try {
        const id = req.params.orderID
        const order = await Order.findOne({ _id: id }).populate('product');
        if (order) {
            res.status(200).json({
                message: `your Order Detail Founded`,
                result: {
                    product: order.product,
                    quantity: order.quantity,
                    _id: order._id
                },
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${id}`
                }
            });
        } else (
            res.status(405).json({ msg: `your ${id} could not be empty..!` })
        )
    } catch (err) {
        if (err) throw err;
    }
}



/**
 * @param {*} req
 * @param {*} res
 * @description deleteOrder form Orders by using delete
 * @author `DARSHAN ZignutsTechnolab`
 */
 async function deleteOrder(req, res) {
    try {
        const id = req.params.orderID
        const order = await Order.findOne({ _id: id });
        if (order) {
            await order.deleteOne({ _id: id })
            res.status(200).json({
                message: ` your ${id} data deleted successfully...!`
            })
        } else (
            res.status(405).json({ msg: `your ${id} could not be empty..!` })
        )
    } catch (err) {
        if (err) throw err;
    }
}


module.exports = { getOrders, addOrders, oneOrder, deleteOrder };