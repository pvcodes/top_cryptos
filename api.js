const fetch = require('node-fetch');

const fetchData = () => {
    return fetch('https://api.wazirx.com/api/v2/tickers')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error('Error fetching data:', error);
        });
};


module.exports = fetchData;
