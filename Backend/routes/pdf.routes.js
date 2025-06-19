const express = require('express');
const router = express.Router();
const pdfSAPService = require('../services/pdf.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:belnr/:lifnr', async (req, res) => {
    try {
        const { belnr, lifnr } = req.params;

        if (!belnr || !lifnr) {
            return res.status(400).json({
                status: 'error',
                message: 'Belnr and Lifnr are required'
            });
        }

        const pdfData = await pdfSAPService.getInvoicePdf(belnr, lifnr);
        
        // Set appropriate headers for PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="invoice_${belnr}.pdf"`);
        
        res.send(pdfData);

    } catch (error) {
        logger.error(`PDF route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 