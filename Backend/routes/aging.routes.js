const express = require('express');
const router = express.Router();
const agingSAPService = require('../services/aging.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:vendorId', async (req, res) => {
    try {
        const vendorId = req.params.vendorId;
        console.log(vendorId)
        if (!vendorId) {
            return res.status(400).json({
                status: 'error',
                message: 'Vendor ID is required'
            });
        }

        const agingData = await agingSAPService.getAgingData(vendorId);
        res.json({
            status: 'success',
            data: agingData.d
        });

    } catch (error) {
        logger.error(`Aging route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 