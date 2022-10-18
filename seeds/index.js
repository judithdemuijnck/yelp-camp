if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const { response } = require("express");
const axios = require("axios");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = function (array) {
    return array[Math.floor(Math.random() * array.length)];
}

const config = {
    headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`
    },
    params: {
        collections: 483251,
        orientation: "landscape"
    }
}

const getRandomImage = async function () {
    try {
        const imgSrc = await axios("https://api.unsplash.com/photos/random", config);
        //thumb for thumbnail size, other options: "small", "regular", "full", "raw" or "small_s3"
        const img = imgSrc.data.urls.regular;
        return img;
    } catch (error) {
        console.error(error);
    }

}


const seedDB = async () => {
    // await Campground.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "62ea64c2363b2fc2f9059346",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: await getRandomImage(),
                    filename: `${sample(descriptors)}${sample(places)}1`
                }, {
                    url: await getRandomImage(),
                    filename: `${sample(descriptors)}${sample(places)}2`
                }
            ],
            price: randomPrice,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A deleniti dolores voluptatum nobis est sapiente quia sit. Sit quia aperiam repellat ipsam reprehenderit ipsa provident, pariatur praesentium autem quis inventore."
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log("DATABASE CONNECTION CLOSED")
})