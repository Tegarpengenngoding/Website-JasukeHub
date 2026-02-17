const express = require('express');
const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');
const { protect, isSeller } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getServices)
    .post(protect, isSeller, createService);

router.route('/:id')
    .get(getServiceById)
    .put(protect, updateService)
    .delete(protect, deleteService);

module.exports = router;
