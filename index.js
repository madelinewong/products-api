const express = require('express');
const serverApp = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;

//routers
const productRouter = require('./routers/products');

serverApp.use(productRouter);

serverApp.get('/', (req, res) => {
    res.send(`wow`);
});
serverApp.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});