const express = require('express');
const router = express.Router();
const profileSAPService = require('../services/profile.sap.service');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

router.get('/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        if (!profileId) {
            return res.status(400).json({
                status: 'error',
                message: 'Profile ID is required'
            });
        }

        const profileData = await profileSAPService.getProfile(profileId);
        res.json({
            status: 'success',
            data: profileData
        });
    } catch (error) {
        logger.error(`Profile route error: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 