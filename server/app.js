const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const config = require("config");

const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUrl"));
        app.listen(PORT, () => console.log(`server start ${PORT}`));
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
};
start();
