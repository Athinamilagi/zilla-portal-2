const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

class POSAPService {
    constructor() {
        this.poConfig = {
            baseUrl: 'http://AZKTLDS5CP.kcloud.com:8000',
            endpoint: '/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/POSet',
            headers: {
                'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    async getPOs(vendorId) {
        try {
            const url = `${this.poConfig.baseUrl}${this.poConfig.endpoint}?$filter=VendorId eq ('${vendorId}')`;
            
            logger.debug(`Making PO request for vendor: ${vendorId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.poConfig.headers
            });

            logger.info(`Successfully fetched POs for vendor: ${vendorId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching POs: ${error.message}`, {
                vendorId,
                url: `${this.poConfig.baseUrl}${this.poConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch POs: ${error.message}`);
        }
    }

    async getPODetails(poId) {
        try {
            const url = `${this.poConfig.baseUrl}${this.poConfig.endpoint}('${poId}')`;
            
            logger.debug(`Making PO details request for PO ID: ${poId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.poConfig.headers
            });

            logger.info(`Successfully fetched PO details for ID: ${poId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching PO details: ${error.message}`, {
                poId,
                url: `${this.poConfig.baseUrl}${this.poConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch PO details: ${error.message}`);
        }
    }
}

module.exports = new POSAPService(); 