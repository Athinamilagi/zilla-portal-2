const express = require('express');
const router = express.Router();
const goodsService = require('../services/goods.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

// Get all Goods Receipts for a vendor
router.get('/vendor/:vendorId', async (req, res) => {
    try {
        const { vendorId } = req.params;
        logger.debug(`Goods Receipt route: Fetching GRs for vendor ${vendorId}`);
        
        const goods = await goodsService.getGoods(vendorId);
        res.json(goods);
    } catch (error) {
        logger.error(`Goods Receipt route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Get specific Goods Receipt details
router.get('/:goodsId', async (req, res) => {
    try {
        const { goodsId } = req.params;
        logger.debug(`Goods Receipt route: Fetching details for GR ${goodsId}`);
        
        const goodsDetails = await goodsService.getGoodsDetails(goodsId);
        res.json(goodsDetails);
    } catch (error) {
        logger.error(`Goods Receipt route error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 