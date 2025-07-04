const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "abcde12345"
// ROUTE 1 : Create a user using: POST "/api/auth/createuser". No Login Required
router.post(
    '/createuser',
    // Elements Constraints
    [
        body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        let success = false;
        // If there is no errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log({authtoken:authtoken})

            success = true;

            // Send a success response
            res.status(201).json({ success, authtoken }); // Send 201 for successful creation

            // Catch Error 
        } catch (error) {
            // Handle any errors that occur during user creation
            console.error("Error creating user:", error);
            res.status(500).json({ success, error: 'Internal server error', details: error.message }); // Include error details
        }
    }
);

// ROUTE 2 : Authenticate a User using: POST "/api/auth/login".
router.post(
    '/login',
    // Elements Constraints
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank.').exists(),
    ],

    async (req, res) => {
        let success = false;
        // If there is no errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct Credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct Credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true
            res.status(201).json({ success, authtoken });

        } catch (error) {
            console.log(error.message);
            res.status(600).send("Internal Server Error");
        }
    }


)

// ROUTE 3 : Get LoggedIn User Details using: POST "/api/auth/getuser.  Login Requiredr".
router.post(
    '/getuser', fetchUser,

    async (req, res) => {
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.log(error.message);
            res.status(600).send("Internal Server Error");
        }
    }
)

// Export Router to make it available everywhere
module.exports = router;