const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.send('this is your products');
});

module.exports = router;