const axios = require('axios');
const { setupLogger } = require('../utils/logger');

const logger = setupLogger();

class GoodsSAPService {
    constructor() {
        this.goodsConfig = {
            baseUrl: 'http://AZKTLDS5CP.kcloud.com:8000',
            endpoint: '/sap/opu/odata/SAP/ZSSM34_P2_GOODS_SRV/GOODSRECEIPTSet',
            headers: {
                'Authorization': 'Basic SzkwMTQ1NzpTYW5qYXkxMjM0NQ==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    async getGoods(vendorId) {
        try {
            const url = `${this.goodsConfig.baseUrl}${this.goodsConfig.endpoint}?$filter=VendorId eq ('${vendorId}')`;
            
            logger.debug(`Making Goods Receipt request for vendor: ${vendorId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.goodsConfig.headers
            });

            logger.info(`Successfully fetched Goods Receipts for vendor: ${vendorId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching Goods Receipts: ${error.message}`, {
                vendorId,
                url: `${this.goodsConfig.baseUrl}${this.goodsConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch Goods Receipts: ${error.message}`);
        }
    }

    async getGoodsDetails(goodsId) {
        try {
            const url = `${this.goodsConfig.baseUrl}${this.goodsConfig.endpoint}('${goodsId}')`;
            
            logger.debug(`Making Goods Receipt details request for ID: ${goodsId}`);
            
            const response = await axios({
                method: 'GET',
                url: url,
                headers: this.goodsConfig.headers
            });

            logger.info(`Successfully fetched Goods Receipt details for ID: ${goodsId}`);
            return response.data.d;
        } catch (error) {
            logger.error(`Error fetching Goods Receipt details: ${error.message}`, {
                goodsId,
                url: `${this.goodsConfig.baseUrl}${this.goodsConfig.endpoint}`,
                status: error.response?.status,
                responseData: error.response?.data
            });
            throw new Error(`Failed to fetch Goods Receipt details: ${error.message}`);
        }
    }
}

module.exports = new GoodsSAPService(); 