const express = require('express');
const { fetchAllCandidates, addCandidate, UpdateCandidate, fetchCandidateById, generateDummyProducts, deleteAllProducts } = require('../controller/CareerApply');

const router = express.Router();

router
    .get('/', fetchAllCandidates)
    .post('/add', addCandidate)
    .patch('/update/:id', UpdateCandidate)
    .get('/:id', fetchCandidateById)
    .post('/generateDummy', generateDummyProducts)
    .delete('/deleteAll', deleteAllProducts);

module.exports = router;
