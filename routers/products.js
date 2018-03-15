const express = require('express');
const router = express.Router();
const mockProducts = require('../mocks/products');

const productArrToObj = (arrayOfProducts) => {
    //create an accumulator object
    const accumalator = {};
    //for each product in arrayOfProducts
    arrayOfProducts.forEach(product => {
        const id = product._id;
        const copy = {...product}
        delete copy._id;
        accumalator[id] = copy;
    });
        //grab the id
        //delete the _id internal to the object
        //set the id value in the accumalator object equal to product 
    //return accumulator
    return accumalator;

}

router.get('/products', (req, res) => {
    res.status(200).json({
        products: productArrToObj(mockProducts)
    })
});

router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const productsObject = productArrToObj(mockProducts);
    const selectedProduct = productsObject[id];
    res.status(200).json({
        products: {
            [id]: selectedProduct
        } 

    });
});

router.post('/products', (req, res) => {
    const productsObject = productArrToObj(mockProducts);
    const id = 100000000 * Math.random();
    const newProduct = {
        name: 'something new',
        price: 100,
        created: new Date(),
        imgSrc: "https://via.placeholder.com/250x250"
    };
    mockProducts.push(newProduct);
    res.status(201).json({
        msg: 'successfully created project'
    })
});

module.exports = router;