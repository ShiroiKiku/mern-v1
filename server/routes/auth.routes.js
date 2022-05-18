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
        check("name", "Нет имени"),
        check("password", "Минимальная длинна символов 6").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Не корректные даныне при регистрации",
                });
            }

            const { name, password } = req.body;

            const candidate = await User.findOne({ name });
            if (candidate) {
                return res.status(400).json({ message: "Имя занято" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ name, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "Пользователь создан" });
        } catch (e) {
            res.status(500).json({ message: "Ошибка при регистрации" });
        }
    }
);

router.post(
    "/login",
    [
        check("name", "Введите корректное имя"),
        check("password", "Введите пароль").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Не корректные данные при авторизации",
                });
            }
            const { name, password } = req.body;

            const user = await User.findOne({ name });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Пользователь не найден" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Нет или неправильный пароль" });
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: "Ошибка при авторизации" });
        }
    }
);

module.exports = router;
