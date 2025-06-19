const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

class RFQSAPService {
    constructor() {
        this.rfqConfig = {
            baseUrl: 'http://AZKTLDS5CP.kcloud.com:8000',
            endpoint: '/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/RFQSet',
            headers: {
                'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    } 

    async getRFQs(vendorId) {
        try {
            const url = `${this.rfqConfig.baseUrl}${this.rfqConfig.endpoint}?$filter=VendorId eq ('${vendorId}')`;
            
            logger.debug(`Making RFQ request for vendor: ${vendorId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.rfqConfig.headers
            });

            logger.info(`Successfully fetched RFQs for vendor: ${vendorId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching RFQs: ${error.message}`, {
                vendorId,
                url: `${this.rfqConfig.baseUrl}${this.rfqConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch RFQs: ${error.message}`);
        }
    }

    async getRFQDetails(rfqId) {
        try {
            const url = `${this.rfqConfig.baseUrl}${this.rfqConfig.endpoint}('${rfqId}')`;
            
            logger.debug(`Making RFQ details request for RFQ ID: ${rfqId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.rfqConfig.headers
            });

            logger.info(`Successfully fetched RFQ details for ID: ${rfqId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching RFQ details: ${error.message}`, {
                rfqId,
                url: `${this.rfqConfig.baseUrl}${this.rfqConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch RFQ details: ${error.message}`);
        }
    }
}

module.exports = new RFQSAPService(); 