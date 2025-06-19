const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

const getInvoiceFrontData = async (lifnr) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/INVOICE_FRONTSet?$filter=Lifnr eq('${lifnr}')&$format=json`,
        headers: {
            'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==', // Hardcoded Authorization
            'Cookie': 'sap-usercontext=sap-client=100'
        }
    };

    try {
        logger.info(`Fetching invoice front data for Lifnr: ${lifnr}`);
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        logger.error(`Error fetching invoice front data: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getInvoiceFrontData
}; 