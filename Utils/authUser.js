const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authJWT = require('../Middleware/Passport')
const passport = require("passport");
passport.use(authJWT)
const {User} = require('../Db');



//.......Describe the user registration...........

const userRegister = async(req, res) => {
    try {
        //Validate the email
        let emailNotRegistered = await validateEmail(req.email);
        console.log(req.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: `El email esta actualmente registrado.`,
                success: false
            });
        }

        //......Get the hashed password.......
        const password = await bcrypt.hash(req.password, 12);
        //......Create a new user..........
        const newUser = new User({
            ...req,
            password,
        });
        await newUser.save();
        return res.status(201).json({
            message: "Registrado con exito. Ahora inicia sesión",
            success: true
        });
    } catch (err) {
        // Implement logger function
        console.log(err);
    }
};

//.......Describe to login user..........

const userLogin = async(userCreds, res, req) => {
    let { email, password } = userCreds;

    if (!email || !password) {
        return res.status(400).send("¡Por favor ingrese un email y una contraseña valida!");
    }

    //First check if the username is in the database
    const user = await User.findOne({ where: {email:email} });
    // console.log(user);
    if (!user) {
        return res.status(400).send("¡Por favor ingrese un email y una contraseña valida!");
    }

    //Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        //Sign in the token and issue it to the user
        let token = jwt.sign({
                name: user.name,
                role: user.role,
                username: user.username,
                email: user.email,
            },
            process.env.SECRET, { expiresIn: '1h' }
        );

        let result = {
            token: `${token}`,
        };
        return res.status(200).json({
            ...result
        });
    } else {
        return res.status(403).send("¡Por favor ingrese un email y una contraseña valida!");
    }
};


//....... Email validate.............

const validateEmail = async email => {
    let user = await User.findOne({ where: { email: email}});
    return user ? false : true;
};

module.exports = {
    userLogin,
    userRegister,
};