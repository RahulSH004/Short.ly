const { nanoid } = require("nanoid");
const Validator = require("validator");
const Url = require("../models/url");

const generateShortUrl = async (req, res) => {
    const {url} = req.body;

    try{
        if(!url) {
            return res.status(400).json({ message: "URL is required" });
        }
        if (!Validator.isURL(url)) {
            return res.status(400).json({ message: "Invalid URL format" });
        }
        const shortId = nanoid(8);
        await Url.create({
            url: url,
            shortUrl: shortId,
            clicks: [],
        });
        return res.status(200).json({ shortUrl: `${shortId}` });
    }
    catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const redirectShortUrl = async (req, res) => {
    const shortId = req.params.shortUrl;
    try{
        const urlData = await Url.findOneAndUpdate(
            {shortUrl: shortId},
            {
                $push: {clicks: {timestamps: Date.now()}}
            },
            {new: true}
        );
        if(!urlData) {
            return res.status(404).json({ message: "URL not found" });
        }
        return res.redirect(urlData.url);
    }catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
const generateanalytics = async(req, res) => {
    const shortId = req.params.shortUrl;
    try{
        const result = await Url.findOne({shortUrl: shortId});
        if (!result) {
            return res.status(404).json({ message: "URL not found" });
        }
        return res.json({
            totalclicks: result.clicks.length,
            analytics: result.clicks
        })

    }catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    generateShortUrl,
    redirectShortUrl,
    generateanalytics,
};