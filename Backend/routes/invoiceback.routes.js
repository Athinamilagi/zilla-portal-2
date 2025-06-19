const express = require('express');
const router = express.Router();
const invoiceBackSAPService = require('../services/invoiceback.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:belnr', async (req, res) => {
    try {
        const belnr = req.params.belnr;

        if (!belnr) {
            return res.status(400).json({
                status: 'error',
                message: 'Belnr is required'
            });
        }

        const invoiceBackData = await invoiceBackSAPService.getInvoiceBackData(belnr);
        res.json({
            status: 'success',
            data: invoiceBackData.d
        });

    } catch (error) {
        logger.error(`Invoice Back route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 