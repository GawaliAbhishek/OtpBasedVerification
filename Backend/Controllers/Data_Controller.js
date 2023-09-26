const Data = require("../Models/Data")


const getAllData = async (req, res) => {
    try {
        const result = await Data.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getAllData;