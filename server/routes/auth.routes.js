const Router = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = Router();

router.post(
    "/register",
    [
        check("name", "No name"),
        check("password", "min 6 simbols").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Not correct data for reg",
                });
            }
            const { name, password } = req.body;
            const candidate = await User.findOne({ name });
            if (candidate) {
                return res.status(400).json({ message: "User name zaniat" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ name, password: hashedPassword });
            await user.save();
            res.status(201).json({ message: "Create user ok" });
        } catch (e) {
            res.status(500).json({ message: "Err reg" });
        }
    }
);

router.post(
    "/login",
    [
        check("name", "enter corr name"),
        check("password", "enter password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Not correct data for auth",
                });
            }
            const { name, password } = req.body;

            const user = await User.findOne({ name });
            if (!user) {
                return res.status(400).json({ message: "User no find" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "not pass" });
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: "Err reg" });
        }
    }
);

module.exports = router;
