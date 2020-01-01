const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(cookieParser());

const { Media } = require("./models/media")

app.get("/", (req, res) => {
    res.json({
        dobio: "jesam"
    })
})

app.post("/media", (req, res) => {
    let media = new Media(req.body);

    media.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(doc)
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Running on port: " + port);
});