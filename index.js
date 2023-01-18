const express = require('express');
const IPData = require("ipdata").default;
const app = express();
require('dotenv').config();

const apiKey = process.env.API_KEY;
const ipdata = new IPData(apiKey);

app.get('/location', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
        const data = await ipdata.lookup(ip);
        console.log(data);
        res.json({
            city: data.city,
            region: data.region,
            country: data.country_name,
            postal:data.postal
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error looking up location');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
