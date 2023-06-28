const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const ingredientController = require('../Controllers/ingredientController');


router.route("/create").post(ingredientController.ingredient_create);

router.route("/list").get(ingredientController.all_ingredient);

router.route("/details/:id").get(ingredientController.ingredient_details);

router.route("/update").post(ingredientController.ingredient_update);

router.route("/delete").post(ingredientController.ingredient_delete);


module.exports = router;