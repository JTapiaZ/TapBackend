const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const { userRegister, userLogin } = require('../Utils/authUser');

router.post("/register", async(req, res) => {
    await userRegister(req.body, res);
});

router.post("/login", async(req, res) => {
    await userLogin(req.body, res);
});

module.exports = router;