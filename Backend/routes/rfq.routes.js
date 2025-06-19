const express = require('express');
const router = express.Router();
const rfqService = require('../services/rfq.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

// Get all RFQs for a vendor
router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;
        logger.debug(`RFQ route: Fetching RFQs for vendor ${vendorId}`);
        
        const rfqs = await rfqService.getRFQs(vendorId);
        console.log(rfqs);
        res.json(rfqs.results);
    } catch (error) {
        logger.error(`RFQ route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get specific RFQ details
router.get('/:rfqId', async (req, res) => {
    try {
        const { rfqId } = req.params;
        logger.debug(`RFQ route: Fetching details for RFQ ${rfqId}`);
        
        const rfqDetails = await rfqService.getRFQDetails(rfqId);
        res.json(rfqDetails);
    } catch (error) {
        logger.error(`RFQ route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 