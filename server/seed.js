const mongoose = require("mongoose");
const { Media } = require("./models/media")
const config = require("./config/config").get(process.env.NODE_ENV);
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const medias = [
    {
        _id: "5d67d0a888d4fc276cd2a428",
        image: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png",
        name: "Born to Die",
        producers: ["Patrik Berger", "Jeff Bhasker", "Chris Braide", "Emilie Haynie"],
        genres: ["Indie pop", "Alternative pop", "Baroque pop", "Sadcore", "Trip pop"],
        artist: "Lana Del Ray",
        country: "USA"
    },
    {
        _id: "5d67d0a888d4fc276cd2a429",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/One_Direction_Midnight_Memories_%28Official_Album_Cover%29.png/220px-One_Direction_Midnight_Memories_%28Official_Album_Cover%29.png",
        name: "Midnight Memories",
        producers: ["Julian Bunetta", "Carl Falk", "Tom Fletcher", "Jacknife Lee"],
        genres: ["Pop rock", "Pop"],
        artist: "One Direction",
        country: "UK"
    },
    {
        _id: "5d67d0a888d4fc276cd2a430",
        image: "https://upload.wikimedia.org/wikipedia/en/5/5a/Beck_Morning_Phase.jpg",
        name: "Morning Phase",
        producers: ["Beck"],
        genres: ["Folk rock"],
        artist: "Beck",
        country: "USA"
    },
    {
        _id: "5d67d0a888d4fc276cd2a431",
        image: "https://upload.wikimedia.org/wikipedia/en/3/3f/Night_Visions_Album_Cover.jpeg",
        name: "Night visions",
        producers: ["Alex da Kid", "Brandon Darner"],
        genres: ["Alternative rock", "Indie rock", "Pop rock", "Electropop"],
        artist: "Imagine Dragons",
        country: "Canada"
    },
    {
        _id: "5d67d0a888d4fc276cd2a432",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Katy_Perry_ET_cover.png/220px-Katy_Perry_ET_cover.png",
        name: "ET",
        producers: ["Max Martin", "Ammo", "Dr. Luke"],
        genres: ["Electronic", "Hip hop"],
        artist: "Katy Perry",
        country: "USA"
    },
    {
        _id: "5d67d0a888d4fc276cd2a433",
        image: "https://upload.wikimedia.org/wikipedia/en/d/df/Calvin_Harris_-_18_Months.png",
        name: "18 Months",
        producers: ["Dillion Francis", "Kuk Harell", "Mark Knight"],
        genres: "EDM",
        artist: "Calvin Harris",
        country: "Mexico"
    },
    {
        _id: "5d67d0a888d4fc276cd2a434",
        image: "https://upload.wikimedia.org/wikipedia/en/8/89/Frozen_2013_soundtrack.png",
        name: "Frozen",
        producers: ["Robert Lopez", "Kristen Anderson-Lopez", "Christope Beck"],
        genres: ["Pop", "Musical theatre"],
        artist: "Varius Artist",
        country: "USA"
    },
    {
        _id: "5d67d0a888d4fc276cd2a435",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Tattoos_by_Jason_Derulo.jpg",
        name: "Tatoos",
        producers: ["Frank Harris", "BeatGeek", "DJ Buddha"],
        genres: ["R&B", "Pop"],
        artist: "Jason Derulo",
        country: "Argentina"
    },
    {
        _id: "5d67d0a888d4fc276cd2a436",
        image: "https://upload.wikimedia.org/wikipedia/en/e/e5/Avicii_-_True_%28Album%29.png",
        name: "Da True",
        producers: ["Frank Harris", "BeatGeek", "DJ Buddha"],
        genres: ["Folktronica", "Country", "Bluegrass", "Soul", "House", "EDM"],
        artist: "Avicii",
        country: "Netherlands"
    },
    {
        _id: "5d67d0a888d4fc276cd2a437",
        image: "https://upload.wikimedia.org/wikipedia/en/4/42/David_Guetta_-_Nothing_but_the_Beat.png",
        name: "Nothing but the Beat",
        producers: ["Afrojack", "Black Raw", "David Guetta"],
        genres: "EDM",
        artist: "David Guetta",
        country: "Russia"
    }
]
function saveToDb(media) {
    media.save((err, doc) => {
        if (err) return err;
        return true;
    })
}
function seed() {
    Media.deleteMany({}, (err) => {
        console.log("deleted")
        for (let i = 0; i < medias.length; i++) {
            const media = new Media(medias[i]);
            saveToDb(media);
        }
    })

}
seed();
