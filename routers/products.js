const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check_auth");
const { getProducts, addProduct, oneProduct, updateProduct, deleteProduct } = require("../contollers/product");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get("/", checkAuth, getProducts);

router.post("/", upload.single("productImage"), checkAuth, addProduct);

router.get("/:productID", checkAuth, oneProduct);

router.patch("/:productID", checkAuth, updateProduct);

router.delete("/:productID", checkAuth, deleteProduct);

module.exports = router;