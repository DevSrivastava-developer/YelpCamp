require('dotenv').config(); // <--- load .env

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dburl=process.env.DB_URL;
// mongoose.connect('mongodb://localhost:27017/yelp-camp')
mongoose.connect(dburl)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '68fcfedae455ab205136347d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            
            // image: 'https://picsum.photos/400?random=0',
            images:[
                {
                    url: 'https://res.cloudinary.com/dpas5jtnq/image/upload/v1761663651/YelpCamp/owdpmrt2khca5ljwdkvl.jpg',
                    filename: 'YelpCamp/owdpmrt2khca5ljwdkvl',
    },
    {
                    url: 'https://res.cloudinary.com/dpas5jtnq/image/upload/v1761663651/YelpCamp/qig3su9vrzvfa2kvfkll.jpg',
                    filename: 'YelpCamp/qig3su9vrzvfa2kvfkll',
    }
    
    ]
        })
        await camp.save();
        
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
