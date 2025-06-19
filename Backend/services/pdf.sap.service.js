const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

const getInvoicePdf = async (belnr, lifnr) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZSSM34_P2_AGING_SRV/INVOICE_FORMSet(BELNR='${belnr}',LIFNR='${lifnr}')/$value`,
        headers: {
            'Authorization': 'Basic SzkwMTQ3NzpBdGhpbmFtaWxhZ2lAMjg=',
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        responseType: 'arraybuffer'
    };

    try {
        logger.info(`Fetching PDF for Belnr: ${belnr}, Lifnr: ${lifnr}`);
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        logger.error(`Error fetching PDF: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getInvoicePdf
}; 