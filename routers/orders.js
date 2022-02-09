const express = require("express");
const router = express.Router();

/**
 * @param {*} req
 * @param {*} res
 * @description geteOrders for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.get("/", function(req,res){
    res.status(200).json({
        msg : `it is in order api...!`
    })
});

/**
 * @param {*} req
 * @param {*} res
 * @description postOrders for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.post("/", function(req,res){
    const order = {
        productID : req.body.productID,
        quantity : req.body.quantity
    };
    res.status(200).json({
        msg : `it is in post order api...!`,
        createdOrder : order
    })
});

/**
 * @param {*} req
 * @param {*} res
 * @description getOrders by id for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.get("/:orderID", function(req,res){
    let id = req.params.orderID ;
    if (id === 'special'){
        res.status(200).json({
            msg : `it is a special id of order api...!`
        })
    }else{
        res.status(200).json({
            msg: `this id ${id} given by user`
        })
    }
});

/**
 * @param {*} req
 * @param {*} res
 * @description patchOrders for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.patch("/:orderID", function(req,res){
    res.status(200).json({
        msg: `this id order Updated`
    })
});

/**
 * @param {*} req
 * @param {*} res
 * @description deleteOrders for products
 * @author `DARSHAN ZignutsTechnolab`
 */
router.delete("/:orderID", function(req,res){
    res.status(200).json({
        msg: `this id order deleted`
    })
});

module.exports = router ;