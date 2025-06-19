const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

class ProfileSAPService {
    constructor() {
        // Profile-specific configuration with direct authentication values
        this.profileConfig = {
            baseUrl: 'http://AZKTLDS5CP.kcloud.com:8000',
            endpoint: '/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/PROFILESet',
            headers: {
                'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ=='
            }
        };
    }

    async getProfile(profileId) {
        try {
            const url = `${this.profileConfig.baseUrl}${this.profileConfig.endpoint}('${profileId}')`;

            logger.debug(`Making SAP request to: ${url}`);

            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.profileConfig.headers
            });

            logger.info(`Successfully fetched profile for ID: ${profileId}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching profile: ${error.message}`, {
                profileId,
                url: `${this.profileConfig.baseUrl}${this.profileConfig.endpoint}('${profileId}')`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch profile: ${error.message}`);
        }
    }
}

module.exports = new ProfileSAPService(); 