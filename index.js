var express = require('express');
var request = require('request');
var app = express();
const IPData = require("ipdata").default;
require('dotenv').config();
const apiKey = "e52b05757ad1ed4a66cc621d9e09af5f33256b8273fc9421805b5bc3";
// const apiKey = process.env.API_KEY;
const ipdata = new IPData(apiKey);

app.get('/location', async (req, res) => {
    try{
        request.get('http://ipinfo.io/ip', (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let clientIp = req.headers["x-forward-ip"] || body
                console.log(body);
                ipdata.lookup(clientIp)
                    .then((data) => {
                        console.log(data);
                        return res.json({
                            city: data.city,
                            region: data.region,
                            country: data.country_name,
                            postal: data.postal
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error looking up location');
                    });
            }
        });

    }catch(error) {
        console.log(error);
        res.status(500).send('Error looking up location');
    }
   
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});
