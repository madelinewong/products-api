const express = require('express');
const serverApp = express();

const PORT = process.env.PORT || 5000;

serverApp.get('/', (req, res) => {
    res.send(`Hello`);
});
serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});