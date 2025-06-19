const express = require('express');
const router = express.Router();
const loginSAPService = require('../services/login.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.post('/', async (req, res) => {
    try {
        const { vendorId, password } = req.body;

        if (!vendorId || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Vendor ID and password are required'
            });
        }

        const loginData = await loginSAPService.login(vendorId, password);
        if (loginData.MESSAGE === 'WELCOME USER') {
            res.json({
                status: 'success',
                userId: loginData.LIFNR,
            });
        } else {
            res.json({
                status: 'error',
                message: 'Invalid vendor ID or password'
            });
        }

    } catch (error) {
        logger.error(`Login route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 