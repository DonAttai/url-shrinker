require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const ShortUrl = require('./models/ShortUrl.js')
const app = express()


const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB...'));    



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express())




app.get('/', async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find({})
        res.render('index', {shortUrls: shortUrls})
    } catch (error) {
        res.sendStatus(404)
    }
   
})

app.post('/shorturls', async (req, res) => {

    try {
        const shorturl = new ShortUrl(req.body)
        const result = await shorturl.save()
        res.redirect('/')
    } catch (error) {
        res.sendStatus(500)
    }
    
})
app.get('/:shortUrl', async (req, res) => {
    try {
        const short = req.params.shortUrl
        const shortUrl = await ShortUrl.findOne({short: short})
        if(shortUrl === null) {
        return res.sendStatus(404)
    }
        shortUrl.save()
        res.redirect(shortUrl.url) 
    } catch (error) {
        res.sendStatus(404)
    }
    
})


app.listen(port, () => console.log(`Server started on port ${port}`)) 