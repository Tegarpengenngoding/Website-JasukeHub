const Order = require('../models/Order');
const Service = require('../models/Service');

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
    try {
        let query;

        if (req.user.role === 'seller' || req.user.role === 'both') {
            // Get orders where user is buyer OR seller
            query = {
                $or: [
                    { buyer: req.user._id },
                    { seller: req.user._id }
                ]
            };
        } else {
            // Buyers only see their purchases
            query = { buyer: req.user._id };
        }

        const orders = await Order.find(query)
            .populate('service', 'title category')
            .populate('buyer', 'name email')
            .populate('seller', 'name email')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('service')
            .populate('buyer', 'name email')
            .populate('seller', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user is buyer or seller
        if (
            order.buyer._id.toString() !== req.user._id.toString() &&
            order.seller._id.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const { serviceId, amount } = req.body;

        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const order = await Order.create({
            service: serviceId,
            buyer: req.user._id,
            seller: service.seller,
            amount,
            maxRevisions: service.revisions
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Only buyer or seller can update
        if (
            order.buyer.toString() !== req.user._id.toString() &&
            order.seller.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Request revision
// @route   POST /api/orders/:id/revision
// @access  Private (Buyer only)
const requestRevision = async (req, res) => {
    try {
        const { note } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user is the buyer
        if (order.buyer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only buyer can request revision' });
        }

        // Check revision limit
        if (order.revisionsUsed >= order.maxRevisions) {
            return res.status(400).json({ message: 'Revision limit reached' });
        }

        order.revisionsUsed += 1;
        order.status = 'revision';
        order.revisionNotes.push({ note });

        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    requestRevision
};
