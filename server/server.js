const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const { Media } = require("./models/media")

// -----------=========== GET ===========-----------

app.get("/media", (req, res) => {
    Media.find({}, (err, docs) => {
        if (err) return res.status(400).send(err);
        return res.json(docs);
    }).sort({ _id: 1 });
})

app.get("/media/:id", (req, res) => {
    const id = req.params.id;
    Media.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        return res.json(doc);
    })
})

app.get("/media/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    Media.find({}, (err, docs) => {
        if (err) return res.status(400).send(err);
        let medias = [];
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i];
            let docGenres = doc.genres;
            for (let j = 0; j < docGenres.length; j++) {
                if (docGenres[j] === genre) {
                    medias.push(docs[i]);
                    break;
                }
            }
        }
        res.json({ medias })
    })
})

app.get("/media/artist/:artist", (req, res) => {
    const artist = req.params.artist;
    Media.find({ artist: artist }, (err, docs) => {
        if (err) return res.status(400).send(err);
        return res.json(docs);
    })
})

app.get("/media/country/:country", (req, res) => {
    const country = req.params.country;
    Media.find({ country: country }, (err, docs) => {
        if (err) return res.status(400).send(err);
        return res.json(docs);
    })
})

app.get("/media/producer/:producer", (req, res) => {
    const producer = req.params.producer;
    Media.find({}, (err, docs) => {
        if (err) return res.status(400).send(err);
        let medias = [];
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i];
            let docProducers = doc.producers;
            for (let j = 0; j < docProducers.length; j++) {
                if (docProducers[j] === producer) {
                    medias.push(docs[i]);
                    break;
                }
            }
        }
        res.json({ medias })
    })
})

// -----------=========== POST ===========-----------

// {
//     "image": "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png",
//     "name": "Born to live",
//     "producer": "Bake Cinjar",
//     "genre": "EDM",
//     "artist": "Bakeroni makaroni",
//     "country": "Bosnia & Herzegovina"
// }

app.post("/media", (req, res) => {
    let media = new Media(req.body);

    media.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("ok")
    })
})
// -----------=========== UPDATE ===========-----------

app.post("/media/edit", (req, res) => {
    Media.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
})


// -----------=========== DELETE ===========-----------

app.get("/media/delete/:id", (req, res) => {
    let id = req.params.id;

    Media.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        Media.find({}, (err, docs) => {
            if (err) return res.status(400).send(err);
            return res.json(docs)
        })
    });
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Running on port: " + port);
});