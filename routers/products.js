const express = require("express");
const router = express.Router();
const mockProducts = require("../mocks/products");

const Product = require("../models/product");

const productArrToObj = arrayOfProducts => {
  //create an accumulator object
  const accumalator = {};
  //for each product in arrayOfProducts
  arrayOfProducts.forEach(product => {
    const id = product._id;
    const copy = { ...product._doc };
    delete copy._id;
    accumalator[id] = copy;
  });
  //grab the id
  //delete the _id internal to the object
  //set the id value in the accumalator object equal to product
  //return accumulator
  return accumalator;
};

router.get("/products", (req, res) => {
  Product.find()
    .exec()
    .then(allProducts => {
      res.status(200).json({
        products: productArrToObj(allProducts)
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "broken again"
      });
    });
});

router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .exec()
    .then(selectedProduct => {
        const selectedIf = selectedProduct._id;
        const copy = {...selectedProduct._doc};
        delete copy._id;
      res
        .status(200)
        .json({
          products: {
            [selectedProduct._id]: selectedProduct
          }
        })
        .catch(err => {
            res.status(500).json({
                msg: "don't look behind you."
            });
        });
    });
});

router.post("/products", (req, res) => {
  const product = new Product({
    name: "something new",
    price: 1000,
    imgSrc: "https://via.placeholder.com/250x250"
  });
  product
    .save()
    .then(response => {
      res.status(201).json({
        msg: "successfully created project"
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "your stuff is broke."
      });
    });
});

//update (PUT)
router.put('/products/:id', (req, res) => {
  res.send('Updating now');
});

//delete 
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
           .then(response => {
             res.status(200).json({
                  msg: "Successfully deleted"
             });
           })
           .catch(err => {
             res.status(500).json({
               msg: "Something is broke :-/// "
             });
           });
});

module.exports = router;
