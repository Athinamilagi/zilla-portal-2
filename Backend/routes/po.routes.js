const express = require('express');
const router = express.Router();
const poService = require('../services/po.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

// Get all POs for a vendor
router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;
        logger.debug(`PO route: Fetching POs for vendor ${vendorId}`);
        
        const pos = await poService.getPOs(vendorId);
        res.json(pos);
    } catch (error) {
        logger.error(`PO route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get specific PO details
router.get('/:poId', async (req, res) => {
    try {
        const { poId } = req.params;
        logger.debug(`PO route: Fetching details for PO ${poId}`);
        
        const poDetails = await poService.getPODetails(poId);
        res.json(poDetails);
    } catch (error) {
        logger.error(`PO route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 