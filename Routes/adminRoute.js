const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const userController = require('../Controllers/userController');
const { userLogin } = require('../Utils/authUser');

// -----------------------Admin User Functions ----------------------- //
router.route("/listUser").get(userController.all_users);

router.route("/detailsUser/:id").get(userController.user_details);

router.route("/deleteUser").post(userController.user_delete);


// ----------------- Admin login -------------------- //
router.post("/login", async(req, res) => {
    await userLogin(req.body, res);
});

module.exports = router;