require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;



// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB Connection Error:", err));



// Define Movie Schema & Model
const movieSchema = new mongoose.Schema({ name: String });
const Movie = mongoose.model("Movie", movieSchema);

// API Route to Fetch Movies
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies", error });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
