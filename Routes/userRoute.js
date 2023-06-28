const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const { userRegister, userLogin } = require('../Utils/authUser');
const productController = require('../Controllers/userController');

// -----------------------Admin User Functions ----------------------- //
router.route("/list").get(productController.all_users);

router.route("/details/:id").get(productController.user_details);

router.route("/delete").post(productController.user_delete);


// ----------------- Admin login -------------------- //
router.post("/register", async(req, res) => {
    await userRegister(req.body, res);
});

router.post("/login", async(req, res) => {
    await userLogin(req.body, res);
});

module.exports = router;