const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const services = await Service.find(query).populate('seller', 'name avatar');

        res.json(services);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('seller', 'name avatar');

        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private (Seller only)
const createService = async (req, res) => {
    try {
        const { title, description, category, price, deliveryTime, revisions, portfolio } = req.body;

        const service = await Service.create({
            title,
            description,
            category,
            price,
            deliveryTime,
            revisions: revisions || 3,
            seller: req.user._id,
            portfolio: portfolio || []
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Owner only)
const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if user is the owner
        if (service.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this service' });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Owner only)
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if user is the owner
        if (service.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this service' });
        }

        await service.deleteOne();

        res.json({ message: 'Service removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
