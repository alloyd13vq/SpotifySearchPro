const Track = require('../models/Track');


exports.list = async (req, res) => {
   
    try {
        
           
        res.render("index");

    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}