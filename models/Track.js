const mongoose = require("mongoose");
const { Schema } = mongoose;


const TrackSchema = new Schema(
  {
      valence: Number,
      year: Number,
      acousticness: Number,
      artists: String,
      danceability: Number,
      duration_ms: Number,
      energy: Number,
      explicit: Number,
      id: String,
      instrumentalness: Number,
      key: Number,
      liveness: Number,
      loudness: Number,
      mode: Number,
      name: String,
      popularity: Number,
      release_date: Number,
      speechiness:Number,
      tempo: Number,

      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "_id",
      },
      name_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "name",
      },
      duration_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "duration_ms",
      },
      artists_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artists",
      },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", TrackSchema);

