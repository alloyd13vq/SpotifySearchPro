
const Track = require("../models/Track");
const bodyParser = require("body-parser");

exports.list = async (req, res) => {
  
  try {
    console.log(req.query)
    const message = req.query.message;
    const track = await db.Track.find();
    res.render("result", {track: track, message: message});
  } catch (e) {
    res.status(404).send({ message: "could not list tracks" });
  }
};

