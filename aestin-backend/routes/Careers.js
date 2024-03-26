const express = require('express');
const { fetchAllCareers, addCareer, UpdateCareer, searchCareer, fetchCareerById, generateDummyProducts, deleteAllProducts } = require('../controller/Careers');

const router = express.Router();

router
    .get('/', fetchAllCareers)
    .post('/add', addCareer)
    .post('/search', searchCareer)
    .patch('/update/:jobId', UpdateCareer)
    .get('/:jobId', fetchCareerById)
    .post('/generateDummy', generateDummyProducts)
    .delete('/deleteAll', deleteAllProducts);

module.exports = router;
