const mongoose = require('mongoose')
const shortId = require('shortid')

shortId.generate()

const ShortUrlSchema = new mongoose.Schema({
    url: {type: String, required: true},
    short: {type: String, required: true, default: shortId.generate}
})




const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema)
module.exports = ShortUrl