const express = require('express');
const router = express.Router();
const invoiceFrontSAPService = require('../services/invoicefront.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:lifnr', async (req, res) => {
    try {
        const lifnr = req.params.lifnr;

        if (!lifnr) {
            return res.status(400).json({
                status: 'error',
                message: 'Lifnr is required'
            });
        }

        const invoiceFrontData = await invoiceFrontSAPService.getInvoiceFrontData(lifnr);
        
        res.json({
            status: 'success',
            data: invoiceFrontData.d
        });

    } catch (error) {
        logger.error(`Invoice Front route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 