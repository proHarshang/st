const express = require('express');
const { createProduct, fetchAllProducts, isAvailable, updateStock, newProducts, exchangeRate, updateProducts, fetchPerticularProductsByIds, searchProduct, generateDummyProducts, deleteAllProducts, fetchProductById, fetchProductsByIds } = require('../controller/Products');

const router = express.Router();

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .post('/updateProducts/:productId', updateProducts)
    .post('/updateStock', updateStock)
    .post('/generateDummy', generateDummyProducts)
    .get('/new', newProducts)
    .get('/exchange-rate', exchangeRate)
    .get('/:id', fetchProductById)
    .post('/fetchPerticularProducts', fetchPerticularProductsByIds)
    .post('/fetchProducts', fetchProductsByIds)
    .post('/search', searchProduct)
    .post('/isAvailable', isAvailable)
    .delete('/deleteAll', deleteAllProducts);

module.exports = router;
