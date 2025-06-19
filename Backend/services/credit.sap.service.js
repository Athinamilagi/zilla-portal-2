const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

const getCreditData = async (vendorId) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/CREDITSet?$filter=VendorId eq ('${vendorId}')`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==', // Hardcoded Authorization
            'Cookie': 'sap-usercontext=sap-client=100'
        }
    };

    try {
        logger.info(`Fetching credit data for VendorId: ${vendorId}`);
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        logger.error(`Error fetching credit data: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getCreditData
}; 