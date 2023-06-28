const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const productController = require('../Controllers/productController');


router.route("/create").post(productController.product_create);

router.route("/list").get(productController.all_products);

router.route("/details/:id").get(productController.product_details);

router.route("/update").post(productController.product_update);

router.route("/delete").post(productController.product_delete);


module.exports = router;