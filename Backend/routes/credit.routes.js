const express = require('express');
const router = express.Router();
const creditSAPService = require('../services/credit.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:vendorId', async (req, res) => {
    try {
        const vendorId = req.params.vendorId;

        if (!vendorId) {
            return res.status(400).json({
                status: 'error',
                message: 'Vendor ID is required'
            });
        }

        const creditData = await creditSAPService.getCreditData(vendorId);
        
        res.json({
            status: 'success',
            data: creditData.d
        });

    } catch (error) {
        logger.error(`Credit route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 