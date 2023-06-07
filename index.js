const express = require('express');
const app = express();
const db = require('./db');
const fetchData = require('./api');
// const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017'
// const client = new MongoClient(uri);


app.use(express.static('public'));

app.set('view engine', 'ejs');


// Connecting DB
db.connectDB();

// Fetching Data from WazirX API and storing in DB

app.get('/', (req, res) => {
    res.redirect('/dashboard');
});


app.get('/dashboard', async (req, res) => {
    console.log('aagye root route pe')
    try {
        const cryptos = await db.Crpyto.find().exec();
        if (cryptos.length <= 0) {
            fetchData()
                .then(data => {
                    c = Object.keys(data);
                    c = c.slice(0, 10);
                    console.log(data[c[0]].name)

                    // btcinr: {
                    //     base_unit: 'btc',
                    //     quote_unit: 'inr',
                    //     low: '2240000.0',
                    //     high: '2395901.0',
                    //     last: '2365750.0',
                    //     type: 'SPOT',
                    //     open: '2325000',
                    //     volume: '12.31394',
                    //     sell: '2365511.0',
                    //     buy: '2346480.0',
                    //     at: 1686131297,
                    //     name: 'BTC/INR'
                    //   },
                    c.forEach(crypto => {
                        let newCrpyto = new db.Crpyto({
                            name: data[crypto].name,
                            last: data[crypto].last,
                            buy: data[crypto].buy,
                            sell: data[crypto].sell,
                            volume: data[crypto].volume,
                            base_unit: data[crypto].base_unit
                        });
                        newCrpyto.save()
                            .then(() => {
                                console.log(`${newCrpyto.name} is added to DB`);
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    });
                });

        }
        const sno = 1;
        res.render('index', { cryptos, sno });

    } catch (e) {
        console.log(e);
    }

});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

